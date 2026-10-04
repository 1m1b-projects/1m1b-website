// ==========================================================================
// EVENTS DATA — single source of truth for the Events page.
//
// To add a new event, copy the block below, paste it at the TOP of the
// array (newest first), and fill in the fields:
//
//   id         unique slug, lowercase-with-dashes (used internally)
//   title      event name, shown on the card and in the story modal
//   date       short label on the card badge, e.g. "Dec 2, 2024"
//   tag        small category label in the story hero, e.g. "Summit"
//   location   optional place line in the story hero; use '' to hide
//   image      path under the project root, e.g. 'imgs/Events/my-event.png'
//   imageAlt   alt text for the image
//   accent     'blue' or 'green' — the card image border color
//   cardDesc   1–2 line teaser shown on the card
//
//   --- story fields (all optional; omit if there is no story yet) ---
//   lead       1–2 sentence intro paragraph in the story modal
//   sections   [{ heading: '…', paragraphs: ['…', '…'] }, …] — the body
//   highlights ['…', '…'] — bullet list at the end of the story
//
// Stories can be any length up to ~1500 words; the modal layout scales.
// ==========================================================================

export const events = [
  {
    id: 'gen-ai',
    title: 'Generation AI @2047 Summit',
    date: 'Dec 2, 2024',
    tag: 'Summit',
    location: 'New Delhi',
    image: 'imgs/Events/gen-ai.png',
    imageAlt: 'Generation AI',
    accent: 'blue',
    cardDesc: 'Showcase of youth-led AI innovations with prominent leaders from IBM and CBSE at Le Meridian Hotel, New Delhi.',
    lead: 'Students engaged in meaningful discussions on sustainability and future technologies at the Generation AI @2047 Summit, joining a room of distinguished UN and industry representatives to debate how India\u2019s youth will shape an AI-driven 2047.',
    sections: [
      {
        heading: 'A seat at the table',
        paragraphs: [
          'The summit brought together policymakers, UN representatives, and technology leaders to imagine the role artificial intelligence will play in India\u2019s journey to 2047. Our chapter members participated as equals in these conversations \u2014 asking questions, presenting perspectives from campus, and challenging assumptions about how quickly AI should be adopted in education and governance.',
          'For most students, it was their first time engaging with decision-makers at this level, and the interaction provided valuable networking opportunities that extended well beyond the day itself.'
        ]
      },
      {
        heading: 'Sustainability meets technology',
        paragraphs: [
          'A recurring theme of the day was the intersection of AI and sustainable development. Discussions ranged from using machine learning for climate resilience to ensuring that rapid digitisation does not leave rural communities behind.'
        ]
      }
    ],
    highlights: [
      'Direct dialogue with UN and industry representatives',
      'Exposure to national-level AI policy conversations',
      'Networking with leaders across technology and sustainability'
    ]
  },
  {
    id: 'csr-esg',
    title: 'India CSR & ESG Summit 2024',
    date: 'Annual Event',
    tag: 'Summit',
    location: '',
    image: 'imgs/Events/csr.png',
    imageAlt: 'CSR & ESG',
    accent: 'green',
    cardDesc: 'Interacting with industry leaders and investors to gain exposure to corporate sustainability practices.',
    lead: 'Students participated in the India CSR & ESG Summit 2024, interacting with industry leaders and investors while getting a first-hand look at how India\u2019s largest companies approach corporate sustainability and environmental investment.',
    sections: [
      {
        heading: 'Inside corporate sustainability',
        paragraphs: [
          'The summit is one of the country\u2019s leading forums for corporate social responsibility and environmental, social, and governance (ESG) practice. Panels and awards sessions gave our students a window into how corporations structure their sustainability commitments, measure impact, and report progress to investors and regulators.',
          'Between sessions, students spoke directly with CSR heads, ESG investors, and social entrepreneurs \u2014 conversations that turned abstract classroom concepts like \u201cstakeholder capitalism\u201d into real career paths.'
        ]
      },
      {
        heading: 'Insights into environmental investment',
        paragraphs: [
          'A strong focus of the event was the flow of capital toward environmental initiatives. Students learned how ESG ratings influence investment decisions and what investors look for in sustainability-driven ventures \u2014 insight that directly informed several chapter projects in the months that followed.'
        ]
      }
    ],
    highlights: [
      'Interaction with industry leaders and investors',
      'Exposure to corporate sustainability practices',
      'Insights into environmental investment trends'
    ]
  },
  {
    id: 'meta-ai',
    title: 'Open Source AI & Education',
    date: 'META Collab',
    tag: 'Roundtable',
    location: '',
    image: 'imgs/Events/meta-ai.png',
    imageAlt: 'META AI',
    accent: 'blue',
    cardDesc: 'Exclusive roundtable on integrating AI into curricula with educators and META experts.',
    lead: 'Students represented the chapter in an exclusive roundtable on Open-Source AI & Education, sharing perspectives on integrating AI into curricula alongside educators, policymakers, and AI experts from Meta.',
    sections: [
      {
        heading: 'Student voice in curriculum design',
        paragraphs: [
          'Roundtables on the future of education are usually dominated by institutions. This session was different: our members argued for hands-on AI literacy from the first semester, open-source tooling that students can inspect and modify, and assessment models that reward experimentation over memorisation.',
          'The feedback was well received by the educators and policymakers in the room, several of whom continued the conversation with our chapter after the event.'
        ]
      },
      {
        heading: 'The open-source advantage',
        paragraphs: [
          'Discussions with Meta\u2019s AI experts centred on why open models matter for education \u2014 transparency, affordability, and the ability to run real research on modest hardware. Students left with a clearer picture of how the open-source ecosystem can level the playing field for universities like ours.'
        ]
      }
    ],
    highlights: [
      'Exclusive roundtable with Meta and education leaders',
      'Student perspectives shaped curriculum discussions',
      'Direct engagement with AI policy and pedagogy experts'
    ]
  },
  {
    id: 'llm-workshop',
    title: 'LLM Online Session',
    date: 'Workshop',
    tag: 'Workshop',
    location: 'Online',
    image: 'imgs/Events/llm-workshop.png',
    imageAlt: 'LLM Workshop',
    accent: 'blue',
    cardDesc: 'Interactive workshop on Large Language Models for over 210 students to equip them with practical AI knowledge.',
    lead: 'An interactive workshop on Large Language Models was conducted for over 210 students, equipping participants with practical AI knowledge and a hands-on understanding of the technology behind tools like ChatGPT.',
    sections: [
      {
        heading: 'From buzzword to understanding',
        paragraphs: [
          'Large Language Models are everywhere in the news, but few students get the chance to look under the hood. This online session walked through what LLMs actually are \u2014 how they are trained, what they are good at, and where they confidently fail \u2014 before moving into live demonstrations and guided exercises.',
          'With over 210 participants, the session was one of the chapter\u2019s largest workshops to date, drawing students from multiple departments and year groups.'
        ]
      },
      {
        heading: 'Hands-on, not hands-off',
        paragraphs: [
          'The workshop\u2019s core was its practical format: participants wrote prompts, evaluated model outputs, and discussed responsible use \u2014 including academic integrity and the limits of AI-generated content. The goal was to turn passive users of AI tools into informed, critical ones.'
        ]
      }
    ],
    highlights: [
      '210+ students trained in a single session',
      'Practical, hands-on LLM exercises',
      'Responsible and critical AI usage guidance'
    ]
  },
  {
    id: 'skills-careers',
    title: 'Skills to Careers Summit',
    date: 'CBSE HQ',
    tag: 'Summit',
    location: 'CBSE Headquarters, Dwarka',
    image: 'imgs/Events/skills-to-career.png',
    imageAlt: 'Skills to Careers',
    accent: 'green',
    cardDesc: 'Representing GGSIPU with 1M1B, IBM, and CBSE on India\'s national skilling strategy.',
    lead: 'Students represented GGSIPU at the \u201cSkills to Careers: Skilling Today, Leading Tomorrow\u201d summit held at CBSE Headquarters, Dwarka \u2014 a convening of 1M1B, IBM, CBSE, policymakers, and industry leaders around India\u2019s national skilling strategy.',
    sections: [
      {
        heading: 'Representing the university',
        paragraphs: [
          'Invited to CBSE\u2019s headquarters, our members represented GGSIPU among stakeholders who are actively shaping how Indian students move from education to employment. Participation at this level strengthened the university\u2019s academic and professional standing among national skilling bodies.'
        ]
      },
      {
        heading: 'AI, sustainability, and the future of work',
        paragraphs: [
          'Sessions with 1M1B, IBM, and CBSE leaders covered the skills India\u2019s workforce will need as AI and sustainability reshape every industry. Students gained a grounded view of the national skilling strategy and where university-led initiatives like our chapter fit into the larger picture.',
          'The summit also connected our members with policymakers and industry professionals, opening channels for future collaborations and internships.'
        ]
      }
    ],
    highlights: [
      'GGSIPU represented at CBSE Headquarters',
      'Engagement with 1M1B, IBM, and CBSE leadership',
      'Insights into India\u2019s national skilling strategy'
    ]
  },
  {
    id: 'pitchmela',
    title: 'Pitchmela - Elysian 2025',
    date: '2025',
    tag: 'Competition',
    location: '',
    image: 'imgs/Events/pitchmela.png',
    imageAlt: 'Pitchmela',
    accent: 'green',
    cardDesc: 'Pitching innovative ideas for sustainability and tech-driven social entrepreneurship.',
    lead: 'At Pitchmela during Elysian 2025, chapter members pitched innovative ideas for sustainability and tech-driven social entrepreneurship to a panel of evaluators.',
    sections: [
      {
        heading: 'Ideas on stage',
        paragraphs: [
          'Pitchmela is where classroom ideas get stress-tested. Our members took the stage to pitch ventures that pair technology with social impact \u2014 sustainability-first business models aimed at problems they see on their own campus and in their communities.',
          'The experience of condensing months of thinking into a tight pitch, defending it under questioning, and receiving direct feedback from evaluators is exactly the entrepreneurial muscle 1M1B exists to build.'
        ]
      }
    ],
    highlights: [
      'Student ventures pitched to a live panel',
      'Focus on sustainability and social entrepreneurship',
      'Direct evaluative feedback on venture ideas'
    ]
  },
  {
    id: 'founder-interview',
    title: 'Interview with Founder of 1M1B',
    date: 'Podcast',
    tag: 'Podcast',
    location: '',
    image: 'imgs/Events/founder-interview.png',
    imageAlt: 'Interview with Founder',
    accent: 'blue',
    cardDesc: 'Podcast session with 1M1B Founder Manav Subodh on social-tech entrepreneurship.',
    lead: 'A podcast session with 1M1B Founder Manav Subodh offered rare, first-hand insights into social-tech entrepreneurship, startup funding, and what it takes to build impact-driven ventures.',
    sections: [
      {
        heading: 'Lessons from a founder',
        paragraphs: [
          'Manav Subodh has spent years building 1M1B into a global platform that channels youth talent toward real-world problems. In this conversation, he shared the unfiltered version of that journey \u2014 the early mistakes, the pitch meetings that went nowhere, and the conviction that eventually opened doors.',
          'His central message to students: entrepreneurship is not a career you wait to be qualified for. Start with a problem you care about, find one person whose life you can improve, and scale from there.'
        ]
      },
      {
        heading: 'Funding and the road ahead',
        paragraphs: [
          'The session also demystified startup funding \u2014 what investors actually evaluate, how social ventures balance profit and purpose, and why impact metrics matter as much as revenue for mission-driven companies. Students left with a practical roadmap for their own venture ideas.'
        ]
      }
    ],
    highlights: [
      'First-hand guidance from 1M1B\u2019s founder',
      'Insights into social-tech entrepreneurship',
      'Practical funding advice for student ventures'
    ]
  }
];
