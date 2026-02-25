/* ═══════════════════════════════════════════════════════
   HIRING PERSPECTIVE MODE — AI Role Analyzer Chatbot
   Evaluates candidate fit for specific AI/ML roles
═══════════════════════════════════════════════════════ */

// Initialize immediately since script loads after DOM
console.log('🚀 Loading Hiring Perspective Mode...');

// Setup initialization
function initHiringModeSystem() {
  console.log('📍 Initializing Hiring Mode System...');
  // Create a small on-page debug overlay so the user can copy logs
  // without opening DevTools. Visible only during development.
  try {
    createDebugOverlay();
  } catch (e) {
    console.warn('Could not create debug overlay', e);
  }
  
  try {
    // Get toggle elements
    const toggle1 = document.getElementById('hiringPerspectiveToggle');
    const toggle2 = document.getElementById('hiringPerspectiveToggle2');
    
    console.log('✓ Toggle 1:', toggle1 ? 'Found' : 'Missing');
    console.log('✓ Toggle 2:', toggle2 ? 'Found' : 'Missing');
    
    // Add direct event listeners
    if (toggle1) {
      toggle1.addEventListener('change', function() {
        console.log('Toggle 1 changed:', this.checked);
        handleToggleChange(this.checked);
      });
    }
    
    if (toggle2) {
      toggle2.addEventListener('change', function() {
        console.log('Toggle 2 changed:', this.checked);
        handleToggleChange(this.checked);
      });
    }
    
    // Setup keyboard events
    document.addEventListener('keydown', handleKeyboardEvents);
    
    // Test if modal exists
    const modal = document.getElementById('roleInputModal');
    const panel = document.getElementById('aiAnalysisPanel');
    const input = document.getElementById('roleInput');
    const messages = document.getElementById('aiChatMessages');
    
    console.log('✓ Role Modal:', modal ? 'Found' : 'Missing');
    console.log('✓ AI Panel:', panel ? 'Found' : 'Missing');
    console.log('✓ Role Input:', input ? 'Found' : 'Missing');
    console.log('✓ Chat Messages:', messages ? 'Found' : 'Missing');
    
    if (modal && panel && input && messages) {
      console.log('✅ All required elements found! System ready.');
      logDebug('System ready — debug overlay active');
    } else {
      console.error('❌ Some required elements are missing!');
    }
    
    // Bind submit button and enter key to submitRole to ensure clicks work
    const submitBtn = document.querySelector('.role-submit-btn');
    if (submitBtn) {
      submitBtn.removeEventListener('click', submitRole);
      submitBtn.addEventListener('click', (e) => { e.preventDefault(); submitRole(); });
      console.log('✓ Bound submit button');
      logDebug('Bound submit button');
    }
    if (input) {
      input.removeEventListener('keydown', handleKeyboardEvents);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); submitRole(); }
      });
      console.log('✓ Bound Enter key on input');
      logDebug('Bound Enter key on input');
    }
    
    // Ensure close buttons and overlay are bound (to work around inline onclick issues)
    const modalClose = document.querySelector('.role-modal-close');
    if (modalClose) {
      modalClose.removeEventListener('click', closeRoleModal);
      modalClose.addEventListener('click', (e) => { e.preventDefault(); closeRoleModal(); });
      console.log('✓ Bound modal close button');
      logDebug('Bound modal close button');
    }
    const modalOverlay = document.querySelector('.role-modal-overlay');
    if (modalOverlay) {
      modalOverlay.removeEventListener('click', closeRoleModal);
      modalOverlay.addEventListener('click', (e) => { e.preventDefault(); closeRoleModal(); });
      console.log('✓ Bound modal overlay');
      logDebug('Bound modal overlay');
    }
    const aiClose = document.querySelector('.ai-analysis-close');
    if (aiClose) {
      aiClose.removeEventListener('click', closeAiAnalysis);
      aiClose.addEventListener('click', (e) => { e.preventDefault(); closeAiAnalysis(); });
      console.log('✓ Bound AI panel close button');
      logDebug('Bound AI panel close button');
    }
    
    // Bind dev terminal run button
    const dtRunBtn = document.getElementById('dtRunBtn');
    if (dtRunBtn) {
      dtRunBtn.removeEventListener('click', runDevCommand);
      dtRunBtn.addEventListener('click', runDevCommand);
      console.log('✓ Bound dev terminal run button');
      logDebug('Bound dev terminal run button');
    }
    
    // Bind Enter key on dev terminal input
    const dtInput = document.getElementById('devTerminalInput');
    if (dtInput) {
      dtInput.removeEventListener('keydown', handleDevTerminalKeyDown);
      dtInput.addEventListener('keydown', handleDevTerminalKeyDown);
      console.log('✓ Bound dev terminal input');
      logDebug('Bound dev terminal input');
    }
    
  } catch (error) {
    console.error('Error initializing:', error);
  }
}

// Debug overlay helpers (development only)
function createDebugOverlay() {
  if (document.getElementById('hpDebugOverlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'hpDebugOverlay';
  overlay.innerHTML = `
    <div class="hp-debug-header">Hiring Debug <button id="hpDebugClear" title="Clear">Clear</button></div>
    <div id="hpDebugLines" class="hp-debug-lines"></div>
  `;
  document.body.appendChild(overlay);
  const clearBtn = document.getElementById('hpDebugClear');
  if (clearBtn) clearBtn.addEventListener('click', () => { const lines = document.getElementById('hpDebugLines'); if (lines) lines.innerHTML=''; });
}

function logDebug(msg) {
  try {
    const container = document.getElementById('hpDebugLines');
    if (!container) return;
    const line = document.createElement('div');
    line.className = 'hp-debug-line';
    const time = new Date().toLocaleTimeString();
    line.textContent = `[${time}] ${msg}`;
    container.appendChild(line);
    // keep last 40 lines
    while (container.children.length > 40) container.removeChild(container.firstChild);
  } catch (e) {
    // swallow
  }
}

// Handle toggle change
function handleToggleChange(isChecked) {
  try {
    const toggle1 = document.getElementById('hiringPerspectiveToggle');
    const toggle2 = document.getElementById('hiringPerspectiveToggle2');
    
    // Sync both toggles
    if (toggle1) toggle1.checked = isChecked;
    if (toggle2) toggle2.checked = isChecked;
    
    hiringModeActive = isChecked;
    document.body.style.overflow = isChecked ? 'hidden' : 'auto';
    
    console.log('Toggle state:', isChecked);
    
    if (isChecked) {
      openRoleModal();
    } else {
      closeAiAnalysis();
    }
  } catch (error) {
    console.error('Error in handleToggleChange:', error);
  }
}

// AI Domain Analysis Database
const roleAnalysisDatabase = {
  'ML Engineer': {
    title: 'ML Engineer',
    icon: '🤖',
    description: 'Machine Learning Engineer specializing in model development and deployment',
    skills: [
      'Model development (PyTorch, TensorFlow)',
      'Model training & optimization',
      'Feature engineering & data pipelines',
      'Model deployment & MLOps',
      'Performance tuning & optimization',
      'A/B testing & experimentation'
    ],
    fitScore: 95,
    strengths: [
      'Deep expertise in ML pipelines (Scikit-Learn, PyTorch)',
      'Experience optimizing model accuracy (34% false positive reduction in WildGuard)',
      'Complex hyperparameter tuning knowledge (Ray Tune, MLflow)',
      'Production deployment experience (CropScout Pro, WildGuard AI)',
      'Cross-domain ML application (agriculture, security, visualization)'
    ],
    recommendations: [
      'Your ML training pipeline project shows strong MLOps capabilities',
      'CropScout multi-model approach demonstrates excellent versatility',
      'Consider highlighting model interpretability and explainability work'
    ],
    projects: ['CropScout Pro', 'WildGuard AI', 'ML Training Pipeline', 'Data Visualization'],
    keyTechs: ['Scikit-Learn', 'PyTorch', 'MLflow', 'Ray Tune', 'Pandas', 'NumPy']
  },

  'AI Research Scientist': {
    title: 'AI Research Scientist',
    icon: '🧬',
    description: 'Research-focused role developing novel AI methods and publishing findings',
    skills: [
      'Algorithm design & innovation',
      'Papers & academic writing',
      'Experimental design & benchmarking',
      'Novel architecture exploration',
      'Performance analysis & metrics',
      'Theoretical foundations'
    ],
    fitScore: 78,
    strengths: [
      'Research & Exploration project shows continuous innovation mindset',
      'Evidence of exploring emerging tech (transformers, federated learning)',
      'Experimental approach to design (optical flow + background subtraction)',
      'Quantified improvements (34% accuracy gain, 45% engagement boost)',
      'Proof-of-concept methodology validates ideas before production'
    ],
    recommendations: [
      'Publish papers on your innovations (pest prediction model, motion detection)',
      'Document research methodology and findings more formally',
      'Explore novel architectures in your current systems',
      'Consider academic collaborations or research fellowships'
    ],
    projects: ['Research & Exploration', 'WildGuard AI innovations', 'Data Visualization optimizations'],
    keyTechs: ['PyTorch', 'JAX', 'Research methodology', 'Benchmarking', 'Paper writing']
  },

  'Data Scientist': {
    title: 'Data Scientist',
    icon: '📊',
    description: 'Data-driven professional focused on analytics, insights, and business intelligence',
    skills: [
      'Data analysis & visualization',
      'Statistical modeling',
      'Feature engineering',
      'Business intelligence',
      'Data storytelling',
      'SQL & data wrangling'
    ],
    fitScore: 82,
    strengths: [
      'Strong data pipeline expertise (CropScout Pro weather data integration)',
      'Complex feature engineering (multi-model specialization)',
      'Data visualization mastery (Real-Time Data Visualization with WebGL)',
      'Problem-solution-impact case study approach',
      'Agricultural domain knowledge with data insights'
    ],
    recommendations: [
      'Emphasize data storytelling through your project dashboards',
      'Highlight business impact metrics (70% cost reduction in infrastructure)',
      'Focus on actionable insights from data (pest risk scoring, yield prediction)',
      'Build more advanced BI visualizations and dashboards'
    ],
    projects: ['CropScout Pro', 'Real-Time Data Visualization', 'Intelligent API Gateway'],
    keyTechs: ['Pandas', 'Data visualization', 'Feature engineering', 'SQL', 'Statistical analysis']
  },

  'LLM Engineer': {
    title: 'LLM Engineer',
    icon: '💬',
    description: 'Large Language Model specialist building with transformers and fine-tuned models',
    skills: [
      'Transformer architecture understanding',
      'Fine-tuning & prompt engineering',
      'LLM deployment & optimization',
      'Token optimization',
      'RAG systems & knowledge integration',
      'Model quantization & inference'
    ],
    fitScore: 65,
    strengths: [
      'Research and Exploration includes transformer fine-tuning study',
      'Understanding of model optimization principles',
      'Edge deployment experience (TensorFlow Lite in WildGuard)',
      'Inference optimization background (model compression)',
      'Integration planning skills from API Gateway design'
    ],
    recommendations: [
      'Build LLM-powered project (intelligent query system, chatbot)',
      'Deep dive into prompt engineering and few-shot learning',
      'Explore RAG (Retrieval-Augmented Generation) systems',
      'Study model quantization and edge deployment for LLMs',
      'Consider creating LLM explainability/interpretability tools'
    ],
    projects: ['Research & Exploration', 'Intelligent API Gateway'],
    keyTechs: ['Transformers', 'HuggingFace', 'Prompt engineering', 'Fine-tuning', 'Model quantization']
  },

  'Computer Vision Engineer': {
    title: 'Computer Vision Engineer',
    icon: '👁️',
    description: 'Computer vision specialist building perception systems for visual understanding',
    skills: [
      'Image processing & filtering',
      'Object detection & segmentation',
      'Video analysis & tracking',
      'Model architectures (YOLO, R-CNN, etc)',
      'Edge optimization',
      'Real-time processing'
    ],
    fitScore: 92,
    strengths: [
      'WildGuard AI is production-grade computer vision system',
      'Motion detection with optical flow expertise',
      'Real-time processing optimization (120ms latency)',
      'Edge deployment success (TensorFlow Lite on solar-powered hardware)',
      'False positive reduction focus (8% rate)',
      'Multi-camera coordination in distributed systems'
    ],
    recommendations: [
      'Your WildGuard project is excellent portfolio piece - emphasize it heavily',
      'Consider YOLO v8 optimization work mentioned in your todo',
      'Explore advanced techniques: instance segmentation, 3D perception',
      'Build a real-time object tracking system',
      'Document edge deployment best practices from WildGuard'
    ],
    projects: ['WildGuard AI', 'Real-Time Data Visualization'],
    keyTechs: ['OpenCV', 'YOLO', 'TensorFlow', 'Motion analysis', 'Edge computing']
  },

  'AI Product Manager': {
    title: 'AI Product Manager',
    icon: '🎯',
    description: 'Product-focused role bridging AI development and business strategy',
    skills: [
      'Product strategy & roadmapping',
      'User-centric design thinking',
      'Business metrics & KPIs',
      'Stakeholder management',
      'Feature prioritization',
      'Market analysis'
    ],
    fitScore: 72,
    strengths: [
      'Problem-Solution-Impact framework shows product thinking',
      'User-centric approach (farmers, rural communities, enterprises)',
      'Scalability vision (10k+ concurrent farmers, 500+ sq km deployment)',
      'Business value understanding (cost reduction, risk mitigation)',
      'Technical depth enables informed decision-making',
      'Cross-domain experience shows broad market perspective'
    ],
    recommendations: [
      'Develop more formal product requirements documents (PRDs)',
      'Learn OKR framework and product strategy methodologies',
      'Study go-to-market strategies for AI products',
      'Build product analytics dashboards',
      'Consider startup ideation using your technical AI knowledge'
    ],
    projects: ['CropScout Pro (end-to-end)', 'All projects (impact perspective)'],
    keyTechs: ['Product thinking', 'User research', 'Data analytics', 'Strategic planning']
  },

  'AI Infrastructure Engineer': {
    title: 'AI Infrastructure Engineer',
    icon: '🔧',
    description: 'Infrastructure specialist building systems for AI workload deployment and scaling',
    skills: [
      'Kubernetes & container orchestration',
      'Distributed systems',
      'Infrastructure-as-Code',
      'CI/CD pipelines',
      'Monitoring & observability',
      'Cost optimization'
    ],
    fitScore: 88,
    strengths: [
      'ML Training Pipeline shows strong infrastructure knowledge (Kubernetes, Docker, Airflow)',
      'Intelligent API Gateway demonstrates system design (Prometheus, load balancing)',
      'Cost optimization expertise (70% reduction via spot instances)',
      'Model registry and versioning implementation (MLflow)',
      'Hyperparameter tuning infrastructure (Ray Tune distribution)',
      'Zero-downtime deployment experience'
    ],
    recommendations: [
      'Document infrastructure architecture diagrams and decisions',
      'Explore advanced topics: multi-cloud strategies, serverless AI',
      'Build disaster recovery and high-availability systems',
      'Create infrastructure benchmarking tools',
      'Consider contributing to ML infrastructure projects'
    ],
    projects: ['ML Training Pipeline', 'Intelligent API Gateway'],
    keyTechs: ['Kubernetes', 'Docker', 'Terraform', 'Prometheus', 'Apache Airflow']
  }
};

// Global state
let hiringModeActive = false;
let currentRole = null;

// Legacy toggle function for HTML onchange handlers (will redirect)
function toggleHiringMode(event) {
  console.log('toggleHiringMode called via HTML handler');
  if (event && event.target) {
    handleToggleChange(event.target.checked);
  }
}

// Open Role Input Modal with animation
function openRoleModal() {
  try {
    const modal = document.getElementById('roleInputModal');
    if (!modal) {
      console.error('❌ Modal element not found!');
      return;
    }
    
    console.log('Opening role modal...');
    
    // Remove previous active state
    modal.classList.remove('active');
    
    // Reset and add active class
    modal.classList.add('active');
    // Ensure modal is exposed to assistive tech while open
    modal.removeAttribute('inert');
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    
    // Focus input
    const input = document.getElementById('roleInput');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 300);
    }
    
    console.log('✅ Role modal opened');
  } catch (error) {
    console.error('Error in openRoleModal:', error);
  }
}

// Close Role Input Modal
function closeRoleModal() {
  try {
    const modal = document.getElementById('roleInputModal');
    if (!modal) return;

    // If any element inside the modal currently has focus, move focus
    // to a sensible visible control before hiding so assistive tech
    // users are not left focusing an aria-hidden element. Also blur
    // any focused descendant to prevent blocked aria-hidden.
    try {
      const active = document.activeElement;
      if (active && modal.contains(active)) {
        try { active.blur(); } catch (_) {}
        const fallback = document.getElementById('hiringPerspectiveToggle') || document.getElementById('hiringPerspectiveToggle2');
        if (fallback && typeof fallback.focus === 'function') {
          try { fallback.focus(); } catch (_) {}
        } else {
          // Make body temporarily focusable and move focus there
          const body = document.body;
          const prevTab = body.getAttribute('tabindex');
          body.setAttribute('tabindex', '-1');
          try { body.focus(); } catch (_) {}
          if (prevTab === null) body.removeAttribute('tabindex');
          else body.setAttribute('tabindex', prevTab);
        }
      }
    } catch (fErr) {
      console.warn('Focus move failed while closing modal:', fErr);
    }

    modal.classList.remove('active');
    // Ensure any focused element is blurred before hiding to avoid aria-hidden focus issues
    try { if (document.activeElement) document.activeElement.blur(); } catch (_) {}
    // Mark inert and hide shortly after to give blur/DOM a chance to take effect
    setTimeout(() => {
      try { modal.setAttribute('aria-hidden', 'true'); modal.setAttribute('inert', ''); } catch(e) { modal.setAttribute('aria-hidden', 'true'); }
      // clear any inline styles set during open
      modal.style.display = '';
      modal.style.opacity = '';
      modal.style.animation = '';
    }, 50);
    const toggle1 = document.getElementById('hiringPerspectiveToggle');
    const toggle2 = document.getElementById('hiringPerspectiveToggle2');
    if (toggle1) toggle1.checked = false;
    if (toggle2) toggle2.checked = false;
    hiringModeActive = false;
    document.body.style.overflow = 'auto';
  } catch (error) {
    console.error('Error in closeRoleModal:', error);
  }
}

// Select a role from suggestions
function selectRole(role) {
  const input = document.getElementById('roleInput');
  if (input) input.value = role;
  submitRole();
}

// Submit role for analysis
function submitRole() {
  try {
    const roleInputEl = document.getElementById('roleInput');
    const roleInput = roleInputEl ? roleInputEl.value.trim() : '';
    
    if (!roleInput) {
      alert('Please enter a role to analyze');
      return;
    }

    // Try to find exact match or close match
    let matchedRole = null;
    for (const role in roleAnalysisDatabase) {
      if (role.toLowerCase().includes(roleInput.toLowerCase()) || 
          roleInput.toLowerCase().includes(role.toLowerCase())) {
        matchedRole = role;
        break;
      }
    }

    if (!matchedRole) {
      // Check if it's close to any role
      const roles = Object.keys(roleAnalysisDatabase);
      for (const role of roles) {
        if (role.includes(roleInput) || roleInput.includes(role.split(' ')[0])) {
          matchedRole = role;
          break;
        }
      }
    }

    console.log('submitRole: roleInput="' + roleInput + '"; matchedRole=', matchedRole);
    if (matchedRole && roleAnalysisDatabase[matchedRole]) {
      currentRole = matchedRole;
      addAiMessage(`You asked for: ${matchedRole}`, true);
      try {
        showAiAnalysis(matchedRole);
      } catch (err) {
        console.error('Error showing analysis for matched role:', err);
        addAiMessage('⚠️ Analysis failed. Check console for details.');
        return;
      }
      // close modal after analysis has begun — give more time so the
      // analysis panel can initialize and the first messages render.
      setTimeout(() => closeRoleModal(), 1400);
    } else {
      // Fallback to generic analysis when no precise match
      currentRole = roleInput;
      addAiMessage(`You asked for: ${roleInput}`, true);
      try {
        showGenericAnalysis(roleInput);
      } catch (err) {
        console.error('Error showing generic analysis:', err);
        addAiMessage('⚠️ Analysis failed. Check console for details.');
        return;
      }
      setTimeout(() => closeRoleModal(), 1400);
    }
  } catch (error) {
    console.error('Error in submitRole:', error);
    alert('Error processing role. Please try again.');
  }
}

// Global error catcher to surface runtime errors in the chat UI
window.addEventListener('error', function (event) {
  try {
    console.error('Global error captured:', event.error || event.message);
    addAiMessage('⚠️ An unexpected error occurred. See console for details.');
  } catch (e) {
    console.error('Error in global error handler:', e);
  }
});

// Show AI Analysis Panel with enhanced analysis
function showAiAnalysis(role) {
  try {
    console.log('showAiAnalysis called for role:', role);
    const analysis = roleAnalysisDatabase[role];
    const panel = document.getElementById('aiAnalysisPanel');
    if (!panel) { console.error('AI panel element not found'); return; }
    // ensure panel is visible immediately
    panel.style.display = 'flex';
    panel.style.opacity = '1';
    panel.style.transform = 'translateX(0)';
    panel.classList.add('active');
    // Ensure panel is interactive for assistive tech when visible
    panel.removeAttribute('inert');
    panel.setAttribute('aria-hidden', 'false');

    if (!analysis) {
      console.warn('No analysis found for role:', role);
      addAiMessage(`⚠️ No specialized analysis available for **${role}**. Showing generic guidance...`);
      showGenericAnalysis(role);
      return;
    }

    // Clear previous messages
    const messagesContainer = document.getElementById('aiChatMessages');
    messagesContainer.innerHTML = '';
    
    // Calculate eligibility level
    const eligibilityLevel = calculateEligibility(analysis.fitScore);
    const eligibilityEmoji = getEligibilityEmoji(analysis.fitScore);

    // Timeline for staggered messages
    let timeline = 0;

    // Greeting
    addAiMessage(`👋 Analyzing your profile for **${role}** role...`);
    timeline += 600;

    // Render & animate fit gauge
    try {
      const gauge = document.getElementById('fitGauge');
      if (gauge) {
        gauge.setAttribute('aria-hidden', 'false');
        const pct = analysis.fitScore;
        const r = 30;
        const c = Math.PI * (r * 2);
        const dash = c;
        const offset = c * (1 - pct / 100);
        gauge.innerHTML = `
          <svg viewBox="0 0 72 72" role="img" aria-hidden="false">
            <circle class="gauge-bg" cx="36" cy="36" r="${r}" />
            <circle class="gauge-fg" cx="36" cy="36" r="${r}" stroke-dasharray="${dash}" stroke-dashoffset="${dash}" />
          </svg>
          <div class="gauge-label"><span id="gaugePercent" class="gauge-percent">0%</span><div class="gauge-sub">Fit</div></div>
        `;
        // animate stroke
        const fg = gauge.querySelector('.gauge-fg');
        if (fg) {
          // allow layout
          setTimeout(() => {
            fg.style.transition = 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)';
            fg.style.strokeDashoffset = offset;
          }, 80);
        }
        // animate percent number
        const percentNode = document.getElementById('gaugePercent');
        if (percentNode) {
          let v = 0;
          const step = Math.max(1, Math.floor(pct / 30));
          const intId = setInterval(() => {
            v += step;
            if (v >= pct) { v = pct; clearInterval(intId); }
            percentNode.textContent = v + '%';
          }, 25);
        }
      }
    } catch (gErr) { console.warn('Gauge error', gErr); }

    // Fit Score with Eligibility
    setTimeout(() => {
      addAiMessage(`📊 **OVERALL FIT SCORE: ${analysis.fitScore}%**\n\n${eligibilityEmoji} **Eligibility Level: ${eligibilityLevel}**\n\n${analysis.description}`);
    }, timeline);
    timeline += 900;

    // Strengths
    setTimeout(() => {
      addAiMessage(`💪 **YOUR KEY STRENGTHS:**\n\n${analysis.strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}`);
    }, timeline);
    timeline += 900;

    // Recommendations
    setTimeout(() => {
      addAiMessage(`🎯 **RECOMMENDED FOCUS AREAS:**\n\n${analysis.recommendations.map((r, i) => `→ ${r}`).join('\n')}`);
    }, timeline);
    timeline += 900;

    // Technologies
    setTimeout(() => {
      addAiMessage(`🛠️ **KEY TECHNOLOGIES TO HIGHLIGHT:**\n\n${analysis.keyTechs.map(t => `• ${t}`).join('\n')}`);
    }, timeline);
    timeline += 900;

    // Projects
    setTimeout(() => {
      addAiMessage(`📁 **MOST RELEVANT PROJECTS:**\n\n${analysis.projects.map(p => `✓ ${p}`).join('\n')}`);
    }, timeline);
    timeline += 900;

    // Career Positioning Ideas (Own Ideas)
    setTimeout(() => {
      const ideas = generateCareerIdeas(role, analysis.fitScore);
      addAiMessage(`💡 **CAREER POSITIONING IDEAS:**\n\n${ideas.map((idea, i) => `${i + 1}. ${idea}`).join('\n')}`);
    }, timeline);
    timeline += 1000;

    // Interview Preparation
    setTimeout(() => {
      const questionFocus = generateInterviewFocus(role);
      addAiMessage(`🎤 **INTERVIEW PREPARATION FOCUS:**\n\n${questionFocus.map((q, i) => `→ Be ready to discuss: ${q}`).join('\n')}`);
    }, timeline);
    timeline += 1000;

    // Final Summary with Action Items
    setTimeout(() => {
      const actionItems = generateActionItems(role, analysis.fitScore);
      addAiMessage(`✨ **ACTION PLAN FOR SUCCESS:**\n\n${actionItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}`);
    }, timeline);
    timeline += 1000;

    // Closing message
    setTimeout(() => {
      const verdict = analysis.fitScore >= 80 ? 
        `You are **WELL-POSITIONED** for ${role} roles. Strong match!` :
        analysis.fitScore >= 70 ? 
        `You have **GOOD POTENTIAL** for ${role} roles with some growth areas.` :
        `You have **FOUNDATIONAL SKILLS** for ${role} roles. Focus on the recommended areas.`;
      
      const finalMsg = `🚀 **FINAL VERDICT:**\n\n${verdict}\n\n📧 Good luck with your ${role} journey!`;
      addAiMessage(finalMsg);
      // Also show a lightweight popup in the hero section summarizing the verdict
      try { showHeroPopup(verdict); } catch (e) { console.warn('Hero popup failed', e); }
      scroll_to_bottom();
    }, timeline);
    
    console.log('✅ Analysis displayed for role:', role);
  } catch (error) {
    console.error('Error in showAiAnalysis:', error);
  }
}

// Show generic analysis for unknown roles
function showGenericAnalysis(role) {
  console.log('showGenericAnalysis called for role:', role);
  const panel = document.getElementById('aiAnalysisPanel');
  if (!panel) { console.error('AI panel element not found'); return; }
  panel.style.display = 'flex';
  panel.style.opacity = '1';
  panel.style.transform = 'translateX(0)';
  panel.classList.add('active');
  panel.setAttribute('aria-hidden', 'false');

  const messagesContainer = document.getElementById('aiChatMessages');
  messagesContainer.innerHTML = '';

  addAiMessage(`👋 Analyzing your fit for **${role}**...`);
  
  setTimeout(() => {
    addAiMessage(`📊 **Role Analysis: ${role}**\n\nBased on your AI developer profile, here's how your experience maps to this role:`);
  }, 600);

  setTimeout(() => {
    addAiMessage(`💪 **Your AI/ML Foundation:**\n\n• Multi-domain AI expertise (agriculture, security, infrastructure)\n• Production deployment experience\n• Model optimization & performance tuning\n• Full ML pipeline implementation\n• Edge deployment capabilities`);
  }, 1200);

  setTimeout(() => {
    addAiMessage(`🎯 **How to Position Your Skills:**\n\n1. Highlight relevant project experience\n2. Emphasize domain-specific knowledge\n3. Showcase real-world impact metrics\n4. Demonstrate problem-solving approach\n5. Connect your technical depth to their needs`);
  }, 1800);

  setTimeout(() => {
    addAiMessage(`✨ **Next Steps:** \n\nFor a more detailed analysis, choose one of the common roles (ML Engineer, Data Scientist, etc.) to see role-specific recommendations and fit assessment.`);
    scroll_to_bottom();
  }, 2400);
}

// Add AI message to chat
function addAiMessage(message, isUser = false) {
  const container = document.getElementById('aiChatMessages');
  if (!container) return;

  // For user messages, render immediately
  if (isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message user`;
    const icon = document.createElement('div');
    icon.className = 'ai-message-icon';
    icon.textContent = '👤';
    const bubble = document.createElement('div');
    bubble.className = 'ai-message-bubble';
    bubble.innerHTML = escapeHtml(message).replace(/\n/g, '<br/>');
    messageDiv.appendChild(icon);
    messageDiv.appendChild(bubble);
    container.appendChild(messageDiv);
    scroll_to_bottom();
    return;
  }

  // For AI messages, show typing indicator then replace with real content
  const typingDiv = document.createElement('div');
  typingDiv.className = 'ai-message ai typing';
  const tIcon = document.createElement('div');
  tIcon.className = 'ai-message-icon';
  tIcon.textContent = '🤖';
  const tBubble = document.createElement('div');
  tBubble.className = 'ai-message-bubble typing-bubble';
  tBubble.innerHTML = '<span class="typing-dot">•</span><span class="typing-dot">•</span><span class="typing-dot">•</span>';
  typingDiv.appendChild(tIcon);
  typingDiv.appendChild(tBubble);
  container.appendChild(typingDiv);
  scroll_to_bottom();

  // Simulate typing delay proportional to message length
  const plain = message.replace(/\*\*(.*?)\*\*/g, '$1');
  const delay = Math.min(2200, Math.max(600, plain.length * 25));

  setTimeout(() => {
    // Replace typing with final message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message ai';
    const icon = document.createElement('div');
    icon.className = 'ai-message-icon';
    icon.textContent = '🤖';
    const bubble = document.createElement('div');
    bubble.className = 'ai-message-bubble';
    const formattedMessage = escapeHtml(message)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
    bubble.innerHTML = formattedMessage;
    messageDiv.appendChild(icon);
    messageDiv.appendChild(bubble);
    container.replaceChild(messageDiv, typingDiv);
    scroll_to_bottom();
  }, delay);
}

// Utility to escape HTML to avoid injection
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Scroll to bottom of chat
function scroll_to_bottom() {
  const container = document.querySelector('.ai-chat-container');
  if (container) {
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 0);
  }
}

// Show a small popup in the hero section with a short summary. Click to dismiss.
function showHeroPopup(text) {
  try {
    // Remove existing popup if any
    const existing = document.getElementById('analysisHeroPopup');
    if (existing) existing.remove();

    const hero = document.getElementById('heroContent') || document.querySelector('.hero');
    if (!hero) return;

    const popup = document.createElement('div');
    popup.id = 'analysisHeroPopup';
    popup.className = 'analysis-hero-popup';
    // keep plain text fallback (strip markdown)**
    const plain = text.replace(/\*\*/g, '');
    popup.innerHTML = `<div class="ahp-inner">${plain}</div><button class="ahp-close" aria-label="Close">✕</button>`;
    // clicking anywhere closes
    popup.addEventListener('click', closeHeroPopup);
    hero.appendChild(popup);
    // auto-hide after 12s
    setTimeout(() => { try { popup.classList.add('visible'); } catch(_) {} }, 20);
    setTimeout(() => { try { closeHeroPopup(); } catch(_) {} }, 12000);
  } catch (e) { console.warn('showHeroPopup error', e); }
}

function closeHeroPopup() {
  try {
    const popup = document.getElementById('analysisHeroPopup');
    if (!popup) return;
    popup.classList.remove('visible');
    setTimeout(() => { try { popup.remove(); } catch(_) {} }, 220);
  } catch (e) { console.warn('closeHeroPopup error', e); }
}

// Helper: Calculate Eligibility Level
function calculateEligibility(fitScore) {
  if (fitScore >= 90) return 'EXCELLENT - Strong Candidate';
  if (fitScore >= 80) return 'VERY GOOD - Well Positioned';
  if (fitScore >= 70) return 'GOOD - Solid Fit';
  if (fitScore >= 60) return 'FAIR - Growth Opportunity';
  return 'POTENTIAL - Build Your Skills';
}

// Helper: Get Eligibility Emoji
function getEligibilityEmoji(fitScore) {
  if (fitScore >= 90) return '🌟';
  if (fitScore >= 80) return '⭐';
  if (fitScore >= 70) return '✨';
  if (fitScore >= 60) return '🔄';
  return '🚀';
}

// Helper: Generate Career Positioning Ideas
function generateCareerIdeas(role, fitScore) {
  const ideas = [
    `Develop a thought leadership blog covering ${role} best practices and your portfolio examples`,
    `Create a GitHub showcase project that deeply demonstrates ${role} expertise`,
    `Contribute to open-source ML projects that align with ${role} requirements`,
    `Build a case study showcasing quantifiable business impact from your projects`,
    `Network with ${role} professionals on LinkedIn and engage in technical discussions`,
    `Document your architecture decisions and published insights in a technical portfolio`,
    `Develop specialized skills in emerging tools/frameworks relevant to ${role}`,
    `Create a personal brand as a domain expert through conference talks or webinars`
  ];
  
  // Return top ideas based on fit score
  const numIdeas = fitScore >= 80 ? 4 : fitScore >= 70 ? 5 : 6;
  return ideas.slice(0, numIdeas);
}

// Helper: Generate Interview Focus Areas
function generateInterviewFocus(role) {
  const focusAreas = {
    'ML Engineer': [
      'Your model optimization techniques and hyperparameter tuning approach',
      'Production deployment challenges and how you solved them',
      'Feature engineering process for multi-model systems'
    ],
    'Data Scientist': [
      'Your data pipeline design for real-time analytics',
      'Statistical methods used in your analysis projects',
      'Business value extracted from your data insights'
    ],
    'Computer Vision Engineer': [
      'Technical approach in WildGuard edge detection system',
      'Real-time processing optimization strategies',
      'False positive reduction techniques in production'
    ],
    'AI Research Scientist': [
      'Novel approaches to problems in your research projects',
      'Academic rigor in your experimental design',
      'Potential for publishing your algorithm innovations'
    ],
    'LLM Engineer': [
      'Your experience with transformer architectures',
      'Prompt engineering and few-shot learning applications',
      'Model optimization for inference speed'
    ],
    'default': [
      'Your most complex project and the problems you solved',
      'Your technical decision-making process',
      'How you stay current with emerging technologies'
    ]
  };
  
  return focusAreas[role] || focusAreas['default'];
}

// Helper: Generate Action Items
function generateActionItems(role, fitScore) {
  const baseItems = [
    `Update your resume to highlight ${role}-specific achievements and metrics`,
    `Prepare concrete examples and demos of your most relevant projects`
  ];
  
  if (fitScore >= 80) {
    return [
      ...baseItems,
      `Start applying to ${role} positions at companies you admire`,
      `Build a personal website showcasing your strongest ${role} projects`
    ];
  } else if (fitScore >= 70) {
    return [
      ...baseItems,
      `Deep dive into 2-3 skill gaps identified in recommendations`,
      `Create a learning roadmap with specific online courses and projects`,
      `Build a portfolio project targeting the ${role} role`
    ];
  } else {
    return [
      ...baseItems,
      `Develop a 3-6 month learning plan focusing on recommended areas`,
      `Complete 2-3 intermediate projects in your skill gap areas`,
      `Build relationships with hiring managers in companies you want to join`,
      `Consider starting with a related entry-level position first`
    ];
  }
}

// Helper: Handle Keyboard Events
function handleKeyboardEvents(e) {
  try {
    if (e.key === 'Escape') {
      const modal = document.getElementById('roleInputModal');
      const panel = document.getElementById('aiAnalysisPanel');
      
      if (modal && modal.classList.contains('active')) {
        closeRoleModal();
      }
      if (panel && panel.classList.contains('active')) {
        closeAiAnalysis();
      }
    } else if (e.key === 'Enter') {
      const modal = document.getElementById('roleInputModal');
      if (modal && modal.classList.contains('active')) {
        e.preventDefault();
        submitRole();
      }
    }
  } catch (error) {
    console.error('Error in handleKeyboardEvents:', error);
  }
}

// Close AI Analysis
function closeAiAnalysis() {
  try {
    const panel = document.getElementById('aiAnalysisPanel');
    if (!panel) return;

    // Blur any focused element inside the panel and move focus to a visible control
    try {
      const active = document.activeElement;
      if (active && panel.contains(active)) {
        try { active.blur(); } catch (_) {}
        const fallback = document.getElementById('hiringPerspectiveToggle') || document.getElementById('hiringPerspectiveToggle2');
        if (fallback && typeof fallback.focus === 'function') {
          try { fallback.focus(); } catch (_) {}
        } else {
          const body = document.body;
          const prevTab = body.getAttribute('tabindex');
          body.setAttribute('tabindex', '-1');
          try { body.focus(); } catch (_) {}
          if (prevTab === null) body.removeAttribute('tabindex');
          else body.setAttribute('tabindex', prevTab);
        }
      }
    } catch (fErr) {
      console.warn('Focus move failed while closing AI panel:', fErr);
    }

    panel.classList.remove('active');
    // Blur active element and delay hiding to avoid aria-hidden focus warnings
    try { if (document.activeElement) document.activeElement.blur(); } catch (_) {}
    setTimeout(() => {
      try { panel.setAttribute('aria-hidden', 'true'); panel.setAttribute('inert', ''); } catch(e) { panel.setAttribute('aria-hidden', 'true'); }
      // clear inline styles that keep the panel visible
      panel.style.display = '';
      panel.style.opacity = '';
      panel.style.transform = '';
    }, 50);
    // clear gauge
    const gauge = document.getElementById('fitGauge');
    if (gauge) { gauge.innerHTML = ''; gauge.setAttribute('aria-hidden','true'); }
    // clear any inline styles
    panel.style.animation = '';
    const toggle1 = document.getElementById('hiringPerspectiveToggle');
    const toggle2 = document.getElementById('hiringPerspectiveToggle2');
    if (toggle1) toggle1.checked = false;
    if (toggle2) toggle2.checked = false;
    hiringModeActive = false;
    currentRole = null;
    document.body.style.overflow = 'auto';
  } catch (error) {
    console.error('Error in closeAiAnalysis:', error);
  }
}

// Dev Terminal helpers
function toggleDevTerminal() {
  const panel = document.getElementById('devTerminalPanel');
  if (!panel) return;
  const isHidden = panel.getAttribute('aria-hidden') === 'true';
  if (isHidden) {
    panel.setAttribute('aria-hidden', 'false');
    const input = document.getElementById('devTerminalInput');
    if (input) input.focus();
  } else {
    closeDevTerminal();
  }
}

function closeDevTerminal() {
  const panel = document.getElementById('devTerminalPanel');
  if (!panel) return;
  panel.setAttribute('aria-hidden', 'true');
}

function runDevCommand() {
  const input = document.getElementById('devTerminalInput');
  const output = document.getElementById('devTerminalOutput');
  if (!input || !output) return;
  const cmd = input.value.trim();
  if (!cmd) return;

  // Add user input to output
  const userLine = document.createElement('div');
  userLine.textContent = `> ${cmd}`;
  userLine.style.color = '#4B9965';
  output.appendChild(userLine);
  
  try {
    // Simple JS eval (demo only)
    const result = eval(cmd);
    const resLine = document.createElement('div');
    resLine.textContent = String(result);
    resLine.style.color = '#E2E8F0';
    output.appendChild(resLine);
  } catch (e) {
    const errLine = document.createElement('div');
    errLine.textContent = `Error: ${e.message}`;
    errLine.style.color = '#EF4444';
    output.appendChild(errLine);
  }
  
  setTimeout(() => { output.scrollTop = output.scrollHeight; }, 0);
  input.value = '';
}

// Dev Terminal helpers
function handleDevTerminalKeyDown(e) {
  if (e.key === 'Enter' && e.ctrlKey) {
    e.preventDefault();
    runDevCommand();
  }
}

function toggleDevTerminal() {
  const panel = document.getElementById('devTerminalPanel');
  if (!panel) return;
  const isHidden = panel.getAttribute('aria-hidden') === 'true';
  if (isHidden) {
    panel.setAttribute('aria-hidden', 'false');
    const input = document.getElementById('devTerminalInput');
    if (input) input.focus();
  } else {
    closeDevTerminal();
  }
}

function closeDevTerminal() {
  const panel = document.getElementById('devTerminalPanel');
  if (!panel) return;
  panel.setAttribute('aria-hidden', 'true');
}

function runDevCommand() {
  const input = document.getElementById('devTerminalInput');
  const output = document.getElementById('devTerminalOutput');
  if (!input || !output) return;
  const cmd = input.value.trim();
  if (!cmd) return;

  // Add user input to output
  const userLine = document.createElement('div');
  userLine.textContent = `> ${cmd}`;
  userLine.style.color = '#4B9965';
  output.appendChild(userLine);
  
  try {
    // Simple JS eval (demo only)
    const result = eval(cmd);
    const resLine = document.createElement('div');
    resLine.textContent = String(result);
    resLine.style.color = '#E2E8F0';
    output.appendChild(resLine);
  } catch (e) {
    const errLine = document.createElement('div');
    errLine.textContent = `Error: ${e.message}`;
    errLine.style.color = '#EF4444';
    output.appendChild(errLine);
  }
  
  setTimeout(() => { output.scrollTop = output.scrollHeight; }, 0);
  input.value = '';
}

// Keyboard support - Escape to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('roleInputModal');
    const panel = document.getElementById('aiAnalysisPanel');
    
    if (modal && modal.classList.contains('active')) {
      closeRoleModal();
    }
    if (panel && panel.classList.contains('active')) {
      closeAiAnalysis();
    }
  }
});

// Enter key to submit role
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const modal = document.getElementById('roleInputModal');
    if (modal && modal.classList.contains('active')) {
      e.preventDefault();
      submitRole();
    }
  }
});

// AUTO-INITIALIZE when script loads (runs at end of page load)
console.log('Attempting to initialize Hiring Mode...');
try {
  if (document.readyState === 'loading') {
    // Page still loading, wait for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
      console.log('DOMContentLoaded fired, initializing...');
      initHiringModeSystem();
    });
  } else {
    // DOM already loaded, initialize immediately
    console.log('DOM already loaded, initializing immediately...');
    setTimeout(initHiringModeSystem, 100);
  }
} catch (error) {
  console.error('Failed to initialize:', error);
}

console.log('✅ Hiring Perspective Mode script loaded successfully!');
