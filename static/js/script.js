/**
 * Modern Resume Website - Main JavaScript
 * Handles interactive elements and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initNavigation();
    initScrollAnimations();
    initFaqToggle();
    initFormValidation();
});

/**
 * Navigation functionality
 * - Handles mobile menu toggle
 * - Adds active class to current page link
 * - Implements smooth scrolling for anchor links
 */
function initNavigation() {
    // Mobile menu toggle (to be implemented if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll animations
 * - Adds animation classes to elements when they come into view
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    const animateElement = (element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.9) {
            element.classList.add('animated');
        }
    };
    
    // Initial check for elements in view
    animatedElements.forEach(element => {
        animateElement(element);
    });
    
    // Check on scroll
    window.addEventListener('scroll', function() {
        animatedElements.forEach(element => {
            animateElement(element);
        });
    });
}

/**
 * FAQ toggle functionality
 * - Shows/hides FAQ answers when questions are clicked
 */
function initFaqToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question && answer && toggle) {
            question.addEventListener('click', () => {
                // Close all other answers
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherToggle = otherItem.querySelector('.faq-toggle');
                        
                        if (otherAnswer && otherToggle) {
                            otherAnswer.style.display = 'none';
                            otherToggle.innerHTML = '<i class="fas fa-plus"></i>';
                        }
                    }
                });
                
                // Toggle current answer
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    toggle.innerHTML = '<i class="fas fa-plus"></i>';
                } else {
                    answer.style.display = 'block';
                    toggle.innerHTML = '<i class="fas fa-minus"></i>';
                }
            });
        }
    });
}

/**
 * Form validation
 * - Validates contact form inputs
 * - Displays success message on submission
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
            
            if (input.type === 'email' && input.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value.trim())) {
                    isValid = false;
                    input.classList.add('error');
                }
            }
        });
        
        if (!isValid) {
            return;
        }
        
        // In a real application, you would send the form data to a server
        // For this template, we'll just show a success message
        
        const formData = new FormData(contactForm);
        let formValues = {};
        
        formData.forEach((value, key) => {
            formValues[key] = value;
        });
        
        console.log('Form submitted:', formValues);
        
        // Show success message
        contactForm.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Message Sent!</h3><p>Thank you for reaching out. I\'ll get back to you as soon as possible.</p></div>';
    });
    
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
            
            if (input.type === 'email' && input.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value.trim())) {
                    input.classList.add('error');
                }
            }
        });
    });
}

/**
 * Testimonial slider
 * - Creates a slideshow for testimonials
 */
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (!testimonialSlider || testimonials.length <= 1) return;
    
    let currentSlide = 0;
    
    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });
    
    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = index === 0 ? 'dot active' : 'dot';
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    testimonialSlider.appendChild(dotsContainer);
    
    // Create next/prev buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'slider-btn prev';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });
    
    const nextButton = document.createElement('button');
    nextButton.className = 'slider-btn next';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });
    
    testimonialSlider.appendChild(prevButton);
    testimonialSlider.appendChild(nextButton);
    
    // Function to go to a specific slide
    function goToSlide(slideIndex) {
        // Handle wrapping
        if (slideIndex < 0) {
            slideIndex = testimonials.length - 1;
        } else if (slideIndex >= testimonials.length) {
            slideIndex = 0;
        }
        
        // Hide current slide
        testimonials[currentSlide].style.display = 'none';
        
        // Show new slide
        testimonials[slideIndex].style.display = 'block';
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots[currentSlide].classList.remove('active');
        dots[slideIndex].classList.add('active');
        
        // Update current slide index
        currentSlide = slideIndex;
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
}