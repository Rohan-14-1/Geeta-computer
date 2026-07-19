// ===== GEETA COMPUTER — CONTACT PAGE JAVASCRIPT =====

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

// ===== CONTACT PAGE SPECIFIC SCRIPTS =====

// 1. Form Submit Logic & Character Counter
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("success-msg");

// Show success banner if redirected back with ?sent=true
if (successMsg && new URLSearchParams(window.location.search).get('sent') === 'true') {
    successMsg.style.display = "block";
    // Clean the URL without reloading
    window.history.replaceState({}, document.title, window.location.pathname);
    setTimeout(() => { successMsg.style.display = "none"; }, 5000);
}

if (form) {
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    // Character counter
    if (messageField && charCount) {
        messageField.addEventListener('input', () => {
            charCount.textContent = messageField.value.length;
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const btn = form.querySelector('.btn-submit');
        const originalHTML = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Collect form data for FormSubmit.co
        const formData = new FormData(form);

        fetch(form.action || 'https://formsubmit.co/geetacomputerandelectronics@gmail.com', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(res => {
            if (res.ok) {
                // Show success message
                successMsg.style.display = 'block';
                form.reset();
                if (charCount) charCount.textContent = '0';
                btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                btn.style.background = '#10b981';
                btn.style.color = '#fff';
                
                // Trigger the confetti effect
                createConfetti();
                
                setTimeout(() => {
                    successMsg.style.display = 'none';
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 4000);
            } else {
                alert('Failed to send. Please try again.');
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }
        })
        .catch(() => {
            alert('Network error. Please check your connection and try again.');
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        });
    });
}

// 2. Confetti Effect
function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `position:fixed;left:${Math.random() * 100}%;top:-10px;width:10px;height:10px;background:${['#0b66c3', '#8b5cf6', '#22c55e', '#f59e0b'][Math.floor(Math.random() * 4)]};border-radius:50%;z-index:9999;pointer-events:none;animation:confettiFall ${2 + Math.random()}s linear forwards;`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

// 3. Pre-fill product enquiry from URL query parameter
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    if (product) {
        const messageField = document.getElementById('message');
        const charCount = document.getElementById('charCount');
        if (messageField) {
            messageField.value = `Hi Geeta Computer, I would like to enquire about the "${product}". Please share details regarding specifications, pricing, and availability.`;
            if (charCount) {
                charCount.textContent = messageField.value.length;
            }
            messageField.focus();
        }
    }
});

// 4. Scroll Reveal Animations (Scroll observer)
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
