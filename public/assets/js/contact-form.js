document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.querySelector('.success-message');
    
    // איפוס הטופס בטעינת הדף
    contactForm.reset();
    
    // פונקציה לבדיקת תקינות שדות הטופס
    function validateForm() {
        let isValid = true;
        
        // ניקוי שגיאות קודמות
        document.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
        });
        
        // בדיקת שם
        const nameField = document.getElementById('contactName');
        if (!nameField.value.trim()) {
            setError(nameField, 'נא להזין שם מלא');
            isValid = false;
        }
        
        // בדיקת טלפון
        const phoneField = document.getElementById('contactPhone');
        const phonePattern = /^0[2-9]\d{7,8}$/;
        if (!phonePattern.test(phoneField.value.trim())) {
            setError(phoneField, 'נא להזין מספר טלפון תקין');
            isValid = false;
        }
        
        // בדיקת אימייל
        const emailField = document.getElementById('contactEmail');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
            setError(emailField, 'נא להזין כתובת אימייל תקינה');
            isValid = false;
        }
        
        // בדיקת הודעה
        const messageField = document.getElementById('contactMessage');
        if (messageField.value.trim().length < 10) {
            setError(messageField, 'נא להזין הודעה באורך של לפחות 10 תווים');
            isValid = false;
        }
        
        return isValid;
    }
    
    // הגדרת שגיאה בשדה
    function setError(field, message) {
        field.classList.add('error');
        
        // בדיקה אם כבר קיימת הודעת שגיאה
        let errorMessage = field.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            field.parentNode.insertBefore(errorMessage, field.nextElementSibling);
        }
        
        errorMessage.textContent = message;
    }
    
    // טיפול בשליחת הטופס
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // כאן יהיה קוד לשליחת הטופס לשרת
            // לצורך ההדגמה נשתמש בסימולציה של שליחה מוצלחת
            
            // סימולציה של שליחת טופס
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'שולח...';
            
            setTimeout(function() {
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // איפוס הטופס אחרי 5 שניות
                setTimeout(function() {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    successMessage.style.display = 'none';
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'שלח פנייה';
                }, 5000);
            }, 1500);
        }
    });
    
    // הסרת שגיאות כאשר המשתמש מתחיל להקליד
    document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(field => {
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorMessage = this.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.style.display = 'none';
                }
            }
        });
    });
}); 