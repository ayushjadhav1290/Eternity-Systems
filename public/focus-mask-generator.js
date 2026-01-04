/**
 * Focus Reveal Mask Generator
 * High-contrast data center corridor mask in cool blue tones
 * Bright cyan-white center fading to dark blue/black edges
 * Designed for interactive cursor-based clarity reveal
 */

class FocusRevealMaskGenerator {
  constructor(width = 1920, height = 1080) {
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * Generate the focus reveal mask
   */
  generate() {
    this.drawBackground();
    this.drawCentralCorridor();
    this.drawServerRackEdges();
    this.drawFalloffGradient();
    this.applyFeathering();
    return this.canvas;
  }

  /**
   * Draw dark background (outer edges - black)
   */
  drawBackground() {
    this.ctx.fillStyle = 'rgb(15, 20, 35)'; // Near-black blue
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Draw central corridor walkway in bright cyan
   */
  drawCentralCorridor() {
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    
    // Main corridor walkway - bright cyan white
    const corridorWidth = this.width * 0.35;
    const corridorHeight = this.height;
    
    // Create gradient for walkway depth perception
    const corridorGradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    corridorGradient.addColorStop(0, 'rgb(50, 150, 200)');      // Top (distant) - medium cyan
    corridorGradient.addColorStop(0.3, 'rgb(100, 200, 255)');   // Upper mid - bright cyan
    corridorGradient.addColorStop(0.5, 'rgb(150, 230, 255)');   // Center - bright cyan-white
    corridorGradient.addColorStop(0.7, 'rgb(180, 240, 255)');   // Lower mid - brightest
    corridorGradient.addColorStop(1, 'rgb(100, 200, 255)');     // Bottom (foreground) - bright cyan
    
    this.ctx.fillStyle = corridorGradient;
    this.ctx.fillRect(
      centerX - corridorWidth / 2,
      0,
      corridorWidth,
      corridorHeight
    );
  }

  /**
   * Draw server rack edge silhouettes
   */
  drawServerRackEdges() {
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    
    // Draw rack edges on left and right sides of corridor
    const rackCount = 8;
    const corridorWidth = this.width * 0.35;
    const corridorLeft = centerX - corridorWidth / 2;
    const corridorRight = centerX + corridorWidth / 2;
    
    for (let i = 0; i < rackCount; i++) {
      const depthRatio = i / (rackCount - 1);
      const yPos = depthRatio * this.height;
      const rackScale = 1 - (depthRatio * 0.5);
      const rackWidth = 80 * rackScale;
      const rackHeight = 150 * rackScale;
      
      // Brightness decreases with distance
      const brightness = Math.floor(200 - depthRatio * 80);
      const color = `rgb(${brightness}, ${brightness + 40}, ${brightness + 60})`;
      
      // Left rack edge
      this.drawRackEdge(
        corridorLeft - rackWidth - 10,
        yPos,
        rackWidth,
        rackHeight,
        color
      );
      
      // Right rack edge
      this.drawRackEdge(
        corridorRight + 10,
        yPos,
        rackWidth,
        rackHeight,
        color
      );
    }
  }

  /**
   * Draw individual rack edge silhouette
   */
  drawRackEdge(x, y, width, height, color) {
    // Rack body outline - clean silhouette
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y - height / 2, width, height);
    
    // Rack edge highlight (left side bright)
    const edgeGradient = this.ctx.createLinearGradient(x, y, x + width, y);
    edgeGradient.addColorStop(0, 'rgba(200, 240, 255, 0.8)');  // Bright edge
    edgeGradient.addColorStop(0.5, 'rgba(100, 180, 220, 0.4)');
    edgeGradient.addColorStop(1, 'rgba(50, 100, 150, 0.1)');
    
    this.ctx.fillStyle = edgeGradient;
    this.ctx.fillRect(x, y - height / 2, width, height);
  }

  /**
   * Draw radial falloff gradient toward edges
   */
  drawFalloffGradient() {
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    
    // Radial gradient from center outward
    const gradient = this.ctx.createRadialGradient(
      centerX, centerY,
      0,
      centerX, centerY,
      Math.max(this.width, this.height) * 0.8
    );
    
    // Transparent in center (to preserve bright areas)
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    // Gradually darken toward edges
    gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.1)');
    gradient.addColorStop(0.65, 'rgba(0, 0, 0, 0.3)');
    gradient.addColorStop(0.85, 'rgba(0, 0, 0, 0.6)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Apply feathering and soft edges
   */
  applyFeathering() {
    // Create a feathered vignette effect on top
    const vignette = this.ctx.createRadialGradient(
      this.width / 2, this.height / 2,
      Math.min(this.width, this.height) * 0.2,
      this.width / 2, this.height / 2,
      Math.max(this.width, this.height) * 0.9
    );
    
    vignette.addColorStop(0, 'rgba(255, 255, 255, 0)');      // Transparent center
    vignette.addColorStop(0.5, 'rgba(0, 0, 0, 0.05)');       // Soft transition
    vignette.addColorStop(0.8, 'rgba(0, 0, 0, 0.2)');        // Visible falloff
    vignette.addColorStop(1, 'rgba(0, 0, 0, 0.4)');          // Dark edges
    
    this.ctx.fillStyle = vignette;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Apply slight blur via canvas filter for softness
    this.ctx.filter = 'blur(1.5px)';
    this.ctx.drawImage(this.canvas, 0, 0);
    this.ctx.filter = 'none';
  }

  /**
   * Get high-contrast version for visualization
   */
  generateHighContrast() {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext('2d');
    
    // Copy base mask
    ctx.drawImage(this.canvas, 0, 0);
    
    // Apply high contrast filter
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = 'rgba(100, 200, 255, 0.3)';
    ctx.fillRect(0, 0, this.width, this.height);
    
    return canvas;
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
 * Initialize focus reveal mask on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  // Wait for depth map to be ready, then generate focus mask
  const initMask = () => {
    if (window.depthMapCanvas) {
      const width = window.depthMapCanvas.width;
      const height = window.depthMapCanvas.height;
      
      const maskGenerator = new FocusRevealMaskGenerator(width, height);
      const focusMask = maskGenerator.generate();
      
      // Store for use in focus reveal effect
      window.focusRevealMask = focusMask;
      window.focusRevealMaskGenerator = maskGenerator;
      
      console.log('✓ Focus reveal mask generated', width + 'x' + height);
    } else {
      // Retry if depth map not ready yet
      setTimeout(initMask, 100);
    }
  };
  
  initMask();
});

/**
 * Export for module use
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FocusRevealMaskGenerator;
}
