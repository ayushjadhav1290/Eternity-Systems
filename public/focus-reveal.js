/**
 * Focus Reveal Effect - Data Center Edition
 * Ultra-realistic cinematic cursor-driven depth-of-field effect
 * Premium tech aesthetic with blue LED lighting and industrial design
 */

class FocusRevealEffect {
  constructor() {
    this.canvas = document.getElementById('focusRevealCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    // Mouse tracking
    this.mouseX = this.width / 2;
    this.mouseY = this.height / 2;
    this.targetX = this.width / 2;
    this.targetY = this.height / 2;
    
    // Focus circle parameters
    this.focusRadius = 180;
    this.targetRadius = 180;
    this.maxRadius = 320;
    this.minRadius = 100;
    this.blurAmount = 28;
    
    // State
    this.isAnimating = false;
    this.globalBlur = 28;
    this.glowOpacity = 0; // Add glow opacity state
    
    // Load background image - using the best data center image
    this.backgroundImage = new Image();
    this.backgroundImage.src = 'public/images/ChatGPT Image Jan 2, 2026, 03_52_00 PM.png';
    this.backgroundImage.onload = () => {
      this.init();
    };
    this.backgroundImage.onerror = () => {
      // Fallback to first image if primary fails
      this.backgroundImage.src = 'public/images/1765010213773.png';
    };
    
    this.setupEventListeners();
    this.initializeDepthMap();
    this.animate();
  }
  
  setupEventListeners() {
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('resize', () => this.onWindowResize());
    document.addEventListener('mouseenter', () => this.onMouseEnter());
    document.addEventListener('mouseleave', () => this.onMouseLeave());
  }
  
  /**
   * Initialize depth map for parallax effects
   */
  initializeDepthMap() {
    if (window.depthMapCanvas) {
      this.depthMapCtx = window.depthMapCanvas.getContext('2d');
      this.depthMapData = this.depthMapCtx.getImageData(
        0, 0, 
        window.depthMapCanvas.width, 
        window.depthMapCanvas.height
      );
    }
    
    // Load focus reveal mask
    if (window.focusRevealMask) {
      this.focusMask = window.focusRevealMask;
      console.log('✓ Focus reveal mask loaded');
    }
    
    // Load film grain texture
    if (window.filmGrainTextureHD) {
      this.filmGrain = window.filmGrainTextureHD;
      console.log('✓ Film grain texture loaded');
    }
    
    // Load glow mask
    if (window.glowMask) {
      this.glowMask = window.glowMask;
      this.glowEnabled = false;
      console.log('✓ Glow mask loaded');
    }
  }
  
  onMouseMove(e) {
    this.targetX = e.clientX;
    this.targetY = e.clientY;
    
    if (!this.isAnimating) {
      this.isAnimating = true;
      gsap.to(this, {
        globalBlur: 8,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }
  
  onMouseEnter() {
    gsap.to(this, {
      focusRadius: this.targetRadius,
      duration: 0.4,
      ease: 'power2.out'
    });
    
    // Enable glow on hover
    if (this.glowMask) {
      gsap.to(this, {
        glowOpacity: 0.35,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }
  
  onMouseLeave() {
    gsap.to(this, {
      targetX: this.width / 2,
      targetY: this.height / 2,
      globalBlur: 25,
      focusRadius: this.minRadius,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        this.isAnimating = false;
      }
    });
  }
  
  onWindowResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
  
  init() {
    // Initial render
    this.render();
  }
  
  /**
   * Apply Gaussian blur using canvas filter
   */
  applyBlur(amount) {
    if (amount > 0) {
      this.ctx.filter = `blur(${amount}px)`;
    } else {
      this.ctx.filter = 'none';
    }
  }
  
  /**
   * Draw the blurred background with focus reveal
   */
  drawBlurredBackground() {
    // Draw full blurred background
    this.applyBlur(this.globalBlur);
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
    this.ctx.filter = 'none';
  }
  
  /**
   * Create advanced radial gradient mask with enhanced falloff
   */
  createFocusMask() {
    const gradient = this.ctx.createRadialGradient(
      this.mouseX, this.mouseY, 0,
      this.mouseX, this.mouseY, this.focusRadius
    );
    
    // Ultra-smooth falloff for cinematic effect
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');        // Sharp center
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.75)');   // Primary transition
    gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.3)');    // Secondary transition
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');        // Blurred edges
    
    return gradient;
  }
  
  /**
   * Smooth mouse position with easing
   */
  easeMousePosition() {
    gsap.to(this, {
      mouseX: this.targetX,
      mouseY: this.targetY,
      duration: 0.2,
      ease: 'power2.out'
    });
  }
  
  /**
   * Main render function with focus mask integration
   */
  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw fully blurred background as base
    this.drawBlurredBackground();
    
    // If focus mask available, use it for better clarity reveal
    if (this.focusMask) {
      this.renderWithMask();
    } else {
      this.renderWithoutMask();
    }
    
    // Draw focus indicator
    this.drawFocusIndicator();
    
    
    // Apply glow overlay if enabled
    this.applyGlowOverlay();
  }

  /**
   * Apply glow overlay effect
   */
  applyGlowOverlay() {
    if (this.glowMask && this.glowOpacity > 0) {
      const savedComposite = this.ctx.globalCompositeOperation;
      const savedAlpha = this.ctx.globalAlpha;
      
      // Use additive blending for glow effect
      this.ctx.globalCompositeOperation = 'screen';
      this.ctx.globalAlpha = this.glowOpacity;
      
      // Draw glow mask with tiling
      const glowScale = 1;
      this.ctx.drawImage(
        this.glowMask,
        0, 0,
        this.glowMask.width,
        this.glowMask.height,
        0, 0,
        this.width,
        this.height
      );
      
      // Restore state
      this.ctx.globalCompositeOperation = savedComposite;
      this.ctx.globalAlpha = savedAlpha;
      // Apply cinematic post-processing effects
    this.applyPostProcessing();
  }

  /**
   * Apply cinematic post-processing effects
   */
  applyPostProcessing() {
    // Apply film grain texture
    if (this.filmGrain) {
      this.applyFilmGrain();
    }
    
    // Optional: Apply subtle vignette
    this.applyVignette();
  }

  /**
   * Apply film grain texture overlay
   */
  applyFilmGrain() {
    // Store current state
    const savedComposite = this.ctx.globalCompositeOperation;
    const savedAlpha = this.ctx.globalAlpha;
    
    // Apply grain with soft blending
    this.ctx.globalCompositeOperation = 'multiply';
    this.ctx.globalAlpha = 0.15; // Subtle 15% intensity
    
    // Tile grain pattern for seamless coverage
    const grainScale = 0.5; // Scale down for better appearance
    const scaledWidth = this.filmGrain.width * grainScale;
    const scaledHeight = this.filmGrain.height * grainScale;
    
    for (let y = 0; y < this.height; y += scaledHeight) {
      for (let x = 0; x < this.width; x += scaledWidth) {
        this.ctx.drawImage(
          this.filmGrain,
          0, 0,
          this.filmGrain.width,
          this.filmGrain.height,
          x, y,
          scaledWidth,
          scaledHeight
        );
      }
    }
    
    // Restore state
    this.ctx.globalCompositeOperation = savedComposite;
    this.ctx.globalAlpha = savedAlpha;
  }

  /**
   * Apply subtle vignette for cinematic feel
   */
  applyVignette() {
    const gradient = this.ctx.createRadialGradient(
      this.width / 2, this.height / 2,
      Math.min(this.width, this.height) * 0.3,
      this.width / 2, this.height / 2,
      Math.max(this.width, this.height) * 1.2
    );
    
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.08)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
    
    this.ctx.globalCompositeOperation = 'multiply';
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.globalCompositeOperation = 'source-over';
  }

  /**
   * Render with focus mask for advanced clarity reveal
   */
  renderWithMask() {
    // Save state
    this.ctx.save();
    
    // Draw sharp image with mask-based falloff
    this.applyBlur(0);
    
    // Use mask for intelligent falloff
    this.ctx.globalAlpha = 1;
    this.ctx.globalCompositeOperation = 'source-over';
    
    // Draw sharp areas based on focus mask
    const gradient = this.createAdvancedFocusMask();
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(
      this.mouseX - this.focusRadius - 50,
      this.mouseY - this.focusRadius - 50,
      (this.focusRadius + 50) * 2,
      (this.focusRadius + 50) * 2
    );
    
    // Draw the sharp background image
    this.ctx.globalCompositeOperation = 'destination-in';
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
    
    // Restore state
    this.ctx.restore();
  }

  /**
   * Render without mask (fallback)
   */
  renderWithoutMask() {
    this.ctx.save();
    this.applyBlur(0);
    
    const gradient = this.createFocusMask();
    this.ctx.globalCompositeOperation = 'destination-in';
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(
      this.mouseX - this.focusRadius,
      this.mouseY - this.focusRadius,
      this.focusRadius * 2,
      this.focusRadius * 2
    );
    
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
    
    this.ctx.globalCompositeOperation = 'destination-in';
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(
      this.mouseX - this.focusRadius,
      this.mouseY - this.focusRadius,
      this.focusRadius * 2,
      this.focusRadius * 2
    );
    
    this.ctx.restore();
  }

  /**
   * Create advanced focus mask based on corridor structure
   */
  createAdvancedFocusMask() {
    const gradient = this.ctx.createRadialGradient(
      this.mouseX, this.mouseY, 0,
      this.mouseX, this.mouseY, this.focusRadius
    );
    
    // Enhanced falloff with more control points
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');        // Sharp center
    gradient.addColorStop(0.35, 'rgba(0, 0, 0, 0.85)');  // Primary falloff
    gradient.addColorStop(0.65, 'rgba(0, 0, 0, 0.5)');   // Secondary falloff
    gradient.addColorStop(0.85, 'rgba(0, 0, 0, 0.15)');  // Soft edge
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');        // Transparent
    
    return gradient;
  }
  
  /**
   * Draw subtle blue glow focus indicator
   */
  drawFocusIndicator() {
    // Blue glow ring for data center aesthetic
    const glowGradient = this.ctx.createRadialGradient(
      this.mouseX, this.mouseY, this.focusRadius - 15,
      this.mouseX, this.mouseY, this.focusRadius + 25
    );
    
    glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
    glowGradient.addColorStop(0.4, 'rgba(59, 130, 246, 0.25)');
    glowGradient.addColorStop(0.7, 'rgba(59, 130, 246, 0.15)');
    glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    
    this.ctx.save();
    this.ctx.fillStyle = glowGradient;
    this.ctx.fillRect(
      this.mouseX - this.focusRadius - 30,
      this.mouseY - this.focusRadius - 30,
      (this.focusRadius + 30) * 2,
      (this.focusRadius + 30) * 2
    );
    
    // Inner cyan accent ring
    const ringGradient = this.ctx.createRadialGradient(
      this.mouseX, this.mouseY, this.focusRadius - 5,
      this.mouseX, this.mouseY, this.focusRadius + 5
    );
    ringGradient.addColorStop(0, 'rgba(34, 211, 238, 0.2)');
    ringGradient.addColorStop(0.5, 'rgba(34, 211, 238, 0.4)');
    ringGradient.addColorStop(1, 'rgba(34, 211, 238, 0.1)');
    
    this.ctx.fillStyle = ringGradient;
    this.ctx.fillRect(
      this.mouseX - this.focusRadius - 10,
      this.mouseY - this.focusRadius - 10,
      (this.focusRadius + 10) * 2,
      (this.focusRadius + 10) * 2
    );
    
    this.ctx.restore();
  }
  
  /**
   * Animation loop
   */
  animate() {
    this.easeMousePosition();
    this.render();
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new FocusRevealEffect();
});
