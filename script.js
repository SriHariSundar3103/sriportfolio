/* ═══════════════════════════════════════════════════
   Sri Hari Sundar R — Ultra-Premium AI Portfolio
   script.js
═══════════════════════════════════════════════════ */

'use strict';

/* ── LOADER ── */
(function initLoader() {
  const bar = document.getElementById('loaderBar');
  const pct = document.getElementById('loaderPercent');
  const loader = document.getElementById('loader');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initHeroAnimations();
      }, 400);
    }
    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
  }, 80);
  document.body.style.overflow = 'hidden';
})();

/* ── PROFESSIONAL CURSOR ── */
(function initCursor() {
  // Skip on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const dot = document.getElementById('cursor-dot');
  const follower = document.getElementById('cursor-follower');
  const glow = document.getElementById('cursor-glow');
  if (!dot || !follower || !glow) return;

  // Hide native cursor on whole page
  document.body.style.cursor = 'none';

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  // Follower lags behind (lerp factor for follower and glow)
  let fx = mx, fy = my;
  let gx = mx, gy = my;

  // Track mouse position
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  // Animation loop — rAF-powered smooth trailing
  function animateCursor() {
    // Dot snaps instantly (direct position set via left/top)
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';

    // Follower: smooth lerp at ~18% speed
    fx += (mx - fx) * 0.18;
    fy += (my - fy) * 0.18;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';

    // Glow: even slower lerp at ~08% speed for the ambient halo
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    glow.style.left = gx + 'px';
    glow.style.top = gy + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover state — scale up follower on interactive elements
  const interactiveSelector = 'a, button, .mindset-card, .project-case, .skill-orb, .suggestion-chip, .gallery-item, .arch-btn, .nav-cta, input, .modal-close, .impact-card';
  document.querySelectorAll(interactiveSelector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hovering');
      follower.classList.add('hovering');
      el.style.cursor = 'none';
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hovering');
      follower.classList.remove('hovering');
    });
  });

  // Click burst effect — spawn a temporary burst ring at click position
  document.addEventListener('mousedown', () => {
    dot.classList.add('clicking');
    follower.classList.add('clicking');
  });
  document.addEventListener('mouseup', () => {
    dot.classList.remove('clicking');
    follower.classList.remove('clicking');
  });
  document.addEventListener('click', e => {
    const burst = document.createElement('div');
    burst.className = 'cursor-burst';
    burst.style.left = e.clientX + 'px';
    burst.style.top = e.clientY + 'px';
    document.body.appendChild(burst);
    // Remove burst element after animation completes
    burst.addEventListener('animationend', () => burst.remove());
  });

  // Hide cursor elements when mouse leaves the window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    follower.style.opacity = '0';
    glow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    follower.style.opacity = '1';
    glow.style.opacity = '0.7';
  });
})();

/* ── NAVBAR ── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '60px'; navLinks.style.right = '20px';
    navLinks.style.background = 'rgba(5,7,15,0.95)';
    navLinks.style.padding = '20px'; navLinks.style.borderRadius = '12px';
    navLinks.style.border = '1px solid rgba(255,255,255,0.08)';
  });
})();

/* ── NEURAL NETWORK CANVAS ── */
(function initNeural() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], animFrame;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); buildNodes(); });

  let mouseX = W / 2, mouseY = H / 2;
  document.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function buildNodes() {
    nodes = [];
    const count = Math.floor((W * H) / 18000);
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#3b82f6' : '#a78bfa',
        opacity: Math.random() * 0.7 + 0.3
      });
    }
  }
  buildNodes();

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw mouse-reactive connections
    nodes.forEach(n => {
      const dx = n.x - mouseX;
      const dy = n.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        const alpha = (1 - dist / 180) * 0.5;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(167,139,250,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.color + Math.floor(n.opacity * 255).toString(16).padStart(2, '0');
      ctx.fill();
      // Glow
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = n.color + '18';
      ctx.fill();
    });

    animFrame = requestAnimationFrame(draw);
  }
  draw();
})();

/* ── HERO PARTICLES ── */
(function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const delay = Math.random() * 5;
    const dur = Math.random() * 8 + 6;
    const x = Math.random() * 100;
    p.style.cssText = `
      position:absolute; width:${size}px; height:${size}px;
      border-radius:50%; left:${x}%; bottom:-10px;
      background: ${Math.random() > 0.5 ? '#3b82f6' : '#a78bfa'};
      opacity:${Math.random() * 0.6 + 0.2};
      animation: particleRise ${dur}s ${delay}s ease-in-out infinite;
    `;
    container.appendChild(p);
  }
  if (!document.getElementById('particleStyle')) {
    const style = document.createElement('style');
    style.id = 'particleStyle';
    style.textContent = `
      @keyframes particleRise {
        0% { transform: translateY(0) scale(1); opacity: 0.5; }
        50% { opacity: 0.8; }
        100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
})();

/* ── TYPED TEXT ── */
function initHeroAnimations() {
  const roles = ['AI Systems Architect', 'Intelligent Automation Builder', 'Research-Driven Developer', 'ML Engineer'];
  const el = document.getElementById('typedText');
  if (!el) return;
  let ri = 0, ci = 0, deleting = false;
  function type() {
    const word = roles[ri];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 50 : 80);
  }
  type();

  // Hero tagline reveal
  setTimeout(() => document.getElementById('heroTagline')?.classList.add('visible'), 1200);

  // Magnetic button effect
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => btn.style.transform = '');
  });
}

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        if (e.target.id === 'impact' || e.target.closest('#impact')) {
          startCounters();
        }
        // About section triggers: metrics and skill bar animations
        if (e.target.id === 'about' || e.target.closest('#about')) {
          animateAboutMetrics();
          animateSkillBars();
        }
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

  // Impact section
  const impactObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) startCounters();
  }, { threshold: 0.3 });
  const impactSection = document.getElementById('impact');
  if (impactSection) impactObserver.observe(impactSection);

  // Tech counter
  const techObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) animateToolsCount();
  }, { threshold: 0.4 });
  const techSection = document.getElementById('tech');
  if (techSection) techObserver.observe(techSection);
})();

/* ── COUNTER ANIMATION ── */
let countersStarted = false;
function startCounters() {
  if (countersStarted) return;
  countersStarted = true;
  const data = [
    { id: 'counter0', target: 2, duration: 1000 },
    { id: 'counter1', target: 550, duration: 2000 },
    { id: 'counter2', target: 3, duration: 1000 }
  ];
  data.forEach(({ id, target, duration }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  });
}

let toolsCountStarted = false;
function animateToolsCount() {
  if (toolsCountStarted) return;
  toolsCountStarted = true;
  const el = document.getElementById('toolsCount');
  if (!el) return;
  let start = performance.now();
  const dur = 2000;
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * 550) + '+';
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = '550+';
  }
  requestAnimationFrame(step);
}

// Animate metric badges in About section
let aboutMetricsStarted = false;
function animateAboutMetrics() {
  if (aboutMetricsStarted) return;
  aboutMetricsStarted = true;
  document.querySelectorAll('.metric').forEach((m, idx) => {
    const target = parseInt(m.getAttribute('data-target') || '0', 10);
    const el = m.querySelector('.metric-value');
    if (!el) return;
    const start = performance.now();
    const dur = 900 + idx * 120;
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  });
}

// Animate skill bars by reading data-progress on each .skill-fill
let skillBarsStarted = false;
function animateSkillBars() {
  if (skillBarsStarted) return;
  skillBarsStarted = true;
  const fills = document.querySelectorAll('.skill-fill');
  fills.forEach((f, i) => {
    const p = f.getAttribute('data-progress') || '80%';
    setTimeout(() => { f.style.width = p; }, i * 150);
  });
}

/* ── RADAR CHART ── */
(function initRadar() {
  const canvas = document.getElementById('radarChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const labels = ['Python', 'ML/AI', 'CV', 'Data Sci', 'LLMs', 'Systems'];
  const values = [0.92, 0.88, 0.78, 0.85, 0.75, 0.80];
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2;
  const R = Math.min(W, H) / 2 - 40;
  const N = labels.length;

  let progress = 0;
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) animateRadar();
  }, { threshold: 0.5 });
  observer.observe(canvas);

  function getAngle(i) { return (i / N) * 2 * Math.PI - Math.PI / 2; }
  function getXY(i, r) {
    const a = getAngle(i);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }

  function draw(p) {
    ctx.clearRect(0, 0, W, H);
    // Grid
    for (let ring = 1; ring <= 4; ring++) {
      const r = (ring / 4) * R;
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const { x, y } = getXY(i % N, r);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1; ctx.stroke();
    }
    // Axis lines
    for (let i = 0; i < N; i++) {
      const { x, y } = getXY(i, R);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1; ctx.stroke();
    }
    // Data polygon
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const { x, y } = getXY(i, R * values[i] * p);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    grad.addColorStop(0, 'rgba(167,139,250,0.3)');
    grad.addColorStop(1, 'rgba(59,130,246,0.05)');
    ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 1.5; ctx.stroke();
    // Points
    for (let i = 0; i < N; i++) {
      const { x, y } = getXY(i, R * values[i] * p);
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#a78bfa'; ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(167,139,250,0.3)'; ctx.fill();
    }
    // Labels
    if (p > 0.8) {
      const alpha = (p - 0.8) / 0.2;
      for (let i = 0; i < N; i++) {
        const { x, y } = getXY(i, R + 24);
        ctx.font = '500 11px Space Grotesk, sans-serif';
        ctx.fillStyle = `rgba(100,116,139,${alpha})`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(labels[i], x, y);
      }
    }
  }

  let animStarted = false;
  function animateRadar() {
    if (animStarted) return;
    animStarted = true;
    const start = performance.now();
    const dur = 1200;
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      draw(ease);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  draw(0);
})();

/* ── PARALLAX ── */
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  const heroContent = document.getElementById('heroContent');
  if (heroContent) heroContent.style.transform = `translateY(${sy * 0.3}px)`;
  document.querySelectorAll('.hero-glow-1').forEach(el => {
    el.style.transform = `translateY(${sy * 0.15}px)`;
  });
});

/* ── DASHBOARD LIVE ANIMATION ── */
(function initDashboardAnimations() {
  // Cropscout live metrics
  const temps = ['26°C', '27°C', '28°C', '29°C', '28°C', '27°C'];
  const hums = ['68%', '70%', '72%', '74%', '71%', '69%'];
  const scores = [87, 89, 92, 88, 91, 85];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % temps.length;
    const te = document.getElementById('tempVal');
    const he = document.getElementById('humVal');
    const se = document.getElementById('healthVal');
    if (te) te.textContent = temps[idx];
    if (he) he.textContent = hums[idx];
    if (se) se.textContent = scores[idx];
  }, 2500);
})();

/* ── GEMINI AI CHAT ── */
const GEMINI_API_KEY = 'AIzaSyCOSRQDFZ5q0GlBohuyLvNZm-pejnj8S58';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// System prompt that defines Sri Hari AI persona
const SYSTEM_PROMPT = `You are the AI assistant for Sri Hari Sundar R's personal portfolio website. Your name is "Sri Hari AI" or "SHS AI".

Here is everything you know about Sri Hari Sundar R:

👤 PROFILE:
- Full Name: Sri Hari Sundar R
- Role: AI Developer | Machine Learning Engineer | Intelligent Systems Builder
- Education: B.E. Computer Science, Government College of Engineering Salem (GCE Salem), CGPA: 7.5
- Tagline: "Engineering Intelligence for Real-World Impact."

🏆 CERTIFICATIONS:
1. AI Developing Program – Indian Institute of Technology Bombay (IIT Bombay)
2. AI & ML Development – IBM
3. Programming in Python – Deloitte

🚀 PROJECTS:
1. CropScout Pro – AI-based smart agricultural monitoring system
   - Problem: Farmers lack real-time, data-driven insights causing yield losses.
   - Solution: Multi-model ML pipeline combining weather APIs, satellite data, and crop analytics into an actionable intelligence dashboard.
   - Features: ML models for crop health, weather API integration, pest prediction engine, risk scoring system, yield forecasting
   - Tech Stack: Python, Scikit-Learn, Pandas, NumPy, Weather APIs
   - Impact: Risk reduction, pest early warning, real-time crop health scoring

2. WildGuard AI – AI-powered motion detection safety system
   - Problem: Wildlife poaching and rural security threats go undetected without intelligent surveillance.
   - Solution: Computer vision pipeline with frame-by-frame motion analysis, AI alert generation, instant notification dispatch.
   - Features: Real-time CCTV analysis, sub-second motion detection, automated alert dispatch, multi-camera orchestration
   - Tech Stack: Python, OpenCV, Computer Vision, Motion Analysis
   - Impact: Enhanced forest and rural safety, sub-second detection latency

🛠 TECH STACK:
- Languages: Python, C++, Java
- AI/ML: LangChain, Pandas, NumPy, Scikit-Learn
- Computer Vision: OpenCV, Motion Analysis
- Dev Tools: VS Code, Android Studio
- AI Exploration: 550+ AI tools practiced

📊 IMPACT METRICS:
- 2+ AI Systems Built
- 550+ AI Tools Explored
- 3+ Global Certifications
- Daily AI Research Practice

🧠 MINDSET:
- Analytical thinker who decomposes complex AI challenges.
- Systems Thinker: Views problems as interconnected systems.
- Solution-Oriented: Translates research into real-world products.
- Continuous Learner: Explores 550+ AI tools, daily research.

INSTRUCTIONS:
- Always respond in first person AS IF you are Sri Hari's AI assistant speaking on his behalf.
- Keep responses helpful, concise, and technically accurate.
- Use emojis and markdown formatting (bold with **text**) to make responses visually rich.
- For ML concepts or coding questions, give clear, practical answers.
- If asked for an ML roadmap, career advice, or technical guidance, give detailed, actionable steps.
- For interview simulation, ask questions and then provide model answers.
- You can discuss general AI/ML topics, answer coding questions in Python, explain concepts.
- Always be encouraging and professional.
- Respond in the same language the user writes in.
- Keep responses under 250 words unless the user asks for a detailed explanation.`;

// Conversation history for multi-turn context
let chatHistory = [];
let isWaiting = false;

// Offline fallback responses
const fallbackResponses = [
  `Hi! I'm Sri Hari's AI assistant. I'm having a bit of trouble connecting right now, but I can still tell you: Sri Hari is an **AI Developer** certified by **IIT Bombay, IBM & Deloitte**, with projects like **CropScout Pro** and **WildGuard AI**. Try again in a moment! 🌐`,
  `Looks like there's a connection issue. Quick fact: Sri Hari has explored **550+ AI tools** and built **2 production AI systems** — CropScout Pro (agricultural AI) and WildGuard AI (computer vision security). Please retry! 🔄`
];
let fallbackIdx = 0;

function formatMsg(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') // Sanitize
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')     // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>')                  // Italic
    .replace(/`([^`]+)`/g, '<code style="background:rgba(59,130,246,0.15);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:0.85em">$1</code>') // Code
    .replace(/^#{1,3}\s+(.+)$/gm, '<strong style="display:block;margin-top:8px">$1</strong>') // Headers
    .replace(/^[•\-\*]\s+(.+)$/gm, '<span style="display:block;padding-left:12px;margin:2px 0">• $1</span>') // Bullets
    .replace(/^(\d+\.\s+.+)$/gm, '<span style="display:block;padding-left:12px;margin:2px 0">$1</span>') // Numbered
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}

function addMessage(text, isUser = false, isError = false) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${isUser ? 'user-msg' : 'ai-msg'}`;
  if (isError) div.style.opacity = '0.75';
  div.innerHTML = `
    <div class="msg-avatar">${isUser ? 'You' : 'SHS'}</div>
    <div class="msg-bubble" style="${isError ? 'border-color:rgba(239,68,68,0.3)' : ''}">${formatMsg(text)}</div>
  `;
  msgs.appendChild(div);
  // Smooth scroll
  msgs.scrollTo({ top: msgs.scrollHeight, behavior: 'smooth' });
  return div;
}

function showTyping() {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg ai-msg';
  div.id = 'typingMsg';
  div.innerHTML = `<div class="msg-avatar">SHS</div><div class="msg-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
  msgs.appendChild(div);
  msgs.scrollTo({ top: msgs.scrollHeight, behavior: 'smooth' });
}

function removeTyping() {
  document.getElementById('typingMsg')?.remove();
}

function setSendDisabled(disabled) {
  const btn = document.getElementById('chatSendBtn');
  const input = document.getElementById('chatInput');
  if (btn) btn.disabled = disabled;
  if (input) input.disabled = disabled;
  if (btn) btn.style.opacity = disabled ? '0.5' : '1';
}

async function callGeminiAPI(userMessage) {
  // Add user turn to history
  chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });

  const requestBody = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: chatHistory,
    generationConfig: {
      temperature: 0.8,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 600,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
    ]
  };

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `API Error ${response.status}`);
  }

  const data = await response.json();
  const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!aiText) throw new Error('Empty response from Gemini');

  // Add AI response to history for context
  chatHistory.push({ role: 'model', parts: [{ text: aiText }] });

  // Keep history manageable (last 10 turns = 20 entries)
  if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

  return aiText;
}

async function sendMessage() {
  if (isWaiting) return;
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  input.value = '';
  const suggestions = document.querySelector('.chat-suggestions');
  if (suggestions) suggestions.style.display = 'none';

  isWaiting = true;
  setSendDisabled(true);
  addMessage(msg, true);
  showTyping();

  try {
    const aiReply = await callGeminiAPI(msg);
    removeTyping();
    addMessage(aiReply);
  } catch (err) {
    console.warn('Gemini API error:', err.message);
    removeTyping();
    // Use fallback response
    addMessage(fallbackResponses[fallbackIdx % fallbackResponses.length], false, false);
    fallbackIdx++;
  } finally {
    isWaiting = false;
    setSendDisabled(false);
    document.getElementById('chatInput')?.focus();
  }
}

function sendSuggestion(msg) {
  if (isWaiting) return;
  document.getElementById('chatInput').value = msg;
  sendMessage();
}

document.getElementById('chatInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

/* ── MODALS ── */
function openModal(id) {
  document.getElementById(id)?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
  document.body.style.overflow = 'auto';
}
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => {
    if (e.target === m) closeModal(m.id);
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
});

/* ── PREMIUM 3D CARD TILT ── */
(function initCardTilt() {
  const cards = document.querySelectorAll('.project-case, .mindset-card, .impact-card');
  cards.forEach(card => {
    let raf = null;
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      const maxTilt = card.classList.contains('impact-card') ? 6 : 8;
      targetX = -y * maxTilt;
      targetY = x * maxTilt;

      if (!raf) {
        function animate() {
          currentX += (targetX - currentX) * 0.14;
          currentY += (targetY - currentY) * 0.14;
          card.style.transform = `perspective(1200px) rotateX(${currentX}deg) rotateY(${currentY}deg) translateY(-4px) scale(1.01)`;
          if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
            raf = requestAnimationFrame(animate);
          } else {
            raf = null;
          }
        }
        raf = requestAnimationFrame(animate);
      }
    });

    card.addEventListener('mouseleave', () => {
      targetX = 0; targetY = 0;
      function settle() {
        currentX += (0 - currentX) * 0.18;
        currentY += (0 - currentY) * 0.18;
        card.style.transform = `perspective(1200px) rotateX(${currentX}deg) rotateY(${currentY}deg) translateY(0) scale(1)`;
        if (Math.abs(currentX) > 0.02 || Math.abs(currentY) > 0.02) {
          requestAnimationFrame(settle);
        } else {
          card.style.transform = '';
        }
      }
      requestAnimationFrame(settle);
    });
  });
})();

/* ── SHIMMER SCROLL PROGRESS ── */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgressBar') || (() => {
    const el = document.createElement('div');
    el.id = 'scrollProgressBar';
    document.body.appendChild(el);
    return el;
  })();
  bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;z-index:99999;transition:width 0.12s linear;pointer-events:none;';
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

/* Active nav and hero parallax handled by premium versions below */


/* ── GLOW TRAIL ON HOVER ── */
document.querySelectorAll('.skill-orb').forEach(orb => {
  orb.addEventListener('mousemove', e => {
    const r = orb.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const glow = orb.querySelector('.orb-glow');
    if (glow) { glow.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--glow), transparent 70%)`; }
  });
});

/* ── PREMIUM: HERO LETTER-BY-LETTER REVEAL ── */
(function initLetterReveal() {
  const lines = document.querySelectorAll('.hero-name .name-line');
  lines.forEach((line, lineIdx) => {
    const text = line.textContent;
    line.textContent = '';
    line.style.overflow = 'hidden';
    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'name-letter';
      span.textContent = char === ' ' ? '\u00a0' : char;
      span.style.setProperty('--ld', `${lineIdx * 0.3 + i * 0.045}s`);
      line.appendChild(span);
    });
  });
})();

/* ── PREMIUM: STAGGERED CHILD REVEALS ── */
(function initStaggerReveal() {
  // Add stagger delays to children of certain containers
  const staggerTargets = [
    { selector: '.mindset-cards', childSel: '.mindset-card', delay: 0.12 },
    { selector: '.impact-grid', childSel: '.impact-card', delay: 0.10 },
    { selector: '.skill-clusters', childSel: '.cluster', delay: 0.13 },
    { selector: '.timeline', childSel: '.timeline-item', delay: 0.15 },
    { selector: '.gallery-grid', childSel: '.gallery-item', delay: 0.08 },
  ];

  staggerTargets.forEach(({ selector, childSel, delay }) => {
    const container = document.querySelector(selector);
    if (!container) return;
    const children = container.querySelectorAll(childSel);
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * delay}s`;
    });
  });

  // Enhanced IntersectionObserver for staggered reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Also mark sections for ::before divider animation
        if (entry.target.classList.contains('section')) {
          entry.target.classList.add('revealed');
        }
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.section').forEach(s => observer.observe(s));
})();

/* ── PREMIUM: MAGNETIC BUTTON RIPPLE ── */
(function initButtonRipple() {
  document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta, .arch-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const r = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      const size = Math.max(r.width, r.height);
      ripple.style.cssText = `
        width:${size}px; height:${size}px;
        left:${e.clientX - r.left - size / 2}px;
        top:${e.clientY - r.top - size / 2}px;
      `;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
})();

/* ── PREMIUM: CONSTELLATION PARTICLE CANVAS ── */
(function initConstellation() {
  const canvas = document.getElementById('constellationCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouseX = 0, mouseY = 0;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); }), { passive: true };

  // Sparse particles — won't compete with neural canvas
  const COUNT = Math.min(50, Math.floor((W * H) / 28000));
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.35 + 0.1
    });
  }

  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });

  function drawConstellation() {
    ctx.clearRect(0, 0, W, H);

    // Draw lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const alpha = (1 - dist / 160) * 0.08;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(167,139,250,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      // Mouse repulsion — very subtle
      const dx = particles[i].x - mouseX;
      const dy = particles[i].y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (1 - dist / 100) * 0.4;
        particles[i].vx += (dx / dist) * force * 0.03;
        particles[i].vy += (dy / dist) * force * 0.03;
      }

      // Speed cap
      const speed = Math.sqrt(particles[i].vx ** 2 + particles[i].vy ** 2);
      if (speed > 0.6) {
        particles[i].vx = (particles[i].vx / speed) * 0.6;
        particles[i].vy = (particles[i].vy / speed) * 0.6;
      }

      // Update position
      particles[i].x += particles[i].vx;
      particles[i].y += particles[i].vy;
      if (particles[i].x < 0 || particles[i].x > W) particles[i].vx *= -1;
      if (particles[i].y < 0 || particles[i].y > H) particles[i].vy *= -1;

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167,139,250,${particles[i].opacity})`;
      ctx.fill();
    }

    requestAnimationFrame(drawConstellation);
  }
  drawConstellation();
})();

/* ── PREMIUM: ENHANCED HERO PARALLAX (DEPTH LAYERS) ── */
(function initDepthParallax() {
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateParallax() {
    const sy = window.scrollY;
    const heroContent = document.getElementById('heroContent');
    // Smooth parallax using CSS transform (GPU-accelerated)
    if (heroContent && sy < window.innerHeight) {
      heroContent.style.transform = `translateY(${sy * 0.28}px)`;
      heroContent.style.opacity = `${1 - sy / (window.innerHeight * 0.6)}`;
    }
    document.querySelectorAll('.hero-glow-1').forEach(el => {
      el.style.transform = `translateY(${sy * 0.12}px)`;
    });
    document.querySelectorAll('.hero-glow-2').forEach(el => {
      el.style.transform = `translateY(${sy * 0.08}px)`;
    });
    document.querySelectorAll('.hero-glow-3').forEach(el => {
      el.style.transform = `translateY(${sy * 0.05}px)`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
})();

/* ── PREMIUM: PROJECT CARD CORNER DECORATORS ── */
(function addCardCorners() {
  document.querySelectorAll('.project-case').forEach(card => {
    const tl = document.createElement('div');
    const br = document.createElement('div');
    tl.className = 'corner-tl';
    br.className = 'corner-br';
    card.appendChild(tl);
    card.appendChild(br);
  });
})();

/* ── PREMIUM: SMOOTH SECTION ACTIVE NAV ── */
(function initActiveNav() {
  const sections = ['hero', 'about', 'projects', 'gallery', 'ai-lab', 'tech', 'impact'];
  const navLinks = document.querySelectorAll('.nav-link');
  let lastActive = '';

  function updateNav() {
    let current = '';
    sections.forEach(id => {
      const sec = document.getElementById(id);
      if (sec && window.scrollY >= sec.offsetTop - 140) current = id;
    });
    if (current !== lastActive) {
      lastActive = current;
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + current;
        link.classList.toggle('active-section', isActive);
        link.style.color = isActive ? '#e2e8f0' : '';
      });
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
})();

/* ── NAVBAR SETTINGS PANEL ── */
window.toggleNavSettings = function() {
  const panel = document.getElementById('navSettingsPanel');
  const btn = document.getElementById('navSettingsBtn');
  if (panel) {
    const isOpen = panel.classList.contains('open');
    if (isOpen) {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
    } else {
      // Close other panels
      const robotFab = document.getElementById('robotFab');
      if (robotFab) robotFab.classList.remove('active');
      
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
    }
  }
};

// Volume slider
(function initVolume() {
  const slider = document.getElementById('volumeSlider');
  const valueDisplay = document.getElementById('volumeValue');
  if (slider && valueDisplay) {
    slider.addEventListener('input', (e) => {
      valueDisplay.textContent = e.target.value;
      localStorage.setItem('portfolio-volume', e.target.value);
    });
    const saved = localStorage.getItem('portfolio-volume');
    if (saved) {
      slider.value = saved;
      valueDisplay.textContent = saved;
    }
  }
})();

// Initialize theme buttons
(function initThemeButtons() {
  const darkBtn = document.getElementById('nspDark');
  const lightBtn = document.getElementById('nspLight');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  
  if (savedTheme === 'dark') {
    if (darkBtn) darkBtn.classList.add('active');
    if (lightBtn) lightBtn.classList.remove('active');
  } else {
    if (darkBtn) darkBtn.classList.remove('active');
    if (lightBtn) lightBtn.classList.add('active');
  }
})();

// Close settings panel on outside click
document.addEventListener('click', (e) => {
  const panel = document.getElementById('navSettingsPanel');
  const btn = document.getElementById('navSettingsBtn');
  if (panel?.classList.contains('open') && 
      !panel.contains(e.target) && 
      e.target !== btn &&
      !btn?.contains(e.target)) {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  }
});
