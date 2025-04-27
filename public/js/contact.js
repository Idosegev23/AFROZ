document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('contactName');
    const phoneInput = document.getElementById('contactPhone');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');
    const successMessage = document.getElementById('successMessage');
    
    // יצירת הודעות שגיאה
    addErrorMessageElements();
    
    // הוספת מאזיני אירועים לשדות הקלט
    nameInput.addEventListener('blur', validateName);
    phoneInput.addEventListener('blur', validatePhone);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);
    
    // טיפול בשליחת הטופס
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // בדיקת ולידציה לכל השדות
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        // אם כל השדות תקינים, נשלח את הטופס
        if (isNameValid && isPhoneValid && isEmailValid && isMessageValid) {
            // כאן יכול להיות קוד לשליחת הטופס באמצעות AJAX
            // לצורך הדוגמה, נציג את הודעת ההצלחה
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // איפוס הטופס לאחר 5 שניות והצגתו מחדש
            setTimeout(function() {
                contactForm.reset();
                clearErrorStates();
                contactForm.style.display = 'block';
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
    
    function addErrorMessageElements() {
        // הוספת אלמנטים להודעות שגיאה עבור כל שדה
        addErrorElement(nameInput);
        addErrorElement(phoneInput);
        addErrorElement(emailInput);
        addErrorElement(messageInput);
    }
    
    function addErrorElement(inputElement) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        inputElement.parentNode.insertBefore(errorMsg, inputElement.nextSibling);
    }
    
    function setErrorState(inputElement, errorMessage) {
        inputElement.classList.add('error');
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = errorMessage;
        }
        return false;
    }
    
    function clearErrorState(inputElement) {
        inputElement.classList.remove('error');
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
        return true;
    }
    
    function clearErrorStates() {
        clearErrorState(nameInput);
        clearErrorState(phoneInput);
        clearErrorState(emailInput);
        clearErrorState(messageInput);
    }
    
    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            return setErrorState(nameInput, 'אנא הזן את שמך');
        }
        if (name.length < 2) {
            return setErrorState(nameInput, 'שם חייב להכיל לפחות 2 תווים');
        }
        return clearErrorState(nameInput);
    }
    
    function validatePhone() {
        const phone = phoneInput.value.trim();
        if (phone === '') {
            return setErrorState(phoneInput, 'אנא הזן מספר טלפון');
        }
        // תבנית בסיסית למספר טלפון ישראלי
        const phoneRegex = /^0(5[0-9]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/;
        if (!phoneRegex.test(phone)) {
            return setErrorState(phoneInput, 'אנא הזן מספר טלפון תקין');
        }
        return clearErrorState(phoneInput);
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        if (email === '') {
            return setErrorState(emailInput, 'אנא הזן כתובת אימייל');
        }
        // תבנית בסיסית לבדיקת אימייל
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return setErrorState(emailInput, 'אנא הזן כתובת אימייל תקינה');
        }
        return clearErrorState(emailInput);
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        if (message === '') {
            return setErrorState(messageInput, 'אנא הזן הודעה');
        }
        if (message.length < 10) {
            return setErrorState(messageInput, 'ההודעה חייבת להכיל לפחות 10 תווים');
        }
        return clearErrorState(messageInput);
    }
}); 