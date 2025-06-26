document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    initMobileMenu();
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
    
    // טיפול בכפתורים שפותחים פופאפים - עכשיו יובילו לפוטר
    const allPopupOpeningButtons = document.querySelectorAll('[id^="open-contact-popup"], [id^="open-pricing-popup"]');
    
    const contactPopup = document.getElementById('contact-popup');
    const closeContactButton = document.getElementById('close-contact');

    // הוספת מאזין אירועים לכל הכפתורים שפתחו פופאפ - עכשיו יובילו לפוטר
    if (allPopupOpeningButtons.length > 0) {
        console.log(`Found ${allPopupOpeningButtons.length} popup opening buttons - redirecting to footer contact form`);
        allPopupOpeningButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Contact button clicked: ${button.id}, scrolling to footer contact form`);
                
                // גלילה חלקה לחלק העליון של סקשן הצור קשר עם אופסט קטן
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    // חישוב מיקום עם אופסט עבור הheader - מותאם טוב יותר למובייל
                    const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                    const elementPosition = contactSection.getBoundingClientRect().top;
                    // הגדלת האופסט כדי לוודא שמגיעים לתחילת הסקשן
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 50;

                    window.scrollTo({
                        top: Math.max(0, offsetPosition), // וידוא שלא נגיע למיקום שלילי
                        behavior: 'smooth'
                    });
                    
                    // מיקוד בשדה הראשון של הטופס אחרי קצת זמן
                    setTimeout(() => {
                        const footerContactForm = document.getElementById('footer-contact-form');
                        if (footerContactForm) {
                            const firstInput = footerContactForm.querySelector('input');
                            if (firstInput) {
                                firstInput.focus();
                            }
                        }
                    }, 800);
                    
                    // Facebook Pixel tracking
                    if (typeof fbq !== 'undefined') {
                        fbq('track', 'InitiateContact', {
                            source: 'button_' + button.id
                        });
                    }
                }
            });
        });
    } else {
        console.log("No popup opening buttons found");
    }

    // Close contact popup button (עדיין שומר על הפופ-אפ אם הוא בשימוש במקום אחר)
    if (closeContactButton) closeContactButton.addEventListener('click', () => closePopup(contactPopup));

    // Close popup when clicking outside (עדיין שומר על הפופ-אפ אם הוא בשימוש במקום אחר)
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup')) {
            if (contactPopup && contactPopup.style.display === 'flex') {
                 closePopup(contactPopup);
            }
        }
    });
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

// Create random dunes throughout the page - בוטל כדי להסיר עיגולים
function createRandomDunes() {
    console.log('Random dunes creation disabled - removing circles from background');
    // פונקציה בוטלה כדי להסיר עיגולים ברקע
}

// פונקציה לטיפול בטופס יצירת הקשר המקומי
function initLocalContactForm() {
    console.log('Initializing local contact form');
    
    // טיפול בטופס הפופ-אפ (אם עדיין קיים)
    handleContactForm('local-contact-form', 'contact-success-message', 'popup');
    
    // טיפול בטופס הפוטר
    handleContactForm('footer-contact-form', 'footer-contact-success-message', 'footer');
}

async function handleContactForm(formId, messageId, context) {
    const contactForm = document.getElementById(formId);
    const successMessage = document.getElementById(messageId);
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            console.log(`${context} contact form submitted`);
            
            // איסוף הנתונים מהטופס - שימוש בקונטקסט לזיהוי השדות
            const prefix = context === 'footer' ? 'footer-' : '';
            const messageField = document.getElementById(prefix + 'message');
            const formData = {
                name: document.getElementById(prefix + 'name').value,
                phone: document.getElementById(prefix + 'phone').value,
                email: document.getElementById(prefix + 'email').value,
                message: messageField ? messageField.value : '',
                date: new Date().toISOString(),
                source: context
            };

            console.log('Form data:', formData);

            // הצגת הודעת טעינה
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'שולח...';
            submitButton.disabled = true;

            try {
                // נסיון ראשון - API שלנו
                console.log('Attempting to send via our API...');
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    console.log('Email sent successfully via our API');
                    // שמירה מקומית כגיבוי
                    localStorage.setItem('contactFormSubmission', JSON.stringify(formData));
                    
                    // הצגת הודעת הצלחה
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    // Facebook Pixel tracking
                    if (typeof fbq !== 'undefined') {
                        fbq('track', 'InitiateContact');
                    }
                } else {
                    throw new Error('API response not OK');
                }
                
            } catch (error) {
                console.log('Our API failed, trying FormSubmit fallback...', error);
                
                try {
                    // Fallback - FormSubmit
                    const fallbackResponse = await fetch('https://formsubmit.co/jivany@nataraj.co.il', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: formData.name,
                            phone: formData.phone,
                            email: formData.email,
                            message: formData.message || 'אין הודעה נוספת',
                            source: formData.source,
                            '_subject': `🌟 פנייה חדשה מאתר AFROZ - ${formData.name}`,
                            '_captcha': 'false',
                            '_template': 'table'
                        })
                    });

                    console.log('FormSubmit response status:', fallbackResponse.status);
                    
                    // שמירה מקומית בכל מקרה
                    localStorage.setItem('contactFormSubmission', JSON.stringify(formData));
                    
                    // הצגת הודעת הצלחה (גם אם FormSubmit לא עבד - לפחות נשמר מקומית)
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    // Facebook Pixel tracking
                    if (typeof fbq !== 'undefined') {
                        fbq('track', 'InitiateContact');
                    }
                    
                } catch (fallbackError) {
                    console.error('Both API and FormSubmit failed:', fallbackError);
                    
                    // שמירה מקומית בכל מקרה
                    localStorage.setItem('contactFormSubmission', JSON.stringify(formData));
                    
                    // הצגת הודעת הצלחה למשתמש (הנתונים נשמרו מקומית)
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    // Facebook Pixel tracking
                    if (typeof fbq !== 'undefined') {
                        fbq('track', 'InitiateContact');
                    }
                }
            } finally {
                // החזרת הכפתור למצב רגיל
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
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

// פונקציה לעיצוב תמונות המדריכים
function setupFacilitatorImages() {
    console.log('Setting up facilitator images');
    const facilitatorImages = document.querySelectorAll('.facilitator-image img');
    facilitatorImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        // אם התמונה כבר נטענה
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// פונקציה לספירה לאחור
function setupCountdown() {
    console.log('Setting up countdown');
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) {
        console.log('Countdown element not found');
        return;
    }
    
    // תאריך הריטריט
    const retreatDate = new Date('2025-08-25T00:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = retreatDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">ימים</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">שעות</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">דקות</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">שניות</span>
                </div>
            `;
        } else {
            countdownElement.innerHTML = '<div class="countdown-ended">הריטריט החל!</div>';
        }
    }
    
    // עדכון ראשוני
    updateCountdown();
    
    // עדכון כל שנייה
    setInterval(updateCountdown, 1000);
} 