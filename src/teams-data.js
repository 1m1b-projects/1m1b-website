// ==========================================================================
// JOIN FORM URL — every Join Us / Apply CTA (desktop nav, mobile nav, hero,
// Join Us tab) reads this. Change this one line if the form link changes.
// ==========================================================================
export const JOIN_FORM_URL = 'https://ggl.link/1m1b';

// ==========================================================================
// TEAMS DATA — single source of truth for the Join Us page.
//
// To add a new team, copy a block below, paste it into the array, and fill
// in the fields:
//
//   id         unique slug, lowercase-with-dashes (used internally)
//   name       team name shown on the card
//   tag        small category pill on the card, e.g. "Tech"
//   tagColor   pill color variant: 'blue' | 'green' | 'purple' | 'emerald'
//   image      path under public/, e.g. 'imgs/teams/ml.jpg'
//   imageAlt   alt text for the image
//   desc       1–2 lines: what the team does and what members are expected
//              to do
// ==========================================================================

export const teams = [
  {
    id: 'cyber-security',
    name: 'Cyber Security',
    tag: 'Tech',
    tagColor: 'purple',
    image: 'imgs/teams/cybersecurity.jpg',
    imageAlt: 'Padlock resting on a laptop keyboard',
    desc: 'Security in the AI domain — protecting systems, national safety and digital integrity. Members explore security practices, stay current on emerging threats, and help run campus awareness sessions.'
  },
  {
    id: 'data-science',
    name: 'Data Science',
    tag: 'Tech',
    tagColor: 'blue',
    image: 'imgs/teams/datascience.jpg',
    imageAlt: 'Laptop screen showing an analytics dashboard',
    desc: 'Working with data that matters to 1M1B and beyond: cleaning, analysing and visualising datasets to turn raw numbers into insight.'
  },
  {
    id: 'gen-ai',
    name: 'Gen AI',
    tag: 'Tech',
    tagColor: 'purple',
    image: 'imgs/teams/genai.jpg',
    imageAlt: 'Colorful abstract artificial intelligence render',
    desc: 'Generative AI fundamentals and beyond — hands-on with prompts, large language models and modern AI tools to build creative applications.'
  },
  {
    id: 'web-development',
    name: 'Web Development',
    tag: 'Tech',
    tagColor: 'blue',
    image: 'imgs/teams/webdev.jpg',
    imageAlt: 'Colorful code on a dark monitor',
    desc: 'Web development as regular: designing and building the websites and web tools the club runs on, from landing pages to interactive apps.'
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    tag: 'Tech',
    tagColor: 'emerald',
    image: 'imgs/teams/ml.jpg',
    imageAlt: 'Macro shot of a circuit board',
    desc: 'ML in core: understanding the math and models behind the buzzwords, and training real models on real problems.'
  },
  {
    id: 'pr-outreach',
    name: 'PR & Outreach',
    tag: 'Non-Tech',
    tagColor: 'green',
    image: 'imgs/teams/pr-outreach.jpg',
    imageAlt: 'People networking at an indoor event',
    desc: 'The club\u2019s voice and handshake: social skills, building connections, and getting 1M1B seen on campus and beyond.'
  },
  {
    id: 'photography-videography',
    name: 'Photography & Videography',
    tag: 'Non-Tech',
    tagColor: 'purple',
    image: 'imgs/teams/photography.jpg',
    imageAlt: 'Hands holding a DSLR camera',
    desc: 'Capturing our events and people through the lens — shoots, event coverage and visual storytelling.'
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    tag: 'Non-Tech',
    tagColor: 'blue',
    image: 'imgs/teams/videoediting.jpg',
    imageAlt: 'Video editing timeline on a workstation monitor',
    desc: 'Turning raw footage into polished stories — cuts, motion and finishing for event recaps and promo content.'
  },
  {
    id: 'graphic-designing',
    name: 'Graphic Designing',
    tag: 'Non-Tech',
    tagColor: 'purple',
    image: 'imgs/teams/graphicdesign.jpg',
    imageAlt: 'Graphic designer workspace flat-lay',
    desc: 'Creating beautiful graphics with tools like Canva and Adobe — posters, banners and the club\u2019s visual identity.'
  },
  {
    id: 'content-writing',
    name: 'Content Writing',
    tag: 'Non-Tech',
    tagColor: 'emerald',
    image: 'imgs/teams/contentwriting.jpg',
    imageAlt: 'Fountain pen writing on paper',
    desc: 'Fluent English, good speaking and writing skills: captions, articles and scripts that carry the club\u2019s message.'
  }
];
