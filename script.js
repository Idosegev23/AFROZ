// Event listeners for scrolling to accommodation section
document.getElementById('open-pricing-popup-hero').addEventListener('click', () => scrollToAccommodation());
document.getElementById('open-pricing-popup-program').addEventListener('click', () => scrollToAccommodation());
document.getElementById('open-pricing-popup-location').addEventListener('click', () => scrollToAccommodation());
document.getElementById('open-pricing-popup-testimonials').addEventListener('click', () => scrollToAccommodation());

// Event listener for opening popup (registration button)
document.getElementById('open-pricing-popup-accommodation').addEventListener('click', () => openPopup(pricingPopup));

// Close popup buttons
document.getElementById('close-pricing').addEventListener('click', () => closePopup(pricingPopup));
document.getElementById('close-contact').addEventListener('click', () => closePopup(contactPopup));

// Event listener for contact popup
document.getElementById('open-contact-popup').addEventListener('click', () => openPopup(contactPopup));

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

// Close popup when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
        closePopup(e.target);
    }
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

// Shuffle initially and every 38 seconds (full animation cycle)
document.addEventListener('DOMContentLoaded', () => {
    shuffleGallery();
    setInterval(shuffleGallery, 38000);
}); 