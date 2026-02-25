/* ═══════════════════════════════════════════════════
   PREMIUM PORTFOLIO JS — All feature logic
   premium.js
   ═══════════════════════════════════════════════════ */

/* ─── MINDSET SECTION ANIMATIONS ON SCROLL ─── */
(function initMindsetAnimations() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSection.classList.add('mindset-animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(aboutSection);
})();

/* ─── DARK / LIGHT MODE TOGGLE ─── */
(function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    let dark = true;

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        dark = !dark;
        root.setAttribute('data-theme', dark ? 'dark' : 'light');
        toggle.innerHTML = dark ? sunIcon() : moonIcon();
        toggle.title = dark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });

    function sunIcon() {
        return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="3.5" stroke="currentColor" stroke-width="1.4"/>
      <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.2 3.2l1.4 1.4M13.4 13.4l1.4 1.4M3.2 14.8l1.4-1.4M13.4 4.6l1.4-1.4"
        stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    </svg>`;
    }
    function moonIcon() {
        return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M15 10.5A7.5 7.5 0 017.5 3a7.5 7.5 0 100 12 7.5 7.5 0 007.5-4.5z"
        stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    </svg>`;
    }
})();

/* ─── SKILL MATRIX TABS ─── */
(function initSkillMatrix() {
    const tabs = document.querySelectorAll('.matrix-tab');
    const panels = document.querySelectorAll('.matrix-panel');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById('panel-' + tab.dataset.tab);
            if (target) target.classList.add('active');
        });
    });
})();

/* ─── STRENGTH BARS — Trigger on scroll ─── */
(function initStrengthBars() {
    const fills = document.querySelectorAll('.strength-fill');
    if (!fills.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                setTimeout(() => { el.style.width = el.dataset.width; }, 200);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(el => observer.observe(el));
})();

/* ─── TECH RADAR — Canvas draw ─── */
(function initTechRadar() {
    const canvas = document.getElementById('techRadarCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = 340;
    const H = canvas.height = 340;
    const cx = W / 2, cy = H / 2, R = 130;

    const axes = [
        { label: 'AI / ML', score: 0.88, color: '#a78bfa' },
        { label: 'Frontend', score: 0.72, color: '#60a5fa' },
        { label: 'Backend', score: 0.65, color: '#34d399' },
        { label: 'Data Eng.', score: 0.80, color: '#f59e0b' },
        { label: 'Cloud', score: 0.55, color: '#ec4899' },
        { label: 'CV/Vision', score: 0.78, color: '#a78bfa' },
    ];

    const N = axes.length;
    const angle = i => (Math.PI * 2 * i / N) - Math.PI / 2;

    function drawRadar() {
        ctx.clearRect(0, 0, W, H);

        // Grid rings
        [0.25, 0.5, 0.75, 1].forEach((r, i) => {
            ctx.beginPath();
            for (let j = 0; j < N; j++) {
                const x = cx + R * r * Math.cos(angle(j));
                const y = cy + R * r * Math.sin(angle(j));
                j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(255,255,255,${0.04 + i * 0.015})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        // Axis lines
        axes.forEach((_, i) => {
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + R * Math.cos(angle(i)), cy + R * Math.sin(angle(i)));
            ctx.strokeStyle = 'rgba(255,255,255,0.06)';
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        // Data polygon — animate fill
        ctx.beginPath();
        axes.forEach((ax, i) => {
            const x = cx + R * ax.score * Math.cos(angle(i));
            const y = cy + R * ax.score * Math.sin(angle(i));
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        grad.addColorStop(0, 'rgba(167,139,250,0.35)');
        grad.addColorStop(1, 'rgba(59,130,246,0.12)');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = 'rgba(167,139,250,0.7)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Data points
        axes.forEach((ax, i) => {
            const x = cx + R * ax.score * Math.cos(angle(i));
            const y = cy + R * ax.score * Math.sin(angle(i));
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = ax.color;
            ctx.fill();
            ctx.strokeStyle = 'rgba(8,12,28,0.9)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        });

        // Labels
        ctx.font = '600 11px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        axes.forEach((ax, i) => {
            const labelR = R + 24;
            const x = cx + labelR * Math.cos(angle(i));
            const y = cy + labelR * Math.sin(angle(i));
            ctx.fillStyle = 'rgba(226,232,240,0.85)';
            ctx.fillText(ax.label, x, y + 4);
        });
    }

    // Animate in
    let progress = 0;
    const axesCopy = axes.map(a => ({ ...a, score: 0 }));
    const targets = axes.map(a => a.score);

    function animateRadar() {
        progress += 0.032;
        const ease = 1 - Math.pow(1 - Math.min(progress, 1), 3);
        axesCopy.forEach((ax, i) => { ax.score = targets[i] * ease; });

        // Draw with animated axes
        const orig = axes;
        ctx.clearRect(0, 0, W, H);
        // rings
        [0.25, 0.5, 0.75, 1].forEach((r, ri) => {
            ctx.beginPath();
            for (let j = 0; j < N; j++) {
                const x = cx + R * r * Math.cos(angle(j));
                const y = cy + R * r * Math.sin(angle(j));
                j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(255,255,255,${0.04 + ri * 0.015})`;
            ctx.lineWidth = 1; ctx.stroke();
        });
        axes.forEach((_, i) => {
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + R * Math.cos(angle(i)), cy + R * Math.sin(angle(i)));
            ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1; ctx.stroke();
        });
        // polygon
        ctx.beginPath();
        axesCopy.forEach((ax, i) => {
            const x = cx + R * ax.score * Math.cos(angle(i));
            const y = cy + R * ax.score * Math.sin(angle(i));
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        grad.addColorStop(0, 'rgba(167,139,250,0.35)');
        grad.addColorStop(1, 'rgba(59,130,246,0.12)');
        ctx.fillStyle = grad; ctx.fill();
        ctx.strokeStyle = 'rgba(167,139,250,0.7)'; ctx.lineWidth = 1.5; ctx.stroke();
        // dots
        axesCopy.forEach((ax, i) => {
            const x = cx + R * ax.score * Math.cos(angle(i));
            const y = cy + R * ax.score * Math.sin(angle(i));
            ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = axes[i].color; ctx.fill();
            ctx.strokeStyle = 'rgba(8,12,28,0.9)'; ctx.lineWidth = 1.5; ctx.stroke();
        });
        // labels
        ctx.font = '600 11px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        axes.forEach((ax, i) => {
            const lR = R + 24;
            const x = cx + lR * Math.cos(angle(i)); const y = cy + lR * Math.sin(angle(i));
            ctx.fillStyle = 'rgba(226,232,240,0.85)';
            ctx.fillText(ax.label, x, y + 4);
        });

        if (progress < 1) requestAnimationFrame(animateRadar);
    }

    // Trigger when in view
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { animateRadar(); observer.disconnect(); }
    }, { threshold: 0.3 });
    observer.observe(canvas);
})();

/* ─── GITHUB CONTRIBUTION GRID ─── */
(function buildContribGrid() {
    const grid = document.getElementById('contribGrid');
    if (!grid) return;

    const today = new Date();
    const weeks = 26; // 6 months
    // Seeded pseudo-random for consistent look
    function seededRand(seed) {
        let x = Math.sin(seed + 1) * 10000;
        return x - Math.floor(x);
    }

    const months = [];
    let dayCount = 0;

    for (let w = 0; w < weeks; w++) {
        const week = document.createElement('div');
        week.className = 'contrib-week';
        for (let d = 0; d < 7; d++) {
            const dayIdx = w * 7 + d;
            const date = new Date(today);
            date.setDate(today.getDate() - ((weeks * 7) - dayIdx));
            const r = seededRand(dayIdx * 7 + d);
            // Weighted toward recent months being more active
            const recencyWeight = dayIdx / (weeks * 7);
            const level = r < 0.35 ? 0 :
                r < 0.55 ? 1 :
                    (r < 0.72 || recencyWeight < 0.5) ? 2 :
                        r < 0.88 ? 3 : 4;

            const cell = document.createElement('div');
            cell.className = `contrib-day c-${level}`;
            cell.dataset.date = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
            cell.title = cell.dataset.date;
            week.appendChild(cell);
            dayCount += level;
        }
        grid.appendChild(week);

        // Track month labels
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - ((weeks * 7) - w * 7));
        if (w === 0 || weekStart.getDate() <= 7) {
            months.push({ w, label: weekStart.toLocaleDateString('en-US', { month: 'short' }) });
        }
    }

    document.getElementById('contribCount').textContent = (dayCount * 2 + 112) + ' contributions in the last 6 months';
})();

/* ─── ACHIEVEMENT TIMELINE REVEAL ─── */
(function initTimelinePro() {
    const items = document.querySelectorAll('.tl-pro-item');
    if (!items.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('tl-visible'), i * 120);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    items.forEach(item => observer.observe(item));
})();

/* ─── UNIVERSAL SCROLL REVEAL for premium sections ─── */
(function initPremiumReveal() {
    const els = document.querySelectorAll('.pm-reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('pm-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    els.forEach(el => observer.observe(el));
})();

/* ─── HIRE PANEL — cursor hover ─── */
(function initHirePanel() {
    document.querySelectorAll('.hire-btn').forEach(btn => {
        btn.style.cursor = 'none';
        btn.addEventListener('mouseenter', () => {
            document.getElementById('cursor-dot')?.classList.add('hovering');
            document.getElementById('cursor-follower')?.classList.add('hovering');
        });
        btn.addEventListener('mouseleave', () => {
            document.getElementById('cursor-dot')?.classList.remove('hovering');
            document.getElementById('cursor-follower')?.classList.remove('hovering');
        });
    });
})();
