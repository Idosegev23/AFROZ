// Event listeners for opening popups
document.getElementById('open-pricing-popup-hero').addEventListener('click', () => openPopup(pricingPopup));
document.getElementById('open-pricing-popup-program').addEventListener('click', () => openPopup(pricingPopup));
document.getElementById('open-pricing-popup-location').addEventListener('click', () => openPopup(pricingPopup));
document.getElementById('open-pricing-popup-accommodation').addEventListener('click', () => openPopup(pricingPopup));
document.getElementById('open-pricing-popup-testimonials').addEventListener('click', () => openPopup(pricingPopup));
document.getElementById('open-pricing-popup-pricing').addEventListener('click', () => openPopup(pricingPopup));

// Popup functionality
const pricingPopup = document.getElementById('pricing-popup');
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