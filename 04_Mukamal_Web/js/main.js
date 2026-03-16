/* ==========================================================================
   MUKAMAL — MAIN JS
   GSAP ScrollSmoother, Custom Cursor, Shared Nav/Footer, Animations
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // ===== SHARED NAV =====
    const navHTML = `
    <nav class="nav" id="main-nav">
        <div class="nav-inner">
            <a href="/" class="logo">MUKAMAL</a>
            <div class="nav-links" id="nav-links">
                <a href="/work.html">Work</a>
                <a href="/about.html">About</a>
                <a href="/insights.html">Insights</a>
                <a href="/contact.html" class="btn btn-pill">Let's Talk &rarr;</a>
            </div>
            <button class="nav-toggle" id="nav-toggle" aria-label="Menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>`;

    const footerHTML = `
    <footer class="footer">
        <div class="footer-inner">
            <div class="logo" style="font-family:var(--font-d);font-size:24px;color:var(--text);">MUKAMAL &copy; 2026</div>
            <div class="footer-links">
                <a href="/work.html">Work</a>
                <a href="/about.html">About</a>
                <a href="/insights.html">Insights</a>
                <a href="/contact.html">Contact</a>
            </div>
            <div>TOP 1% STANDARD</div>
        </div>
    </footer>`;

    // Inject nav at top of body
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) navPlaceholder.outerHTML = navHTML;

    // Inject footer at bottom
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.outerHTML = footerHTML;

    // Highlight active nav link
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === '/') ||
            (currentPath.includes('index') && link.getAttribute('href') === '/')) {
            link.classList.add('active');
        }
    });

    // Mobile nav toggle
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('open');
            toggle.classList.toggle('open');
        });
    }

    // ===== NOISE OVERLAY =====
    if (!document.querySelector('.noise')) {
        const noise = document.createElement('div');
        noise.className = 'noise';
        document.body.appendChild(noise);
    }

    // ===== CUSTOM CURSOR (desktop only) =====
    if (window.matchMedia("(min-width: 768px)").matches && !('ontouchstart' in window)) {
        document.body.style.cursor = 'none';

        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);

        const ring = document.createElement('div');
        ring.className = 'cursor-ring';
        document.body.appendChild(ring);

        let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
        let ringX = mouseX, ringY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (typeof gsap !== 'undefined') {
                gsap.set(dot, { x: mouseX, y: mouseY });
            } else {
                dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            }
        });

        if (typeof gsap !== 'undefined') {
            gsap.ticker.add(() => {
                ringX += (mouseX - ringX) * 0.15;
                ringY += (mouseY - ringY) * 0.15;
                gsap.set(ring, { x: ringX, y: ringY });
            });
        }

        // Hover effects
        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('a, button, .card, .work-card, input, textarea');
            if (target) {
                ring.style.width = '60px';
                ring.style.height = '60px';
                ring.style.background = 'rgba(198, 241, 53, 0.1)';
            }
        });
        document.addEventListener('mouseout', (e) => {
            const target = e.target.closest('a, button, .card, .work-card, input, textarea');
            if (target) {
                ring.style.width = '40px';
                ring.style.height = '40px';
                ring.style.background = 'transparent';
            }
        });
    }

    // ===== GSAP SETUP =====
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Try ScrollSmoother (Club GSAP only — graceful fallback)
        if (typeof ScrollSmoother !== 'undefined') {
            const wrapper = document.getElementById('smooth-wrapper');
            const content = document.getElementById('smooth-content');
            if (wrapper && content && window.matchMedia("(min-width: 768px)").matches) {
                ScrollSmoother.create({
                    wrapper: '#smooth-wrapper',
                    content: '#smooth-content',
                    smooth: 1.5,
                    effects: true,
                    normalizeScroll: true
                });
            }
        }

        // Nav scroll state
        ScrollTrigger.create({
            start: "top -80",
            end: 99999,
            toggleClass: { className: 'scrolled', targets: '.nav' }
        });

        // ===== SHARED ANIMATIONS =====

        // Section reveal: fade up
        gsap.utils.toArray('.reveal').forEach(el => {
            gsap.from(el, {
                y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 85%" }
            });
        });

        // Stagger reveal: grid items
        gsap.utils.toArray('.stagger-grid').forEach(grid => {
            gsap.from(grid.children, {
                y: 50, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: grid, start: "top 80%" }
            });
        });

        // Count-up stats
        gsap.utils.toArray('.counter').forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            ScrollTrigger.create({
                trigger: counter,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    gsap.to({ val: 0 }, {
                        val: target, duration: 2, ease: "power2.out",
                        onUpdate: function () {
                            const current = this.targets()[0].val;
                            counter.innerText = Number.isInteger(target) ? Math.floor(current) : current.toFixed(1);
                        }
                    });
                }
            });
        });

        // Letter split animation for hero
        document.querySelectorAll('.hero-word').forEach(el => {
            const text = el.innerText;
            el.innerHTML = '';
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.innerText = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                el.appendChild(span);
            });
        });

        // Hero entry animation
        const heroLetters = document.querySelectorAll('.hero-word span');
        if (heroLetters.length) {
            gsap.from(heroLetters, { y: 100, opacity: 0, stagger: 0.03, duration: 1, ease: "power4.out", delay: 0.3 });
        }

        const heroSub = document.querySelectorAll('.hero-sub');
        if (heroSub.length) {
            gsap.from(heroSub, { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 1.2 });
        }

        // Magnetic button
        document.querySelectorAll('.btn-magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
            });
        });

        // Refresh on load
        window.addEventListener("load", () => ScrollTrigger.refresh());
    }

    // ===== MOBILE INTERSECTION OBSERVER FALLBACK =====
    if (window.matchMedia("(max-width: 767px)").matches) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal, .card, .work-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
});
