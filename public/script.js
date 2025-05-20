document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    initMobileMenu();
    initPopups();
    initGalleryCarousel();
    initLocalContactForm();
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
    const faqItems = document.querySelectorAll('#faq .accordion-item, .faq-accordion .accordion-item');
    console.log(`Found ${faqItems.length} FAQ items:`, faqItems);
    
    if (faqItems.length === 0) {
        console.error('No FAQ accordion items found! DOM might not be ready yet.');
        // נסה לבצע אתחול שוב אחרי השהייה קצרה
        setTimeout(initFaqAccordion, 500);
        return;
    }
    
    faqItems.forEach((item, index) => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                console.log(`FAQ Question ${index + 1} clicked`);
                const isActiveBefore = item.classList.contains('active');
                
                // סגירת פריטים אחרים
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        console.log('Closed another active FAQ item');
                    }
                });
                
                // פתיחה של הפריט הנוכחי
                item.classList.toggle('active');
                
                const isActiveAfter = item.classList.contains('active');
                console.log(`FAQ Item ${index + 1} active state changed from ${isActiveBefore} to ${isActiveAfter}`);
                
                // שינוי סימן ה+/-
                const icon = header.querySelector('.accordion-icon');
                if (icon) {
                    icon.textContent = item.classList.contains('active') ? '-' : '+';
                }
            });
        } else {
            console.error(`FAQ Accordion header not found for item ${index + 1}`);
        }
    });
}

function initProgramAccordion() {
    console.log('Initializing Program Accordion');
    const programSection = document.getElementById('program');
    if (programSection) {
        const programItems = programSection.querySelectorAll('.accordion-item');
        console.log(`Found ${programItems.length} Program items:`, programItems);
        
        if (programItems.length === 0) {
            console.error('No Program accordion items found! DOM might not be ready yet.');
            // נסה לבצע אתחול שוב אחרי השהייה קצרה
            setTimeout(initProgramAccordion, 500);
            return;
        }
        
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
        // נסה לבצע אתחול שוב אחרי השהייה קצרה
        setTimeout(initProgramAccordion, 500);
    }
}

function initPopups() {
    console.log('Initializing Popups');
    
    // טיפול בכפתורים שפותחים פופאפים באמצעות selector יותר כללי
    const allContactButtons = document.querySelectorAll('[id^="open-contact-popup"]');
    const allPricingButtons = document.querySelectorAll('[id^="open-pricing-popup"]');
    
    const pricingPopup = document.getElementById('pricing-popup');
    const contactPopup = document.getElementById('contact-popup');
    const closePricingButton = document.getElementById('close-pricing');
    const closeContactButton = document.getElementById('close-contact');

    // הוספת מאזין אירועים לכל כפתורי צור קשר
    if (allContactButtons.length > 0) {
        console.log(`Found ${allContactButtons.length} contact popup buttons`);
        allContactButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log(`Contact button clicked: ${button.id}`);
                openPopup(contactPopup);
            });
        });
    } else {
        console.error("No contact popup buttons found");
    }

    // הוספת מאזין אירועים לכל כפתורי מחירים
    if (allPricingButtons.length > 0) {
        console.log(`Found ${allPricingButtons.length} pricing popup buttons`);
        allPricingButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log(`Pricing button clicked: ${button.id}`);
                openPopup(pricingPopup);
            });
        });
    } else {
        console.error("No pricing popup buttons found");
    }

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

function initGalleryCarousel() {
    console.log('Initializing Gallery Carousel');
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryDots = document.querySelectorAll('.gallery-dot');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    
    if (!galleryContainer || !galleryDots.length) {
        console.error('Gallery elements not found!');
        return;
    }
    
    const slides = galleryContainer.querySelectorAll('img');
    const slideCount = slides.length;
    console.log(`Found ${slideCount} gallery slides`);
    
    if (slideCount === 0) {
        console.error('No gallery images found!');
        return;
    }
    
    let currentIndex = 0;
    let interval;
    
    // הגדרת רוחב המיכל לכמות התמונות
    galleryContainer.style.width = `${slideCount * 100}%`;
    
    // קביעת רוחב לכל תמונה
    slides.forEach(slide => {
        slide.style.width = `${100 / slideCount}%`;
    });
    
    // פונקציה להצגת שקופית ספציפית
    function showSlide(index) {
        // וודא שהאינדקס בטווח תקין עם מחזוריות
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }
        
        currentIndex = index;
        console.log(`Showing slide ${currentIndex + 1}/${slideCount}`);
        
        // עדכון המיקום של המיכל
        galleryContainer.style.transform = `translateX(${currentIndex * (100 / slideCount)}%)`;
        
        // עדכון הנקודות האקטיביות
        galleryDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    // מוסיף מאזיני אירועים לכפתורי הניווט
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            clearInterval(interval); // עוצר את האוטומציה
            showSlide(currentIndex - 1);
            startAutoSlide(); // מתחיל מחדש את האוטומציה
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            clearInterval(interval); // עוצר את האוטומציה
            showSlide(currentIndex + 1);
            startAutoSlide(); // מתחיל מחדש את האוטומציה
        });
    }
    
    // מוסיף מאזיני לחיצה לנקודות
    galleryDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            clearInterval(interval); // עוצר את האוטומציה
            showSlide(i);
            startAutoSlide(); // מתחיל מחדש את האוטומציה
        });
    });
    
    // הפעלת החלקה אוטומטית
    function startAutoSlide() {
        clearInterval(interval);
        interval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 2000); // שינוי מ-5000 ל-2000 מילישניות (2 שניות)
    }
    
    // התחלת החלקה אוטומטית בטעינה
    startAutoSlide();
    
    // הוספת תמיכה בהחלקה במגע
    let touchStartX = 0;
    let touchEndX = 0;
    
    galleryContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    galleryContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        // מזהה את כיוון ההחלקה
        if (touchEndX < touchStartX) {
            // החלקה שמאלה - תמונה הבאה
            clearInterval(interval);
            showSlide(currentIndex + 1);
            startAutoSlide();
        } else if (touchEndX > touchStartX) {
            // החלקה ימינה - תמונה קודמת
            clearInterval(interval);
            showSlide(currentIndex - 1);
            startAutoSlide();
        }
    }
    
    // מציג את השקופית הראשונה
    showSlide(0);
}

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

// פונקציה לטיפול בטופס יצירת הקשר המקומי
function initLocalContactForm() {
    console.log('Initializing local contact form');
    const contactForm = document.getElementById('local-contact-form');
    const successMessage = document.getElementById('contact-success-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Local contact form submitted');
            
            // איסוף הנתונים מהטופס
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                date: new Date().toISOString()
            };
            
            // שמירת הנתונים ב-localStorage
            const existingData = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            existingData.push(formData);
            localStorage.setItem('contactSubmissions', JSON.stringify(existingData));
            
            console.log('Contact data saved:', formData);
            
            // איפוס הטופס והצגת הודעת הצלחה
            contactForm.reset();
            
            // הצגת הודעת הצלחה
            if (successMessage) {
                successMessage.style.display = 'block';
                
                // הסתרת ההודעה אחרי 5 שניות
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    } else {
        console.error('Local contact form not found');
    }
}

// Gallery Lightbox functionality
let galleryImages = [];
let currentImageIndex = 0;

// Fill galleryImages array with all the gallery image paths
function initGalleryImages() {
    galleryImages = [];
    for (let i = 1; i <= 15; i++) {
        galleryImages.push(`/images/gallery/${i}.jpg`);
    }
}

function openLightbox(imageSrc, index) {
    // Initialize gallery images if not already done
    if (galleryImages.length === 0) {
        initGalleryImages();
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxCounter = document.querySelector('.lightbox-counter');
    
    // Set the current image and index
    lightboxImg.src = imageSrc;
    currentImageIndex = index;
    
    // נסה למצוא את האלמנט img המקורי כדי לקחת ממנו את התיאור
    try {
        const originalImageElement = document.querySelector(`img[src="${imageSrc}"]`);
        if (originalImageElement && lightboxCaption) {
            const altText = originalImageElement.getAttribute('alt');
            if (altText && altText.trim() !== '') {
                lightboxCaption.textContent = altText;
                lightboxCaption.style.display = 'block';
            } else {
                lightboxCaption.style.display = 'none';
            }
        }
        
        // עדכון מונה התמונות
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
        }
    } catch (e) {
        console.log('Could not find original image alt text');
    }
    
    // Display the lightbox
    lightbox.style.display = 'block';
    
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    
    // Restore body scrolling when lightbox is closed
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    // Update the current image index based on direction
    currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
    
    // Update the image source
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxCounter = document.querySelector('.lightbox-counter');
    const newSrc = galleryImages[currentImageIndex];
    
    lightboxImg.src = newSrc;
    
    // עדכון הכיתוב לתמונה החדשה
    try {
        const originalImageElement = document.querySelector(`img[src="${newSrc}"]`);
        if (originalImageElement && lightboxCaption) {
            const altText = originalImageElement.getAttribute('alt');
            if (altText && altText.trim() !== '') {
                lightboxCaption.textContent = altText;
                lightboxCaption.style.display = 'block';
            } else {
                lightboxCaption.style.display = 'none';
            }
        }
        
        // עדכון מונה התמונות
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
        }
    } catch (e) {
        console.log('Could not find original image alt text for new image');
    }
}

// פונקציה שתהיה נגישה חיצונית לאתחול הלייטבוקס
function setupLightbox() {
    console.log('Setting up lightbox functionality');
    
    // Initialize gallery images array
    initGalleryImages();
    
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const closeBtn = document.querySelector('.close-lightbox');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        
        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (prevBtn) prevBtn.addEventListener('click', () => changeImage(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => changeImage(1));
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Handle keyboard navigation
        document.addEventListener('keydown', function(event) {
            if (lightbox.style.display === 'block') {
                if (event.key === 'Escape') {
                    closeLightbox();
                } else if (event.key === 'ArrowLeft') {
                    changeImage(-1);
                } else if (event.key === 'ArrowRight') {
                    changeImage(1);
                }
            }
        });
    } else {
        console.error('Lightbox element not found');
    }
}

// Set up event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Lightbox functionality
    setupLightbox();
    
    // Remove redundant code since setupLightbox now handles all lightbox initialization
    // const lightbox = document.getElementById('lightbox');
    // if (lightbox) {
    //     const closeBtn = document.querySelector('.close-lightbox');
    //     const prevBtn = document.querySelector('.lightbox-prev');
    //     const nextBtn = document.querySelector('.lightbox-next');
    //     
    //     closeBtn.addEventListener('click', closeLightbox);
    //     prevBtn.addEventListener('click', () => changeImage(-1));
    //     nextBtn.addEventListener('click', () => changeImage(1));
    //     
    //     // Close lightbox when clicking outside the image
    //     lightbox.addEventListener('click', function(event) {
    //         if (event.target === lightbox) {
    //             closeLightbox();
    //         }
    //     });
    //     
    //     // Handle keyboard navigation
    //     document.addEventListener('keydown', function(event) {
    //         if (lightbox.style.display === 'block') {
    //             if (event.key === 'Escape') {
    //                 closeLightbox();
    //             } else if (event.key === 'ArrowLeft') {
    //                 changeImage(-1);
    //             } else if (event.key === 'ArrowRight') {
    //                 changeImage(1);
    //             }
    //         }
    //     });
    // }
});

// פונקציה שסוגרת את כל האקורדיונים כשהדף נטען
function closeAllAccordions() {
    console.log('Closing all accordions initially');
    const allAccordionItems = document.querySelectorAll('.accordion-item');
    allAccordionItems.forEach(item => {
        item.classList.remove('active');
        const icon = item.querySelector('.accordion-icon');
        if (icon) {
            icon.textContent = '+';
        }
    });
}

// פונקציה חדשה שתקרא אחרי טעינת תוכן דינמית
// מוגדרת כגלובלית בלי var/let/const כדי שתהיה זמינה גם ל-index.html
function initializeAccordions() {
    console.log('Initializing accordions after dynamic content loaded');
    closeAllAccordions();
    initFaqAccordion();
    initProgramAccordion();
} 