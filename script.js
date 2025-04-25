document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initFaqAccordion();
    initProgramAccordion();
    initPopups();
    initCarousel();
    fixIosScroll();
});

function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
}

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('#faq .faq-item'); // Specific selector
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });
}

function initProgramAccordion() {
    const programSection = document.getElementById('program');
    if (programSection) {
        const programItems = programSection.querySelectorAll('.accordion-item');
        programItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (header) {
                header.addEventListener('click', () => {
                    programItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    item.classList.toggle('active');
                    console.log('Program Accordion clicked:', item);
                });
            }
        });
    }
}

function initPopups() {
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
}

function fixIosScroll() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
}

function initCarousel() {
    const container = document.querySelector('.carousel-container');
    if (!container) {
        console.log('Carousel container not found'); 
        return; 
    }
    
    const images = container.querySelectorAll('.carousel-image');
    const prevBtn = container.querySelector('.carousel-button.prev'); // More specific
    const nextBtn = container.querySelector('.carousel-button.next'); // More specific
    const dots = container.querySelectorAll('.dot');
    
    if (images.length === 0) {
        console.log('No images found in carousel');
        return;
    }
    if (!prevBtn || !nextBtn) {
        console.log('Carousel buttons not found');
        // Continue without buttons if needed, or return
    }
    if (dots.length !== images.length) {
        console.log('Mismatch between dots and images');
        // Consider disabling dots or handling the mismatch
    }

    let currentIndex = 0;
    let interval;

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentIndex = (index + images.length) % images.length;
        
        images[currentIndex].classList.add('active');
        if (dots[currentIndex]) { // Check if dot exists
            dots[currentIndex].classList.add('active');
        }
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showImage(currentIndex - 1);
            resetAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showImage(currentIndex + 1);
            resetAutoPlay();
        });
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            if (!isNaN(index)) {
                showImage(index);
                resetAutoPlay();
            }
        });
    });
    
    function startAutoPlay() {
        clearInterval(interval); // Clear existing interval before starting new one
        interval = setInterval(() => {
            showImage(currentIndex + 1);
        }, 5000);
    }
    
    function resetAutoPlay() {
        clearInterval(interval);
        startAutoPlay();
    }
    
    showImage(0);
    startAutoPlay();
    
    container.addEventListener('mouseenter', () => clearInterval(interval));
    container.addEventListener('mouseleave', startAutoPlay); // Use function ref
}

// Function to scroll to accommodation section
function scrollToAccommodation() {
    const accommodationSection = document.getElementById('accommodation');
    if (accommodationSection) {
      accommodationSection.scrollIntoView({ behavior: 'smooth' });
    }
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