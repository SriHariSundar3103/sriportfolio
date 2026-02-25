/* ═══════════════════════════════════════════════════
   UI CONTROLS — Robot FAB · Settings · Features Nav
   ui-controls.js
   ═══════════════════════════════════════════════════ */

(function () {
    'use strict';

    /* ── Robot FAB → open/close AI chatbot ── */
    const robotFab = document.getElementById('robotFab');
    const aiLabSection = document.getElementById('ai-lab');

    if (robotFab) {
        robotFab.addEventListener('click', () => {
            // If AI lab exists, scroll to it and open the orb
            if (aiLabSection) {
                aiLabSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Trigger the existing AI orb click if it exists
                setTimeout(() => {
                    const orb = document.getElementById('aiOrb');
                    if (orb) orb.click();
                    
                    // Auto-send a welcome message asking about the portfolio
                    setTimeout(() => {
                        const chatInput = document.getElementById('chatInput');
                        if (chatInput && typeof sendMessage === 'function') {
                            chatInput.value = "Hi! Tell me about your portfolio and projects";
                            sendMessage();
                        }
                    }, 800);
                }, 600);
            }
            robotFab.classList.toggle('active');
            closeSettingsPanel();
            closeFeatureNav();
        });
    }

    /* ── Settings FAB ── */
    const settingsFab = document.getElementById('settingsFab');
    const settingsPanel = document.getElementById('settingsPanel');

    if (settingsFab && settingsPanel) {
        settingsFab.addEventListener('click', () => {
            const isOpen = settingsPanel.classList.contains('open');
            if (isOpen) {
                closeSettingsPanel();
            } else {
                closeFeatureNav();
                settingsPanel.classList.add('open');
                settingsPanel.setAttribute('aria-hidden', 'false');
                settingsFab.style.color = '#f59e0b';
            }
        });
    }

    /* ── Navigate FAB ── */
    const navigateFab = document.getElementById('navigateFab');
    const featureNav = document.getElementById('featureNav');

    if (navigateFab && featureNav) {
        navigateFab.addEventListener('click', () => {
            const isOpen = featureNav.classList.contains('open');
            if (isOpen) {
                closeFeatureNav();
            } else {
                closeSettingsPanel();
                featureNav.classList.add('open');
                featureNav.setAttribute('aria-hidden', 'false');
                navigateFab.style.color = '#34d399';
            }
        });
    }

    /* ── Close helpers ── */
    window.closeSettingsPanel = function () {
        if (settingsPanel) {
            settingsPanel.classList.remove('open');
            settingsPanel.setAttribute('aria-hidden', 'true');
        }
        if (settingsFab) settingsFab.style.color = '';
    };

    window.closeFeatureNav = function () {
        if (featureNav) {
            featureNav.classList.remove('open');
            featureNav.setAttribute('aria-hidden', 'true');
        }
        if (navigateFab) navigateFab.style.color = '';
    };

    /* ── Click outside to close panels ── */
    document.addEventListener('click', (e) => {
        if (settingsPanel?.classList.contains('open') &&
            !settingsPanel.contains(e.target) && e.target !== settingsFab) {
            closeSettingsPanel();
        }
        if (featureNav?.classList.contains('open') &&
            !featureNav.contains(e.target) && e.target !== navigateFab) {
            closeFeatureNav();
        }
    });

    /* ── Theme setter ── */
    window.setTheme = function (mode) {
        document.documentElement.setAttribute('data-theme', mode);
        const dark = document.getElementById('spDark');
        const light = document.getElementById('spLight');
        if (dark) dark.classList.toggle('active', mode === 'dark');
        if (light) light.classList.toggle('active', mode === 'light');
        
        // Also update navbar settings buttons
        const nspDark = document.getElementById('nspDark');
        const nspLight = document.getElementById('nspLight');
        if (nspDark) nspDark.classList.toggle('active', mode === 'dark');
        if (nspLight) nspLight.classList.toggle('active', mode === 'light');
        
        localStorage.setItem('portfolio-theme', mode);
    };

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const spDark = document.getElementById('spDark');
    const spLight = document.getElementById('spLight');
    if (spDark) spDark.classList.toggle('active', savedTheme === 'dark');
    if (spLight) spLight.classList.toggle('active', savedTheme === 'light');

    /* ── Section Navigator — scroll to section ── */
    window.navTo = function (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Highlight briefly
            el.style.transition = 'outline 0.3s ease';
            el.style.outline = '2px solid rgba(167,139,250,0.4)';
            el.style.outlineOffset = '8px';
            setTimeout(() => { el.style.outline = ''; el.style.outlineOffset = ''; }, 1800);
        }
        closeFeatureNav();
    };

    /* ── Kill all custom cursor logic ── */
    // Prevent any existing cursor scripts from doing anything
    const style = document.createElement('style');
    style.textContent = `
    #cursor-dot, #cursor-follower, #cursor-glow,
    .cursor-dot, .cursor-follower, .cursor-glow, .cursor-ring {
      display: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    * { cursor: auto !important; }
    a, button, [role="button"], .hire-btn, .fab-cluster-btn,
    .fn-item, .matrix-tab, .sp-theme-btn, .nav-link, .nav-cta {
      cursor: pointer !important;
    }
  `;
    document.head.appendChild(style);

    /* ── Escape key closes panels ── */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSettingsPanel();
            closeFeatureNav();
        }
    });

})();
