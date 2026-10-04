// Initialize script
const navBtns = document.querySelectorAll('.nav-btn');
const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

function switchTab(tabId) {
  if (typeof leafPhase !== 'undefined' && leafPhase !== 'idle') return;
  
  // Start Leaf Transition
  leafPhase = 'entering';
  if(typeof leafCanvas !== 'undefined' && leafCanvas) leafCanvas.style.opacity = '1';
  if(typeof leafContainer !== 'undefined' && leafContainer) leafContainer.style.pointerEvents = 'all';
  if(typeof curtainText !== 'undefined' && curtainText) curtainText.classList.add('active');
  
  mobileNav.classList.remove('open');

  // Wait 1.5s for leaves to cover
  setTimeout(() => {
    // Hide all tabs
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    // Update nav buttons
    navBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.tab === tabId) btn.classList.add('active');
    });
    mobileNavBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.tab === tabId) btn.classList.add('active');
    });
    
    // Show active tab
    const activeTab = document.getElementById(tabId);
    if (activeTab) {
      activeTab.classList.add('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Blow leaves away
    leafPhase = 'exiting';
    if(typeof curtainText !== 'undefined' && curtainText) curtainText.classList.remove('active');
    
    setTimeout(() => {
      leafPhase = 'idle';
      if(typeof leafCanvas !== 'undefined' && leafCanvas) leafCanvas.style.opacity = '0';
      if(typeof leafContainer !== 'undefined' && leafContainer) leafContainer.style.pointerEvents = 'none';
      if(typeof initScrollReveals === 'function') initScrollReveals();
    }, 1500);

  }, 1500); // Wait time for entrance
}

// Desktop Navigation Event Listeners
navBtns.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// Mobile Navigation Event Listeners
mobileNavBtns.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

// Handle Logo Click
const logo = document.getElementById('logo');
if (logo) {
  logo.addEventListener('click', () => switchTab('home'));
}

// Event Modal Logic
const eventDetails = {
  'gen-ai': {
    title: 'Generation AI @2047 Summit',
    date: 'Dec 2, 2024',
    text: 'Students engaged in meaningful discussions on sustainability and future technologies at the Generation AI @2047 event. The interaction provided valuable networking opportunities with distinguished UN and industry representatives.',
    image: 'imgs/gen-ai.png'
  },
  'csr-esg': {
    title: 'India CSR & ESG Summit 2024',
    date: 'Annual Event',
    text: 'Students participated in the India ESG & CSR Summit 2024, interacting with industry leaders and investors. The event gave them exposure to corporate sustainability practices and insights into environmental investment trends.',
    image: 'imgs/csr.png'
  },
  'meta-ai': {
    title: 'Open Source AI & Education',
    date: 'META Collab',
    text: 'Students represented the chapter in an exclusive roundtable on Open-Source AI & Education. They shared perspectives on integrating AI into curricula, contributing to discussions with educators, policymakers, and AI experts.',
    image: 'imgs/meta-ai.png'
  },
  'llm-workshop': {
    title: 'LLM Online Session',
    date: 'Workshop',
    text: 'An interactive workshop on Large Language Models (LLMs) was conducted for over 210 students. The session equipped participants with practical AI knowledge and hands-on understanding of emerging technologies.',
    image: 'imgs/llm-workshop.png'
  },
  'founder-interview': {
    title: 'Interview with Founder of 1M1B',
    date: 'Podcast',
    text: 'A podcast session with 1M1B Founder Manav Subodh offered insights into social-tech entrepreneurship and startup funding. Students gained firsthand guidance on innovation, leadership, and impact-driven ventures.',
    image: 'imgs/founder-interview.png'
  },
  'skills-careers': {
    title: 'Skills to Careers Summit',
    date: 'CBSE HQ',
    text: "Students represented GGSIPU at the 'Skills to Careers: Skilling Today, Leading Tomorrow' summit held at CBSE Headquarters, Dwarka. The event brought together 1M1B, IBM, CBSE, policymakers, and industry leaders. Participants gained insights into AI, sustainability, and India's national skilling strategy, strengthening the university's academic and professional standing.",
    image: 'imgs/skills-to-career.png'
  },
  'pitchmela': {
    title: 'Pitchmela - Elysian 2025',
    date: '2025',
    text: 'Pitching innovative ideas for sustainability and tech-driven social entrepreneurship.',
    image: 'imgs/pitchmela.png'
  }
};

const modal = document.getElementById('event-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const modalText = document.getElementById('modal-text');
const modalImage = document.getElementById('modal-image');

if (modal) {
  document.querySelectorAll('.event-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const eventId = btn.getAttribute('data-event-id');
      const data = eventDetails[eventId];
      if (data) {
        modalTitle.textContent = data.title;
        modalDate.textContent = data.date;
        modalText.textContent = data.text;
        modalImage.src = data.image;
        modal.classList.add('active');
      }
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

// Leaf Curtain Engine
let leafContainer = document.getElementById('leaf-curtain-container');
let leafCanvas = document.getElementById('leaf-canvas');
let curtainText = leafContainer ? leafContainer.querySelector('.curtain-text') : null;
let leafPhase = 'idle';

if (leafCanvas) {
  const ctx = leafCanvas.getContext('2d');
  
  function resizeLeafCanvas() {
    leafCanvas.width = window.innerWidth;
    leafCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeLeafCanvas);
  resizeLeafCanvas();

  const leaves = [];
  const maxLeaves = 400;

  class Leaf {
    constructor() {
      this.reset(true);
    }
    
    reset(initial = false) {
      this.x = initial ? Math.random() * leafCanvas.width : -50 - Math.random() * 200;
      this.y = Math.random() * leafCanvas.height;
      this.vx = 2 + Math.random() * 4; 
      this.vy = -1 + Math.random() * 2;
      this.size = 15 + Math.random() * 25;
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.05;
      const greens = ['#10b981', '#059669', '#34d399', '#047857'];
      this.color = greens[Math.floor(Math.random() * greens.length)];
    }

    update() {
      if (leafPhase === 'idle') {
        this.x += this.vx * 0.1;
        this.y += this.vy * 0.1 + Math.sin(this.x * 0.01) * 0.5;
        if (this.x > leafCanvas.width + 50) this.reset();
      } 
      else if (leafPhase === 'entering') {
        this.x += this.vx * 1.5;
        this.y += this.vy * 1.5 + Math.sin(this.x * 0.02) * 2;
        if (this.x > leafCanvas.width + 100) {
          this.x = -50;
          this.y = Math.random() * leafCanvas.height;
        }
      } 
      else if (leafPhase === 'exiting') {
        this.x += this.vx * 2.5;
        this.y += 3 + Math.random() * 3; 
      }
      this.angle += this.spin;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.moveTo(0, -this.size/2);
      ctx.quadraticCurveTo(this.size/2, -this.size/4, this.size/2, this.size/2);
      ctx.quadraticCurveTo(0, this.size/2, -this.size/2, -this.size/4);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -this.size/2);
      ctx.lineTo(0, this.size/2);
      ctx.stroke();
      ctx.restore();
    }
  }

  for (let i = 0; i < maxLeaves; i++) leaves.push(new Leaf());

  function renderLeaves() {
    ctx.fillStyle = leafPhase === 'entering' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(240, 253, 250, 1)';
    ctx.clearRect(0, 0, leafCanvas.width, leafCanvas.height);
    
    if (leafPhase === 'entering') {
      ctx.fillStyle = 'rgba(4, 120, 87, 0.95)';
      ctx.fillRect(0, 0, leafCanvas.width, leafCanvas.height);
    }

    leaves.forEach(leaf => {
      leaf.update();
      if (leaf.x > -100 && leaf.x < leafCanvas.width + 100 && leaf.y > -100 && leaf.y < leafCanvas.height + 100) {
        leaf.draw();
      }
    });
    requestAnimationFrame(renderLeaves);
  }
  renderLeaves();
}

// 3D Scroll Reveal logic
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

function initScrollReveals() {
  document.querySelectorAll('.animate-on-scroll, .reveal-depth').forEach(el => {
    // Upgrade existing to 3d depth
    el.classList.add('reveal-depth');
    revealObserver.observe(el);
  });
}
initScrollReveals();

// Hero Canvas logic
const heroCanvas = document.getElementById('hero-network-canvas');
if (heroCanvas) {
  const hctx = heroCanvas.getContext('2d');
  heroCanvas.width = 400;
  heroCanvas.height = 400;
  const particles = [];
  for(let i=0; i<70; i++) {
    particles.push({
      x: Math.random() * heroCanvas.width,
      y: Math.random() * heroCanvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 3 + 1,
      color: Math.random() > 0.5 ? '#10b981' : '#0ea5e9'
    });
  }
  function renderHero() {
    hctx.clearRect(0,0, heroCanvas.width, heroCanvas.height);
    for(let i=0; i<70; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0 || p.x > heroCanvas.width) p.vx *= -1;
      if(p.y < 0 || p.y > heroCanvas.height) p.vy *= -1;
      
      hctx.beginPath();
      hctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
      hctx.fillStyle = p.color; hctx.fill();
      
      for(let j=i+1; j<70; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x; const dy = p.y - p2.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 70) {
          hctx.beginPath();
          hctx.moveTo(p.x, p.y);
          hctx.lineTo(p2.x, p2.y);
          hctx.strokeStyle = `rgba(16, 185, 129, ${1 - dist / 70})`;
          hctx.lineWidth = 0.6;
          hctx.stroke();
        }
      }
    }
    requestAnimationFrame(renderHero);
  }
  renderHero();
}

// Sticky Header Effect
const headerElement = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (headerElement) {
    if (window.scrollY > 20) {
      headerElement.classList.add('scrolled');
    } else {
      headerElement.classList.remove('scrolled');
    }
  }
});


// --- WIND & LEAVES BACKGROUND ENGINE ---
(function() {
  const canvas = document.getElementById('bg-wind-leaves');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let time = 0;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Leaf {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height; 
    }
    reset() {
      this.x = -50 - Math.random() * 200; 
      this.y = Math.random() * canvas.height;
      this.baseVx = 0.5 + Math.random() * 1.5; 
      this.baseVy = 0.2 + Math.random() * 0.8;
      this.size = 5 + Math.random() * 12; 
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.02; 
      
      const darkGreens = ['#1b261e', '#243328', '#2d4032', '#1a1e16'];
      this.color = darkGreens[Math.floor(Math.random() * darkGreens.length)];
      this.opacity = 0.4 + Math.random() * 0.5; 
    }
    update(windForce) {
      this.x += this.baseVx + windForce;
      this.y += this.baseVy + Math.sin(this.x * 0.01 + time) * 0.5;
      this.angle += this.spin;

      if (this.x > canvas.width + 50 || this.y > canvas.height + 50) {
        this.reset();
        this.y = -50; 
      }
    }
    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      
      ctx.beginPath();
      ctx.moveTo(0, -this.size/2);
      ctx.quadraticCurveTo(this.size/2, -this.size/4, this.size/2, this.size/2);
      ctx.quadraticCurveTo(0, this.size/2, -this.size/2, -this.size/4);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    }
  }

  const leaves = [];
  for (let i = 0; i < 60; i++) leaves.push(new Leaf());

  const drawWindLines = (ctx, t) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'; 
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      let startX = -100;
      let startY = (canvas.height / 5) * i + Math.sin(t * 0.5 + i) * 100;
      ctx.moveTo(startX, startY);
      for (let x = startX; x < canvas.width + 100; x += 50) {
        let yOffset = Math.sin((x * 0.005) + t + i) * 30 + Math.cos((x * 0.002) - t) * 20;
        ctx.lineTo(x, startY + yOffset);
      }
      ctx.stroke();
    }
    ctx.restore();
  };

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time += 0.01;
    const globalWindForce = Math.sin(time * 0.5) * 1.5 + 0.5;
    drawWindLines(ctx, time);
    leaves.forEach(leaf => {
      leaf.update(globalWindForce);
      leaf.draw(ctx);
    });
    requestAnimationFrame(render);
  };
  render();
})();

// Background Parallax Scroll
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const mountain = document.getElementById('layer-mountain');
  const trees = document.getElementById('layer-trees-back');
  if (mountain) mountain.style.transform = `translateY(${scrolled * 0.3}px)`;
  if (trees) trees.style.transform = `translateY(${scrolled * 0.15}px)`;
});
