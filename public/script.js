document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    initMobileMenu();
    initFaqAccordion();
    initProgramAccordion();
    initPopups();
    // initCarousel(); // Removed as the new gallery is CSS only
    fixIosScroll();
    createRandomDunes(); // Add random dunes to the page
});

function initMobileMenu() {
    console.log('Initializing Mobile Menu');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            console.log('Mobile menu toggle clicked');
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            console.log('Mobile menu classes toggled');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Nav link clicked, closing menu');
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    } else {
        console.error('Mobile menu elements not found');
    }
}

function initFaqAccordion() {
    console.log('Initializing FAQ Accordion');
    const faqItems = document.querySelectorAll('#faq .faq-item'); // Specific selector
    console.log(`Found ${faqItems.length} FAQ items`);
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                console.log(`FAQ Question ${index + 1} clicked`);
                const isActiveBefore = item.classList.contains('active');
                item.classList.toggle('active');
                const isActiveAfter = item.classList.contains('active');
                console.log(`FAQ Item ${index + 1} active state changed from ${isActiveBefore} to ${isActiveAfter}`);
            });
        } else {
             console.error(`FAQ Question not found for item ${index + 1}`);
        }
    });
}

function initProgramAccordion() {
    console.log('Initializing Program Accordion');
    const programSection = document.getElementById('program');
    if (programSection) {
        const programItems = programSection.querySelectorAll('.accordion-item');
        console.log(`Found ${programItems.length} Program items`);
        programItems.forEach((item, index) => {
            const header = item.querySelector('.accordion-header');
            if (header) {
                header.addEventListener('click', () => {
                    console.log(`Program Accordion Header ${index + 1} clicked`);
                    const isActiveBefore = item.classList.contains('active');

                    // Close others first
                    let otherWasClosed = false;
                    programItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            otherWasClosed = true;
                            console.log(`Closed another active program item.`);
                        }
                    });

                    // Toggle the clicked item
                    // If another item was closed, this click should only open the current one
                    if (!isActiveBefore || otherWasClosed) {
                      item.classList.add('active');
                    } else {
                      item.classList.remove('active');
                    }
                    const isActiveAfter = item.classList.contains('active');
                    console.log(`Program Item ${index + 1} active state changed from ${isActiveBefore} to ${isActiveAfter}`);
                });
            } else {
                console.error(`Program Accordion header not found for item ${index + 1}`);
            }
        });
    } else {
        console.error('Program section not found');
    }
}

function initPopups() {
    console.log('Initializing Popups');
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
    // Basic check if popups exist
    if (!pricingPopup) console.error("Pricing popup not found");
    if (!contactPopup) console.error("Contact popup not found");
}

function fixIosScroll() {
    console.log('Applying iOS scroll fix');
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
}

/* Removed initCarousel function as the new gallery is CSS only
function initCarousel() {
    console.log('Initializing Carousel');
    const container = document.querySelector('.carousel-container');
    if (!container) {
        console.log('Carousel container not found');
        return;
    }

    const images = container.querySelectorAll('.carousel-image');
    const prevBtn = container.querySelector('.carousel-button.prev'); 
    const nextBtn = container.querySelector('.carousel-button.next'); 
    const dots = container.querySelectorAll('.dot');

    console.log(`Found ${images.length} images in carousel`);
    if (images.length === 0) {
        return;
    }
    if (!prevBtn || !nextBtn) {
        console.log('Carousel buttons not found');
    }
    if (dots.length !== images.length) {
        console.log(`Warning: Mismatch between dots (${dots.length}) and images (${images.length})`);
    }

    let currentIndex = 0;
    let interval;

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentIndex = (index + images.length) % images.length;

        images[currentIndex].classList.add('active');
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('Carousel Previous button clicked');
            showImage(currentIndex - 1);
            resetAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('Carousel Next button clicked');
            showImage(currentIndex + 1);
            resetAutoPlay();
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
             console.log(`Carousel Dot ${index} clicked`);
            if (!isNaN(index)) {
                showImage(index);
                resetAutoPlay();
            }
        });
    });

    function startAutoPlay() {
        clearInterval(interval);
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

    container.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    container.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
}
*/

// Popup functionality
function openPopup(popup) {
    if (popup) {
        console.log('Opening popup:', popup.id);
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closePopup(popup) {
    if (popup) {
        console.log('Closing popup:', popup.id);
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Create random dunes throughout the page
function createRandomDunes() {
    console.log('Creating random dunes');
    const body = document.body;
    const windowWidth = window.innerWidth;
    const windowHeight = document.documentElement.scrollHeight;
    
    // Create between 10-15 dunes
    const numDunes = Math.floor(Math.random() * 6) + 10;
    
    for (let i = 0; i < numDunes; i++) {
        // Create dune element
        const dune = document.createElement('div');
        dune.classList.add('random-dune');
        
        // Random size (50-300px)
        const size = Math.floor(Math.random() * 250) + 50;
        dune.style.width = `${size}px`;
        dune.style.height = `${size}px`;
        
        // Random position
        const posX = Math.floor(Math.random() * (windowWidth - size));
        const posY = Math.floor(Math.random() * (windowHeight - size));
        dune.style.left = `${posX}px`;
        dune.style.top = `${posY}px`;
        
        // Random animation delay
        const delay = Math.random() * 10;
        dune.style.animationDelay = `${delay}s`;
        
        // Random z-index (all negative to stay behind content)
        const zIndex = -Math.floor(Math.random() * 10) - 1;
        dune.style.zIndex = zIndex;
        
        // Random opacity (0.05-0.2)
        const opacity = (Math.random() * 0.15) + 0.05;
        dune.style.opacity = opacity;
        
        // Add to body
        body.appendChild(dune);
    }
} 