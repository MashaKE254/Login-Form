document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    const toggleRegPassword = document.querySelector('#toggleRegPassword');
    const regPassword = document.querySelector('#reg-password');
    const toggleRegConfirmPassword = document.querySelector('#toggleRegConfirmPassword');
    const regConfirmPassword = document.querySelector('#reg-confirm-password');
    const registerForm = document.querySelector('.register-form');
    const passwordError = document.querySelector('#password-error');
    const loginForm = document.querySelector('.login-form');
    const successCard = document.querySelector('.success-card');
    const successMessage = document.getElementById('success-message');
    const successOkBtn = document.getElementById('success-ok-btn');
    const overlay = document.querySelector('.overlay');
    const passwordRequirements = document.querySelector('.password-requirements');
    const lengthReq = document.querySelector('#length-req');
    const uppercaseReq = document.querySelector('#uppercase-req');
    const symbolReq = document.querySelector('#symbol-req');
    const numberReq = document.querySelector('#number-req');

    function togglePasswordVisibility(passwordField, toggleButton) {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        toggleButton.classList.toggle('bx-hide');
        toggleButton.classList.toggle('bx-show');
    }

    togglePassword.addEventListener('click', function() {
        togglePasswordVisibility(password, this);
    });

    toggleRegPassword.addEventListener('click', function() {
        togglePasswordVisibility(regPassword, this);
    });

    toggleRegConfirmPassword.addEventListener('click', function() {
        togglePasswordVisibility(regConfirmPassword, this);
    });

    function updatePasswordRequirements(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasNumber = /\d/.test(password);

        lengthReq.classList.toggle('met', password.length >= 8);
        uppercaseReq.classList.toggle('met', hasUpperCase);
        symbolReq.classList.toggle('met', hasSymbol);
        numberReq.classList.toggle('met', hasNumber);

        document.querySelectorAll('.requirement').forEach(req => {
            const icon = req.querySelector('i');
            icon.classList.toggle('bx-x', !req.classList.contains('met'));
            icon.classList.toggle('bx-check', req.classList.contains('met'));
        });
    }

    const regPasswordGroup = regPassword.closest('.form-group');

    function updateRequirementsHeight() {
        const height = passwordRequirements.offsetHeight;
        regPasswordGroup.style.setProperty('--requirements-height', `${height}px`);
    }

    regPassword.addEventListener('focus', function() {
        regPasswordGroup.classList.add('show-requirements');
        // Use setTimeout to ensure the requirements are displayed before measuring
        setTimeout(updateRequirementsHeight, 0);
    });

    regPassword.addEventListener('blur', function() {
        regPasswordGroup.classList.remove('show-requirements');
    });

    regPassword.addEventListener('input', function() {
        updatePasswordRequirements(this.value);
    });

    function validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasNumber = /\d/.test(password);

        return password.length >= minLength && hasUpperCase && hasSymbol && hasNumber;
    }

    function showSuccessCard(message) {
        successMessage.textContent = message;
        successCard.style.display = 'flex';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function hideSuccessCard() {
        successCard.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    successOkBtn.addEventListener('click', hideSuccessCard);
    overlay.addEventListener('click', hideSuccessCard);

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showSuccessCard('Login successful!');
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = regPassword.value;
        const confirmPassword = regConfirmPassword.value;

        if (!validatePassword(password)) {
            passwordError.textContent = 'Please meet all password requirements.';
            passwordError.style.display = 'block';
            return;
        }

        if (password !== confirmPassword) {
            passwordError.textContent = 'Passwords do not match.';
            passwordError.style.display = 'block';
            return;
        }

        passwordError.style.display = 'none';
        console.log('Registration successful!');
        showSuccessCard('Registration successful!');
    });

    function resetAnimations(form) {
        form.querySelectorAll('.form-group, .submit-btn, #password-error').forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight;
            el.style.animation = null;
        });
    }

    const loginText = document.querySelector('.login-text');
    const registerText = document.querySelector('.register-text');
    const header = document.querySelector('.header');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');

    function switchToRegister() {
        loginForm.classList.add('fade-out');
        setTimeout(() => {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            loginText.style.display = 'none';
            registerText.style.display = 'inline';
            header.textContent = 'Register';
            setTimeout(() => {
                registerForm.classList.add('fade-in');
                registerForm.classList.remove('fade-out');
            }, 50);
        }, 300);
        resetAnimations(registerForm);
    }

    function switchToLogin() {
        registerForm.classList.add('fade-out');
        setTimeout(() => {
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
            registerText.style.display = 'none';
            loginText.style.display = 'inline';
            header.textContent = 'Login';
            setTimeout(() => {
                loginForm.classList.add('fade-in');
                loginForm.classList.remove('fade-out');
            }, 50);
        }, 300);
        resetAnimations(loginForm);
    }

    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        switchToRegister();
    });

    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        switchToLogin();
    });

    // Add this function to reset the fade classes
    function resetFadeClasses() {
        loginForm.classList.remove('fade-in', 'fade-out');
        registerForm.classList.remove('fade-in', 'fade-out');
    }

    // Call this function when the page loads
    resetFadeClasses();

    // Update height on window resize
    window.addEventListener('resize', function() {
        if (regPasswordGroup.classList.contains('show-requirements')) {
            updateRequirementsHeight();
        }
    });
});