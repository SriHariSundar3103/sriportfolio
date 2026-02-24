/* ═══════════════════════════════════════════════════
   HACKER TERMINAL — Interactive Dev Console
   ═══════════════════════════════════════════════════ */
(function initTerminal() {
    const body = document.getElementById('terminalBody');
    const input = document.getElementById('termInput');
    if (!body || !input) return;

    const PROMPT = 'srihari@ai-dev:~$ ';

    /* ── Command definitions ── */
    const COMMANDS = {
        help: () => [
            { type: 'title', text: 'Available Commands' },
            { type: 'cmd-row', cmd: 'whoami', desc: 'About Sri Hari Sundar' },
            { type: 'cmd-row', cmd: 'skills', desc: 'List all technical skills' },
            { type: 'cmd-row', cmd: 'projects', desc: 'View AI projects' },
            { type: 'cmd-row', cmd: 'certs', desc: 'Certifications & credentials' },
            { type: 'cmd-row', cmd: 'contact', desc: 'Get in touch' },
            { type: 'cmd-row', cmd: 'status', desc: 'What I\'m building right now' },
            { type: 'cmd-row', cmd: 'iit', desc: 'IIT Bombay program details' },
            { type: 'cmd-row', cmd: 'tools', desc: 'AI tools I\'ve explored' },
            { type: 'cmd-row', cmd: 'vision', desc: 'Career vision & goals' },
            { type: 'cmd-row', cmd: 'matrix', desc: '🎉 Easter egg' },
            { type: 'cmd-row', cmd: 'clear', desc: 'Clear terminal' },
        ],

        whoami: () => [
            { type: 'title', text: 'Sri Hari Sundar R' },
            { type: 'line', text: '┌─ Role     : AI Developer · ML Engineer · Intelligent Systems Builder' },
            { type: 'line', text: '├─ College  : Salem, Tamil Nadu, India' },
            { type: 'line', text: '├─ Program  : IIT Bombay AI & ML Certification (Active)' },
            { type: 'line', text: '├─ Focus    : Agricultural AI · Computer Vision · Real-World ML' },
            { type: 'line', text: '└─ Mission  : Engineering intelligence for real-world impact' },
            { type: 'blank' },
            { type: 'success', text: '"I don\'t just learn AI — I build systems that solve real problems."' },
        ],

        skills: () => [
            { type: 'title', text: 'Technical Skills' },
            { type: 'line', text: '┌─ Languages    : Python · JavaScript · SQL · HTML/CSS' },
            { type: 'line', text: '├─ ML/AI        : Scikit-Learn · TensorFlow · PyTorch · OpenCV' },
            { type: 'line', text: '├─ Data         : Pandas · NumPy · Matplotlib · Feature Engineering' },
            { type: 'line', text: '├─ APIs         : Gemini · REST · OpenWeatherMap · GitHub' },
            { type: 'line', text: '├─ Tools        : Git · VSCode · Jupyter · Google Colab · Figma' },
            { type: 'line', text: '├─ Mobile       : React Native · Expo · Android Studio' },
            { type: 'line', text: '└─ Exploring    : FastAPI · Docker · MLflow · Ray · Transformers' },
        ],

        projects: () => [
            { type: 'title', text: 'AI Projects' },
            { type: 'blank' },
            { type: 'subtitle', text: '🌾 CropScout Pro — Agricultural Intelligence Platform' },
            { type: 'line', text: '   Stack  : Python · Scikit-Learn · Pandas · NumPy · OpenWeatherMap API' },
            { type: 'line', text: '   Models : Random Forest (87%) · Gradient Boosting (F1=0.83) · RidgeCV' },
            { type: 'line', text: '   Impact : 30-40% preventable crop losses addressed via real-time alerts' },
            { type: 'blank' },
            { type: 'subtitle', text: '🛡 WildGuard AI — Wildlife Threat Detection System' },
            { type: 'line', text: '   Stack  : Python · OpenCV · Background Subtraction · Alert Engine' },
            { type: 'line', text: '   Models : Motion vector analysis · Threat scoring · Multi-camera' },
            { type: 'line', text: '   Impact : Real-time detection < 200ms · Forest encroachment alerts' },
        ],

        certs: () => [
            { type: 'title', text: 'Certifications & Credentials' },
            { type: 'success', text: '✓ IIT Bombay — AI & Machine Learning (Active Programme)' },
            { type: 'success', text: '✓ IBM — Data Science Professional Certificate' },
            { type: 'success', text: '✓ Deloitte — AI Academy Foundations' },
            { type: 'blank' },
            { type: 'line', text: 'Honour : Top performer in IIT Bombay AI cohort assessments' },
        ],

        contact: () => [
            { type: 'title', text: 'Contact Information' },
            { type: 'line', text: '┌─ Location  : Salem, Tamil Nadu, India' },
            { type: 'line', text: '├─ Email     : sriharisundar.ai@gmail.com' },
            { type: 'line', text: '├─ LinkedIn  : linkedin.com/in/sriharisundar' },
            { type: 'line', text: '└─ GitHub    : github.com/sriharisundar-ai' },
            { type: 'blank' },
            { type: 'success', text: 'Open to internships, research collabs, and AI projects.' },
        ],

        status: () => [
            { type: 'title', text: 'Current Build Status' },
            { type: 'line', text: '  [████████░░]  80%  CropScout Pro v2 — CNN disease classifier' },
            { type: 'line', text: '  [████░░░░░░]  40%  WildGuard — YOLOv8 latency optimization' },
            { type: 'line', text: '  [██████░░░░]  65%  Portfolio — SHAP explainability demos' },
            { type: 'blank' },
            { type: 'line', text: '  Studying : Federated Learning · Transformer architecture deep-dive' },
            { type: 'success', text: '  Status   : 🟢 ACTIVE — building every day' },
        ],

        iit: () => [
            { type: 'title', text: 'IIT Bombay AI & ML Programme' },
            { type: 'line', text: '┌─ Institution : Indian Institute of Technology, Bombay' },
            { type: 'line', text: '├─ Programme   : Professional Certification in AI & Machine Learning' },
            { type: 'line', text: '├─ Modules     : ML Foundations · Deep Learning · NLP · CV · MLOps' },
            { type: 'line', text: '├─ Projects    : CropScout Pro, WildGuard AI developed during this prog.' },
            { type: 'line', text: '└─ Status      : ACTIVE — Advanced module in progress' },
            { type: 'blank' },
            { type: 'success', text: 'Ranked among India\'s #1 technical institution. Highest academic honour.' },
        ],

        tools: () => [
            { type: 'title', text: 'AI Tools Explored (550+)' },
            { type: 'line', text: '  LLMs    : Gemini · GPT-4 · Claude · Llama · Mistral · Phi-3' },
            { type: 'line', text: '  Vision  : DALL-E 3 · Midjourney · Stable Diffusion · Runway' },
            { type: 'line', text: '  Code    : GitHub Copilot · Cursor · Replit AI · Tabnine' },
            { type: 'line', text: '  Audio   : ElevenLabs · Whisper · Suno · Udio' },
            { type: 'line', text: '  Build   : Vercel AI · Langchain · CrewAI · AutoGen · Dify' },
            { type: 'line', text: '  Data    : Roboflow · Label Studio · Weights & Biases · MLflow' },
            { type: 'success', text: '  → Consistent daily AI research practice since 2023' },
        ],

        vision: () => [
            { type: 'title', text: 'Career Vision' },
            { type: 'blank' },
            { type: 'line', text: '  Short-term : Build production-ready AI systems for agriculture & security' },
            { type: 'line', text: '  Mid-term   : Research AI for rural India — federated, explainable ML' },
            { type: 'line', text: '  Long-term  : Found an AI-first company solving real Indian problems' },
            { type: 'blank' },
            { type: 'success', text: '  "Not just an engineer — building AI that changes lives."' },
        ],

        matrix: () => {
            // Trigger matrix animation
            triggerMatrixEgg();
            return [{ type: 'success', text: '  Initiating matrix sequence… 🎉' }];
        },

        clear: () => {
            setTimeout(() => {
                body.innerHTML = `<div class="term-line term-welcome">
          <span class="term-prompt">▶</span>
          <span class="term-text">Terminal cleared. Type <span class="term-cmd">help</span> for commands.</span>
        </div>`;
            }, 100);
            return [];
        },
    };

    /* ── Render output lines ── */
    function renderOutput(lines) {
        lines.forEach((item, idx) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = 'term-line';

                if (item.type === 'title') {
                    div.innerHTML = `<span class="term-title">${item.text}</span>`;
                } else if (item.type === 'subtitle') {
                    div.innerHTML = `<span class="term-subtitle">${item.text}</span>`;
                } else if (item.type === 'cmd-row') {
                    div.innerHTML = `<span class="term-cmd-name">${item.cmd.padEnd(12)}</span><span class="term-cmd-desc">${item.desc}</span>`;
                    div.className += ' term-cmd-row';
                } else if (item.type === 'success') {
                    div.innerHTML = `<span class="term-success">${item.text}</span>`;
                } else if (item.type === 'blank') {
                    div.innerHTML = '&nbsp;';
                } else {
                    div.innerHTML = `<span class="term-text">${item.text}</span>`;
                }

                body.appendChild(div);
                body.scrollTop = body.scrollHeight;
            }, idx * 28);  // stagger each line by 28ms for streaming feel
        });
    }

    /* ── Process command ── */
    function processCommand(raw) {
        const cmd = raw.trim().toLowerCase();

        // Echo the entered command
        const echo = document.createElement('div');
        echo.className = 'term-line term-echo';
        echo.innerHTML = `<span class="term-prompt-echo">${PROMPT}</span><span class="term-entered">${raw}</span>`;
        body.appendChild(echo);

        if (!cmd) { body.scrollTop = body.scrollHeight; return; }

        if (COMMANDS[cmd]) {
            const output = COMMANDS[cmd]();
            if (output && output.length) renderOutput(output);
        } else {
            const notFound = document.createElement('div');
            notFound.className = 'term-line';
            notFound.innerHTML = `<span class="term-error">  bash: ${cmd}: command not found. Type <span class="term-cmd">help</span> for available commands.</span>`;
            body.appendChild(notFound);
        }

        body.scrollTop = body.scrollHeight;
    }

    /* ── Input handler ── */
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const val = input.value;
            input.value = '';
            processCommand(val);
        }
    });

    /* Focus terminal on click anywhere in wrapper */
    document.querySelector('.terminal-wrapper')?.addEventListener('click', () => input.focus());

    /* Auto-welcome after short delay */
    setTimeout(() => {
        renderOutput([
            { type: 'line', text: '  Logged in as srihari · IIT Bombay AI Developer · Salem, India' },
            { type: 'line', text: '  Session: ' + new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) },
            { type: 'blank' },
            { type: 'title', text: '  Type  help  to see all commands ↵' },
        ]);
    }, 600);
})();

/* ── Matrix easter egg ── */
function triggerMatrixEgg() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:all;background:#000;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const cols = Math.floor(canvas.width / 16);
    const drops = Array(cols).fill(1);
    let frames = 0;

    const raf = setInterval(() => {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = '14px JetBrains Mono, monospace';

        drops.forEach((y, i) => {
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y * 16);
            drops[i] = (y > canvas.height / 16 && Math.random() > 0.975) ? 0 : y + 1;
        });

        frames++;
        if (frames > 150) {
            clearInterval(raf);
            canvas.style.transition = 'opacity 0.8s ease';
            canvas.style.opacity = '0';
            setTimeout(() => canvas.remove(), 900);
        }
    }, 40);

    canvas.addEventListener('click', () => {
        clearInterval(raf);
        canvas.remove();
    });
}

/* ═══════════════════════════════════════════════════
   COMPETITIVE COUNTERS — Animated number roll-up
   ═══════════════════════════════════════════════════ */
(function initCompetitiveCounters() {
    const counters = document.querySelectorAll('.comp-num[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const dur = 1200;
            const start = performance.now();

            function tick(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / dur, 1);
                // Ease out quad
                const eased = 1 - (1 - progress) * (1 - progress);
                el.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            }
            requestAnimationFrame(tick);
            observer.unobserve(el);
        });
    }, { threshold: 0.3 });

    counters.forEach(el => observer.observe(el));
})();

/* ═══════════════════════════════════════════════════
   RESEARCH CARDS — Stagger reveal on scroll
   ═══════════════════════════════════════════════════ */
(function initResearchReveal() {
    const cards = document.querySelectorAll('.research-card, .comp-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${i * 0.08}s`;
                entry.target.classList.add('card-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
})();

/* Register new sections with the existing data-reveal observer */
(function registerNewSections() {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('#terminal, #research, #competitive').forEach(sec => {
        revealObserver.observe(sec);
    });
})();
