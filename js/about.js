// ===== GEETA COMPUTER — ABOUT PAGE JAVASCRIPT =====

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

// ===== ABOUT PAGE SPECIFIC SCRIPTS =====

// Animated Counters with Easing
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
    }, { threshold: 0.2 });

    const statsGrid = document.querySelector('.about-stats-grid');
    if (statsGrid) {
        counterObserver.observe(statsGrid);
    }
})();

// Scroll Reveal Animations
(function initScrollReveal() {
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

    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');
    revealElements.forEach((el) => {
        revealObserver.observe(el);
    });
})();
