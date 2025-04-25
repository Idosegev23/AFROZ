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

// Event listeners for scrolling to accommodation section
document.getElementById('open-pricing-popup-hero').addEventListener('click', () => openPopup(pricingPopup));
document.getElementById('open-pricing-popup-program').addEventListener('click', () => openPopup(pricingPopup));
document.getElementById('open-pricing-popup-location').addEventListener('click', () => openPopup(pricingPopup));
document.getElementById('open-pricing-popup-testimonials').addEventListener('click', () => openPopup(pricingPopup));
document.getElementById('open-pricing-popup-accommodation').addEventListener('click', () => openPopup(pricingPopup));

// Function to scroll to accommodation section
function scrollToAccommodation() {
    const accommodationSection = document.getElementById('accommodation');
    accommodationSection.scrollIntoView({ behavior: 'smooth' });
}

// Popup functionality
const pricingPopup = document.getElementById('pricing-popup');
const contactPopup = document.getElementById('contact-popup');

function openPopup(popup) {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePopup(popup) {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close popup buttons
document.getElementById('close-pricing').addEventListener('click', () => closePopup(pricingPopup));
document.getElementById('close-contact').addEventListener('click', () => closePopup(contactPopup));

// Event listener for contact popup
document.getElementById('open-contact-popup').addEventListener('click', () => openPopup(contactPopup));

// Close popup when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
        closePopup(e.target);
    }
});

// Initialize FAQ accordions
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
    
    // Initialize program accordions
    const programItems = document.querySelectorAll('.accordion-item');
    programItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});

// Gallery functionality - בטל את הערבוב כדי לאפשר לאנימציות לעבוד כראוי
// הקוד המקורי של shuffleGallery() הוסר מכיוון שכעת אנחנו משתמשים באנימציות ספציפיות

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Fix for iOS initial scroll position
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
}); 