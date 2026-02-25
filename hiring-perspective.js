/* ═══════════════════════════════════════════════════════
   HIRING PERSPECTIVE MODE — AI Role Analyzer Chatbot
   Evaluates candidate fit for specific AI/ML roles
═══════════════════════════════════════════════════════ */

// Initialize immediately since script loads after DOM
console.log('🚀 Loading Hiring Perspective Mode...');

// Setup initialization
function initHiringModeSystem() {
  console.log('📍 Initializing Hiring Mode System...');
  
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
    } else {
      console.error('❌ Some required elements are missing!');
    }
    
  } catch (error) {
    console.error('Error initializing:', error);
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
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
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
    const roleInput = document.getElementById('roleInput').value.trim();
    
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

    if (matchedRole) {
      currentRole = matchedRole;
      closeRoleModal();
      showAiAnalysis(matchedRole);
    } else {
      // Show generic analysis for unknown role
      currentRole = roleInput;
      closeRoleModal();
      showGenericAnalysis(roleInput);
    }
  } catch (error) {
    console.error('Error in submitRole:', error);
    alert('Error processing role. Please try again.');
  }
}

// Show AI Analysis Panel with enhanced analysis
function showAiAnalysis(role) {
  try {
    const analysis = roleAnalysisDatabase[role];
    const panel = document.getElementById('aiAnalysisPanel');
    
    panel.classList.add('active');
    panel.setAttribute('aria-hidden', 'false');

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
      
      addAiMessage(`🚀 **FINAL VERDICT:**\n\n${verdict}\n\n📧 Good luck with your ${role} journey!`);
      scroll_to_bottom();
    }, timeline);
    
    console.log('✅ Analysis displayed for role:', role);
  } catch (error) {
    console.error('Error in showAiAnalysis:', error);
  }
}

// Show generic analysis for unknown roles
function showGenericAnalysis(role) {
  const panel = document.getElementById('aiAnalysisPanel');
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
  const messageDiv = document.createElement('div');
  messageDiv.className = `ai-message ${isUser ? 'user' : 'ai'}`;
  
  const icon = document.createElement('div');
  icon.className = 'ai-message-icon';
  icon.textContent = isUser ? '👤' : '🤖';

  const bubble = document.createElement('div');
  bubble.className = 'ai-message-bubble';
  
  // Parse markdown-like formatting
  const formattedMessage = message
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
  
  bubble.innerHTML = formattedMessage;

  messageDiv.appendChild(icon);
  messageDiv.appendChild(bubble);
  container.appendChild(messageDiv);
  
  scroll_to_bottom();
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
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden', 'true');
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
