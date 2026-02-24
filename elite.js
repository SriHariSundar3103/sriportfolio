/* ══════════════════════════════════════════════════════════
   ELITE JS — Premium interactions layer
   elite.js — No cursor effects. No content changes.
   ══════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    /* ── 1. Scroll Progress Bar ─────────────────────────── */
    function createScrollBar() {
        if (document.getElementById('scrollProgress')) return;
        const bar = document.createElement('div');
        bar.id = 'scrollProgress';
        document.body.prepend(bar);
    }

    function updateScrollBar() {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;
        const scrolled = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
    }

    /* ── 2. Navbar scroll behavior ──────────────────────── */
    const navbar = document.getElementById('navbar');
    function updateNavbar() {
        if (!navbar) return;
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /* ── 3. Active nav link highlight ───────────────────── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
        });
        navLinks.forEach(link => {
            const href = link.getAttribute('href')?.replace('#', '');
            link.classList.toggle('active', href === current);
        });
    }

    /* ── 4. Unified scroll handler ──────────────────────── */
    let scrollRaf = null;
    window.addEventListener('scroll', () => {
        if (scrollRaf) return;
        scrollRaf = requestAnimationFrame(() => {
            updateScrollBar();
            updateNavbar();
            highlightNav();
            scrollRaf = null;
        });
    }, { passive: true });

    /* ── 5. Section Reveal (e-reveal) ───────────────────── */
    function initReveal() {
        const els = document.querySelectorAll('.e-reveal, .e-reveal-blur');
        if (!els.length) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        els.forEach(el => io.observe(el));
    }

    /* ── 6. Apply e-reveal to existing data-reveal els ──── */
    function applyReveal() {
        const existing = document.querySelectorAll('[data-reveal]');
        existing.forEach((el, i) => {
            el.classList.add('e-reveal');
            if (i % 3 === 1) el.classList.add('e-reveal-delay-1');
            if (i % 3 === 2) el.classList.add('e-reveal-delay-2');
        });
        // Also apply to section-headers
        document.querySelectorAll('.section-header').forEach(el => {
            if (!el.classList.contains('e-reveal')) el.classList.add('e-reveal');
        });
        // Apply to premium section cards
        document.querySelectorAll('.snapshot-card, .skill-cell, .gh-stat-card, .tl-pro-item')
            .forEach((el, i) => {
                if (!el.classList.contains('e-reveal')) {
                    el.classList.add('e-reveal');
                    el.classList.add(`e-reveal-delay-${(i % 4) + 1}`);
                }
            });
    }

    /* ── 7. Page load body class ───────────────────────── */
    function initPageLoad() {
        document.body.classList.add('e-loaded');
    }

    /* ── 8. Smooth scroll for all anchor links ──────────── */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const id = link.getAttribute('href').slice(1);
                const target = document.getElementById(id);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    /* ── 9. Button press micro-animation ───────────────── */
    function initButtonPress() {
        document.querySelectorAll('button, .btn-primary, .btn-secondary, .arch-btn, .nav-cta, .pm-btn-primary').forEach(btn => {
            btn.addEventListener('mousedown', () => {
                btn.style.transform = (btn.style.transform || '') + ' scale(0.96)';
            });
            btn.addEventListener('mouseup', () => {
                btn.style.transform = btn.style.transform.replace(' scale(0.96)', '');
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = btn.style.transform.replace(' scale(0.96)', '');
            });
        });
    }

    /* ── 10. z-index guard — ensure FABs are on top ─────── */
    function fixZIndex() {
        const fabs = document.querySelectorAll('.fab-cluster-btn');
        fabs.forEach(f => { f.style.isolation = 'isolate'; });
    }

    /* ── THEME TOGGLE FUNCTION ───────────────────────────── */
    window.toggleTheme = function() {
        const root = document.documentElement;
        const themeIcon = document.getElementById('themeIcon');
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        
        // Update icon based on new theme
        if (newTheme === 'light') {
            // Show moon icon for light mode (to switch to dark)
            themeIcon.innerHTML = '<path d="M15 10.5A7.5 7.5 0 017.5 3a7.5 7.5 0 100 12 7.5 7.5 0 007.5-4.5z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>';
        } else {
            // Show sun icon for dark mode (to switch to light)
            themeIcon.innerHTML = '<circle cx="10" cy="10" r="3.5" stroke="currentColor" stroke-width="1.4"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M3.2 3.2l1.4 1.4M15.4 15.4l1.4 1.4M3.2 16.8l1.4-1.4M15.4 4.6l1.4-1.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>';
        }
        
        // Update settings panel buttons if they exist
        const spDark = document.getElementById('spDark');
        const spLight = document.getElementById('spLight');
        if (spDark && spLight) {
            spDark.classList.toggle('active', newTheme === 'dark');
            spLight.classList.toggle('active', newTheme === 'light');
        }
    };

    /* ── OPEN AI CHAT FUNCTION ───────────────────────────── */
    window.openAIChat = function() {
        // Scroll to AI Lab section
        const aiLabSection = document.getElementById('ai-lab');
        if (aiLabSection) {
            aiLabSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Trigger the robot FAB click to open chat if it exists
        const robotFab = document.getElementById('robotFab');
        if (robotFab) {
            // Add active class to simulate click
            robotFab.classList.add('active');
            
            // Focus on chat input if available
            setTimeout(() => {
                const chatInput = document.getElementById('chatInput');
                if (chatInput) {
                    chatInput.focus();
                }
            }, 500);
        }
    };

    /* ── Initialize theme icon on page load ────────────── */
    function initThemeIcon() {
        const root = document.documentElement;
        const themeIcon = document.getElementById('themeIcon');
        const currentTheme = root.getAttribute('data-theme') || 'dark';
        
        if (currentTheme === 'light' && themeIcon) {
            themeIcon.innerHTML = '<path d="M15 10.5A7.5 7.5 0 017.5 3a7.5 7.5 0 100 12 7.5 7.5 0 007.5-4.5z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>';
        }
    }

    /* ── Init on DOM ready ───────────────────────────────── */
    function init() {
        createScrollBar();
        updateScrollBar();
        updateNavbar();
        highlightNav();
        applyReveal();
        initReveal();
        initSmoothScroll();
        initPageLoad();
        fixZIndex();
        initThemeIcon();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
