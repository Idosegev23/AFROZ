// Event listeners for scrolling to accommodation section - ensure all browsers support
document.addEventListener('DOMContentLoaded', function() {
    // Pricing buttons scrolling to accommodation
    const heroButton = document.getElementById('open-pricing-popup-hero');
    const programButton = document.getElementById('open-pricing-popup-program');
    const locationButton = document.getElementById('open-pricing-popup-location');
    const testimonialsButton = document.getElementById('open-pricing-popup-testimonials');
    const accommodationButton = document.getElementById('open-pricing-popup-accommodation');
    
    // Popup close buttons
    const closePricingButton = document.getElementById('close-pricing');
    const closeContactButton = document.getElementById('close-contact');
    
    // Contact popup button
    const contactButton = document.getElementById('open-contact-popup');
    
    // Popups
    const pricingPopup = document.getElementById('pricing-popup');
    const contactPopup = document.getElementById('contact-popup');
    
    // Add event listeners if elements exist
    if (heroButton) heroButton.addEventListener('click', function() { scrollToAccommodation(); });
    if (programButton) programButton.addEventListener('click', function() { scrollToAccommodation(); });
    if (locationButton) locationButton.addEventListener('click', function() { scrollToAccommodation(); });
    if (testimonialsButton) testimonialsButton.addEventListener('click', function() { scrollToAccommodation(); });
    
    if (accommodationButton) accommodationButton.addEventListener('click', function() { openPopup(pricingPopup); });
    
    if (closePricingButton) closePricingButton.addEventListener('click', function() { closePopup(pricingPopup); });
    if (closeContactButton) closeContactButton.addEventListener('click', function() { closePopup(contactPopup); });
    
    if (contactButton) contactButton.addEventListener('click', function() { openPopup(contactPopup); });
    
    // Close popup when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('popup')) {
            closePopup(e.target);
        }
    });
    
    // Shuffle gallery initially and set interval
    shuffleGallery();
    setInterval(shuffleGallery, 38000);
});

// Function to scroll to accommodation section
function scrollToAccommodation() {
    const accommodationSection = document.getElementById('accommodation');
    if (accommodationSection) {
        // For older browsers that don't support smooth scrolling
        if ('scrollBehavior' in document.documentElement.style) {
            accommodationSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Fallback for older browsers
            const offsetTop = accommodationSection.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
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

// Gallery randomization
function shuffleGallery() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return; // Exit if gallery doesn't exist
    
    const images = Array.from(gallery.getElementsByTagName('img'));
    if (images.length === 0) return; // Exit if no images
    
    // Remove all images
    images.forEach(function(img) {
        if (img.parentNode) {
            img.parentNode.removeChild(img);
        }
    });
    
    // Shuffle array - Fisher-Yates algorithm
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = images[i];
        images[i] = images[j];
        images[j] = temp;
    }
    
    // Add back in shuffled order
    images.forEach(function(img) {
        gallery.appendChild(img);
    });
} 