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

// Event listener for opening popups
const accommodationButton = document.getElementById('open-pricing-popup-accommodation');
if (accommodationButton) {
    accommodationButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // אם הכפתור הוא קישור חיצוני, נעבור לאותו קישור
        if (accommodationButton.getAttribute('href')) {
            window.open(accommodationButton.getAttribute('href'), '_blank');
        } else {
            // אחרת נפתח את הפופאפ
            openPopup(pricingPopup);
        }
    });
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

// Gallery randomization
function shuffleGallery() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return; // Exit if gallery doesn't exist
    
    const images = Array.from(gallery.getElementsByTagName('img'));
    
    // Remove all images
    images.forEach(img => img.remove());
    
    // Shuffle array
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }
    
    // Add back in shuffled order
    images.forEach(img => gallery.appendChild(img));
}

// Shuffle gallery once on page load - no more interval shuffle
document.addEventListener('DOMContentLoaded', () => {
    shuffleGallery();
    
    // Fix for iOS initial scroll position
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
}); 