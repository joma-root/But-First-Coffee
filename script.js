/* ===================================
   BUT FIRST, COFFEE - JAVASCRIPT
   Interactive features and form handling
   =================================== */

// ===================================
// MOBILE HAMBURGER MENU TOGGLE
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const closeMenu = document.getElementById('closeMenu'); // Add close button reference

    function closeMenuFunc() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    function openMenu() {
        hamburger.classList.add('active');
        navLinks.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            // Toggle active state on hamburger icon
            if (hamburger.classList.contains('active')) {
                closeMenuFunc();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking on a nav link
        const navLinksItems = navLinks.querySelectorAll('.nav-link');
        navLinksItems.forEach(link => {
            link.addEventListener('click', closeMenuFunc);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
                closeMenuFunc();
            }
        });
    }

    // Add event listener for close button if it exists
    if (closeMenu) {
        closeMenu.addEventListener('click', closeMenuFunc);
    }
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');

    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ===================================
// SMOOTH SCROLL TO ANCHOR SECTIONS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only handle anchors that point to elements on the page
        if (href !== '#' && href.length > 1) {
            const targetElement = document.querySelector(href);

            if (targetElement) {
                e.preventDefault();

                // Calculate offset for fixed navbar
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// CONTACT FORM VALIDATION & SUBMISSION
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Clear previous error messages
        clearErrors();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        // Validation flags
        let isValid = true;

        // Validate name (minimum 2 characters)
        if (name.length < 2) {
            showError('nameError', 'Please enter your full name');
            isValid = false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate subject selection
        if (!subject) {
            showError('subjectError', 'Please select a subject');
            isValid = false;
        }

        // Validate message (minimum 10 characters)
        if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters long');
            isValid = false;
        }

        // If all validations pass, simulate form submission
        if (isValid) {
            simulateFormSubmission();
        }
    });
}

// Function to show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';

        // Add error styling to the input
        const inputElement = errorElement.previousElementSibling;
        if (inputElement) {
            inputElement.style.borderColor = '#e63946';
        }
    }
}

// Function to clear all error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });

    // Reset input border colors
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// Function to simulate form submission
function simulateFormSubmission() {
    // Get the submit button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span>Sending...</span>';

    // Simulate API call delay
    setTimeout(function () {
        // Reset form
        contactForm.reset();

        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;

        // Show success message
        showSuccessMessage();

        // Scroll to top of form to show success message
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500);
}

// Function to show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');

    if (successMessage) {
        // Show the toast
        successMessage.style.display = 'flex';

        // Auto-hide after 5 seconds
        setTimeout(function () {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateX(400px)';

            setTimeout(function () {
                successMessage.style.display = 'none';
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateX(0)';
            }, 300);
        }, 5000);
    }
}

// ===================================
// REAL-TIME FORM VALIDATION
// ===================================
// Add real-time validation for better UX
if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Real-time validation for name
    if (nameInput) {
        nameInput.addEventListener('blur', function () {
            const nameError = document.getElementById('nameError');
            if (this.value.trim().length < 2 && this.value.trim().length > 0) {
                showError('nameError', 'Please enter your full name');
            } else if (nameError) {
                nameError.textContent = '';
                nameError.style.display = 'none';
                this.style.borderColor = '';
            }
        });
    }

    // Real-time validation for email
    if (emailInput) {
        emailInput.addEventListener('blur', function () {
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (this.value.trim().length > 0 && !emailRegex.test(this.value.trim())) {
                showError('emailError', 'Please enter a valid email address');
            } else if (emailError) {
                emailError.textContent = '';
                emailError.style.display = 'none';
                this.style.borderColor = '';
            }
        });
    }

    // Real-time validation for subject
    if (subjectInput) {
        subjectInput.addEventListener('change', function () {
            const subjectError = document.getElementById('subjectError');
            if (subjectError && this.value) {
                subjectError.textContent = '';
                subjectError.style.display = 'none';
                this.style.borderColor = '';
            }
        });
    }

    // Real-time validation for message
    if (messageInput) {
        messageInput.addEventListener('blur', function () {
            const messageError = document.getElementById('messageError');
            if (this.value.trim().length > 0 && this.value.trim().length < 10) {
                showError('messageError', 'Message must be at least 10 characters long');
            } else if (messageError) {
                messageError.textContent = '';
                messageError.style.display = 'none';
                this.style.borderColor = '';
            }
        });
    }
}

// ===================================
// KEYBOARD NAVIGATION ENHANCEMENTS
// ===================================
// Add focus styles for keyboard navigation
document.addEventListener('keydown', function (e) {
    // If Tab key is pressed, add visual focus indicators
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function () {
    // Remove visual focus indicators when using mouse
    document.body.classList.remove('keyboard-navigation');
});

// ===================================
// ACCESSIBILITY: Skip to main content
// ===================================
// Allow users to skip navigation and jump to main content
const skipLink = document.querySelector('a[href="#main-content"]');
if (skipLink) {
    skipLink.addEventListener('click', function (e) {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
        }
    });
}

// ===================================
// PERFORMANCE: Lazy load images
// ===================================
// Use Intersection Observer for lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%cBut First, Coffee ☕', 'font-size: 24px; font-weight: bold; color: #DBC38F;');
console.log('%cCrafted with passion, served with love', 'font-size: 14px; color: #8B6B3B; font-style: italic;');
console.log('%cWebsite designed for coffee enthusiasts', 'font-size: 12px; color: #6B6B6B;');