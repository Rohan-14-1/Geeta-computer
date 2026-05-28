// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => preloader.remove(), 600);
        }, 1200);
    }

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

// ===== MOBILE MENU =====
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

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.classList.remove('scrolled');
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

// ===== FLOATING PARTICLES (Hero Canvas) =====
(function initParticles() {
    const canvas = document.getElementById('heroParticles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.5 + 0.1,
            pulseSpeed: Math.random() * 0.02 + 0.005,
            pulseDirection: 1,
        };
    }

    function init() {
        resize();
        particles = [];
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
        for (let i = 0; i < count; i++) {
            particles.push(createParticle());
        }
    }

    function drawParticle(p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${p.opacity})`;
        ctx.fill();
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(14, 165, 233, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            // Pulse opacity
            p.opacity += p.pulseSpeed * p.pulseDirection;
            if (p.opacity > 0.6) p.pulseDirection = -1;
            if (p.opacity < 0.1) p.pulseDirection = 1;

            // Wrap around edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            drawParticle(p);
        });

        drawLines();
        animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
    });

    init();
    animate();
})();

// ===== TYPEWRITER EFFECT =====
(function initTypewriter() {
    const el = document.getElementById('typewriterText');
    if (!el) return;

    const phrases = [
        'Sales & Service',
        'Repair & Upgrade',
        'Installation',
        'Networking',
        'Security Systems',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            el.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            el.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 120;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    // Start after a small delay for page load
    setTimeout(type, 800);
})();

// ===== ANIMATED COUNTERS =====
(function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;

    let counted = false;

    function animateCounter(el) {
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                counters.forEach(counter => animateCounter(counter));
                counterObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    const statsRow = document.querySelector('.about-stats-row');
    if (statsRow) {
        counterObserver.observe(statsRow);
    }
})();

// ===== 3D TILT EFFECT ON CARDS =====
(function initTilt() {
    const cards = document.querySelectorAll('.service-card, .product-card');

    cards.forEach(card => {
        card.classList.add('tilt-card');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.4s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });
})();

// ===== PARALLAX HERO =====
(function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
        }
    }, { passive: true });
})();

// ===== ENHANCED SCROLL REVEAL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards with staggered delays
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
    card.style.transitionDelay = (index * 0.08) + 's';
    revealObserver.observe(card);
});

// Observe product cards with staggered delays
const productCards = document.querySelectorAll('.product-card');
productCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
    card.style.transitionDelay = (index * 0.08) + 's';
    revealObserver.observe(card);
});

// Observe other reveal elements
const otherReveals = document.querySelectorAll('.reveal:not(.service-card):not(.product-card), .reveal-left, .reveal-right, .reveal-scale');
otherReveals.forEach((el) => {
    revealObserver.observe(el);
});

// ===== ACTIVE NAV ON SCROLL =====
window.addEventListener('scroll', () => {
    let current = '';

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
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

// ===== SHOPPING CART =====
let cart = [];

function addToCart(event, productName, price, imagePath) {
    cart.push({ name: productName, price: price, id: Date.now() });

    const btn = event.target;
    const rect = btn.getBoundingClientRect();
    const cartNotification = document.createElement('div');
    cartNotification.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:50px;height:50px;background:#667eea;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:24px;z-index:10000;animation:cartFly 0.8s ease forwards;`;
    cartNotification.textContent = '🛒';
    document.body.appendChild(cartNotification);
    setTimeout(() => cartNotification.remove(), 800);

    const msg = document.createElement('div');
    msg.style.cssText = `position:fixed;top:20px;right:20px;background:#00d4ff;color:#1a3a52;padding:20px 30px;border-radius:10px;font-weight:bold;z-index:10001;box-shadow:0 5px 15px rgba(0,0,0,0.2);animation:slideFromRight 0.5s ease forwards;`;
    msg.textContent = `✅ ${productName} added to cart!`;
    document.body.appendChild(msg);
    setTimeout(() => {
        msg.style.animation = 'slideFromRight 0.5s ease reverse forwards';
        setTimeout(() => msg.remove(), 500);
    }, 3000);
}

function getTotalPrice() {
    return cart.reduce((total, item) => total + item.price, 0);
}

function viewCart() {
    if (cart.length === 0) { alert('Your cart is empty!'); return; }
    let cartDetails = 'Your Shopping Cart:\n\n';
    cart.forEach((item, index) => {
        cartDetails += `${index + 1}. ${item.name} - ₹${item.price}\n`;
    });
    cartDetails += `\nTotal: ₹${getTotalPrice()}`;
    alert(cartDetails);
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!validateForm(name, email, phone, message)) return;

    const btn = contactForm.querySelector('button');
    btn.style.animation = 'pulse 0.6s ease';
    btn.disabled = true;

    formMessage.className = 'form-message processing';
    formMessage.textContent = '⏳ Processing your message...';
    formMessage.style.animation = 'slideFromLeft 0.5s ease forwards';

    setTimeout(() => {
        console.log('Form Data:', { name, email, phone, message, timestamp: new Date().toLocaleString() });
        formMessage.className = 'form-message success';
        formMessage.textContent = '✅ Thank you! Your message has been sent successfully. We will contact you soon!';
        formMessage.style.animation = 'slideFromLeft 0.5s ease forwards';
        contactForm.reset();
        btn.disabled = false;
        createConfetti();
        setTimeout(() => {
            formMessage.style.animation = 'slideFromLeft 0.5s ease reverse forwards';
            setTimeout(() => { formMessage.style.animation = 'none'; }, 500);
        }, 5000);
    }, 1000);
}

function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `position:fixed;left:${Math.random() * 100}%;top:-10px;width:10px;height:10px;background:${['#0ea5e9', '#8b5cf6', '#22c55e', '#f59e0b'][Math.floor(Math.random() * 4)]};border-radius:50%;z-index:9999;pointer-events:none;animation:confettiFall ${2 + Math.random()}s linear forwards;`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

function validateForm(name, email, phone, message) {
    formMessage.className = 'form-message';
    if (!name || !email || !phone || !message) {
        formMessage.className = 'form-message error';
        formMessage.textContent = '❌ Please fill in all fields!';
        return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formMessage.className = 'form-message error';
        formMessage.textContent = '❌ Please enter a valid email address!';
        return false;
    }
    const phonePattern = /^\d{10,}$/;
    if (!phonePattern.test(phone.replace(/\D/g, ''))) {
        formMessage.className = 'form-message error';
        formMessage.textContent = '❌ Please enter a valid phone number (at least 10 digits)!';
        return false;
    }
    if (message.length < 10) {
        formMessage.className = 'form-message error';
        formMessage.textContent = '❌ Message should be at least 10 characters long!';
        return false;
    }
    return true;
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            const element = document.querySelector(href);
            if (element) {
                e.preventDefault();
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;position:absolute;border-radius:50%;background:rgba(255,255,255,0.6);pointer-events:none;animation:ripple 0.6s ease-out;`;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// ===== FAQ ACCORDION =====
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const answer = question.nextElementSibling;

        const allItems = document.querySelectorAll('.faq-item');
        allItems.forEach(i => {
            if (i !== item && i.classList.contains('active')) {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            }
        });

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

// ===== SOLUTIONS FILTER & TAB SWITCHER =====
const solutionsTabs = document.querySelectorAll('.solutions-tab');
const solutionsPanels = document.querySelectorAll('.solutions-panel');

function initSolutionsFilter() {
    // 1. WhatsApp link formatter for products
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp-query');
    const phoneNumber = "#"; // Custom lead contact number
    whatsappButtons.forEach(btn => {
        const productName = btn.dataset.product;
        const msg = encodeURIComponent(`Hi Geeta Computer, I would like to inquire about the price, specifications, and availability of the "${productName}" shown on your website. Please share more details!`);
        btn.href = `https://wa.me/${phoneNumber}?text=${msg}`;
        btn.target = "_blank";
    });

    // 2. Tab Switcher
    function switchTab(tabName) {
        solutionsTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        solutionsPanels.forEach(panel => {
            const isTarget = panel.id === 'panel' + tabName.charAt(0).toUpperCase() + tabName.slice(1);
            if (isTarget) {
                panel.classList.add('active');

                // Reset filter to 'all' in the newly opened panel
                const activeFilterChip = panel.querySelector('.filter-chip[data-filter="all"]');
                if (activeFilterChip) {
                    panel.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
                    activeFilterChip.classList.add('active');
                }

                // Stagger animate all cards in the newly opened panel
                const cards = panel.querySelectorAll('.service-card, .product-card');
                cards.forEach((card, index) => {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.97)';

                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, index * 50);
                });
            } else {
                panel.classList.remove('active');
            }
        });
    }

    // Expose switchTab globally so inline onclick events in services can trigger it
    window.switchTab = switchTab;

    solutionsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });

    // 3. Category Filter Chips inside Panels
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', function () {
            const parentPanel = chip.closest('.solutions-panel');
            if (!parentPanel) return;

            // Highlight clicked chip, remove active from others in the same panel
            parentPanel.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filterValue = chip.dataset.filter;
            const cards = parentPanel.querySelectorAll('.service-card, .product-card');

            let visibleIndex = 0;
            cards.forEach(card => {
                const cardCategory = card.dataset.category;
                const isMatch = filterValue === 'all' || cardCategory === filterValue;

                if (isMatch) {
                    if (card.style.display === 'none') {
                        card.style.display = 'flex';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(16px) scale(0.97)';
                    }

                    // Stagger the fade-in of matching cards
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, visibleIndex * 40);

                    visibleIndex++;
                } else {
                    card.style.transition = 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(16px) scale(0.97)';

                    setTimeout(() => {
                        if (card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
}

// Run solutions filtering initialization
initSolutionsFilter();


// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== PAGE EXIT =====
window.addEventListener('beforeunload', () => {
    document.documentElement.style.opacity = '0.5';
});

if (window.performance && window.performance.navigation.type === 2) {
    document.location.reload();
}

console.log('Geeta Computer website loaded successfully!');
console.log('✨ Enhanced with premium animations');
