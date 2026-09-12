
  // Stats Modal Logic
  const statsTrigger = document.getElementById('stats-trigger');
  const statsModal = document.getElementById('stats-modal');
  const statsClose = document.getElementById('stats-modal-close');
  const dynamicStatsGrid = document.getElementById('dynamic-stats-grid');
  let statsLoaded = false;

  async function loadStats() {
    if (statsLoaded || !dynamicStatsGrid) return;
    dynamicStatsGrid.innerHTML = '<div class="stats-loading">Loading stats from GitHub...</div>';
    try {
      const res = await fetch('/stats.json');
      if (!res.ok) throw new Error('Failed to load');
      const stats = await res.json();
      
      dynamicStatsGrid.innerHTML = stats.map(stat => `
        <a href="${stat.profile_url}" target="_blank" class="stat-member-card" style="text-decoration: none; color: inherit;">
          <div class="stat-member-header">
            <img src="${stat.avatar_url}" alt="${stat.name}" class="stat-member-avatar" style="object-fit: cover;" onerror="this.style.display='none'">
            <h4 class="stat-member-name">${stat.username}</h4>
          </div>
          <div class="stat-member-metrics">
            <div class="stat-metric" style="width: 100%;">
              <span class="stat-val">${stat.commits}</span>
              <span class="stat-lbl">Commits</span>
            </div>
          </div>
        </a>
      `).join('');
      statsLoaded = true;
    } catch (e) {
      console.error(e);
      dynamicStatsGrid.innerHTML = '<div class="stats-error">Failed to load statistics. Try again later.</div>';
    }
  }

  if (statsTrigger && statsModal && statsClose) {
    statsTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      statsModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      loadStats();
    });

    statsClose.addEventListener('click', () => {
      statsModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    statsModal.addEventListener('click', (e) => {
      if (e.target === statsModal) {
        statsModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

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

      if (tabId === 'team') {
        const teamCards = activeTab.querySelectorAll('.mentor-card-modern, .team-card-modern, .execom-chip-modern');
        teamCards.forEach((card, idx) => {
          card.classList.remove('stagger-in');
          void card.offsetWidth;
          card.style.animationDelay = `${Math.min(idx * 0.03, 0.5)}s`;
          card.classList.add('stagger-in');

          card.addEventListener('animationend', function handler() {
            card.classList.remove('stagger-in');
            card.style.animationDelay = '';
            card.removeEventListener('animationend', handler);
          });
        });
      }
    }

    // Close mobile menu if open
    mobileNav.classList.remove('open');

    // Update URL hash
    if (history.pushState) {
      history.pushState(null, null, '#' + tabId);
    } else {
      location.hash = '#' + tabId;
    }
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

  // Handle Initial Load based on hash
  function handleHash() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
      switchTab(hash);
    } else {
      switchTab('home'); // Default tab
    }
  }

  // Handle Back/Forward Navigation
  window.addEventListener('popstate', handleHash);

  // Initialize on load
  document.addEventListener('DOMContentLoaded', handleHash);
  // Also call it immediately in case DOM is already loaded
  handleHash();

  // Dark Mode Toggle Logic
  const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // applyTheme('dark'); // We stick to manual toggle per user request, default light
    applyTheme('light');
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }

  if (themeToggleDesktop) themeToggleDesktop.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // Impact Metrics Animation
  const impactMetricsSection = document.getElementById('impact-metrics');
  const metricNumbers = document.querySelectorAll('.metric-number');
  let metricsAnimated = false;

  function animateMetrics() {
    metricNumbers.forEach(metric => {
      const target = +metric.getAttribute('data-target');
      const duration = 2000; // 2 seconds
      const stepTime = 20; // Update every 20ms
      const steps = Math.ceil(duration / stepTime);
      const increment = target / steps;
      let current = 0;

      const updateCounter = setInterval(() => {
        current += increment;
        if (current >= target) {
          metric.innerText = target;
          clearInterval(updateCounter);
        } else {
          metric.innerText = Math.ceil(current);
        }
      }, stepTime);
    });
  }

  // Use Intersection Observer for Metrics
  if (impactMetricsSection && window.IntersectionObserver) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !metricsAnimated) {
        animateMetrics();
        metricsAnimated = true;
      }
    }, { threshold: 0.5 });
    observer.observe(impactMetricsSection);
  }

  // Event Modal Logic
  const eventDetails = {
    'gen-ai': {
      title: 'Generation AI @2047 Summit',
      date: 'Dec 2, 2024',
      text: 'Students engaged in meaningful discussions on sustainability and future technologies at the Generation AI @2047 event. The interaction provided valuable networking opportunities with distinguished UN and industry representatives.',
      image: 'imgs/Events/gen-ai.png'
    },
    'csr-esg': {
      title: 'India CSR & ESG Summit 2024',
      date: 'Annual Event',
      text: 'Students participated in the India ESG & CSR Summit 2024, interacting with industry leaders and investors. The event gave them exposure to corporate sustainability practices and insights into environmental investment trends.',
      image: 'imgs/Events/csr.png'
    },
    'meta-ai': {
      title: 'Open Source AI & Education',
      date: 'META Collab',
      text: 'Students represented the chapter in an exclusive roundtable on Open-Source AI & Education. They shared perspectives on integrating AI into curricula, contributing to discussions with educators, policymakers, and AI experts.',
      image: 'imgs/Events/meta-ai.png'
    },
    'llm-workshop': {
      title: 'LLM Online Session',
      date: 'Workshop',
      text: 'An interactive workshop on Large Language Models (LLMs) was conducted for over 210 students. The session equipped participants with practical AI knowledge and hands-on understanding of emerging technologies.',
      image: 'imgs/Events/llm-workshop.png'
    },
    'founder-interview': {
      title: 'Interview with Founder of 1M1B',
      date: 'Podcast',
      text: 'A podcast session with 1M1B Founder Manav Subodh offered insights into social-tech entrepreneurship and startup funding. Students gained firsthand guidance on innovation, leadership, and impact-driven ventures.',
      image: 'imgs/Events/founder-interview.png'
    },
    'skills-careers': {
      title: 'Skills to Careers Summit',
      date: 'CBSE HQ',
      text: 'Students represented GGSIPU at the "Skills to Careers: Skilling Today, Leading Tomorrow" summit held at CBSE Headquarters, Dwarka. The event brought together 1M1B, IBM, CBSE, policymakers, and industry leaders. Participants gained insights into AI, sustainability, and India\'s national skilling strategy, strengthening the university\'s academic and professional standing.',
      image: 'imgs/Events/skills-to-career.png'
    },
    'pitchmela': {
      title: 'Pitchmela - Elysian 2025',
      date: '2025',
      text: 'Pitching innovative ideas for sustainability and tech-driven social entrepreneurship.',
      image: 'imgs/Events/pitchmela.png'
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
      btn.addEventListener('click', () => {
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

  // ==========================================================================
  // TEAM PAGE INTERACTIVITY (FILTER & LIVE SEARCH)
  // ==========================================================================
  const teamFilterBtns = document.querySelectorAll('.team-filter-btn');
  const teamSections = document.querySelectorAll('.team-section-block');
  const teamSearchInput = document.getElementById('team-search-input');
  const teamSearchClear = document.getElementById('team-search-clear');
  const teamSearchResetBtn = document.getElementById('team-search-reset-btn');
  const teamEmptyState = document.getElementById('team-empty-state');
  const searchQueryHighlight = document.getElementById('search-query-highlight');

  let activeFilter = 'all';

  function filterTeam() {
    const query = (teamSearchInput ? teamSearchInput.value : '').trim().toLowerCase();
    let totalVisible = 0;

    // Toggle clear button
    if (teamSearchClear) {
      teamSearchClear.style.display = query.length > 0 ? 'block' : 'none';
    }

    teamSections.forEach(section => {
      const sectionCategory = section.getAttribute('data-section');
      const matchesCategory = (activeFilter === 'all' || activeFilter === sectionCategory);

      if (!matchesCategory) {
        section.style.display = 'none';
        return;
      }

      // Check cards inside this section
      const cards = section.querySelectorAll('.mentor-card-modern, .team-card-modern, .execom-chip-modern');
      let sectionMatches = 0;

      cards.forEach(card => {
        const name = (card.getAttribute('data-name') || '').toLowerCase();
        const role = (card.getAttribute('data-role') || '').toLowerCase();
        const matchesSearch = !query || name.includes(query) || role.includes(query);

        if (matchesSearch) {
          card.style.display = '';
          sectionMatches++;
        } else {
          card.style.display = 'none';
        }
      });

      if (sectionMatches > 0) {
        section.style.display = 'block';
        totalVisible += sectionMatches;
      } else {
        section.style.display = 'none';
      }
    });

    // Handle empty state
    if (teamEmptyState) {
      if (totalVisible === 0) {
        teamEmptyState.style.display = 'block';
        if (searchQueryHighlight) searchQueryHighlight.textContent = query || activeFilter;
      } else {
        teamEmptyState.style.display = 'none';
      }
    }
  }

  // Filter Buttons
  teamFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      teamFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      filterTeam();
    });
  });

  // Search Input
  if (teamSearchInput) {
    teamSearchInput.addEventListener('input', filterTeam);
  }

  // Toggle Search Box
  const teamSearchToggleBtn = document.getElementById('team-search-toggle-btn');
  const teamSearchBoxContainer = document.getElementById('team-search-box-container');
  
  if (teamSearchToggleBtn && teamSearchBoxContainer) {
    teamSearchToggleBtn.addEventListener('click', () => {
      const isVisible = teamSearchBoxContainer.style.display === 'block';
      teamSearchBoxContainer.style.display = isVisible ? 'none' : 'block';
      
      if (!isVisible && teamSearchInput) {
        teamSearchInput.focus();
      }
      
      teamSearchToggleBtn.classList.toggle('active', !isVisible);
    });
  }

  // Search Clear & Reset
  function resetTeamSearch() {
    if (teamSearchInput) {
      teamSearchInput.value = '';
      teamSearchInput.focus();
    }
    activeFilter = 'all';
    teamFilterBtns.forEach(b => {
      if (b.getAttribute('data-filter') === 'all') {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    filterTeam();
  }

  if (teamSearchClear) teamSearchClear.addEventListener('click', resetTeamSearch);
  if (teamSearchResetBtn) teamSearchResetBtn.addEventListener('click', resetTeamSearch);
// End of script
