// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Speed simulator
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const useCases = document.querySelectorAll('.use-case');

speedSlider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    speedValue.textContent = value;
    
    // Update active use case
    useCases.forEach(useCase => {
        useCase.classList.remove('active');
    });
    
    if (value <= 100) {
        document.querySelector('[data-speed="50"]').classList.add('active');
    } else if (value <= 500) {
        document.querySelector('[data-speed="200"]').classList.add('active');
    } else {
        document.querySelector('[data-speed="1000"]').classList.add('active');
    }
});

// Data usage calculator
const householdSize = document.getElementById('householdSize');
const streamingHours = document.getElementById('streamingHours');
const gamingHours = document.getElementById('gamingHours');
const recommendedPlan = document.getElementById('recommendedPlan');

function calculateRecommendedPlan() {
    const household = parseInt(householdSize.value);
    const streaming = parseInt(streamingHours.value);
    const gaming = parseInt(gamingHours.value);
    
    const totalScore = household * 10 + streaming * 5 + gaming * 8;
    
    if (totalScore <= 60) {
        recommendedPlan.textContent = 'Essential';
        highlightPlan('Essential');
    } else if (totalScore <= 120) {
        recommendedPlan.textContent = 'Essential Pro';
        highlightPlan('Essential Pro');
    } else if (totalScore <= 200) {
        recommendedPlan.textContent = 'Ultimate';
        highlightPlan('Ultimate');
    } else {
        recommendedPlan.textContent = 'Business';
        highlightPlan('Business');
    }
}

function highlightPlan(planName) {
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.classList.remove('featured');
        if (card.querySelector('h3').textContent === planName) {
            card.classList.add('featured');
        }
    });
}

householdSize.addEventListener('input', calculateRecommendedPlan);
streamingHours.addEventListener('input', calculateRecommendedPlan);
gamingHours.addEventListener('input', calculateRecommendedPlan);

// Entertainment carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-play carousel
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Newsletter signup
document.querySelector('.newsletter-signup button').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('.newsletter-signup input').value;
    if (email) {
        alert('Thank you for subscribing! We\'ll keep you updated with our latest offers.');
        document.querySelector('.newsletter-signup input').value = '';
    }
});

// Initialize calculator
calculateRecommendedPlan();