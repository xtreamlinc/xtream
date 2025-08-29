// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize all components
    initNavbar();
    initSpeedSimulator();
    initDataCalculator();
    initSpeedTest();
    initMobileMenu();
    initScrollEffects();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Speed Simulator
function initSpeedSimulator() {
    const slider = document.getElementById('speedSlider');
    const currentSpeedDisplay = document.getElementById('currentSpeed');
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    if (!slider) return;
    
    slider.addEventListener('input', function() {
        const speed = parseInt(this.value);
        currentSpeedDisplay.textContent = speed;
        
        // Update active benefits based on speed
        benefitItems.forEach(item => {
            const requiredSpeed = parseInt(item.dataset.speed);
            if (speed >= requiredSpeed) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Add pulse effect to current speed display
        currentSpeedDisplay.parentElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            currentSpeedDisplay.parentElement.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Initialize with default value
    slider.dispatchEvent(new Event('input'));
}

// Data Calculator
function initDataCalculator() {
    const streamingInput = document.getElementById('streaming');
    const gamingInput = document.getElementById('gaming');
    const devicesInput = document.getElementById('devices');
    const recommendedPlan = document.getElementById('recommendedPlan');
    
    if (!streamingInput || !gamingInput || !devicesInput) return;
    
    function calculateRecommendation() {
        const streaming = parseInt(streamingInput.value) || 0;
        const gaming = parseInt(gamingInput.value) || 0;
        const devices = parseInt(devicesInput.value) || 1;
        
        // Simple calculation logic
        let totalScore = (streaming * 2) + (gaming * 3) + devices;
        
        let recommendation = "Essential Plan";
        if (totalScore > 20) {
            recommendation = "Performance Plan";
        }
        if (totalScore > 35) {
            recommendation = "Ultimate Plan";
        }
        
        recommendedPlan.textContent = recommendation;
        
        // Highlight recommended plan card
        document.querySelectorAll('.plan-card').forEach(card => {
            card.classList.remove('recommended');
        });
        
        // Add glow effect to recommended plan
        setTimeout(() => {
            const planCards = document.querySelectorAll('.plan-card h3');
            planCards.forEach(card => {
                if (card.textContent.includes(recommendation.split(' ')[0])) {
                    card.closest('.plan-card').classList.add('recommended');
                }
            });
        }, 100);
    }
    
    // Add event listeners
    [streamingInput, gamingInput, devicesInput].forEach(input => {
        input.addEventListener('input', calculateRecommendation);
    });
    
    // Initial calculation
    calculateRecommendation();
}

// Speed Test Widget
function initSpeedTest() {
    const startButton = document.getElementById('startSpeedTest');
    const speedResult = document.getElementById('speedResult');
    const yourSpeed = document.getElementById('yourSpeed');
    const meterFill = document.querySelector('.meter-fill');
    
    if (!startButton) return;
    
    startButton.addEventListener('click', function() {
        this.disabled = true;
        this.textContent = 'Testing...';
        
        // Simulate speed test
        let currentSpeed = 0;
        const targetSpeed = Math.floor(Math.random() * 150) + 50; // Random speed between 50-200
        
        const interval = setInterval(() => {
            currentSpeed += Math.floor(Math.random() * 10) + 5;
            if (currentSpeed >= targetSpeed) {
                currentSpeed = targetSpeed;
                clearInterval(interval);
                this.disabled = false;
                this.textContent = 'Test Again';
            }
            
            speedResult.textContent = currentSpeed;
            yourSpeed.textContent = currentSpeed + ' Mbps';
            
            // Update meter fill
            const percentage = (currentSpeed / 200) * 100;
            meterFill.style.background = `conic-gradient(var(--crystal-aqua) ${percentage * 3.6}deg, #333 0deg)`;
            
            // Add pulse effect
            speedResult.parentElement.style.transform = 'scale(1.05)';
            setTimeout(() => {
                speedResult.parentElement.style.transform = 'scale(1)';
            }, 100);
            
        }, 100);
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileToggle) return;
    
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Scroll Effects
function initScrollEffects() {
    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const fiberAnimation = document.querySelector('.fiber-animation');
        if (fiberAnimation) {
            fiberAnimation.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                
                // Special animation for installation steps
                if (entry.target.classList.contains('step')) {
                    const steps = document.querySelectorAll('.step');
                    steps.forEach((step, index) => {
                        setTimeout(() => {
                            step.querySelector('.step-icon').style.animationDelay = `${index * 0.2}s`;
                            step.querySelector('.step-icon').classList.add('glow');
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.step, .device-item, .support-card').forEach(el => {
        observer.observe(el);
    });
}

// Testimonial card interactions
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = this.style.transform.includes('rotateY(180deg)') 
            ? 'rotateY(0deg)' 
            : 'rotateY(180deg)';
    });
});

// Coverage map marker interactions
document.querySelectorAll('.marker').forEach(marker => {
    marker.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px var(--crystal-aqua)';
    });
    
    marker.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Smart device hover effects
document.querySelectorAll('.device-item').forEach(device => {
    device.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.device-icon');
        icon.style.animation = 'pulse 1s ease-in-out infinite';
    });
    
    device.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.device-icon');
        icon.style.animation = 'none';
    });
});

// Entertainment carousel auto-scroll control
document.querySelector('.entertainment-carousel').addEventListener('mouseenter', function() {
    this.querySelector('.carousel-track').style.animationPlayState = 'paused';
});

document.querySelector('.entertainment-carousel').addEventListener('mouseleave', function() {
    this.querySelector('.carousel-track').style.animationPlayState = 'running';
});

// Newsletter form
document.querySelector('.newsletter-form button').addEventListener('click', function(e) {
    e.preventDefault();
    const input = document.querySelector('.newsletter-input');
    if (input.value.includes('@')) {
        input.style.borderColor = 'var(--crystal-aqua)';
        input.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.3)';
        this.textContent = 'Subscribed!';
        this.style.background = 'var(--crystal-aqua)';
        
        setTimeout(() => {
            this.textContent = 'Subscribe';
            this.style.background = '';
            input.value = '';
            input.style.borderColor = '';
            input.style.boxShadow = '';
        }, 3000);
    } else {
        input.style.borderColor = 'var(--bright-orange)';
        input.focus();
    }
});

// Add recommended plan highlighting
function addRecommendedStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .plan-card.recommended {
            animation: recommendedGlow 2s ease-in-out 3;
            border-color: var(--bright-orange) !important;
        }
        
        @keyframes recommendedGlow {
            0%, 100% { 
                box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
            }
            50% { 
                box-shadow: 0 0 40px rgba(255, 107, 53, 0.6);
            }
        }
    `;
    document.head.appendChild(style);
}

addRecommendedStyle();

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Optimize scroll event listeners
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects
}, 16));