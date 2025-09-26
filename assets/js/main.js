/* ===== COLD FORCE MECHANICAL INC. - MAIN JAVASCRIPT ===== */

// ===== NAVIGATION FUNCTIONALITY =====
class Navigation {
    constructor() {
        this.header = document.getElementById('header');
        this.navMenu = document.getElementById('nav-menu');
        this.navToggle = document.getElementById('nav-toggle');
        this.navLinks = document.querySelectorAll('.nav__link');
        this.scrollUp = document.getElementById('scroll-up');
        
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
            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('show-menu');
                
                // Change hamburger icon
                const icon = this.navToggle.querySelector('i');
                if (this.navMenu.classList.contains('show-menu')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            });
        }
        
        // Close menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('show-menu');
                const icon = this.navToggle?.querySelector('i');
                if (icon) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            });
        });
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

// ===== MOBILE LOGO INTERACTION =====
class MobileLogoInteraction {
    constructor() {
        this.logo = document.querySelector('.hero__logo-spin');
        this.touchTimeout = null;
        this.init();
    }
    
    init() {
        if (!this.logo) return;
        
        // Touch events for mobile
        this.logo.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.logo.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Click events for desktop fallback
        this.logo.addEventListener('click', (e) => this.handleClick(e));
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        this.logo.classList.add('active-touch');
        
        // Clear any existing timeout
        if (this.touchTimeout) {
            clearTimeout(this.touchTimeout);
        }
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        
        // Remove active state after 2 seconds
        this.touchTimeout = setTimeout(() => {
            this.logo.classList.remove('active-touch');
        }, 2000);
    }
    
    handleClick(e) {
        // Only handle click on desktop (non-touch devices)
        if (!('ontouchstart' in window)) {
            this.logo.classList.add('active-touch');
            
            // Clear any existing timeout
            if (this.touchTimeout) {
                clearTimeout(this.touchTimeout);
            }
            
            // Remove active state after 2 seconds
            this.touchTimeout = setTimeout(() => {
                this.logo.classList.remove('active-touch');
            }, 2000);
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
    new MobileLogoInteraction();
    
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