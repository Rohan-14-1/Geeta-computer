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
        heroContent.style.animation = 'slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both';
    }

    // Add entrance animation to header
    const header = document.querySelector('.header');
    if (header) {
        header.style.animation = 'slideInDown 0.6s ease both';
    }

    // Trigger scroll reveal animations on load
    setTimeout(() => {
        triggerScrollAnimations();
    }, 500);
});

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.style.animation = 'shake 0.4s ease';
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== HEADER SCROLL EFFECT =====
let scrollTicking = false;

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            const header = document.querySelector('.header');
            if (header) {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

// ===== HERO BACKGROUND =====
// Simplified: the hero now relies on its background image + a single soft
// glow (CSS). The particle network and mouse-follow glow were removed to keep
// the hero calm and load faster.

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

// ===== ENHANCED SCROLL REVEAL WITH STAGGER =====
function triggerScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
            }
        });
    }, observerOptions);

    // Observe service cards with smooth staggered animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)`;
        card.style.transitionDelay = (index * 0.12) + 's';
        revealObserver.observe(card);
    });

    // Observe product cards with staggered animation
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)`;
        card.style.transitionDelay = (index * 0.12) + 's';
        revealObserver.observe(card);
    });

    // Observe other reveal elements
    const otherReveals = document.querySelectorAll('.reveal:not(.service-card):not(.product-card), .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');
    otherReveals.forEach((el) => {
        revealObserver.observe(el);
    });
}

// ===== 3D TILT EFFECT ON CARDS - ENHANCED =====
(function initAdvancedTilt() {
    const cards = document.querySelectorAll('.service-card, .product-card');

    cards.forEach(card => {
        card.classList.add('tilt-card');

        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return; // Disable on mobile for performance

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
            card.style.transition = 'none';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });
})();

// ===== SMOOTH PARALLAX EFFECT - PERFORMANCE OPTIMIZED =====
(function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let parallaxTicking = false;

    window.addEventListener('scroll', () => {
        if (!parallaxTicking && window.innerWidth > 768) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                if (scrolled < window.innerHeight) {
                    hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
                }
                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    }, { passive: true });
})();

// ===== ANIMATED COUNTERS WITH EASING =====
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
            // Ease-out cubic for smooth animation
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

// ===== ACTIVE NAV LINK ON SCROLL =====
(function initActiveNav() {
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
            }
        });
    });
})();

// ===== SHOPPING CART ANIMATION =====
let cart = [];

function addToCart(event, productName, price, imagePath) {
    cart.push({ name: productName, price: price, id: Date.now() });

    const btn = event.target;
    const rect = btn.getBoundingClientRect();
    
    // Create animated cart notification
    const cartNotification = document.createElement('div');
    cartNotification.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:50px;height:50px;background:linear-gradient(135deg, #0b66c3 0%, #8b5cf6 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:24px;z-index:10000;animation:cartFly 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;box-shadow:0 4px 15px rgba(11, 102, 195, 0.3);`;
    cartNotification.textContent = '🛒';
    document.body.appendChild(cartNotification);
    setTimeout(() => cartNotification.remove(), 800);

    // Success message with animation
    const msg = document.createElement('div');
    msg.style.cssText = `position:fixed;top:100px;right:20px;background:linear-gradient(135deg, #0b66c3 0%, #8b5cf6 100%);color:#fff;padding:20px 30px;border-radius:10px;font-weight:bold;z-index:10001;box-shadow:0 5px 15px rgba(11, 102, 195, 0.3);animation:slideFromRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;`;
    msg.textContent = `✅ ${productName} added to cart!`;
    document.body.appendChild(msg);
    
    setTimeout(() => {
        msg.style.animation = 'slideFromRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) reverse forwards';
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
    const phoneEl = document.getElementById('phone');
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const message = document.getElementById('message').value.trim();

    if (!validateForm(name, email, phone, message)) return;

    const btn = contactForm.querySelector('button');
    btn.style.animation = 'pulse 0.6s ease';
    btn.disabled = true;

    formMessage.className = 'form-message processing';
    formMessage.textContent = '⏳ Processing your message...';
    formMessage.style.animation = 'slideFromLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';

    setTimeout(() => {
        console.log('Form Data:', { name, email, phone, message, timestamp: new Date().toLocaleString() });
        formMessage.className = 'form-message success';
        formMessage.textContent = '✅ Thank you! Your message has been sent successfully. We will contact you soon!';
        formMessage.style.animation = 'slideFromLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        contactForm.reset();
        btn.disabled = false;
        createConfetti();
        setTimeout(() => {
            formMessage.style.animation = 'slideFromLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) reverse forwards';
            setTimeout(() => { formMessage.style.animation = 'none'; }, 500);
        }, 5000);
    }, 1000);
}

function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `position:fixed;left:${Math.random() * 100}%;top:-10px;width:10px;height:10px;background:${['#0b66c3', '#8b5cf6', '#22c55e', '#f59e0b'][Math.floor(Math.random() * 4)]};border-radius:50%;z-index:9999;pointer-events:none;animation:confettiFall ${2 + Math.random()}s linear forwards;`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

function validateForm(name, email, phone, message) {
    formMessage.className = 'form-message';
    if (!name || !email || !message) {
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
    if (phone) {
        const phonePattern = /^\d{10,}$/;
        if (!phonePattern.test(phone.replace(/\D/g, ''))) {
            formMessage.className = 'form-message error';
            formMessage.textContent = '❌ Please enter a valid phone number (at least 10 digits)!';
            return false;
        }
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

// ===== BUTTON RIPPLE EFFECT - ENHANCED =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;position:absolute;border-radius:50%;background:rgba(255,255,255,0.6);pointer-events:none;animation:ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1);`;
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
        hamburger.classList.remove('active');
    }
});


// ===== SOLUTIONS FILTER & TAB SWITCHER - ENHANCED =====
const solutionsTabs = document.querySelectorAll('.solutions-tab');
const solutionsPanels = document.querySelectorAll('.solutions-panel');

function initSolutionsFilter() {
    // 1. Product enquiry form pre-fill and focus handler
    const enquireButtons = document.querySelectorAll('.btn-enquire-now');
    enquireButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productName = btn.dataset.product;
            const messageField = document.getElementById('message');
            if (messageField && productName) {
                messageField.value = `Hi Geeta Computer, I would like to enquire about the "${productName}". Please share details regarding specifications, pricing, and availability.`;
                messageField.dispatchEvent(new Event('input', { bubbles: true }));
                messageField.focus();
            }
        });
    });

    // 2. Tab Switcher with smooth animations
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


// ===== SCROLL TO TOP - ENHANCED =====
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    let scrollTicking2 = false;

    window.addEventListener('scroll', () => {
        if (!scrollTicking2) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 400) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
                scrollTicking2 = false;
            });
            scrollTicking2 = true;
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        scrollTopBtn.style.animation = 'pulse 0.4s ease';
    });

    // Add hover effect
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.animation = 'none';
    });
}

// ===== SOCIAL & WHATSAPP HOVER =====
// Hover motion is handled in CSS now (subtle, consistent) instead of
// scattered JS animations like bounce/heartbeat that felt restless.

// ===== FILTER CHIP HOVER ANIMATIONS =====
const filterChips = document.querySelectorAll('.filter-chip');
filterChips.forEach((chip, index) => {
    chip.style.animation = `fadeInUp 0.5s ease ${0.05 * index}s both`;

    chip.addEventListener('mouseenter', () => {
        chip.style.animation = 'none';
        chip.style.transform = 'translateY(-2px)';
    });

    chip.addEventListener('mouseleave', () => {
        chip.style.transform = 'translateY(0)';
    });
});

// ===== FORM INPUT ANIMATIONS =====
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach((input, index) => {
    input.style.animation = `slideInUp 0.5s ease ${0.08 * index}s both`;

    input.addEventListener('focus', () => {
        input.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', () => {
        input.style.transform = 'scale(1)';
    });
});

// ===== SERVICE CARD CORNER GLOW =====
document.querySelectorAll('.service-card, .product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gradient = `radial-gradient(circle at ${x}px ${y}px, rgba(11, 102, 195, 0.15) 0%, transparent 60%)`;
        card.style.backgroundImage = gradient;
    });

    card.addEventListener('mouseleave', () => {
        card.style.backgroundImage = '';
    });
});

// ===== NAVBAR LOGO =====
// (Removed the infinite pulse-on-scroll — constant looping motion in the
// header is distracting and reads as "auto-generated". The logo stays still.)

// ===== ENHANCED PAGE LOAD ANIMATIONS =====
window.addEventListener('DOMContentLoaded', () => {
    // Animate section headers with stagger
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach((header, index) => {
        header.style.animation = `fadeInUp 0.8s ease ${0.1 * index}s both`;
    });

    // Animate footer columns with stagger
    const footerCols = document.querySelectorAll('.footer-col');
    footerCols.forEach((col, index) => {
        col.style.animation = `slideInUp 0.6s ease ${0.08 * index}s both`;
    });

    // Animate about stats
    const aboutStats = document.querySelectorAll('.about-mini-stat');
    aboutStats.forEach((stat, index) => {
        stat.style.animation = `slideInUp 0.5s ease ${0.1 * index}s both`;
    });
});

// ===== HERO MOUSE-FOLLOW GLOW =====
// Removed — the target element (.center-glow) no longer exists, and a
// cursor-tracking glow added motion noise without much benefit.

// ===== PERFORMANCE OPTIMIZATION: REDUCE ANIMATIONS ON SLOW DEVICES =====
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaQuery.matches) {
    // User prefers reduced motion - disable animations
    document.documentElement.style.setProperty('--transition-fast', '0.05s');
    document.documentElement.style.setProperty('--transition-base', '0.1s');
    document.documentElement.style.setProperty('--transition-slow', '0.2s');
}

// ===== LAZY LOAD ANIMATIONS FOR IMAGES =====
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease';
            imageObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

images.forEach(img => {
    imageObserver.observe(img);
});

console.log('Geeta Computer — site ready.');

/* ============================================================
   ✦ PREMIUM ENHANCEMENTS — interactions
   (scroll progress, magnetic buttons, ripple, scroll-spy nav,
    floating WhatsApp reveal, section-header reveal)
   ============================================================ */
(function geetaEnhancements() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- 1. Scroll progress bar ---- */
    const progress = document.getElementById('scrollProgress');
    /* ---- 5. Floating WhatsApp reveal (shares scroll handler) ---- */
    const waBtn = document.getElementById('floatWhatsapp');

    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const h = document.documentElement;
            const scrolled = h.scrollTop;
            const max = h.scrollHeight - h.clientHeight;
            if (progress) progress.style.width = max > 0 ? (scrolled / max) * 100 + '%' : '0%';
            if (waBtn) waBtn.classList.toggle('visible', scrolled > 400);
            ticking = false;
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- 2. Ripple effect on buttons ---- */
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            if (reduceMotion) return;
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const ripple = document.createElement('span');
            ripple.className = 'gx-ripple';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 650);
        });
    });

    /* ---- 3. Magnetic effect on primary hero/CTA buttons ---- */
    if (!reduceMotion && window.innerWidth > 768) {
        document.querySelectorAll('.hero-ctas .btn, .about-cta-wrapper .btn').forEach(btn => {
            btn.addEventListener('mousemove', e => {
                const r = btn.getBoundingClientRect();
                const mx = e.clientX - r.left - r.width / 2;
                const my = e.clientY - r.top - r.height / 2;
                btn.style.transform = `translate(${mx * 0.18}px, ${my * 0.28}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    /* ---- 4. Scroll-spy: highlight nav link of section in view ---- */
    const sections = ['home', 'about', 'solutions', 'contact']
        .map(id => document.getElementById(id))
        .filter(Boolean);
    const navLinkMap = {};
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) navLinkMap[href.slice(1)] = link;
    });
    if (sections.length && 'IntersectionObserver' in window) {
        const spy = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Object.values(navLinkMap).forEach(l => l.classList.remove('active'));
                    const link = navLinkMap[entry.target.id];
                    if (link) link.classList.add('active');
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
        sections.forEach(s => spy.observe(s));
    }

    /* ---- 6. Reveal section headers (adds .visible for title underline) ---- */
    if ('IntersectionObserver' in window) {
        const headerObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    headerObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        document.querySelectorAll('.section-header').forEach(el => headerObs.observe(el));
    }
})();