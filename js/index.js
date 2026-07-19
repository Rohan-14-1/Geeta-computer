// ===== GEETA COMPUTER — HOME PAGE JAVASCRIPT =====

// ===== COMMON SCRIPTS =====

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 600);
        }, 1200);
    }
    
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

// ===== HOME PAGE SPECIFIC SCRIPTS =====

// Parallax background on hero
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

// Hero load animation
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both';
    }
});

// Magnetic effect on CTA buttons
if (window.innerWidth > 768) {
    document.querySelectorAll('.hero-ctas .btn').forEach(btn => {
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
