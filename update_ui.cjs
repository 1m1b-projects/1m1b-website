const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace the events grid
const newEventsGrid = `        <div class="events-grid">
          <div class="event-card">
            <div class="event-content">
              <div>
                <span class="event-date">Dec 2, 2024</span>
                <h3 class="event-title">Generation AI @2047 Summit</h3>
              </div>
              <div class="event-card-img-wrapper">
                <img src="imgs/gen-ai.png" alt="Generation AI" onerror="this.src='https://placehold.co/600x400/1e3a8a/ffffff?text=Generation+AI'" />
              </div>
              <p class="event-desc">Showcase of youth-led AI innovations with prominent leaders from IBM and CBSE at Le Meridian Hotel, New Delhi.</p>
              <button class="event-btn" data-event-id="gen-ai">Read More <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>
          <div class="event-card">
            <div class="event-content">
              <div>
                <span class="event-date">Annual Event</span>
                <h3 class="event-title">India CSR & ESG Summit 2024</h3>
              </div>
              <div class="event-card-img-wrapper green-border">
                <img src="imgs/csr.png" alt="CSR & ESG" onerror="this.src='https://placehold.co/600x400/16a34a/ffffff?text=CSR+%26+ESG'" />
              </div>
              <p class="event-desc">Interacting with industry leaders and investors to gain exposure to corporate sustainability practices.</p>
              <button class="event-btn" data-event-id="csr-esg">Read More <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>
          <div class="event-card">
            <div class="event-content">
              <div>
                <span class="event-date">META Collab</span>
                <h3 class="event-title">Open Source AI & Education</h3>
              </div>
              <div class="event-card-img-wrapper">
                <img src="imgs/meta-ai.png" alt="META AI" onerror="this.src='https://placehold.co/600x400/1e3a8a/ffffff?text=META+AI'" />
              </div>
              <p class="event-desc">Exclusive roundtable on integrating AI into curricula with educators and META experts.</p>
              <button class="event-btn" data-event-id="meta-ai">Read More <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>
          <div class="event-card">
            <div class="event-content">
              <div>
                <span class="event-date">Workshop</span>
                <h3 class="event-title">LLM Online Session</h3>
              </div>
              <div class="event-card-img-wrapper">
                <img src="imgs/llm-workshop.png" alt="LLM Workshop" onerror="this.src='https://placehold.co/600x400/16a34a/ffffff?text=LLM+Workshop'" />
              </div>
              <p class="event-desc">Interactive workshop on Large Language Models for over 210 students to equip them with practical AI knowledge.</p>
              <button class="event-btn" data-event-id="llm-workshop">Read More <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>
          <div class="event-card">
            <div class="event-content">
              <div>
                <span class="event-date">CBSE HQ</span>
                <h3 class="event-title">Skills to Careers Summit</h3>
              </div>
              <div class="event-card-img-wrapper green-border">
                <img src="imgs/skills-careers.png" alt="Skills to Careers" onerror="this.src='https://placehold.co/600x400/1e3a8a/ffffff?text=Skills+To+Careers'" />
              </div>
              <p class="event-desc">Representing GGSIPU with 1M1B, IBM, and CBSE on India's national skilling strategy.</p>
              <button class="event-btn" data-event-id="skills-careers">Read More <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>
          <div class="event-card">
            <div class="event-content">
              <div>
                <span class="event-date">2025</span>
                <h3 class="event-title">Pitchmela - Elysian 2025</h3>
              </div>
              <div class="event-card-img-wrapper green-border">
                <img src="imgs/pitchmela.png" alt="Pitchmela" onerror="this.src='https://placehold.co/600x400/16a34a/ffffff?text=Pitchmela'" />
              </div>
              <p class="event-desc">Pitching innovative ideas for sustainability and tech-driven social entrepreneurship.</p>
              <button class="event-btn" data-event-id="pitchmela">Read More <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>
          <div class="event-card">
            <div class="event-content">
              <div>
                <span class="event-date">Podcast</span>
                <h3 class="event-title">Interview with Founder of 1M1B</h3>
              </div>
              <div class="event-card-img-wrapper">
                <img src="imgs/founder-interview.png" alt="Interview with Founder" onerror="this.src='https://placehold.co/600x400/1e3a8a/ffffff?text=Interview+with+Founder'" />
              </div>
              <p class="event-desc">Podcast session with 1M1B Founder Manav Subodh on social-tech entrepreneurship.</p>
              <button class="event-btn" data-event-id="founder-interview">Read More <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>
        </div>`;

html = html.replace(/<div class="events-grid">[\s\S]*?<\/div>\s*<\/div>\s*<!-- TEAM TAB -->/g, newEventsGrid + '\n      </div>\n\n      <!-- TEAM TAB -->');

// Add newsletter images
const newsletterHtml = `
        <div class="newsletter-images-section" style="margin-top: 5rem;">
          <h3 class="section-title" style="margin-bottom: 2rem;">Full Newsletter</h3>
          <div class="newsletter-images-grid">
            <img src="imgs/newsletter1.png" alt="Newsletter Page 1" class="newsletter-scan" onerror="this.src='https://placehold.co/800x1131/1e3a8a/ffffff?text=Newsletter+Page+1'" />
            <img src="imgs/newsletter2.png" alt="Newsletter Page 2" class="newsletter-scan" onerror="this.src='https://placehold.co/800x1131/16a34a/ffffff?text=Newsletter+Page+2'" />
          </div>
        </div>
      </div>
    </main>`;
html = html.replace(/<\/div>\s*<\/main>/, newsletterHtml);
fs.writeFileSync(indexHtmlPath, html);

const cssPath = path.join(__dirname, 'src', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

css += `
.event-card-img-wrapper {
  width: 100%;
  height: 12rem;
  border: 4px solid var(--primary-blue-light);
  border-radius: 0.75rem;
  overflow: hidden;
  margin: 1.25rem 0;
}
.event-card-img-wrapper.green-border { border-color: var(--accent-green); }
.event-card-img-wrapper img { width: 100%; height: 100%; object-fit: cover; }

.newsletter-images-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
}
@media (min-width: 768px) { .newsletter-images-grid { grid-template-columns: 1fr 1fr; } }
.newsletter-scan {
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-gray);
}
`;
fs.writeFileSync(cssPath, css);
console.log('Done!');
