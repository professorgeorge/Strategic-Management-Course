// Strategic Management — Module Metadata
// Professor Babu George | MBA Course

window.COURSE_META = {
  title: "Strategic Management",
  subtitle: "An MBA Course for the Age of Disruption",
  instructor: {
    name: "Professor Babu George",
    title: "Professor of Strategic Management",
    linkedin: "https://www.linkedin.com/in/beingbabu/",
    bio: "A globally recognized scholar at the intersection of strategy, complexity, and sustainability. Professor George brings decades of research and executive education experience across five continents."
  },
  passingScore: 70,
  totalModules: 11,

  modules: [
    {
      id: 1, slug: "foundations",
      title: "Foundations of Strategic Management",
      subtitle: "Rethinking strategy for turbulent times",
      color: "#c87a28", colorVar: "oklch(62% 0.15 52)",
      duration: "4–5 hrs", lessonCount: 5,
      tag: "Core",
      objectives: [
        "Distinguish strategic thinking from strategic planning and articulate why the distinction matters in volatile environments",
        "Trace the intellectual evolution of strategic management across major schools of thought",
        "Evaluate the relationship between mission, vision, values, and organizational purpose",
        "Diagnose the structural, cognitive, and cultural reasons why strategies fail",
        "Apply foundational frameworks to assess strategic fit and adaptive capacity"
      ],
      lessons: [
        { id: "1.1", title: "What Is Strategy? Beyond the Planning Paradigm", type: "concept", readTime: "10 min" },
        { id: "1.2", title: "Mission, Vision, Values, and Organizational Purpose", type: "concept", readTime: "9 min" },
        { id: "1.3", title: "The Intellectual Evolution of Strategic Thought", type: "framework", readTime: "12 min" },
        { id: "1.4", title: "Why Strategy Fails", type: "concept", readTime: "10 min" },
        { id: "1.5", title: "Disruptive Insight: When Plans Become Prisons", type: "disruptive", readTime: "7 min" }
      ],
      miniCase: { title: "Nokia's Strategic Rigidity", company: "Nokia", era: "2007–2013" },
      futureSection: "From Optimization to Resilience: The New Strategic Agenda"
    },
    {
      id: 2, slug: "external-environment",
      title: "External Environment & Strategic Foresight",
      subtitle: "Reading the world before the world reads you",
      color: "#3a5fa0", colorVar: "oklch(55% 0.16 245)",
      duration: "4–5 hrs", lessonCount: 4,
      tag: "Analysis",
      objectives: [
        "Apply an expanded macro-environmental framework that integrates institutional and geopolitical forces",
        "Analyze industry structure using and beyond Porter's Five Forces",
        "Map platform ecosystems and their implications for competitive positioning",
        "Design and interpret basic scenario plans for strategic decision-making under uncertainty"
      ],
      lessons: [
        { id: "2.1", title: "Macro-Environment Analysis: PESTLE and Beyond", type: "framework", readTime: "11 min" },
        { id: "2.2", title: "Industry Structure and Competitive Forces", type: "framework", readTime: "10 min" },
        { id: "2.3", title: "Ecosystem Thinking: Beyond Industry Boundaries", type: "concept", readTime: "9 min" },
        { id: "2.4", title: "Strategic Foresight and Scenario Planning", type: "tool", readTime: "12 min" }
      ],
      miniCase: { title: "Streaming Wars and Ecosystem Collapse", company: "Media Industry", era: "2020–present" },
      futureSection: "From Environmental Scanning to Continuous Intelligence"
    },
    {
      id: 3, slug: "internal-analysis",
      title: "Internal Analysis & Strategic Capability",
      subtitle: "What you have, what you do, and what you can become",
      color: "#2d7a4f", colorVar: "oklch(56% 0.15 160)",
      duration: "4–5 hrs", lessonCount: 4,
      tag: "Analysis",
      objectives: [
        "Apply the Resource-Based View and VRIN framework to assess competitive potential",
        "Explain dynamic capabilities and their role in adaptive strategy",
        "Analyze value chain activities to identify sources of differentiation and cost advantage",
        "Evaluate organizational ambidexterity as a strategic design challenge"
      ],
      lessons: [
        { id: "3.1", title: "Resources, Capabilities, and the VRIN Framework", type: "framework", readTime: "11 min" },
        { id: "3.2", title: "Dynamic Capabilities: Sensing, Seizing, Reconfiguring", type: "concept", readTime: "10 min" },
        { id: "3.3", title: "Value Chain Analysis and Knowledge Assets", type: "tool", readTime: "9 min" },
        { id: "3.4", title: "Organizational Ambidexterity and Strategic Agility", type: "concept", readTime: "10 min" }
      ],
      miniCase: { title: "Amazon's Capability Architecture", company: "Amazon", era: "2000–present" },
      futureSection: "From Core Competencies to Adaptive Capability Portfolios"
    },
    {
      id: 4, slug: "digital-advantage",
      title: "Competitive Advantage in the Digital Era",
      subtitle: "Strategy in a world of platforms, data, and AI",
      color: "#7c3fa0", colorVar: "oklch(48% 0.16 300)",
      duration: "4–5 hrs", lessonCount: 4,
      tag: "Digital",
      objectives: [
        "Evaluate business model innovation as a strategic lever beyond product and process",
        "Explain platform economics, network effects, and winner-take-most dynamics",
        "Assess data and AI as sources of durable competitive advantage",
        "Develop a digital transformation strategy framed around capability and value creation"
      ],
      lessons: [
        { id: "4.1", title: "Business Model Innovation and Value Architecture", type: "concept", readTime: "10 min" },
        { id: "4.2", title: "Platform Economics and Network Effects", type: "framework", readTime: "11 min" },
        { id: "4.3", title: "Data, AI, and the New Competitive Frontier", type: "concept", readTime: "12 min" },
        { id: "4.4", title: "Digital Transformation: Strategy Not Technology", type: "tool", readTime: "9 min" }
      ],
      miniCase: { title: "Grab vs. Gojek: Platform Strategy in Southeast Asia", company: "Grab / Gojek", era: "2015–present" },
      futureSection: "When Competitive Advantage Becomes Algorithmic"
    },
    {
      id: 5, slug: "formulation",
      title: "Strategy Formulation",
      subtitle: "Making choices that define the firm's future",
      color: "#1a7a77", colorVar: "oklch(55% 0.16 195)",
      duration: "5–6 hrs", lessonCount: 5,
      tag: "Formulation",
      objectives: [
        "Distinguish corporate strategy from business strategy and apply each to real cases",
        "Apply Blue Ocean logic to identify uncontested market space",
        "Evaluate diversification rationale using portfolio and synergy frameworks",
        "Design an international strategy that reflects both market and institutional complexity",
        "Apply real-options thinking to innovation strategy under uncertainty"
      ],
      lessons: [
        { id: "5.1", title: "Generic Strategies and Strategic Positioning", type: "framework", readTime: "10 min" },
        { id: "5.2", title: "Blue Ocean Strategy: Creating Uncontested Space", type: "framework", readTime: "10 min" },
        { id: "5.3", title: "Corporate Strategy: Diversification and Vertical Integration", type: "concept", readTime: "11 min" },
        { id: "5.4", title: "International Strategy in a Fragmented World", type: "concept", readTime: "10 min" },
        { id: "5.5", title: "Innovation Strategy and Real Options Thinking", type: "tool", readTime: "10 min" }
      ],
      miniCase: { title: "IKEA's Glocal Strategy", company: "IKEA", era: "1990–present" },
      futureSection: "Strategy Formulation When the Future Is Unpredictable"
    },
    {
      id: 6, slug: "implementation",
      title: "Strategy Implementation",
      subtitle: "The hard work of turning intent into action",
      color: "#b85a1a", colorVar: "oklch(58% 0.17 35)",
      duration: "4–5 hrs", lessonCount: 4,
      tag: "Execution",
      objectives: [
        "Diagnose the root causes of strategy-execution failure",
        "Apply alignment frameworks including the McKinsey 7-S model",
        "Design OKR systems that translate strategy into organizational action",
        "Lead strategic change by addressing cultural, political, and structural barriers"
      ],
      lessons: [
        { id: "6.1", title: "The Execution Gap: Why Good Strategies Die", type: "concept", readTime: "9 min" },
        { id: "6.2", title: "Organizational Design and Strategic Alignment", type: "framework", readTime: "11 min" },
        { id: "6.3", title: "OKRs, Incentives, and Strategy Translation", type: "tool", readTime: "9 min" },
        { id: "6.4", title: "Change Management and Cultural Alignment", type: "concept", readTime: "10 min" }
      ],
      miniCase: { title: "Microsoft's Cultural Reinvention under Nadella", company: "Microsoft", era: "2014–2020" },
      futureSection: "Implementing Strategy in Distributed and Hybrid Organizations"
    },
    {
      id: 7, slug: "evaluation",
      title: "Strategy Evaluation, Control & Adaptation",
      subtitle: "Knowing when the strategy is working — and when to change it",
      color: "#a03a60", colorVar: "oklch(50% 0.16 350)",
      duration: "4–5 hrs", lessonCount: 4,
      tag: "Control",
      objectives: [
        "Design a Balanced Scorecard linked to strategic intent",
        "Distinguish strategic control from operational control",
        "Apply organizational learning principles to strategy adaptation",
        "Lead strategic renewal and turnaround under crisis conditions"
      ],
      lessons: [
        { id: "7.1", title: "The Balanced Scorecard and Strategy Maps", type: "framework", readTime: "11 min" },
        { id: "7.2", title: "Strategic Control Systems and Early Warning", type: "tool", readTime: "9 min" },
        { id: "7.3", title: "Learning Loops, Experimentation, and Adaptation", type: "concept", readTime: "10 min" },
        { id: "7.4", title: "Resilience, Crisis Adaptation, and Strategy Renewal", type: "concept", readTime: "10 min" }
      ],
      miniCase: { title: "Fujifilm's Strategic Renewal vs. Kodak's Strategic Failure", company: "Fujifilm / Kodak", era: "2000–2015" },
      futureSection: "From Periodic Planning to Continuous Strategy"
    },
    {
      id: 8, slug: "ethics-sustainability",
      title: "Ethics, Sustainability & Stakeholder Strategy",
      subtitle: "Strategy in an age of accountability and purpose",
      color: "#3a7a50", colorVar: "oklch(54% 0.14 145)",
      duration: "4–5 hrs", lessonCount: 4,
      tag: "ESG",
      objectives: [
        "Critically evaluate ESG frameworks as both strategic opportunity and constraint",
        "Apply stakeholder theory beyond shareholder primacy",
        "Assess shared value creation as a strategy for competitive sustainability",
        "Navigate the ethical paradoxes inherent in responsible innovation"
      ],
      lessons: [
        { id: "8.1", title: "ESG, Stakeholder Theory, and the Limits of Shareholder Primacy", type: "concept", readTime: "11 min" },
        { id: "8.2", title: "Shared Value, B-Corps, and the New Business Logic", type: "framework", readTime: "9 min" },
        { id: "8.3", title: "Responsible Innovation and Ethical Paradoxes", type: "concept", readTime: "10 min" },
        { id: "8.4", title: "Legitimacy, Social License, and Institutional Pressures", type: "concept", readTime: "9 min" }
      ],
      miniCase: { title: "Patagonia's Purpose-First Strategy", company: "Patagonia", era: "2012–present" },
      futureSection: "When Sustainability Becomes the Core Strategy, Not an Add-On"
    },
    {
      id: 9, slug: "leadership",
      title: "Strategic Leadership & Decision Making",
      subtitle: "Thinking and acting strategically from the top",
      color: "#2a4fa0", colorVar: "oklch(48% 0.16 260)",
      duration: "4–5 hrs", lessonCount: 4,
      tag: "Leadership",
      objectives: [
        "Apply behavioral strategy insights to diagnose cognitive biases in executive decision-making",
        "Analyze the role of power, politics, and board governance in strategic outcomes",
        "Construct a strategic narrative that builds organizational alignment and external legitimacy",
        "Lead effectively under radical ambiguity and paradox"
      ],
      lessons: [
        { id: "9.1", title: "Executive Cognition and Behavioral Strategy", type: "concept", readTime: "11 min" },
        { id: "9.2", title: "Power, Politics, and Board Dynamics", type: "concept", readTime: "10 min" },
        { id: "9.3", title: "Strategic Narratives and Sense-Making", type: "tool", readTime: "9 min" },
        { id: "9.4", title: "Leading in Ambiguity: Paradox and Adaptive Leadership", type: "concept", readTime: "11 min" }
      ],
      miniCase: { title: "Reed Hastings and Netflix's Decade of Strategic Boldness", company: "Netflix", era: "2007–2022" },
      futureSection: "The Future of Strategic Leadership in AI-Augmented Organizations"
    },
    {
      id: 10, slug: "emerging-frontiers",
      title: "Emerging Frontiers in Strategy",
      subtitle: "The edges of strategy where the future is being written",
      color: "#3a3fa0", colorVar: "oklch(46% 0.17 270)",
      duration: "4–5 hrs", lessonCount: 4,
      tag: "Future",
      objectives: [
        "Develop an AI strategy framework that integrates human and machine intelligence",
        "Assess corporate strategic responses to climate transition and resource scarcity",
        "Analyze deglobalization, nearshoring, and geopolitical fragmentation as strategic variables",
        "Identify emerging strategic models from Global South innovators"
      ],
      lessons: [
        { id: "10.1", title: "AI Strategy: Beyond Automation to Competitive Transformation", type: "concept", readTime: "12 min" },
        { id: "10.2", title: "Climate Strategy and the Sustainability Transition", type: "concept", readTime: "10 min" },
        { id: "10.3", title: "Deglobalization, Geopolitical Risk, and Strategic Repositioning", type: "concept", readTime: "10 min" },
        { id: "10.4", title: "Innovation from the Global South: New Models, New Logic", type: "concept", readTime: "10 min" }
      ],
      miniCase: { title: "Ørsted: From Oil to Offshore Wind — A Radical Strategic Pivot", company: "Ørsted", era: "2012–2025" },
      futureSection: "Strategy at the Edge: Navigating Poly-Crisis and Civilizational Uncertainty"
    },
    {
      id: 11, slug: "capstone",
      title: "Integrative Capstone",
      subtitle: "Synthesizing strategic thinking through real-world application",
      color: "#c87a28", colorVar: "oklch(62% 0.15 52)",
      duration: "8–10 hrs", lessonCount: 3,
      tag: "Capstone",
      objectives: [
        "Synthesize all course frameworks into a coherent strategic analysis",
        "Conduct rigorous external and internal analysis of a real organization",
        "Formulate and justify strategic recommendations under uncertainty",
        "Present strategy in a structured executive format appropriate for MBA-level discourse"
      ],
      lessons: [
        { id: "11.1", title: "Capstone Brief and Project Scope", type: "brief", readTime: "15 min" },
        { id: "11.2", title: "Synthesis Framework and Analysis Guide", type: "framework", readTime: "20 min" },
        { id: "11.3", title: "Strategic Recommendation and Presentation Standards", type: "tool", readTime: "15 min" }
      ],
      miniCase: null,
      futureSection: null
    }
  ]
};
