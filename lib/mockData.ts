import { ProjectDetail } from '@/types/project';

export const projects: ProjectDetail[] = [
  {
    id: 'proj-001',
    slug: 'healthhub-app',
    title: 'HealthHub App',
    category: 'UX/UI Design',
    interactionData: {
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
        type: 'image',
        altText: 'HealthHub App – dashboard mockup on a mobile device',
        width: 800,
        height: 600,
        blurhash: 'L6PZfSjE.AyE_3t7t7R**0o#DgR4',
      },
      hoverVideoUrl: '/videos/healthhub-preview.mp4',
      accentColor: '#00c2a8',
    },
    metadata: {
      client: 'HealthHub Pte Ltd',
      role: ['UX Researcher', 'UI Designer', 'Interaction Designer'],
      tools: ['Figma', 'Maze', 'FigJam', 'Notion'],
      duration: '5 months (2023)',
    },
    description:
      'A comprehensive health management app that helps users track their wellness journey, book appointments, and engage with personalised health insights.',
    caseStudy: {
      problem:
        'Patients found existing health apps fragmented and overwhelming. Critical features like appointment booking, medication reminders, and lab results lived in separate apps with no unified view, leading to disengagement and missed care milestones.',
      solution:
        'A single unified dashboard with role-based content surfacing, a conversational appointment flow, and a progressive disclosure model that reveals complexity only when the user is ready for it.',
      processBlocks: [
        {
          type: 'text',
          content:
            'We conducted 14 semi-structured interviews with patients aged 25–65 and mapped five distinct user archetypes. The most underserved group was caregivers managing health on behalf of family members.',
        },
        {
          type: 'media',
          asset: {
            url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=700&fit=crop',
            type: 'image',
            altText: 'Affinity mapping workshop – sticky notes on a whiteboard',
            width: 1200,
            height: 700,
            blurhash: 'L8B:|;of00WB~qj[j[ay00j[IUof',
          },
          caption: 'Affinity mapping session with the core product team',
        },
        {
          type: 'quote',
          text: 'I just want one place where I can see everything about my mum\'s health without having to call the clinic.',
          author: 'Participant #7, caregiver',
        },
        {
          type: 'text',
          content:
            'Three rounds of usability testing on Maze validated our information architecture. Task completion rate improved from 54% on the legacy flow to 91% on the proposed design.',
        },
      ],
      results: [
        '91% task completion rate in usability testing (up from 54%)',
        '40% reduction in appointment no-shows in pilot study',
        'NPS improved from 22 to 67 post-launch',
        "Featured in App Store's \"Apps We Love\" in SG/MY region",
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop',
        type: 'image',
        altText: 'HealthHub onboarding screens',
        width: 1200,
        height: 800,
        blurhash: 'L6PZfSjE.AyE_3t7t7R**0o#DgR4',
      },
      {
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop',
        type: 'image',
        altText: 'HealthHub dashboard – health summary view',
        width: 1200,
        height: 800,
        blurhash: 'L8B:|;of00WB~qj[j[ay00j[IUof',
      },
    ],
  },

  {
    id: 'proj-002',
    slug: 'sanook-app',
    title: 'Sanook!',
    category: 'UX/UI Design',
    interactionData: {
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
        type: 'image',
        altText: 'Sanook! Thai language learning app – lesson screen',
        width: 800,
        height: 600,
        blurhash: 'L9A3uv9a00~q~qWB9axu00IU%MD%',
      },
      accentColor: '#f7931e',
    },
    metadata: {
      client: 'Sanook! EdTech (Concept)',
      role: ['Product Designer', 'UX Researcher', 'Prototyper'],
      tools: ['Figma', 'ProtoPie', 'Lottiefiles', 'Dovetail'],
      duration: '3 months (2023)',
    },
    description:
      'A gamified Thai language learning mobile app designed around the principles of contextual learning, spaced repetition, and cultural immersion.',
    caseStudy: {
      problem:
        'Most language apps treat grammar as the entry point, but Thai learners reported that tonal complexity and script unfamiliarity created an immediate motivation cliff. Users churned within the first three sessions.',
      solution:
        'Lead with culture-first content – food, music, and everyday scenarios – to build emotional investment before introducing script literacy. A custom spaced-repetition engine surfaces vocabulary at optimal intervals.',
      processBlocks: [
        {
          type: 'text',
          content:
            'Competitive analysis of Duolingo, Pimsleur, and ThaiPod101 revealed a consistent gap: none offered script learning tied to culturally meaningful content. Our insight: learners who visited Thailand were 3× more motivated.',
        },
        {
          type: 'media',
          asset: {
            url: 'https://images.unsplash.com/photo-1555952238-7d49f56dc16d?w=1200&h=700&fit=crop',
            type: 'image',
            altText: 'Sanook! low-fidelity wireframes spread on a desk',
            width: 1200,
            height: 700,
            blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj',
          },
          caption: 'Low-fidelity wireframes exploring the culture-first onboarding flow',
        },
        {
          type: 'quote',
          text: 'I finally felt like I was learning about Thailand, not just memorising words.',
          author: 'Beta tester, Singapore',
        },
        {
          type: 'text',
          content:
            'A/B testing two onboarding paths: grammar-first vs. culture-first. The culture-first path produced a 2.3× higher session-two return rate.',
        },
      ],
      results: [
        '2.3× higher Day-2 retention with culture-first onboarding',
        'Average session length of 11 minutes (vs 4-minute industry average)',
        '4.8/5 star rating in closed beta (N=120)',
        'Shortlisted for Google for Startups APAC cohort',
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&h=800&fit=crop',
        type: 'image',
        altText: 'Sanook! lesson card components',
        width: 1200,
        height: 800,
        blurhash: 'L9A3uv9a00~q~qWB9axu00IU%MD%',
      },
    ],
  },

  {
    id: 'proj-003',
    slug: 'eva-brand',
    title: 'EVA',
    category: 'Branding',
    interactionData: {
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        type: 'image',
        altText: 'EVA brand identity – stationery and logo lockup',
        width: 800,
        height: 600,
        blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.',
      },
      accentColor: '#c084fc',
    },
    metadata: {
      client: 'EVA Foundation (NGO)',
      role: ['Brand Strategist', 'Visual Identity Designer', 'Art Director'],
      tools: ['Adobe Illustrator', 'Adobe Indesign', 'Figma'],
      duration: '6 weeks (2022)',
    },
    description:
      'A compassionate and empowering brand identity for a non-profit organisation supporting single mothers and widows in Southeast Asia.',
    caseStudy: {
      problem:
        'Existing charities serving this demographic often used imagery of hardship and dependency, inadvertently reinforcing stigma. EVA needed an identity that communicated strength and community without erasing the real emotional weight of their users\' experiences.',
      solution:
        'A mark built on the concept of metamorphosis — a stylised butterfly formed from two interlocking human silhouettes — paired with a warm, desaturated palette that feels dignified and hopeful rather than clinical or corporate.',
      processBlocks: [
        {
          type: 'text',
          content:
            'Strategy workshops with the founding team and six beneficiaries surfaced a core tension: the women did not want to be seen as victims, but did want acknowledgement of their journey. The brand positioning became: "Strength through shared experience."',
        },
        {
          type: 'media',
          asset: {
            url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=700&fit=crop',
            type: 'image',
            altText: 'EVA logo sketches and concept development spread',
            width: 1200,
            height: 700,
            blurhash: 'LBAdX_~q?bxu%MRjIUM{xu%1xuIA',
          },
          caption: 'Logo concept explorations — from initial sketches to refined vector',
        },
        {
          type: 'quote',
          text: 'This logo makes me feel seen. Not pitied — seen.',
          author: 'EVA beneficiary, Kuala Lumpur',
        },
        {
          type: 'text',
          content:
            'The brand system includes primary and secondary lockups, a typographic hierarchy using Cormorant Garamond and Inter, a refined palette of mauve and warm ivory, and a comprehensive brand guidelines document.',
        },
      ],
      results: [
        '300% increase in donor engagement following rebrand launch',
        'Coverage in three national newspapers across SG, MY, and PH',
        'Won Bronze at the Design for Good Awards 2022',
        'Beneficiary registration grew 78% in the six months post-launch',
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=800&fit=crop',
        type: 'image',
        altText: 'EVA brand applied to tote bag and collateral',
        width: 1200,
        height: 800,
        blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.',
      },
      {
        url: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1200&h=800&fit=crop',
        type: 'image',
        altText: 'EVA brand guidelines spread',
        width: 1200,
        height: 800,
        blurhash: 'LBAdX_~q?bxu%MRjIUM{xu%1xuIA',
      },
    ],
  },

  {
    id: 'proj-004',
    slug: 'forged-brand',
    title: 'FORGE///D',
    category: 'Branding',
    interactionData: {
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop',
        type: 'image',
        altText: 'FORGE///D brand identity – industrial brand mark on black',
        width: 800,
        height: 600,
        blurhash: 'L02rW2-;%L?bx]%Mt6WC~q-;D%xu',
      },
      accentColor: '#f97316',
    },
    metadata: {
      client: 'FORGE///D Consulting',
      role: ['Brand Strategist', 'Visual Identity Designer', 'Copywriter'],
      tools: ['Adobe Illustrator', 'Cinema 4D', 'Figma', 'Adobe After Effects'],
      duration: '8 weeks (2023)',
    },
    description:
      'A bold, industrial brand identity for a strategic consultancy that helps organisations navigate disruption through systems thinking and decisive action.',
    caseStudy: {
      problem:
        'The client operated in a commoditised consulting market where most brand identities were indistinguishable — navy blue suits, abstract swooshes, and empty words like "synergy." They needed an identity as direct and uncompromising as their methodology.',
      solution:
        'A wordmark fractured by three forward-slash dividers — literally a word that has been forged under pressure. Rendered in a high-contrast, cut-metal aesthetic with a restricted palette of matte black, raw steel, and ignition orange.',
      processBlocks: [
        {
          type: 'text',
          content:
            'The strategic foundation was built around three pillars: Pressure, Precision, and Progress. Every visual decision was stress-tested against these principles — if it couldn\'t withstand scrutiny, it was cut.',
        },
        {
          type: 'media',
          asset: {
            url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=700&fit=crop',
            type: 'image',
            altText: 'FORGE///D brand in context – business cards and letterhead',
            width: 1200,
            height: 700,
            blurhash: 'L02rW2-;%L?bx]%Mt6WC~q-;D%xu',
          },
          caption: 'Brand rollout across stationery and digital touchpoints',
        },
        {
          type: 'quote',
          text: 'We\'ve had three prospective clients reference our brand identity before even mentioning our services. That\'s the first time that\'s ever happened to us.',
          author: 'Managing Director, FORGE///D',
        },
      ],
      results: [
        'Shortened average sales cycle by 22% in Q1 post-rebrand',
        '14 inbound pitch enquiries in first month (vs avg of 3)',
        'Featured in Brand New (UnderConsideration) as a Notable Identity',
        'Expanded to three new markets within 12 months',
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1524749292158-7540c2494485?w=1200&h=800&fit=crop',
        type: 'image',
        altText: 'FORGE///D brand assets – icon system and type scale',
        width: 1200,
        height: 800,
        blurhash: 'L02rW2-;%L?bx]%Mt6WC~q-;D%xu',
      },
    ],
  },

  {
    id: 'proj-005',
    slug: 'go-space',
    title: 'GO SPACE',
    category: 'Graphic Design',
    interactionData: {
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
        type: 'image',
        altText: 'GO SPACE event key visual – cosmic poster design',
        width: 800,
        height: 600,
        blurhash: 'L12wvHM{00IU~qIUxuIU00WB%MRj',
      },
      accentColor: '#818cf8',
    },
    metadata: {
      client: 'Science Centre Singapore',
      role: ['Art Director', 'Key Visual Designer', 'Print Production Manager'],
      tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Cinema 4D', 'Adobe Lightroom'],
      duration: '10 weeks (2022)',
    },
    description:
      'A large-scale public event key visual campaign celebrating Singapore\'s ambitions in space exploration, designed for environmental, digital, and broadcast applications.',
    caseStudy: {
      problem:
        'The Science Centre needed a key visual that could work across vastly different scales — from 70×4m facade banners to 15cm social thumbnails — while conveying both scientific credibility and genuine wonder accessible to children.',
      solution:
        'A hero composition centred on a Singaporean child in an astronaut suit, silhouetted against a photorealistic nebula rendered in Cinema 4D. The visual system used a three-zone colour gradient (deep space blue → warm solar gold → launch white) to create innate motion across applications.',
      processBlocks: [
        {
          type: 'text',
          content:
            'Scale testing was baked into the process from week one. Every concept was reviewed at both thumbnail (96px wide) and billboard (10m wide) dimensions before advancing. Three concepts were killed because they lost legibility at small scale.',
        },
        {
          type: 'media',
          asset: {
            url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&h=700&fit=crop',
            type: 'image',
            altText: 'GO SPACE key visual – final hero poster in situ at Science Centre',
            width: 1200,
            height: 700,
            blurhash: 'L12wvHM{00IU~qIUxuIU00WB%MRj',
          },
          caption: 'Final key visual installed at Science Centre Singapore – north facade',
        },
        {
          type: 'quote',
          text: 'The brief was "make a child believe they could go to space." I think we did that.',
          author: 'Creative Director, GO SPACE',
        },
        {
          type: 'text',
          content:
            'The visual system extended to 38 individual deliverables: facade wraps, MRT station D-boards, social media templates, merchandise, stage backdrop, and a 4-minute AV intro sequence.',
        },
      ],
      results: [
        '82,000 visitors over 6-week event run (record for Science Centre)',
        'Key visual shared organically 14,000+ times across social media',
        'Silver Award, Marketing Events Awards Singapore 2022',
        'Visual system licensed for travelling exhibition to 4 regional venues',
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=1200&h=800&fit=crop',
        type: 'image',
        altText: 'GO SPACE – poster mockup series',
        width: 1200,
        height: 800,
        blurhash: 'L12wvHM{00IU~qIUxuIU00WB%MRj',
      },
      {
        url: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=1200&h=800&fit=crop',
        type: 'image',
        altText: 'GO SPACE – MRT station digital board placement',
        width: 1200,
        height: 800,
        blurhash: 'L9A3uv9a00~q~qWB9axu00IU%MD%',
      },
    ],
  },

  {
    id: 'proj-006',
    slug: 'astar-futuristic-odyssey',
    title: 'A*STAR Futuristic Odyssey',
    category: 'Graphic Design',
    interactionData: {
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
        type: 'image',
        altText: 'A*STAR Futuristic Odyssey – spatial event environment',
        width: 800,
        height: 600,
        blurhash: 'LH9u;E~q9a?b~q-;%MIUxt-;M{xu',
      },
      accentColor: '#22d3ee',
    },
    metadata: {
      client: 'Agency for Science, Technology and Research (A*STAR)',
      role: ['Spatial Graphics Designer', 'Environmental Designer', 'Motion Graphics Director'],
      tools: ['Adobe Illustrator', 'Adobe After Effects', 'Notch', 'Resolume Arena'],
      duration: '14 weeks (2023)',
    },
    description:
      'An immersive spatial graphics and event visual system for A*STAR\'s flagship annual showcase, transforming a convention hall into a journey through Singapore\'s scientific future.',
    caseStudy: {
      problem:
        'Government science showcases are historically perceived as dry and inaccessible. A*STAR needed to communicate the genuine excitement of their 1,200-person R&D workforce to a mixed audience of policy-makers, media, industry, and the public — all in one physical space.',
      solution:
        'A spatial narrative divided into five "chapters" of Singapore\'s scientific journey — from foundational research to moonshot ambitions — each with distinct visual language, lighting temperature, and sound design. Graphics lived on walls, floors, ceilings, and interactive kiosks simultaneously.',
      processBlocks: [
        {
          type: 'text',
          content:
            'The 14-week process was split into three phases: Narrative Architecture (weeks 1–4), Visual Development (weeks 5–10), and Production & Installation (weeks 11–14). All spatial graphics were designed in 3D before being flattened for print production.',
        },
        {
          type: 'media',
          asset: {
            url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=700&fit=crop',
            type: 'image',
            altText: 'A*STAR Futuristic Odyssey – immersive corridor environment in situ',
            width: 1200,
            height: 700,
            blurhash: 'LH9u;E~q9a?b~q-;%MIUxt-;M{xu',
          },
          caption: 'Chapter 3: "Quantum Horizons" — immersive corridor environment',
        },
        {
          type: 'quote',
          text: 'For the first time in our 22-year history, visitors stayed longer than scheduled. We had to extend the event by 90 minutes.',
          author: 'Head of Corporate Communications, A*STAR',
        },
        {
          type: 'text',
          content:
            'The motion graphics layer used real-time generative visuals driven by Notch, responding to visitor density data via a bespoke middleware layer. No two visitors had the same experience.',
        },
      ],
      results: [
        '3,400 visitors across 2-day event (vs 1,800 target)',
        'Average dwell time of 2h 40m (vs 1h 15m previous year)',
        'Best Government Event, Singapore Event Awards 2023',
        'System repurposed for 3 regional A*STAR roadshows at zero marginal design cost',
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&h=800&fit=crop',
        type: 'image',
        altText: 'A*STAR Odyssey – Chapter 1 entrance installation',
        width: 1200,
        height: 800,
        blurhash: 'LH9u;E~q9a?b~q-;%MIUxt-;M{xu',
      },
      {
        url: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1200&h=800&fit=crop',
        type: 'image',
        altText: 'A*STAR Odyssey – interactive kiosk cluster',
        width: 1200,
        height: 800,
        blurhash: 'L9A3uv9a00~q~qWB9axu00IU%MD%',
      },
      {
        url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&h=800&fit=crop',
        type: 'image',
        altText: 'A*STAR Odyssey – ambient lighting and floor graphics',
        width: 1200,
        height: 800,
        blurhash: 'L12wvHM{00IU~qIUxuIU00WB%MRj',
      },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectTeasers() {
  return projects.map(({ id, slug, title, category, interactionData }) => ({
    id,
    slug,
    title,
    category,
    interactionData,
  }));
}
