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
    const programItems = document.querySelectorAll('.accordion-item');
    programItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                item.classList.toggle('active');
                console.log('Accordion clicked:', item);
            });
        }
    });

    // Fix for iOS initial scroll position
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Event listeners for scrolling to accommodation section
document.addEventListener('DOMContentLoaded', () => {
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