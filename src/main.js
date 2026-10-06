import { events } from './events-data.js';

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

  // Give deferred images (data-src) their real src. Chromium fetches
  // loading="lazy" imgs even inside display:none tabs, so hidden-tab images
  // use data-src and are hydrated here on first open or by the idle warmer.
  function hydrateImages(root) {
    root.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }

  function switchTab(tabId) {
    // Hide all tabs
    tabContents.forEach(tab => {
      tab.classList.remove('active');
    });

    // Deferred images: hidden tabs store their image URL in data-src so the
    // initial page load fetches nothing it can't see. Give the tab its real
    // src before showing it.
    const targetTab = document.getElementById(tabId);
    if (targetTab) hydrateImages(targetTab);
    
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
    if (targetTab) {
      targetTab.classList.add('active');
      targetTab.classList.add('animate-fade-in');
      setTimeout(() => {
        targetTab.classList.remove('animate-fade-in');
      }, 400);

      if (tabId === 'team') {
        const teamCards = targetTab.querySelectorAll('.mentor-card-modern, .team-card-modern, .execom-chip-modern');
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

  // Home hero CTA buttons that jump to another tab
  document.querySelectorAll('[data-jump]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.jump));
  });

  // Scroll-reveal for home page sections (elements stay visible without JS;
  // the reveal-ready gate means nothing is hidden until the observer exists)
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && window.IntersectionObserver) {
    document.documentElement.classList.add('reveal-ready');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
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
  
  function applyTheme(theme, animate = false) {
    const root = document.documentElement;
    if (animate) {
      // Enable the color cross-fade just for this toggle, then remove it so
      // hover and other transitions behave normally afterwards.
      root.classList.add('theme-anim');
      window.setTimeout(() => root.classList.remove('theme-anim'), 500);
    }
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  // Check saved theme; first-time visitors get dark mode (the inline
  // <head> script already set data-theme="dark" pre-paint — this persists it)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme('dark');
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark', true);
  }

  if (themeToggleDesktop) themeToggleDesktop.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // Impact Metrics Animation
  const impactMetricsSection = document.getElementById('impact-metrics');
  const metricNumbers = document.querySelectorAll('.metric-number');
  let metricsAnimated = false;

  function animateMetrics() {
    // Single rAF loop for all counters — the old version ran one setInterval
    // (50 ticks/sec) per metric, each writing innerText on its own timer.
    const duration = 2000;
    const start = performance.now();
    const targets = Array.from(metricNumbers, m => +m.getAttribute('data-target'));

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out: fast start, gentle land
      metricNumbers.forEach((metric, i) => {
        metric.innerText = Math.round(targets[i] * eased);
      });
      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
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

  // ==========================================================================
  // EVENTS PAGE — cards and story modal are both rendered from
  // src/events-data.js. To add an event, append an entry there.
  // ==========================================================================
  const PLACEHOLDER_COLORS = { blue: '1e3a8a', green: '16a34a' };
  const READ_MORE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>';

  function renderEventCards() {
    const grid = document.getElementById('events-grid');
    if (!grid) return;
    grid.innerHTML = events.map(ev => {
      const phColor = PLACEHOLDER_COLORS[ev.accent] || PLACEHOLDER_COLORS.blue;
      const phText = encodeURIComponent(ev.imageAlt || ev.title);
      // "Read More" only appears once a story (lead or sections) exists
      const storyBtn = (ev.lead || (ev.sections && ev.sections.length))
        ? `<button class="event-btn" data-event-id="${ev.id}">Read More ${READ_MORE_SVG}</button>`
        : '';
      return `
        <div class="event-card">
          <div class="event-content">
            <div>
              <span class="event-date">${ev.date}</span>
              <h3 class="event-title">${ev.title}</h3>
            </div>
            <div class="event-card-img-wrapper${ev.accent === 'green' ? ' green-border' : ''}">
              <img data-src="${ev.image}" alt="${ev.imageAlt || ev.title}" decoding="async"
                onerror="this.src='https://placehold.co/600x400/${phColor}/ffffff?text=${phText}'" />
            </div>
            <p class="event-desc">${ev.cardDesc}</p>
            ${storyBtn}
          </div>
        </div>`;
    }).join('');
  }
  renderEventCards();

  // Event Story Modal Logic
  const eventOrder = events.map(ev => ev.id);
  const modal = document.getElementById('event-modal');
  const storyModal = document.getElementById('story-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalDate = document.getElementById('modal-date');
  const modalLocation = document.getElementById('modal-location');
  const modalMetaDot = document.getElementById('modal-meta-dot');
  const modalLead = document.getElementById('modal-lead');
  const modalSections = document.getElementById('modal-sections');
  const modalHighlightsWrap = document.getElementById('modal-highlights-wrap');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalProgress = document.getElementById('modal-progress');
  const storyPrevBtn = document.getElementById('story-prev');
  const storyNextBtn = document.getElementById('story-next');

  let activeEventId = null;
  let lastFocusedTrigger = null;

  function renderStory(eventId) {
    const data = events.find(ev => ev.id === eventId);
    if (!data) return;
    activeEventId = eventId;

    modalImage.src = data.image;
    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalDate.textContent = data.date;
    modalLocation.textContent = data.location || '';
    modalMetaDot.hidden = !data.location;
    modalLead.textContent = data.lead || '';
    modalLead.hidden = !data.lead;

    modalSections.innerHTML = '';
    (data.sections || []).forEach(section => {
      const sec = document.createElement('div');
      sec.className = 'story-section';
      const h = document.createElement('h3');
      h.textContent = section.heading;
      sec.appendChild(h);
      section.paragraphs.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        sec.appendChild(p);
      });
      modalSections.appendChild(sec);
    });

    if (data.highlights && data.highlights.length) {
      modalHighlights.innerHTML = '';
      data.highlights.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        modalHighlights.appendChild(li);
      });
      modalHighlightsWrap.hidden = false;
    } else {
      modalHighlightsWrap.hidden = true;
    }

    const idx = eventOrder.indexOf(eventId);
    storyPrevBtn.disabled = idx <= 0;
    storyNextBtn.disabled = idx >= eventOrder.length - 1;

    updateProgress();
  }

  function openEventStory(eventId, trigger) {
    renderStory(eventId);
    lastFocusedTrigger = trigger || null;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    storyModal.scrollTop = 0;
    updateProgress();
    modalClose.focus();
  }

  function closeEventStory() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocusedTrigger) lastFocusedTrigger.focus();
  }

  function updateProgress() {
    const max = storyModal.scrollHeight - storyModal.clientHeight;
    const pct = max > 0 ? (storyModal.scrollTop / max) * 100 : 0;
    modalProgress.style.width = pct + '%';
  }

  if (modal) {
    document.querySelectorAll('.event-btn').forEach(btn => {
      btn.addEventListener('click', () => openEventStory(btn.getAttribute('data-event-id'), btn));
    });

    modalClose.addEventListener('click', closeEventStory);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeEventStory();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeEventStory();
    });

    storyPrevBtn.addEventListener('click', () => {
      const idx = eventOrder.indexOf(activeEventId);
      if (idx > 0) {
        renderStory(eventOrder[idx - 1]);
        storyModal.scrollTop = 0;
        updateProgress();
      }
    });
    storyNextBtn.addEventListener('click', () => {
      const idx = eventOrder.indexOf(activeEventId);
      if (idx < eventOrder.length - 1) {
        renderStory(eventOrder[idx + 1]);
        storyModal.scrollTop = 0;
        updateProgress();
      }
    });

    storyModal.addEventListener('scroll', updateProgress, { passive: true });
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

  // Full-name tooltip for team chips whose name is truncated by the
  // ellipsis (only shows when the name doesn't fully fit)
  const nameTip = document.createElement('div');
  nameTip.className = 'name-tooltip';
  nameTip.setAttribute('role', 'tooltip');
  document.body.appendChild(nameTip);

  function hideNameTip() {
    nameTip.classList.remove('visible');
  }

  document.querySelectorAll('.execom-chip-modern').forEach(chip => {
    const label = chip.querySelector('.execom-chip-name');
    if (!label) return;
    chip.addEventListener('mouseenter', () => {
      const wrapped = label.scrollWidth > label.clientWidth || label.scrollHeight > label.clientHeight;
      if (!wrapped) return;
      nameTip.textContent = chip.dataset.name || label.textContent;
      nameTip.classList.add('visible');
      const r = chip.getBoundingClientRect();
      // Center above the chip; flip below when there's no room at the top
      nameTip.style.left = `${r.left + r.width / 2}px`;
      if (r.top < 70) {
        nameTip.style.top = `${r.bottom}px`;
        nameTip.style.transform = 'translate(-50%, 10px)';
      } else {
        nameTip.style.top = `${r.top}px`;
        nameTip.style.transform = 'translate(-50%, calc(-100% - 10px))';
      }
    });
    chip.addEventListener('mouseleave', hideNameTip);
  });
  window.addEventListener('scroll', hideNameTip, { passive: true });
  window.addEventListener('resize', hideNameTip);

  // ==========================================================================
  // IDLE-TIME CACHE WARMING
  // Hidden tabs defer their images via data-src, so they'd otherwise start
  // downloading only when that tab is first opened. Once the page has
  // settled, hydrate them one file per idle slot so tab switches and the
  // stats modal open with everything already local.
  // ==========================================================================
  window.addEventListener('load', () => {
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    const pending = Array.from(document.querySelectorAll('img[data-src]'));
    const idle = window.requestIdleCallback || (cb => setTimeout(cb, 0));
    const warmNext = () => {
      const img = pending.shift();
      if (img) {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        idle(warmNext);
        return;
      }
      // Images done — warm the stats payload too, so the stats modal shows
      // data instantly on first open.
      fetch('/stats.json').catch(() => { /* handled again when modal opens */ });
    };
    if (pending.length) idle(warmNext);
    else warmNext();
  });
// End of script
