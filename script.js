const form = document.querySelector("#login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const emailGroup = email.closest(".field-group");
const passwordGroup = password.closest(".field-group");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const status = document.querySelector(".form-status");
const submitButton = document.querySelector(".submit-button");
const passwordToggle = document.querySelector(".password-toggle");
const card = document.querySelector("#tilt-card");
const panel = document.querySelector(".form-panel");

passwordToggle.addEventListener("click", () => {
    const isVisible = password.type === "text";
    password.type = isVisible ? "password" : "text";
    passwordToggle.setAttribute("aria-pressed", String(!isVisible));
    passwordToggle.setAttribute("aria-label", isVisible ? "Show password" : "Hide password");
});

function validateForm() {
    let valid = true;
    emailGroup.classList.remove("has-error");
    passwordGroup.classList.remove("has-error");
    emailError.textContent = "";
    passwordError.textContent = "";

    if (!email.value.trim()) {
        emailGroup.classList.add("has-error");
        emailError.textContent = "Please enter your email address.";
        valid = false;
    } else if (!email.validity.valid) {
        emailGroup.classList.add("has-error");
        emailError.textContent = "Please enter a valid email address.";
        valid = false;
    }

    if (!password.value) {
        passwordGroup.classList.add("has-error");
        passwordError.textContent = "Please enter your password.";
        valid = false;
    } else if (password.value.length < 8) {
        passwordGroup.classList.add("has-error");
        passwordError.textContent = "Your password must be at least 8 characters.";
        valid = false;
    }
    return valid;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";
    status.classList.remove("is-error");
    if (!validateForm()) {
        status.textContent = "Check the highlighted fields and try again.";
        status.classList.add("is-error");
        return;
    }

    submitButton.disabled = true;
    submitButton.querySelector("span").textContent = "Signing in...";
    window.setTimeout(() => {
        submitButton.disabled = false;
        submitButton.querySelector("span").textContent = "Sign in to Lumio";
        status.textContent = "Demo sign in successful. Welcome back!";
    }, 800);
});

[email, password].forEach((input) => {
    input.addEventListener("input", () => {
        input.closest(".field-group").classList.remove("has-error");
        input.closest(".field-group").querySelector(".field-error").textContent = "";
        status.textContent = "";
    });
});

if (window.matchMedia("(pointer: fine)").matches) {
    panel.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
        const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(7px)`;
        card.style.boxShadow = `${-rotateY * 2}px ${28 + rotateX * -2}px 70px rgba(0,0,0,.38), inset 0 1px rgba(255,255,255,.14)`;
    });
    panel.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.boxShadow = "";
    });
}
