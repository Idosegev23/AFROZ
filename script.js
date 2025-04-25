document.addEventListener('DOMContentLoaded', function() {

    // Sticky Navigation
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');
    const sticky = header.offsetTop; // Get the offset position of the navbar

    window.onscroll = function() { stickyNav(); };

    function stickyNav() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky"); // We might need to define .sticky class in CSS if needed
        } else {
            header.classList.remove("sticky");
        }
    }

    // Popup Logic
    const pricingPopup = document.getElementById('pricing-popup');
    const contactPopup = document.getElementById('contact-popup');
    const openPricingButton = document.getElementById('open-pricing-popup');
    const openContactButton = document.getElementById('open-contact-popup');
    const closePricingButton = document.getElementById('close-pricing');
    const closeContactButton = document.getElementById('close-contact');
    // Add new button selectors
    const openPricingProgramButton = document.getElementById('open-pricing-popup-program');
    const openPricingTestimonialsButton = document.getElementById('open-pricing-popup-testimonials');

    // Function to open popup
    function openPopup(popup) {
        if (popup) popup.style.display = 'block';
    }

    // Function to close popup
    function closePopup(popup) {
        if (popup) popup.style.display = 'none';
    }

    // Event listeners for pricing popup
    if (openPricingButton) {
        openPricingButton.onclick = function() {
            openPopup(pricingPopup);
        }
    }
    if (closePricingButton) {
        closePricingButton.onclick = function() {
            closePopup(pricingPopup);
        }
    }

    // Add event listeners for new pricing popup buttons
    if (openPricingProgramButton) {
        openPricingProgramButton.onclick = function() {
            openPopup(pricingPopup);
        }
    }
    if (openPricingTestimonialsButton) {
        openPricingTestimonialsButton.onclick = function() {
            openPopup(pricingPopup);
        }
    }

    // Event listeners for contact popup
    if (openContactButton) {
        openContactButton.onclick = function() {
            openPopup(contactPopup);
        }
    }
    if (closeContactButton) {
        closeContactButton.onclick = function() {
            closePopup(contactPopup);
        }
    }

    // Close popup if clicked outside the content area
    window.onclick = function(event) {
        if (event.target == pricingPopup) {
            closePopup(pricingPopup);
        }
        if (event.target == contactPopup) {
            closePopup(contactPopup);
        }
    }

    // Smooth scroll for anchor links in navbar
    document.querySelectorAll('#navbar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Calculate position considering the sticky header height
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Optional: Add simple scroll effects (e.g., fade-in sections)
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0) scale(1)';
                // Optional: unobserve after animation to save resources
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        // Initial state for animation
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px) scale(0.98)';
        section.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(section);
    });

    // Automatic Image Carousel in Gallery
    const carouselSlides = document.querySelector('.carousel-slides');
    if (carouselSlides) {
        const slides = document.querySelectorAll('.carousel-slide');
        const slideCount = slides.length;
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');
        let currentIndex = 0;
        const intervalTime = 4000; // Time in ms (4 seconds)
        let autoPlayInterval = null; // To store the interval ID

        // Set width of the slides container
        carouselSlides.style.width = `${slideCount * 100}%`;

        function goToSlide(index) {
            currentIndex = (index + slideCount) % slideCount; // Handle negative index and wrap around
            updateCarousel();
        }

        function updateCarousel() {
            const offset = -currentIndex * (100 / slideCount);
            carouselSlides.style.transform = `translateX(${offset}%)`;
        }

        function startAutoPlay() {
            stopAutoPlay(); // Clear existing interval before starting a new one
            autoPlayInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, intervalTime);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Event Listeners for buttons
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
                startAutoPlay(); // Restart timer after manual click
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
                startAutoPlay(); // Restart timer after manual click
            });
        }

        // Initial start
        startAutoPlay();

        // Optional: Pause autoplay on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoPlay);
            carouselContainer.addEventListener('mouseleave', startAutoPlay);
        }
    }
    // Placeholder for Gallery effects (to be implemented) - removed, replaced by carousel
    // console.log('Gallery effects need implementation.');

    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Optional: Close other open items
                // faqItems.forEach(otherItem => {
                //     if (otherItem !== item) {
                //         otherItem.classList.remove('active');
                //     }
                // });
                item.classList.toggle('active');
            });
        }
    });

    // Dynamic Hero Effect on Scroll
    const heroSection = document.getElementById('hero');
    const bgVideo = document.getElementById('bg-video');
    const initialBrightness = 0.6; // Must match the initial brightness in CSS
    const initialBlur = 1; // Must match the initial blur in CSS

    window.addEventListener('scroll', () => {
        if (!heroSection || !bgVideo) return;

        const scrollPosition = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;

        // Calculate scroll percentage within the hero section (0 to 1)
        let scrollPercent = scrollPosition / heroHeight;
        scrollPercent = Math.min(1, Math.max(0, scrollPercent)); // Clamp between 0 and 1

        // Adjust brightness subtly based on scroll (e.g., slightly darker as you scroll down)
        const newBrightness = initialBrightness - (scrollPercent * 0.15); // Decrease brightness by up to 0.15

        // Adjust blur subtly (optional - can make it slightly less blurry)
        // const newBlur = initialBlur - (scrollPercent * 0.5); // Decrease blur by up to 0.5px

        bgVideo.style.filter = `brightness(${newBrightness.toFixed(2)}) blur(${initialBlur}px)`;
        // Or include blur change: bgVideo.style.filter = `brightness(${newBrightness.toFixed(2)}) blur(${newBlur.toFixed(2)}px)`;
    });

    // Placeholder for dynamic hero effect (to be implemented) - Removing placeholder comment
    // console.log('Dynamic hero effect needs implementation.');

     // Contact form submission removed as form is no longer present
     /*
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission for now
            console.log('Form submitted!');
            // Here you would typically send the data to a server
            // For now, just close the popup as feedback
            closePopup(contactPopup);
            alert('תודה שפנית! ניצור קשר בהקדם.'); // Simple feedback
            contactForm.reset(); // Clear the form
        });
    }
    */

}); 