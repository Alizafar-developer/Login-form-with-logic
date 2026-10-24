const email = document.querySelector("#email");
const password = document.querySelector("#password");
const emailerror = document.querySelector("#email-error");
const togglebutton = document.querySelector("#toggle-password");

const rule1 = document.querySelector("#rule1");
const rule2 = document.querySelector("#rule2");
const rule3 = document.querySelector("#rule3");
const rule4 = document.querySelector("#rule4");

const passworderror = document.querySelector("#password-error");
const confirmpassword = document.querySelector("#confirm-password");
const confirmpassworderror = document.querySelector("#confirm-password-error");

const createbutton = document.querySelector("#get-start");
const formmessage = document.querySelector("#form-message");
const form = document.querySelector("#signup-form");

let hasSubmitted = false;
let isProcessing = false;
let isSuccessful = false;
let submitTimer = null;

function changeicon(input, isValid) {
    input.classList.toggle("valid", isValid);
    input.classList.toggle("invalid", !isValid);
}

function updateRule(element, isValid) {
    element.classList.toggle("valid", isValid);
    element.classList.toggle("invalid", !isValid);

    const icon = element.querySelector(".rule-icon");

    if (icon) {
        icon.textContent = isValid ? "✓" : "✗";
    }
}

function validatePassword() {
    const value = password.value;

    const hasLength = value.length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*()~]/.test(value);

    updateRule(rule1, hasLength);
    updateRule(rule2, hasUppercase);
    updateRule(rule3, hasNumber);
    updateRule(rule4, hasSpecial);

    const isValid =
        hasLength &&
        hasUppercase &&
        hasNumber &&
        hasSpecial;

    passworderror.textContent =
        hasSubmitted && !isValid
            ? "Please meet all password requirements"
            : "";

    return isValid;
}

togglebutton.addEventListener("click", function () {
    const isPassword = password.type === "password";

    password.type = isPassword ? "text" : "password";

    togglebutton.setAttribute("aria-pressed", String(isPassword));
    togglebutton.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password"
    );
});

function validateEmail(showError = false) {
    const value = email.value.trim();

    if (value === "") {
        email.classList.remove("valid", "invalid");
        emailerror.textContent = showError
            ? "Please enter your email"
            : "";

        if (showError) {
            changeicon(email, false);
        }

        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(value);

    changeicon(email, isValid);

    emailerror.textContent = !isValid && showError
        ? "Please enter a valid email"
        : "";

    return isValid;
}

function validateConfirmPassword(showError = false) {
    const confirmValue = confirmpassword.value;
    const passwordValue = password.value;

    if (confirmValue === "") {
        confirmpassword.classList.remove("valid", "invalid");

        confirmpassworderror.textContent = showError
            ? "Please confirm your password"
            : "";

        if (showError) {
            changeicon(confirmpassword, false);
        }

        return false;
    }

    if (confirmValue !== passwordValue) {
        changeicon(confirmpassword, false);
        confirmpassworderror.textContent = "Passwords do not match";
        return false;
    }

    changeicon(confirmpassword, true);
    confirmpassworderror.textContent = "";

    return true;
}

// Reset success feedback whenever the user edits a field
function resetSuccessState() {
    if (!isSuccessful) return;

    isSuccessful = false;
    createbutton.textContent = "Get started";
    formmessage.textContent = "";
}

// Email input
email.addEventListener("input", function () {
    resetSuccessState();

    validateEmail(hasSubmitted);
    formmessage.textContent = "";
});

// Password input
password.addEventListener("input", function () {
    resetSuccessState();

    validatePassword();
    validateConfirmPassword(hasSubmitted);
    formmessage.textContent = "";
});

// Confirm password input
confirmpassword.addEventListener("input", function () {
    resetSuccessState();

    validateConfirmPassword(hasSubmitted);
    formmessage.textContent = "";
});

// Submit form
form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (isProcessing) return;

    hasSubmitted = true;

    const isEmailValid = validateEmail(true);
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword(true);

    const isFormValid =
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    if (!isFormValid) {
        isSuccessful = false;
        formmessage.textContent = "Please fix the errors above.";
        return;
    }

    isProcessing = true;
    isSuccessful = false;

    createbutton.disabled = true;
    createbutton.textContent = "Creating account...";
    formmessage.textContent = "Please wait...";

    submitTimer = setTimeout(function () {
        isProcessing = false;
        isSuccessful = true;
        submitTimer = null;

        createbutton.disabled = false;
        createbutton.textContent = "Account details verified ✓";

        formmessage.textContent =
            "Success! Your form passed frontend validation.";
    }, 1000);
});
