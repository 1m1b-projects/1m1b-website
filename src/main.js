// Initialize script
  const navBtns = document.querySelectorAll('.nav-btn');
  const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  function switchTab(tabId) {
    // Hide all tabs
    tabContents.forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Update desktop nav buttons
    navBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active');
      }
    });
    
    // Update mobile nav buttons
    mobileNavBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active');
      }
    });
    
    // Show active tab
    const activeTab = document.getElementById(tabId);
    if (activeTab) {
      activeTab.classList.add('active');
      activeTab.classList.add('animate-fade-in');
      setTimeout(() => {
        activeTab.classList.remove('animate-fade-in');
      }, 400);
    }

    // Close mobile menu if open
    mobileNav.classList.remove('open');
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
      text: 'Students represented GGSIPU at the "Skills to Careers: Skilling Today, Leading Tomorrow" summit held at CBSE Headquarters, Dwarka. The event brought together 1M1B, IBM, CBSE, policymakers, and industry leaders. Participants gained insights into AI, sustainability, and India\'s national skilling strategy, strengthening the university\'s academic and professional standing.',
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
// End of script
