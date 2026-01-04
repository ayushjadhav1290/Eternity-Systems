/**
 * Film Grain Texture Generator
 * Subtle blue-tinted monochrome noise for cinematic post-processing
 * Seamless tile, fine organic noise, WebGL shader compatible
 */

class FilmGrainGenerator {
  constructor(width = 512, height = 512, tileSize = 512) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
    this.imageData = this.ctx.createImageData(width, height);
    this.data = this.imageData.data;
  }

  /**
   * Generate Perlin-like noise using multiple octaves
   */
  generatePerlinNoise(scale = 4, octaves = 4) {
    const noiseBuffer = new Float32Array(this.width * this.height);
    
    // Generate base noise
    for (let i = 0; i < noiseBuffer.length; i++) {
      noiseBuffer[i] = Math.random();
    }
    
    // Multi-octave interpolation
    for (let octave = 0; octave < octaves; octave++) {
      const freq = Math.pow(2, octave);
      const amp = Math.pow(0.5, octave);
      
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const idx = y * this.width + x;
          
          // Sample from noise at different scales
          const sx = (x / this.width) * freq * this.tileSize;
          const sy = (y / this.height) * freq * this.tileSize;
          
          const value = this.perlinNoise(sx, sy);
          noiseBuffer[idx] += value * amp;
        }
      }
    }
    
    return noiseBuffer;
  }

  /**
   * Perlin-like noise function
   */
  perlinNoise(x, y) {
    // Hash coordinates
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    
    // Fade curves
    const u = this.fade(xf);
    const v = this.fade(yf);
    
    // Hash values
    const h00 = this.hash(xi, yi);
    const h10 = this.hash(xi + 1, yi);
    const h01 = this.hash(xi, yi + 1);
    const h11 = this.hash(xi + 1, yi + 1);
    
    // Gradients
    const g00 = this.grad(h00, xf, yf);
    const g10 = this.grad(h10, xf - 1, yf);
    const g01 = this.grad(h01, xf, yf - 1);
    const g11 = this.grad(h11, xf - 1, yf - 1);
    
    // Interpolation
    const i0 = this.lerp(g00, g10, u);
    const i1 = this.lerp(g01, g11, u);
    const result = this.lerp(i0, i1, v);
    
    return result;
  }

  /**
   * Fade function (smoothstep)
   */
  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  /**
   * Hash function
   */
  hash(x, y) {
    let h = x ^ y;
    h ^= h >> 16;
    h *= 0x85ebca6b;
    h ^= h >> 13;
    h *= 0xc2b2ae35;
    h ^= h >> 16;
    return (h % 256 + 256) % 256;
  }

  /**
   * Gradient function
   */
  grad(hash, x, y) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 8 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  /**
   * Linear interpolation
   */
  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /**
   * Generate organic film grain
   */
  generateGrain() {
    // Generate base noise
    const noiseBuffer = this.generatePerlinNoise(4, 4);
    
    // Generate high-frequency detail noise
    const detailBuffer = new Float32Array(this.width * this.height);
    for (let i = 0; i < detailBuffer.length; i++) {
      detailBuffer[i] = Math.random() * 2 - 1;
    }
    
    // Combine and apply blue tint
    for (let i = 0; i < this.data.length; i += 4) {
      const pixelIdx = i / 4;
      
      // Combine noise sources
      let value = noiseBuffer[pixelIdx] * 0.7 + detailBuffer[pixelIdx] * 0.3;
      
      // Normalize to 0-1
      value = (value + 1) / 2;
      value = Math.max(0, Math.min(1, value));
      
      // Apply subtle blue tint (cyan-blue grayscale)
      const intensity = Math.floor(value * 255);
      
      // Cool blue tint: R lower, B higher, G medium
      this.data[i] = Math.floor(intensity * 0.95);      // Red - slightly reduced
      this.data[i + 1] = Math.floor(intensity * 0.98);  // Green - slightly reduced
      this.data[i + 2] = Math.floor(intensity * 1.05);  // Blue - slightly boosted
      this.data[i + 3] = 220;                            // Alpha - 86% opacity for subtle effect
    }
    
    // Apply to canvas
    this.ctx.putImageData(this.imageData, 0, 0);
    return this.canvas;
  }

  /**
   * Generate seamless tile version
   */
  generateSeamlessGrain() {
    this.generateGrain();
    
    // Apply edge blending for seamless tiling
    const blendSize = 32;
    
    // Blend horizontal edges
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < blendSize; x++) {
        const leftIdx = (y * this.width + x) * 4;
        const rightIdx = (y * this.width + (this.width - blendSize + x)) * 4;
        
        const blend = x / blendSize;
        for (let c = 0; c < 3; c++) {
          this.data[leftIdx + c] = this.data[leftIdx + c] * (1 - blend) + 
                                   this.data[rightIdx + c] * blend;
        }
      }
    }
    
    // Blend vertical edges
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < blendSize; y++) {
        const topIdx = (y * this.width + x) * 4;
        const bottomIdx = (((this.height - blendSize + y) * this.width) + x) * 4;
        
        const blend = y / blendSize;
        for (let c = 0; c < 3; c++) {
          this.data[topIdx + c] = this.data[topIdx + c] * (1 - blend) + 
                                  this.data[bottomIdx + c] * blend;
        }
      }
    }
    
    this.ctx.putImageData(this.imageData, 0, 0);
    return this.canvas;
  }

  /**
   * Get canvas as data URL
   */
  toDataURL() {
    return this.canvas.toDataURL('image/png');
  }

  /**
   * Create a larger version by tiling
   */
  createTiledTexture(tilesX = 2, tilesY = 2) {
    const tiledCanvas = document.createElement('canvas');
    tiledCanvas.width = this.width * tilesX;
    tiledCanvas.height = this.height * tilesY;
    const ctx = tiledCanvas.getContext('2d');
    
    for (let y = 0; y < tilesY; y++) {
      for (let x = 0; x < tilesX; x++) {
        ctx.drawImage(this.canvas, x * this.width, y * this.height);
      }
    }
    
    return tiledCanvas;
  }

  /**
   * Render to target canvas
   */
  renderTo(targetCanvas) {
    const ctx = targetCanvas.getContext('2d');
    targetCanvas.width = this.width;
    targetCanvas.height = this.height;
    ctx.drawImage(this.canvas, 0, 0);
  }
}

/**
 * Initialize film grain texture on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  // Generate high-resolution seamless grain texture
  const grainGenerator = new FilmGrainGenerator(512, 512, 512);
  const filmGrainTexture = grainGenerator.generateSeamlessGrain();
  
  // Store globally for use in effects
  window.filmGrainTexture = filmGrainTexture;
  window.filmGrainGenerator = grainGenerator;
  
  // Create a larger tiled version for full-screen use
  const tiledGrain = grainGenerator.createTiledTexture(4, 3);
  window.filmGrainTextureHD = tiledGrain;
  
  console.log('✓ Film grain texture generated', grainGenerator.width + 'x' + grainGenerator.height);
});

/**
 * Export for module use
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FilmGrainGenerator;
}
