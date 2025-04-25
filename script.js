// Event listeners for scrolling to accommodation section
document.getElementById('open-pricing-popup-hero').addEventListener('click', () => scrollToAccommodation());
document.getElementById('open-pricing-popup-program').addEventListener('click', () => scrollToAccommodation());
document.getElementById('open-pricing-popup-location').addEventListener('click', () => scrollToAccommodation());
document.getElementById('open-pricing-popup-testimonials').addEventListener('click', () => scrollToAccommodation());

// Event listener for opening popup (registration button)
document.getElementById('open-pricing-popup-accommodation').addEventListener('click', () => openPopup(pricingPopup));
document.getElementById('open-pricing-popup-pricing').addEventListener('click', () => openPopup(pricingPopup));

// Function to scroll to accommodation section
function scrollToAccommodation() {
    const accommodationSection = document.getElementById('accommodation');
    accommodationSection.scrollIntoView({ behavior: 'smooth' });
}

// Popup functionality
const pricingPopup = document.getElementById('pricing-popup');
const contactPopup = document.getElementById('contact-popup');
const closePopupButtons = document.querySelectorAll('.close-popup');

function openPopup(popup) {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePopup(popup) {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close popup when clicking close button
closePopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        closePopup(popup);
    });
});

// Close popup when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
        closePopup(e.target);
    }
});

// Gallery randomization
function shuffleGallery() {
    const gallery = document.querySelector('.gallery-grid');
    const images = Array.from(gallery.getElementsByTagName('img'));
    
    // Shuffle array
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        gallery.appendChild(images[j]);
    }
}

// Shuffle initially and every 38 seconds (full animation cycle)
shuffleGallery();
setInterval(shuffleGallery, 38000); 