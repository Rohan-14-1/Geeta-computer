// ===== GEETA COMPUTER — MASTER NAVBAR JAVASCRIPT =====

const navbarHTMLContent = `
<nav class="navbar">
    <div class="container">
        <a href="/" class="logo-wrapper">
            <img src="images/logo.png" alt="GEETA Computer & Electronics Logo">
        </a>

        <!-- Desktop Links -->
        <ul class="nav-links">
            <li><a href="/" class="nav-link" id="nav-home">Home</a></li>
            <li><a href="/about" class="nav-link" id="nav-about">About Us</a></li>
            <li><a href="/services" class="nav-link" id="nav-services">Services</a></li>
            <li><a href="/products" class="nav-link" id="nav-products">Products</a></li>
            <li><a href="/contact" class="nav-link" id="nav-contact">Contact</a></li>
        </ul>

        <div class="nav-actions">
            <a href="tel:9801674475" class="nav-call-btn" aria-label="Call Geeta Computer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="phone-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span class="call-number">9801674475</span>
            </a>
            <button class="menu-icon" id="menuIcon" aria-label="Open navigation menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
</nav>

<!-- Mobile Overlay -->
<div class="nav-overlay" id="navOverlay"></div>

<!-- Mobile Drawer -->
<div class="nav-drawer" id="navDrawer">
    <div class="drawer-header">
        <div class="drawer-logo">
            <span class="logo-circle">G</span>
            <span class="logo-text">Geeta</span>
        </div>
        <button class="drawer-close-btn" id="drawerClose" aria-label="Close menu">&times;</button>
    </div>

    <ul class="drawer-links">
        <li><a href="/" class="drawer-link" id="drawer-home">Home</a></li>
        <li><a href="/about" class="drawer-link" id="drawer-about">About Us</a></li>
        <li><a href="/services" class="drawer-link" id="drawer-services">Services</a></li>
        <li><a href="/products" class="drawer-link" id="drawer-products">Products</a></li>
        <li><a href="/contact" class="drawer-link" id="drawer-contact">Contact</a></li>
    </ul>

    <div class="drawer-footer">
        <span>SCROLL TO EXPLORE</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    </div>
</div>
`;

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    if (!header) return;

    // Try to load navbar.html dynamically (for local servers)
    // Fallback immediately to inline HTML on CORS/file protocol restrictions
    fetch("/navbar.html")
        .then(response => {
            if (!response.ok) throw new Error("CORS or offline environment");
            return response.text();
        })
        .then(html => {
            header.innerHTML = html;
            setupNavbar();
        })
        .catch(() => {
            header.innerHTML = navbarHTMLContent;
            setupNavbar();
        });
});

function setupNavbar() {
    const header = document.getElementById("header");
    const menuIcon = document.getElementById("menuIcon");
    const navOverlay = document.getElementById("navOverlay");
    const navDrawer = document.getElementById("navDrawer");
    const drawerClose = document.getElementById("drawerClose");

    // Move overlay & drawer out of header into body
    // (header has backdrop-filter which creates a new containing block,
    //  breaking position:fixed on children)
    if (navOverlay) document.body.appendChild(navOverlay);
    if (navDrawer) document.body.appendChild(navDrawer);

    // ---- Mobile Drawer Toggle ----
    function openDrawer() {
        if (navDrawer) navDrawer.classList.add("active");
        if (navOverlay) navOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
        if (navDrawer) navDrawer.classList.remove("active");
        if (navOverlay) navOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (menuIcon) menuIcon.addEventListener("click", openDrawer);
    if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
    if (navOverlay) navOverlay.addEventListener("click", closeDrawer);

    // Close drawer when a drawer link is clicked
    const drawerLinks = document.querySelectorAll(".drawer-link");
    drawerLinks.forEach(link => {
        link.addEventListener("click", closeDrawer);
    });

    // Escape key closes drawer
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navDrawer && navDrawer.classList.contains("active")) {
            closeDrawer();
        }
    });

    // ---- Active Page Highlight ----
    const path = window.location.pathname.toLowerCase();

    // Desktop links
    const navLinks = {
        "/about": document.getElementById("nav-about"),
        "/contact": document.getElementById("nav-contact"),
        "/": document.getElementById("nav-home"),
        "/services": document.getElementById("nav-services"),
        "/products": document.getElementById("nav-products")
    };

    // Drawer links
    const dLinks = {
        "/about": document.getElementById("drawer-about"),
        "/contact": document.getElementById("drawer-contact"),
        "/": document.getElementById("drawer-home"),
        "/services": document.getElementById("drawer-services"),
        "/products": document.getElementById("drawer-products")
    };

    // Reset all
    for (const link of Object.values(navLinks)) {
        if (link) link.classList.remove("active");
    }
    for (const link of Object.values(dLinks)) {
        if (link) link.classList.remove("active");
    }

    // Set active — match clean routes against the current pathname
    // Normalize: strip trailing slash, strip .html, treat /index as /
    let matched = false;
    let cleanPath = path.replace(/\.html$/, "").replace(/\/$/, "") || "/";
    if (cleanPath === "/index") cleanPath = "/";
    for (const [key, link] of Object.entries(navLinks)) {
        if (link && (cleanPath === key || (key === "/" && (cleanPath === "" || cleanPath === "/index")))) {
            link.classList.add("active");
            matched = true;
        }
    }
    for (const [key, link] of Object.entries(dLinks)) {
        if (link && (cleanPath === key || (key === "/" && (cleanPath === "" || cleanPath === "/index")))) {
            link.classList.add("active");
        }
    }

    if (!matched && navLinks["/"]) {
        navLinks["/"].classList.add("active");
    }
    if (!matched && dLinks["/"]) {
        dLinks["/"].classList.add("active");
    }

    // ---- Header always solid/scrolled ----
    header.classList.add("scrolled");

    // ---- Ripple effect on CTA button ----
    header.querySelectorAll(".nav-call-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.className = "gx-ripple";
            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 650);
        });
    });
}
