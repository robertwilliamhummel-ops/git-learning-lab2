/* ===== COLD FORCE MECHANICAL INC. - MAIN JAVASCRIPT ===== */

// ===== NAVIGATION FUNCTIONALITY =====
class Navigation {
    constructor() {
        this.header = document.getElementById('header');
        this.navMenuLeft = document.getElementById('nav-menu-left');
        this.navMenuRight = document.getElementById('nav-menu-right');
        this.navToggle = document.getElementById('nav-toggle');
        this.navLinks = document.querySelectorAll('.nav__link');
        this.scrollUp = document.getElementById('scroll-up');
        this.mobileMenu = null; // Will be created dynamically
        
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupActiveLinks();
        this.setupSmoothScrolling();
    }
    
    setupMobileMenu() {
        if (this.navToggle) {
            // Create mobile menu if it doesn't exist
            this.createMobileMenu();
            
            this.navToggle.addEventListener('click', () => {
                this.mobileMenu.classList.toggle('show-menu');
                
                // Change hamburger icon
                const icon = this.navToggle.querySelector('i');
                if (this.mobileMenu.classList.contains('show-menu')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            });
        }
        
        // Close menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.mobileMenu) {
                    this.mobileMenu.classList.remove('show-menu');
                    const icon = this.navToggle?.querySelector('i');
                    if (icon) {
                        icon.classList.replace('fa-times', 'fa-bars');
                    }
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.mobileMenu &&
                this.mobileMenu.classList.contains('show-menu') &&
                !this.navToggle.contains(e.target) &&
                !this.mobileMenu.contains(e.target)) {
                this.mobileMenu.classList.remove('show-menu');
                const icon = this.navToggle?.querySelector('i');
                if (icon) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    }
    
    createMobileMenu() {
        // Create mobile menu container
        this.mobileMenu = document.createElement('div');
        this.mobileMenu.className = 'nav__menu nav__menu--mobile';
        this.mobileMenu.id = 'nav-menu-mobile';
        
        // Create menu list
        const menuList = document.createElement('ul');
        menuList.className = 'nav__list';
        
        // Collect all nav links from left and right menus
        const leftLinks = this.navMenuLeft?.querySelectorAll('.nav__link') || [];
        const rightLinks = this.navMenuRight?.querySelectorAll('.nav__link') || [];
        const allLinks = [...leftLinks, ...rightLinks];
        
        // Clone links to mobile menu
        allLinks.forEach(link => {
            const listItem = document.createElement('li');
            listItem.className = 'nav__item';
            const clonedLink = link.cloneNode(true);
            listItem.appendChild(clonedLink);
            menuList.appendChild(listItem);
        });
        
        this.mobileMenu.appendChild(menuList);
        document.body.appendChild(this.mobileMenu);
        
        // Update navLinks to include mobile menu links
        this.navLinks = document.querySelectorAll('.nav__link');
    }
    
    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            // Header background on scroll
            if (scrollY >= 50) {
                this.header?.classList.add('scroll-header');
            } else {
                this.header?.classList.remove('scroll-header');
            }
            
            // Show/hide scroll up button
            if (scrollY >= 400) {
                this.scrollUp?.classList.add('show-scroll');
            } else {
                this.scrollUp?.classList.remove('show-scroll');
            }
        });
    }
    
    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 150;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink?.classList.add('active-link');
                } else {
                    navLink?.classList.remove('active-link');
                }
            });
        });
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
}

// ===== FORM HANDLING =====
class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }
    
    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(formData);
            
            // Show success message
            this.showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            // Show error message
            this.showMessage('Sorry, there was an error sending your message. Please try again or call us directly.', 'error');
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    async simulateFormSubmission(formData) {
        // Simulate API call delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 1500);
        });
    }
    
    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message--${type}`;
        messageEl.textContent = message;
        
        // Add styles
        Object.assign(messageEl.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            background: type === 'success' ? '#10b981' : '#ef4444',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out'
        });
        
        document.body.appendChild(messageEl);
        
        // Animate in
        setTimeout(() => {
            messageEl.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }
}

// ===== ANIMATIONS =====
class AnimationController {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupCounterAnimations();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, this.observerOptions);
        
        // Observe elements that should animate
        const animateElements = document.querySelectorAll('.card, .service__card, .testimonial__card, .feature');
        animateElements.forEach(el => observer.observe(el));
    }
    
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat__number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const originalText = element.textContent;
        
        // Skip animation for "24/7" as it represents service availability, not a countable number
        if (originalText.includes('24/7')) {
            return; // Keep original "24/7" text without animation
        }
        
        const target = parseInt(originalText.replace(/\D/g, ''));
        const suffix = originalText.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 40);
    }
}


// ===== EMERGENCY CALL TRACKING =====
class EmergencyCallTracker {
    constructor() {
        this.emergencyButtons = document.querySelectorAll('a[href^="tel:"]');
        this.init();
    }
    
    init() {
        this.emergencyButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Track emergency call clicks for analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'emergency_call', {
                        event_category: 'engagement',
                        event_label: 'Emergency Phone Call'
                    });
                }
                
                // Show confirmation for desktop users
                if (window.innerWidth > 768) {
                    const phoneNumber = button.href.replace('tel:', '');
                    alert(`Calling ${phoneNumber}\n\nIf you're on a desktop, please dial this number on your phone.`);
                }
            });
        });
    }
}

// ===== QUOTE CALCULATOR =====
class QuoteCalculator {
    constructor() {
        this.calculator = document.getElementById('quote-calculator');
        this.init();
    }
    
    init() {
        if (!this.calculator) return;
        
        const serviceSelect = this.calculator.querySelector('#service-type');
        const propertySize = this.calculator.querySelector('#property-size');
        const urgency = this.calculator.querySelector('#urgency');
        const estimateDisplay = this.calculator.querySelector('#estimate-display');
        
        [serviceSelect, propertySize, urgency].forEach(input => {
            if (input) {
                input.addEventListener('change', () => {
                    this.calculateEstimate(serviceSelect, propertySize, urgency, estimateDisplay);
                });
            }
        });
    }
    
    calculateEstimate(serviceSelect, propertySize, urgency, estimateDisplay) {
        const service = serviceSelect?.value;
        const size = propertySize?.value;
        const urgent = urgency?.value;
        
        if (!service || !size) return;
        
        let basePrice = this.getBasePrice(service);
        let sizeMultiplier = this.getSizeMultiplier(size);
        let urgencyMultiplier = urgent === 'emergency' ? 1.5 : 1;
        
        let estimate = basePrice * sizeMultiplier * urgencyMultiplier;
        
        if (estimateDisplay) {
            estimateDisplay.innerHTML = `
                <div class="estimate-result">
                    <h4>Estimated Cost Range</h4>
                    <p class="estimate-price">$${Math.floor(estimate * 0.8)} - $${Math.floor(estimate * 1.2)}</p>
                    <p class="estimate-note">*This is a rough estimate. Final pricing depends on specific requirements and site conditions.</p>
                </div>
            `;
        }
    }
    
    getBasePrice(service) {
        const prices = {
            'furnace': 3000,
            'ac': 2500,
            'water-heater': 1500,
            'commercial-hvac': 8000,
            'refrigeration': 5000,
            'maintenance': 200
        };
        return prices[service] || 1000;
    }
    
    getSizeMultiplier(size) {
        const multipliers = {
            'small': 0.8,
            'medium': 1,
            'large': 1.4,
            'commercial': 2.5
        };
        return multipliers[size] || 1;
    }
}

// ===== REDESIGNED LOGO INTERACTION SYSTEM =====
class LogoInteraction {
    constructor() {
        this.logos = document.querySelectorAll('.hero__logo-spin');
        this.logoStates = new Map();
        this.animationFrameId = null;
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.lastTouchTime = 0;
        
        // REDESIGNED: Stable, predictable parameters
        this.baseRotationSpeed = 1.0; // degrees per frame (60 degrees/second at 60fps)
        this.hoverSpeedMultiplier = 1.5; // hover increases speed by 50%
        this.maxRotationSpeed = 4.0; // strict maximum to prevent speed spikes
        this.mouseSensitivity = 0.03; // fine-tuned for responsive but stable control
        this.touchSensitivity = 0.05;
        this.smoothingFactor = 0.12; // balanced smoothing for stability and responsiveness
        this.deadZone = 2; // minimum pixel movement to register
        this.velocityDecay = 0.88; // aggressive decay to prevent buildup
        
        // Debug mode for troubleshooting
        this.debugMode = false; // Direct speed assignment implemented
        
        this.init();
    }
    
    init() {
        console.log('LogoInteraction: Starting initialization...');
        console.log('LogoInteraction: Found logos:', this.logos.length);
        
        if (!this.logos.length) {
            console.error('LogoInteraction: NO LOGO ELEMENTS FOUND! Selector: .hero__logo-spin');
            // Try alternative selectors
            const altLogos = document.querySelectorAll('img[alt*="Logo"], .logo, [class*="logo"]');
            console.log('LogoInteraction: Alternative logo elements found:', altLogos.length, altLogos);
            return;
        }
        
        this.logos.forEach((logo, index) => {
            try {
                console.log(`LogoInteraction: Initializing logo ${index}:`, logo);
                
                // SIMPLIFIED: Basic state initialization
                this.logoStates.set(logo, {
                    currentRotation: 0,
                    rotationSpeed: this.baseRotationSpeed,
                    targetRotationSpeed: this.baseRotationSpeed,
                    isControlled: false,
                    isHovering: false,
                    velocity: 0,
                    lastMouseX: 0,
                    lastMouseY: 0,
                    lastTime: performance.now(),
                    elementIndex: index
                });
                
                // CRITICAL: Completely disable CSS animation
                logo.style.animation = 'none !important';
                logo.style.webkitAnimation = 'none !important';
                logo.style.transform = 'rotate(0deg) scale(1)';
                
                // CRITICAL: Ensure mouse events can reach the element
                logo.style.pointerEvents = 'auto';
                logo.style.userSelect = 'none';
                logo.style.webkitUserSelect = 'none';
                
                // Add SIMPLE event listeners for immediate testing
                logo.addEventListener('mouseenter', (e) => {
                    console.log('MOUSE ENTER detected on logo', index);
                    this.handleMouseEnter(e, logo);
                });
                
                logo.addEventListener('mousemove', (e) => {
                    console.log('MOUSE MOVE detected on logo', index, 'X:', e.clientX);
                    this.handleMouseMove(e, logo);
                });
                
                logo.addEventListener('mouseleave', (e) => {
                    console.log('MOUSE LEAVE detected on logo', index);
                    this.handleMouseLeave(e, logo);
                });
                
                console.log(`LogoInteraction: Successfully initialized logo ${index}`);
                
                // DIAGNOSTIC: Test if element is actually clickable
                logo.addEventListener('click', () => {
                    console.log('🎯 CLICK TEST: Logo is clickable - mouse events should work!');
                });
                
                // DIAGNOSTIC: Check element positioning and visibility
                const rect = logo.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(logo);
                console.log('🔍 DIAGNOSTIC - Logo element analysis:');
                console.log('  Position:', { x: rect.x, y: rect.y, width: rect.width, height: rect.height });
                console.log('  Visibility:', computedStyle.visibility);
                console.log('  Display:', computedStyle.display);
                console.log('  Pointer Events:', computedStyle.pointerEvents);
                console.log('  Z-Index:', computedStyle.zIndex);
                console.log('  Position Type:', computedStyle.position);
                
                // DIAGNOSTIC: Check for overlapping elements at logo center
                const centerX = rect.x + rect.width / 2;
                const centerY = rect.y + rect.height / 2;
                const elementAtCenter = document.elementFromPoint(centerX, centerY);
                console.log('🎯 CRITICAL: Element at logo center:', elementAtCenter);
                console.log('  Is it the logo itself?', elementAtCenter === logo);
                if (elementAtCenter !== logo) {
                    console.log('  ❌ PROBLEM FOUND: Another element is covering the logo!');
                    console.log('  Covering element classes:', elementAtCenter?.className);
                    console.log('  Covering element tag:', elementAtCenter?.tagName);
                } else {
                    console.log('  ✅ Logo is accessible at its center point');
                }
                
            } catch (error) {
                console.error(`LogoInteraction: Failed to initialize logo ${index}:`, error);
            }
        });
        
        // Start the animation loop
        this.startAnimationLoop();
        
        console.log('LogoInteraction: System fully initialized');
    }
    
    addEventListeners(logo) {
        try {
            // Mouse events with proper error handling
            logo.addEventListener('mouseenter', (e) => this.handleMouseEnter(e, logo), { passive: true });
            logo.addEventListener('mousemove', (e) => this.handleMouseMove(e, logo), { passive: true });
            logo.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, logo), { passive: true });
            
            // Touch events with passive false for preventDefault
            logo.addEventListener('touchstart', (e) => this.handleTouchStart(e, logo), { passive: false });
            logo.addEventListener('touchmove', (e) => this.handleTouchMove(e, logo), { passive: false });
            logo.addEventListener('touchend', (e) => this.handleTouchEnd(e, logo), { passive: false });
            
            // Additional safety events
            logo.addEventListener('dragstart', (e) => e.preventDefault());
            logo.addEventListener('selectstart', (e) => e.preventDefault());
            
        } catch (error) {
            console.error('LogoInteraction: Failed to add event listeners:', error);
        }
    }
    
    // SIMPLIFIED: Basic mouse enter for immediate functionality
    handleMouseEnter(e, logo) {
        console.log('handleMouseEnter called');
        
        const state = this.logoStates.get(logo);
        if (!state) {
            console.error('No state found for logo');
            return;
        }
        
        // Simple hover state
        state.isControlled = true;
        state.isHovering = true;
        state.lastMouseX = e.clientX;
        state.lastMouseY = e.clientY;
        
        // Increase speed on hover
        state.targetRotationSpeed = this.baseRotationSpeed * 2; // Double speed on hover
        
        console.log(`Mouse entered - new target speed: ${state.targetRotationSpeed}`);
        
        // Visual feedback
        logo.classList.add('logo-controlled');
        logo.classList.remove('logo-idle');
    }
    
    // SIMPLIFIED: Basic mouse movement for immediate functionality
    handleMouseMove(e, logo) {
        const state = this.logoStates.get(logo);
        if (!state || !state.isHovering) return;
        
        // Calculate horizontal movement
        const deltaX = e.clientX - state.lastMouseX;
        
        console.log(`Mouse move - deltaX: ${deltaX}`);
        
        // FIXED: Better movement detection for all speeds
        if (Math.abs(deltaX) > 0.5) { // Lower dead zone threshold
            // Clamp deltaX to prevent extreme values from fast movements
            const clampedDeltaX = Math.max(-50, Math.min(50, deltaX));
            
            if (clampedDeltaX > 0) {
                // Moving right = faster clockwise
                state.targetRotationSpeed = this.baseRotationSpeed * 3;
                console.log('Moving RIGHT - clockwise speed:', state.targetRotationSpeed, 'deltaX:', clampedDeltaX);
            } else {
                // Moving left = faster counter-clockwise
                state.targetRotationSpeed = -this.baseRotationSpeed * 3;
                console.log('Moving LEFT - counter-clockwise speed:', state.targetRotationSpeed, 'deltaX:', clampedDeltaX);
            }
        } else {
            // No significant movement - return to hover speed
            state.targetRotationSpeed = this.baseRotationSpeed * 2;
            console.log('No movement - hover speed:', state.targetRotationSpeed);
        }
        
        // Update tracking
        state.lastMouseX = e.clientX;
        state.lastMouseY = e.clientY;
    }
    
    // ENHANCED: Mouse leave with direction persistence
    handleMouseLeave(e, logo) {
        const state = this.logoStates.get(logo);
        if (!state) return;
        
        // Reset interaction state
        state.isControlled = false;
        state.isHovering = false;
        
        // MOMENTUM: Continue spinning in the last direction
        if (state.rotationSpeed > 0) {
            // Was spinning clockwise - continue clockwise at base speed
            state.targetRotationSpeed = this.baseRotationSpeed;
        } else if (state.rotationSpeed < 0) {
            // Was spinning counter-clockwise - continue counter-clockwise at base speed
            state.targetRotationSpeed = -this.baseRotationSpeed;
        } else {
            // Default to clockwise
            state.targetRotationSpeed = this.baseRotationSpeed;
        }
        
        // Visual feedback
        logo.classList.remove('logo-controlled');
        logo.classList.add('logo-idle');
    }
    
    // REDESIGNED: Robust touch control with stability features
    handleTouchStart(e, logo) {
        try {
            e.preventDefault();
            this.lastTouchTime = performance.now();
            
            const state = this.logoStates.get(logo);
            if (!state || !e.touches.length) return;
            
            const touch = e.touches[0];
            
            // Initialize touch state
            state.isControlled = true;
            state.rect = logo.getBoundingClientRect();
            state.lastTouchX = touch.clientX;
            state.lastTouchY = touch.clientY;
            state.lastTime = performance.now();
            
            // Reset velocity tracking
            state.velocity = 0;
            state.velocityHistory = [0, 0, 0];
            state.consecutiveSmallMovements = 0;
            
            // Touch base speed (faster than hover, slower than old version)
            state.targetRotationSpeed = this.baseRotationSpeed * 1.8;
            
            // Update visual state
            logo.classList.add('logo-controlled');
            logo.classList.remove('logo-idle');
            
            if (this.debugMode) {
                console.log(`Touch started on logo ${state.elementIndex}`);
            }
            
        } catch (error) {
            console.error('LogoInteraction: Error in handleTouchStart:', error);
        }
    }
    
    // REDESIGNED: Stable touch movement with horizontal priority
    handleTouchMove(e, logo) {
        try {
            e.preventDefault();
            const state = this.logoStates.get(logo);
            if (!state || !state.isControlled || !state.rect || !e.touches.length) return;
            
            const touch = e.touches[0];
            const currentTime = performance.now();
            const deltaTime = Math.max(currentTime - state.lastTime, 16);
            
            // Calculate movement
            const deltaX = touch.clientX - state.lastTouchX;
            const deltaY = touch.clientY - state.lastTouchY;
            const horizontalDistance = Math.abs(deltaX);
            const verticalDistance = Math.abs(deltaY);
            
            // REDESIGNED: Prioritize horizontal movement with dead zone
            if (horizontalDistance > this.deadZone && horizontalDistance > verticalDistance * 0.6) {
                // Significant horizontal movement
                const rawVelocity = (deltaX / deltaTime) * this.touchSensitivity;
                
                // Update velocity history for smoothing
                state.velocityHistory.push(rawVelocity);
                if (state.velocityHistory.length > 3) {
                    state.velocityHistory.shift();
                }
                
                // Calculate smoothed velocity
                const weights = [0.2, 0.3, 0.5];
                state.velocity = state.velocityHistory.reduce((sum, vel, index) => {
                    return sum + (vel * weights[index]);
                }, 0);
                
                state.consecutiveSmallMovements = 0;
            } else {
                // Small or vertical movement - decay velocity
                state.consecutiveSmallMovements++;
                state.velocity *= this.velocityDecay;
            }
            
            // REDESIGNED: Conservative speed calculation
            const touchBaseSpeed = this.baseRotationSpeed * 1.8;
            const velocityInfluence = Math.max(-2.5, Math.min(2.5, state.velocity * 4)); // Controlled influence
            
            state.targetRotationSpeed = touchBaseSpeed + velocityInfluence;
            
            // CRITICAL: Strict speed clamping
            state.targetRotationSpeed = Math.max(-this.maxRotationSpeed, Math.min(this.maxRotationSpeed, state.targetRotationSpeed));
            
            // Update tracking
            state.lastTouchX = touch.clientX;
            state.lastTouchY = touch.clientY;
            state.lastTime = currentTime;
            
            // Update visual feedback
            const speedRatio = Math.abs(state.targetRotationSpeed) / this.maxRotationSpeed;
            const direction = state.targetRotationSpeed > 0 ? 1 : -1;
            this.updateVisualFeedback(logo, speedRatio, direction);
            
            if (this.debugMode && horizontalDistance > this.deadZone) {
                console.log(`Touch move - Speed: ${state.targetRotationSpeed.toFixed(2)}, Velocity: ${state.velocity.toFixed(3)}`);
            }
            
        } catch (error) {
            console.error('LogoInteraction: Error in handleTouchMove:', error);
        }
    }
    
    // REDESIGNED: Clean touch end with proper state reset
    handleTouchEnd(e, logo) {
        try {
            e.preventDefault();
            const state = this.logoStates.get(logo);
            if (!state) return;
            
            // Reset interaction state
            state.isControlled = false;
            
            // Return to base rotation speed
            state.targetRotationSpeed = this.baseRotationSpeed;
            
            // Reset velocity tracking
            state.velocity = 0;
            state.velocityHistory = [0, 0, 0];
            state.consecutiveSmallMovements = 0;
            
            // Update visual state
            logo.classList.remove('logo-controlled');
            logo.classList.add('logo-idle');
            
            if (this.debugMode) {
                console.log(`Touch ended on logo ${state.elementIndex}`);
            }
            
        } catch (error) {
            console.error('LogoInteraction: Error in handleTouchEnd:', error);
        }
    }
    
    // REDESIGNED: Enhanced visual feedback with stability controls
    updateVisualFeedback(logo, speedFactor, direction) {
        try {
            // Remove all speed classes first
            logo.classList.remove('logo-fast-forward', 'logo-fast-reverse', 'logo-medium-speed');
            
            // Add appropriate class based on speed and direction with hysteresis
            if (speedFactor > 0.65) {
                if (direction > 0) {
                    logo.classList.add('logo-fast-forward');
                } else {
                    logo.classList.add('logo-fast-reverse');
                }
            } else if (speedFactor > 0.35) {
                logo.classList.add('logo-medium-speed');
            }
            
            // Update CSS custom properties for dynamic effects
            logo.style.setProperty('--logo-glow-intensity', Math.max(0.3, Math.min(1, speedFactor * 0.6 + 0.3)).toFixed(2));
            logo.style.setProperty('--logo-scale', (1 + speedFactor * 0.05).toFixed(3));
            logo.style.setProperty('--logo-border-opacity', Math.max(0.2, Math.min(0.8, speedFactor * 0.4 + 0.2)).toFixed(2));
            
        } catch (error) {
            console.error('LogoInteraction: Error in updateVisualFeedback:', error);
        }
    }
    
    // Utility easing functions for smooth animations
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    easeOutQuad(t) {
        return 1 - (1 - t) * (1 - t);
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    // REDESIGNED: Performance-optimized animation loop with direct transform control
    startAnimationLoop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        let lastFrameTime = performance.now();
        let frameCount = 0;
        let fpsCheckTime = lastFrameTime;
        
        const animate = (currentTime) => {
            try {
                // Calculate frame timing
                const deltaTime = currentTime - lastFrameTime;
                lastFrameTime = currentTime;
                
                // FPS monitoring for debugging
                frameCount++;
                if (this.debugMode && currentTime - fpsCheckTime > 1000) {
                    const fps = Math.round(frameCount * 1000 / (currentTime - fpsCheckTime));
                    if (fps < 55) {
                        console.warn(`LogoInteraction: Low FPS detected: ${fps}`);
                    }
                    frameCount = 0;
                    fpsCheckTime = currentTime;
                }
                
                // Update all logos
                this.updateAnimation(deltaTime);
                
                // Continue animation loop
                this.animationFrameId = requestAnimationFrame(animate);
                
            } catch (error) {
                console.error('LogoInteraction: Error in animation loop:', error);
                // Restart animation loop after error
                setTimeout(() => this.startAnimationLoop(), 100);
            }
        };
        
        // Start the animation loop
        this.animationFrameId = requestAnimationFrame(animate);
        
        if (this.debugMode) {
            console.log('LogoInteraction: Animation loop started');
        }
    }
    
    // REDESIGNED: Core animation update with direct transform control
    updateAnimation(deltaTime = 16) {
        this.logos.forEach((logo) => {
            try {
                const state = this.logoStates.get(logo);
                if (!state) return;
                
                // REVOLUTIONARY: Direct speed assignment - no interpolation delays!
                if (state.isControlled) {
                    // IMMEDIATE response when controlled - set speed directly
                    state.rotationSpeed = state.targetRotationSpeed;
                } else {
                    // Smooth return to base speed when not controlled
                    const speedDiff = state.targetRotationSpeed - state.rotationSpeed;
                    state.rotationSpeed += speedDiff * 0.1;
                }
                
                // SIMPLE: Single safety clamp
                state.rotationSpeed = Math.max(-this.maxRotationSpeed, Math.min(this.maxRotationSpeed, state.rotationSpeed));
                
                // CRITICAL: Direct transform rotation (no CSS animation conflict)
                state.currentRotation += state.rotationSpeed;
                
                // Normalize rotation to prevent precision issues
                if (state.currentRotation >= 360) {
                    state.currentRotation -= 360;
                } else if (state.currentRotation < 0) {
                    state.currentRotation += 360;
                }
                
                // CRITICAL: Apply rotation directly via transform (this is the key fix)
                logo.style.transform = `rotate(${state.currentRotation.toFixed(1)}deg)`;
                
                // Debug output every 60 frames (1 second at 60fps)
                if (Math.floor(state.currentRotation) % 60 === 0) {
                    console.log(`Logo ${state.elementIndex} - Rotation: ${state.currentRotation.toFixed(1)}°, Speed: ${state.rotationSpeed.toFixed(2)}°/frame, Target: ${state.targetRotationSpeed.toFixed(2)}°/frame, Controlled: ${state.isControlled}, Hovering: ${state.isHovering}`);
                }
                
                // Update visual feedback properties
                const speedRatio = Math.abs(state.rotationSpeed) / this.maxRotationSpeed;
                const glowIntensity = Math.max(0.3, Math.min(1, speedRatio * 0.5 + 0.3));
                logo.style.setProperty('--logo-glow-intensity', glowIntensity.toFixed(2));
                
                // REDESIGNED: Aggressive velocity decay to prevent buildup
                if (!state.isControlled && Math.abs(state.velocity) > 0.001) {
                    state.velocity *= 0.82; // More aggressive decay
                    
                    // Reset velocity if it becomes negligible
                    if (Math.abs(state.velocity) < 0.001) {
                        state.velocity = 0;
                        state.velocityHistory = [0, 0, 0];
                    }
                }
                
            } catch (error) {
                console.error(`LogoInteraction: Error updating logo ${logo}:`, error);
            }
        });
    }
    
    // REDESIGNED: Enhanced cleanup with comprehensive state reset
    destroy() {
        try {
            // Cancel animation frame
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
            
            // Clean up all logo states
            this.logoStates.forEach((state, logo) => {
                // Clear any timeouts
                if (state.idleTimeout) {
                    clearTimeout(state.idleTimeout);
                }
                
                // Reset logo to initial state
                logo.style.animation = '';
                logo.style.transform = 'rotate(0deg) scale(1)';
                logo.classList.remove('logo-controlled', 'logo-fast-forward', 'logo-fast-reverse', 'logo-medium-speed');
                logo.classList.add('logo-idle');
            });
            
            // Clear state map
            this.logoStates.clear();
            
            if (this.debugMode) {
                console.log('LogoInteraction: System destroyed and cleaned up');
            }
            
        } catch (error) {
            console.error('LogoInteraction: Error during cleanup:', error);
        }
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new FormHandler();
    new AnimationController();
    new EmergencyCallTracker();
    new QuoteCalculator();
    new LogoInteraction();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ===== UTILITY FUNCTIONS =====
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Format phone numbers
    formatPhoneNumber(phoneNumber) {
        const cleaned = phoneNumber.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phoneNumber;
    },
    
    // Validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};

// Export for use in other modules
window.ColdForceUtils = utils;