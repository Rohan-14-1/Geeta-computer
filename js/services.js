// ===== GEETA COMPUTER — SERVICES PAGE JAVASCRIPT =====

// ===== COMMON SCRIPTS =====

// Page Load handler
window.addEventListener('load', () => {
    // Header entrance animation
    const header = document.querySelector('.header');
    if (header) {
        header.style.animation = 'slideInDown 0.6s ease both';
    }
});


// Scroll progress, floating WhatsApp, Scroll Top button
const progress = document.getElementById('scrollProgress');
const waBtn = document.getElementById('floatWhatsapp');
const scrollTopBtn = document.getElementById('scrollTop');

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
        if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', scrolled > 400);
        ticking = false;
    });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Scroll to top action
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        scrollTopBtn.style.animation = 'pulse 0.4s ease';
    });
}

// Ripple effect on buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.className = 'gx-ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
    });
});

// ===== SERVICES SPECIFIC SCRIPTS =====

// 1. Reveal Animations using IntersectionObserver
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('reveal-left') || 
                entry.target.classList.contains('reveal-right') || 
                entry.target.classList.contains('reveal-scale') || 
                entry.target.classList.contains('reveal-rotate')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
            }
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)`;
    card.style.transitionDelay = (index * 0.08) + 's';
    revealObserver.observe(card);
});

// Observe generic reveal elements
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');
revealElements.forEach((el) => {
    revealObserver.observe(el);
});

// Add CSS rule for visible cards
const style = document.createElement('style');
style.textContent = `
    .service-card.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// 2. 3D Tilt Effect on Cards
(function initAdvancedTilt() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.classList.add('tilt-card');
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return;
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
    });
})();

// 3. Corner Glow Effect on Card Hover
document.querySelectorAll('.service-card').forEach(card => {
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
