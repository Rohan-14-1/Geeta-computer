// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.style.animation = 'shake 0.5s ease';
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Animate header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

// Shopping Cart
let cart = [];

function addToCart(event, productName, price, imagePath) {
    cart.push({
        name: productName,
        price: price,
        id: Date.now()
    });

    // Create floating animation
    const btn = event.target;
    const rect = btn.getBoundingClientRect();
    const cartNotification = document.createElement('div');
    cartNotification.style.position = 'fixed';
    cartNotification.style.left = rect.left + 'px';
    cartNotification.style.top = rect.top + 'px';
    cartNotification.style.width = '50px';
    cartNotification.style.height = '50px';
    cartNotification.style.backgroundColor = '#667eea';
    cartNotification.style.borderRadius = '50%';
    cartNotification.style.display = 'flex';
    cartNotification.style.alignItems = 'center';
    cartNotification.style.justifyContent = 'center';
    cartNotification.style.color = 'white';
    cartNotification.style.fontSize = '24px';
    cartNotification.style.zIndex = '10000';
    cartNotification.style.animation = 'cartFly 0.8s ease forwards';
    cartNotification.textContent = '🛒';

    document.body.appendChild(cartNotification);

    setTimeout(() => {
        cartNotification.remove();
    }, 800);

    // Show confirmation message with animation
    const msg = document.createElement('div');
    msg.style.position = 'fixed';
    msg.style.top = '20px';
    msg.style.right = '20px';
    msg.style.backgroundColor = '#00d4ff';
    msg.style.color = '#1a3a52';
    msg.style.padding = '20px 30px';
    msg.style.borderRadius = '10px';
    msg.style.fontWeight = 'bold';
    msg.style.zIndex = '10001';
    msg.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    msg.style.animation = 'slideFromRight 0.5s ease forwards';
    msg.textContent = `✅ ${productName} added to cart!`;

    document.body.appendChild(msg);

    setTimeout(() => {
        msg.style.animation = 'slideFromRight 0.5s ease reverse forwards';
        setTimeout(() => msg.remove(), 500);
    }, 3000);

    console.log('Cart:', cart);
}

function getTotalPrice() {
    return cart.reduce((total, item) => total + item.price, 0);
}

function viewCart() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let cartDetails = 'Your Shopping Cart:\n\n';
    cart.forEach((item, index) => {
        cartDetails += `${index + 1}. ${item.name} - ₹${item.price}\n`;
    });
    cartDetails += `\nTotal: ₹${getTotalPrice()}`;

    alert(cartDetails);
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate form
    if (!validateForm(name, email, phone, message)) {
        return;
    }

    // Simulate form submission with animation
    const btn = contactForm.querySelector('button');
    btn.style.animation = 'pulse 0.6s ease';
    btn.disabled = true;

    formMessage.className = 'form-message processing';
    formMessage.textContent = '⏳ Processing your message...';
    formMessage.style.animation = 'slideFromLeft 0.5s ease forwards';

    setTimeout(() => {
        // In a real application, you would send this data to a server
        console.log('Form Data:', {
            name,
            email,
            phone,
            message,
            timestamp: new Date().toLocaleString()
        });

        // Show success message with animation
        formMessage.className = 'form-message success';
        formMessage.textContent = '✅ Thank you! Your message has been sent successfully. We will contact you soon!';
        formMessage.style.animation = 'slideFromLeft 0.5s ease forwards';

        // Reset form
        contactForm.reset();
        btn.disabled = false;

        // Create confetti effect
        createConfetti();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.animation = 'slideFromLeft 0.5s ease reverse forwards';
            setTimeout(() => {
                formMessage.style.animation = 'none';
            }, 500);
        }, 5000);

    }, 1000);
}

// Create confetti animation effect
function createConfetti() {
    const confettiPieces = 30;
    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#667eea', '#00d4ff', '#764ba2', '#FF6B6B'][Math.floor(Math.random() * 4)];
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `confettiFall ${2 + Math.random() * 1}s linear forwards`;

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

function validateForm(name, email, phone, message) {
    formMessage.className = 'form-message';

    // Check if fields are empty
    if (!name || !email || !phone || !message) {
        formMessage.className = 'form-message error';
        formMessage.textContent = '❌ Please fill in all fields!';
        return false;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formMessage.className = 'form-message error';
        formMessage.textContent = '❌ Please enter a valid email address!';
        return false;
    }

    // Validate phone number (basic check for at least 10 digits)
    const phonePattern = /^\d{10,}$/;
    if (!phonePattern.test(phone.replace(/\D/g, ''))) {
        formMessage.className = 'form-message error';
        formMessage.textContent = '❌ Please enter a valid phone number (at least 10 digits)!';
        return false;
    }

    // Validate message length
    if (message.length < 10) {
        formMessage.className = 'form-message error';
        formMessage.textContent = '❌ Message should be at least 10 characters long!';
        return false;
    }

    return true;
}

// Smooth scroll for navigation links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            const element = document.querySelector(href);
            if (element) {
                e.preventDefault();
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add scroll animation to service and product cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Staggered animation delay
            entry.target.style.animationDelay = (index * 0.1) + 's';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards with enhanced animation
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
    card.style.transitionDelay = (index * 0.1) + 's';
    observer.observe(card);
});

// Observe product cards with enhanced animation
const productCards = document.querySelectorAll('.product-card');
productCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
    card.style.transitionDelay = (index * 0.1) + 's';
    observer.observe(card);
});

// Observe other reveal elements (like the ones in the About Us section)
const otherReveals = document.querySelectorAll('.reveal:not(.service-card):not(.product-card)');
otherReveals.forEach((el) => {
    observer.observe(el);
});


// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.borderBottom = '2px solid #00d4ff';
        } else {
            link.style.borderBottom = 'none';
        }
    });
});

// Initialize tooltips or additional features
console.log('Geeta Computer website loaded successfully!');
console.log('Services: Computer Repair, CCTV Installation, and More');
console.log('Premium CCTV Products Available');

// Page load animation
window.addEventListener('load', () => {
    // Animate hero on page load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'slideInUp 0.8s ease';
    }

    // Add entrance animation to header
    const header = document.querySelector('.header');
    if (header) {
        header.style.animation = 'slideInDown 0.6s ease';
    }
});

// Add click ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Add smooth scroll on mouse wheel
let lastScrollTime = 0;
window.addEventListener('wheel', (e) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastScrollTime > 50) {
        lastScrollTime = currentTime;
    }
}, { passive: true });

// Add page exit animation
window.addEventListener('beforeunload', () => {
    document.documentElement.style.opacity = '0.5';
});

// Prevent default animation on page back
if (window.performance && window.performance.navigation.type === 2) {
    document.location.reload();
}

// FAQ Accordion functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const answer = question.nextElementSibling;
        
        // Close other items
        const allItems = document.querySelectorAll('.faq-item');
        allItems.forEach(i => {
            if (i !== item && i.classList.contains('active')) {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = null;
        }
    });
});

window.addEventListener('resize', () => {
    const activeAnswers = document.querySelectorAll('.faq-item.active .faq-answer');
    activeAnswers.forEach(answer => {
        answer.style.maxHeight = answer.scrollHeight + 'px';
    });
});
