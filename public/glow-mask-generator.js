/**
 * Glow Mask Generator
 * High-contrast data center glow mask with electric blue LED lights
 * Server rack highlights, vertical light strips, metallic edges
 * Designed for hover-activated additive bloom effects
 */

class GlowMaskGenerator {
  constructor(width = 1920, height = 1080) {
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * Generate the glow mask
   */
  generate() {
    this.drawBase();
    this.drawServerRackLEDs();
    this.drawVerticalLightStrips();
    this.drawMetallicEdges();
    this.drawCorridor();
    this.applyBloomPrep();
    return this.canvas;
  }

  /**
   * Draw dark base (navy/black)
   */
  drawBase() {
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, 'rgb(10, 15, 30)');    // Deep navy top
    gradient.addColorStop(0.5, 'rgb(5, 10, 25)');   // Deeper navy mid
    gradient.addColorStop(1, 'rgb(15, 20, 35)');    // Slightly lighter bottom
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Draw server rack LED indicators
   */
  drawServerRackLEDs() {
    const centerX = this.width / 2;
    const rackCount = 8;
    const corridorWidth = this.width * 0.35;
    const corridorLeft = centerX - corridorWidth / 2;
    const corridorRight = centerX + corridorWidth / 2;
    
    for (let i = 0; i < rackCount; i++) {
      const depthRatio = i / (rackCount - 1);
      const yBase = depthRatio * this.height;
      const rackScale = 1 - (depthRatio * 0.5);
      const rackWidth = 80 * rackScale;
      const rackHeight = 150 * rackScale;
      
      // LED brightness decreases with distance
      const brightness = Math.floor(255 - depthRatio * 100);
      
      // Left rack LEDs
      this.drawRackLEDs(
        corridorLeft - rackWidth - 10,
        yBase,
        rackWidth,
        rackHeight,
        brightness,
        rackScale
      );
      
      // Right rack LEDs
      this.drawRackLEDs(
        corridorRight + 10,
        yBase,
        rackWidth,
        rackHeight,
        brightness,
        rackScale
      );
    }
  }

  /**
   * Draw individual rack LED lights
   */
  drawRackLEDs(x, y, width, height, brightness, scale) {
    const ledSize = Math.max(2, 6 * scale);
    const ledSpacing = Math.max(4, 12 * scale);
    const ledCount = Math.floor(height / ledSpacing);
    
    for (let i = 0; i < ledCount; i++) {
      const ledY = y - height / 2 + (i * ledSpacing);
      
      // Alternate colors: bright cyan and electric blue
      const isEvenRow = i % 2 === 0;
      const r = isEvenRow ? brightness * 0.3 : brightness * 0.2;
      const g = brightness * 0.85;
      const b = brightness;
      
      // Draw LED core (sharp)
      this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      this.ctx.beginPath();
      this.ctx.arc(x + width / 2, ledY, ledSize / 2, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw LED glow halo (soft bloom-ready)
      const glowGradient = this.ctx.createRadialGradient(
        x + width / 2, ledY, ledSize / 2,
        x + width / 2, ledY, ledSize * 1.5
      );
      glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.6)`);
      glowGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.2)`);
      glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      
      this.ctx.fillStyle = glowGradient;
      this.ctx.fillRect(
        x + width / 2 - ledSize * 1.5,
        ledY - ledSize * 1.5,
        ledSize * 3,
        ledSize * 3
      );
    }
  }

  /**
   * Draw vertical light strips on corridor edges
   */
  drawVerticalLightStrips() {
    const centerX = this.width / 2;
    const corridorWidth = this.width * 0.35;
    const corridorLeft = centerX - corridorWidth / 2;
    const corridorRight = centerX + corridorWidth / 2;
    
    const stripWidth = 8;
    const stripHeight = this.height;
    
    // Left edge light strip
    this.drawLightStrip(corridorLeft - 15, 0, stripWidth, stripHeight, true);
    
    // Right edge light strip
    this.drawLightStrip(corridorRight + 8, 0, stripWidth, stripHeight, true);
  }

  /**
   * Draw a vertical light strip
   */
  drawLightStrip(x, y, width, height, isVertical) {
    // Main strip - bright cyan
    const stripGradient = this.ctx.createLinearGradient(x, 0, x + width, 0);
    stripGradient.addColorStop(0, 'rgba(100, 220, 255, 0)');     // Transparent left
    stripGradient.addColorStop(0.4, 'rgba(50, 200, 255, 0.8)');  // Bright cyan
    stripGradient.addColorStop(0.6, 'rgba(50, 200, 255, 0.8)');  // Bright cyan
    stripGradient.addColorStop(1, 'rgba(100, 220, 255, 0)');     // Transparent right
    
    this.ctx.fillStyle = stripGradient;
    this.ctx.fillRect(x, y, width, height);
    
    // Glow halo for bloom
    const glowGradient = this.ctx.createLinearGradient(x - 20, 0, x + width + 20, 0);
    glowGradient.addColorStop(0, 'rgba(50, 200, 255, 0)');
    glowGradient.addColorStop(0.3, 'rgba(50, 200, 255, 0.3)');
    glowGradient.addColorStop(0.5, 'rgba(100, 220, 255, 0.4)');
    glowGradient.addColorStop(0.7, 'rgba(50, 200, 255, 0.3)');
    glowGradient.addColorStop(1, 'rgba(50, 200, 255, 0)');
    
    this.ctx.fillStyle = glowGradient;
    this.ctx.fillRect(x - 20, y, width + 40, height);
  }

  /**
   * Draw metallic edge highlights
   */
  drawMetallicEdges() {
    const centerX = this.width / 2;
    const corridorWidth = this.width * 0.35;
    const corridorLeft = centerX - corridorWidth / 2;
    const corridorRight = centerX + corridorWidth / 2;
    
    const rackCount = 8;
    
    for (let i = 0; i < rackCount; i++) {
      const depthRatio = i / (rackCount - 1);
      const yBase = depthRatio * this.height;
      const rackScale = 1 - (depthRatio * 0.5);
      const rackWidth = 80 * rackScale;
      const rackHeight = 150 * rackScale;
      
      const brightness = Math.floor(200 - depthRatio * 80);
      const edgeColor = `rgba(100, 200, 255, ${0.6 - depthRatio * 0.3})`;
      
      // Left rack edge highlight
      this.drawEdgeHighlight(
        corridorLeft - rackWidth - 10,
        yBase - rackHeight / 2,
        2,
        rackHeight,
        edgeColor
      );
      
      // Right rack edge highlight
      this.drawEdgeHighlight(
        corridorRight + 10 + rackWidth - 2,
        yBase - rackHeight / 2,
        2,
        rackHeight,
        edgeColor
      );
    }
  }

  /**
   * Draw metallic edge highlight with glow
   */
  drawEdgeHighlight(x, y, width, height, color) {
    // Sharp edge
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
    
    // Soft glow for bloom
    const edgeGlow = this.ctx.createLinearGradient(x - 5, 0, x + width + 5, 0);
    const baseColor = color.replace('rgba', '').match(/[\d.]+/g);
    edgeGlow.addColorStop(0, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0)`);
    edgeGlow.addColorStop(0.4, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${baseColor[3] * 0.5})`);
    edgeGlow.addColorStop(0.6, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${baseColor[3] * 0.5})`);
    edgeGlow.addColorStop(1, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0)`);
    
    this.ctx.fillStyle = edgeGlow;
    this.ctx.fillRect(x - 5, y, width + 10, height);
  }

  /**
   * Draw corridor highlights
   */
  drawCorridor() {
    const centerX = this.width / 2;
    const corridorWidth = this.width * 0.35;
    const corridorLeft = centerX - corridorWidth / 2;
    const corridorRight = centerX + corridorWidth / 2;
    
    // Subtle floor center line in bright cyan
    const lineWidth = 3;
    const lineGradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    lineGradient.addColorStop(0, 'rgba(50, 200, 255, 0.2)');
    lineGradient.addColorStop(0.3, 'rgba(100, 220, 255, 0.4)');
    lineGradient.addColorStop(0.7, 'rgba(100, 220, 255, 0.3)');
    lineGradient.addColorStop(1, 'rgba(50, 200, 255, 0.1)');
    
    this.ctx.fillStyle = lineGradient;
    this.ctx.fillRect(centerX - lineWidth / 2, 0, lineWidth, this.height);
  }

  /**
   * Apply bloom-ready finishing
   */
  applyBloomPrep() {
    // Add subtle bloom enhancement
    const bloomGradient = this.ctx.createRadialGradient(
      this.width / 2, this.height / 2, 0,
      this.width / 2, this.height / 2,
      Math.max(this.width, this.height) * 0.7
    );
    
    bloomGradient.addColorStop(0, 'rgba(100, 200, 255, 0.05)');
    bloomGradient.addColorStop(0.5, 'rgba(50, 150, 200, 0.02)');
    bloomGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    this.ctx.globalCompositeOperation = 'screen';
    this.ctx.fillStyle = bloomGradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.globalCompositeOperation = 'source-over';
  }

  /**
   * Get canvas as data URL
   */
  toDataURL() {
    return this.canvas.toDataURL('image/png');
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
 * Initialize glow mask on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  const initGlowMask = () => {
    if (window.depthMapCanvas) {
      const width = window.depthMapCanvas.width;
      const height = window.depthMapCanvas.height;
      
      const glowGenerator = new GlowMaskGenerator(width, height);
      const glowMask = glowGenerator.generate();
      
      // Store for use in hover effects and glow rendering
      window.glowMask = glowMask;
      window.glowMaskGenerator = glowGenerator;
      
      console.log('✓ Glow mask generated', width + 'x' + height);
    } else {
      // Retry if depth map not ready
      setTimeout(initGlowMask, 100);
    }
  };
  
  initGlowMask();
});

/**
 * Export for module use
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GlowMaskGenerator;
}
