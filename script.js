// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Prevent scrolling when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Close menu when clicking on a nav link
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Initialize FAQ accordions
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });
    
    // Initialize program accordions
    const programSection = document.getElementById('program');
    if (programSection) {
        const programItems = programSection.querySelectorAll('.accordion-item');
        programItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (header) {
                header.addEventListener('click', () => {
                    // Close other open items in this specific accordion
                    programItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    // Toggle the clicked item
                    item.classList.toggle('active');
                    console.log('Program Accordion clicked:', item);
                });
            }
        });
    }

    // Initialize carousel
    initCarousel();
    
    // Fix for iOS initial scroll position
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
    
    // Pricing and contact popup functionality
    const heroButton = document.getElementById('open-pricing-popup-hero');
    const programButton = document.getElementById('open-pricing-popup-program');
    const locationButton = document.getElementById('open-pricing-popup-location');
    const testimonialsButton = document.getElementById('open-pricing-popup-testimonials');
    const accommodationButton = document.getElementById('open-pricing-popup-accommodation');
    const closePricingButton = document.getElementById('close-pricing');
    const closeContactButton = document.getElementById('close-contact');
    const contactButton = document.getElementById('open-contact-popup');
    const pricingPopup = document.getElementById('pricing-popup');
    const contactPopup = document.getElementById('contact-popup');

    // Popup opener buttons
    if (heroButton) heroButton.addEventListener('click', () => openPopup(pricingPopup));
    if (programButton) programButton.addEventListener('click', () => openPopup(pricingPopup));
    if (locationButton) locationButton.addEventListener('click', () => openPopup(pricingPopup));
    if (testimonialsButton) testimonialsButton.addEventListener('click', () => openPopup(pricingPopup));
    if (accommodationButton) accommodationButton.addEventListener('click', () => openPopup(pricingPopup));
    if (contactButton) contactButton.addEventListener('click', () => openPopup(contactPopup));

    // Close popup buttons
    if (closePricingButton) closePricingButton.addEventListener('click', () => closePopup(pricingPopup));
    if (closeContactButton) closeContactButton.addEventListener('click', () => closePopup(contactPopup));

    // Close popup when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup')) {
            closePopup(e.target);
        }
    });
});

// Function to initialize carousel
function initCarousel() {
    const container = document.querySelector('.carousel-container');
    if (!container) return; // Exit if carousel container doesn't exist
    
    const images = container.querySelectorAll('.carousel-image');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    const dots = container.querySelectorAll('.dot');
    
    let currentIndex = 0;
    let interval;
    
    // Function to show specific image
    function showImage(index) {
        // Remove active class from all images and dots
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Make sure index is within bounds
        currentIndex = (index + images.length) % images.length;
        
        // Add active class to current image and dot
        images[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    // Event listener for previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showImage(currentIndex - 1);
            resetAutoPlay();
        });
    }
    
    // Event listener for next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showImage(currentIndex + 1);
            resetAutoPlay();
        });
    }
    
    // Event listeners for dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showImage(index);
            resetAutoPlay();
        });
    });
    
    // Start auto-play
    function startAutoPlay() {
        interval = setInterval(() => {
            showImage(currentIndex + 1);
        }, 5000); // Change image every 5 seconds
    }
    
    // Reset auto-play - call after user interaction
    function resetAutoPlay() {
        clearInterval(interval);
        startAutoPlay();
    }
    
    // Show first image and start auto-play
    showImage(0);
    startAutoPlay();
    
    // Pause auto-play when user hovers over carousel
    container.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    // Resume auto-play when user leaves carousel
    container.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
}

// Function to scroll to accommodation section
function scrollToAccommodation() {
    const accommodationSection = document.getElementById('accommodation');
    accommodationSection.scrollIntoView({ behavior: 'smooth' });
}

// Popup functionality
function openPopup(popup) {
    if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closePopup(popup) {
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
} 