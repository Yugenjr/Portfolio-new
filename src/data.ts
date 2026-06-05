import { Project, SkillCategory, TimelineItem, Hackathon } from './types';

export const PERSONAL_BIO = {
  name: 'YUGENDRA N',
  title: 'AI, ML & Full-Stack Developer // B.Tech AI & DS',
  tagline: 'Leveraging intelligence-driven algorithms and interactive full-stack architectures to construct robust digital engines.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
  about: `I am an Aspiring Software Developer currently pursuing a B.Tech in Artificial Intelligence & Data Science at Sri Eshwar College of Engineering (2024–28). Highly active in coding culture, I serve as a HackerRank Campus Ambassador, Core Member of the SECE Technical Club, and a frequent hackathon competitor with multiple national-level wins. My focus lies at the intersection of AI modeling, ML pipeline reliability, and performant full-stack applications.`,
  email: 'yugenjr847@gmail.com',
  github: 'https://github.com/Yugenjr',
  linkedin: 'https://www.linkedin.com/in/yugen842007sece/',
  leetcode: 'https://leetcode.com/yugenjr847',
  discord: 'yugen#0847',
  location: 'Tamil Nadu, India',
};

export const PROJECTS: Project[] = [
  {
    id: 'track-it',
    title: 'Track It // Expiry Tracker',
    category: 'Full-Stack Development',
    description: 'A robust full-stack predictive expiry tracking application. Implements optical character recognition (OCR) extraction using OpenCV and Tesseract with custom modular automation APIs.',
    techStack: ['Next.js', 'MongoDB', 'OpenCV', 'Tesseract', 'Node.js'],
    githubUrl: 'https://github.com/Yugenjr',
    demoUrl: 'https://github.com/Yugenjr',
    stars: 124,
    forks: 18,
    colorTheme: 'cyan',
    featured: true,
  },
  {
    id: 'parkinson-ml',
    title: 'Parkinson\'s Detection',
    category: 'Machine Learning',
    description: 'A diagnostic machine learning analysis suite targeting Parkinson\'s disease. Compares four classifiers—SVM, RF, KNN, and Logistic Regression—with cross-validation scoring.',
    techStack: ['Python', 'Scikit-learn', 'SVM', 'Random Forest', 'Matplotlib'],
    githubUrl: 'https://github.com/Yugenjr',
    demoUrl: 'https://github.com/Yugenjr',
    stars: 98,
    forks: 11,
    colorTheme: 'pink',
    featured: true,
  },
  {
    id: 'smart-pill',
    title: 'Smart Pill Advisor',
    category: 'AI Applications',
    description: 'An intelligent medical advisory and drug-to-drug interaction checker. Validates medicine safety thresholds and cross-compatibility metrics during multiple intake regimes.',
    techStack: ['Python', 'Streamlit', 'Flask', 'TensorFlow', 'REST APIs'],
    githubUrl: 'https://github.com/Yugenjr',
    demoUrl: 'https://github.com/Yugenjr',
    stars: 87,
    forks: 9,
    colorTheme: 'lime',
    featured: true,
  },
  {
    id: 'doc-classifier',
    title: 'AI Document Classifier',
    category: 'Machine Learning',
    description: 'Enterprise B2B/B2C intelligent document pipeline. Automatic document categorization and metadata extraction leveraging a 3-fallback model structure with Google Drive cloud storage.',
    techStack: ['FastAPI', 'Python', 'ML Pipelines', 'Drive API', 'JSON-LD'],
    githubUrl: 'https://github.com/Yugenjr',
    demoUrl: 'https://github.com/Yugenjr',
    stars: 115,
    forks: 14,
    colorTheme: 'violet',
    featured: true,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Development Stack',
    iconName: 'Layout',
    skills: [
      { name: 'React / Next.js', level: 90, description: 'Client & Server components, routing, modular frontend architecture' },
      { name: 'Python, C++, Java, C', level: 93, description: 'HackerRank 5★ Python & C++, algorithmic problem solving, structures' },
      { name: 'TypeScript / JS', level: 88, description: 'Strict typing schemas, async routines, high-contrast DOM interactions' },
      { name: 'Node.js / FastAPI / Flask', level: 85, description: 'Server REST APIs, payload schemas, route micro-services' },
    ],
  },
  {
    title: 'AI / ML & Databases',
    iconName: 'Server',
    skills: [
      { name: 'Machine Learning / NLP', level: 88, description: 'SVM, Random Forest, KNN, Logistic Regression, predictive pipelines' },
      { name: 'NumPy, Scikit-learn, TF', level: 86, description: 'Model cross-validation, array structures, OpenCV OCR extraction' },
      { name: 'PostgreSQL / SQL', level: 82, description: 'Relational indexes, schema normalizations, complex querying' },
      { name: 'MongoDB / Supabase / Firebase', level: 85, description: 'NoSQL collections, real-time data persistence, Cloud Rule definitions' },
    ],
  },
  {
    title: 'Tools & Core Skills',
    iconName: 'Terminal',
    skills: [
      { name: 'Git & GitHub Workflows', level: 92, description: 'Continuous integration actions, collaborate branch reviews, versioning' },
      { name: 'Data Structures & OOP', level: 88, description: 'Strong core computer science, memory management, optimal runtimes' },
      { name: 'Figma & UI Designing', level: 80, description: 'High-contrast mockups, grid layouts, responsive layout variables' },
    ],
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 'time-1',
    period: '2024 - 2028',
    companyOrTopic: 'Sri Eshwar College (SECE)',
    title: 'B.Tech - Artificial Intelligence & Data Science',
    description: 'Building deep foundations in computing, database systems, mathematical models, and intelligence systems. Active HackerRank Campus Ambassador & Core Member of Technical Club @SECE.',
    tags: ['AI & DS', 'CGPA: 8.52', 'Campus Ambassador', 'Algorithms'],
    roleIcon: 'BookOpen',
  },
  {
    id: 'time-2',
    period: 'INTERNSHIP // SYNAPSLOGIC',
    companyOrTopic: 'SynapsLogic',
    title: 'Frontend Development Intern',
    description: 'Delivered 6+ client-facing UI components and contributed to full-stack development by collaborating with backend engineering teams. Reduced delivery errors by 18%.',
    tags: ['React', 'Full-stack UI', 'Component Engineering', 'Collaboration'],
    roleIcon: 'Briefcase',
  },
  {
    id: 'time-3',
    period: 'INTERNSHIP // GOPLUTO.AI',
    companyOrTopic: 'GoPluto.ai',
    title: 'AI Algorithms & Automation Intern',
    description: 'Engineered AI-driven continuous routines. Improved system prediction consistency metrics by 15% through optimization of ML pipeline reliability.',
    tags: ['AI Algorithms', 'Automation Routines', 'ML Pipelines', 'Reliability'],
    roleIcon: 'Globe',
  },
];

export const HACKATHONS: Hackathon[] = [
  {
    id: 'hack-agentica',
    title: 'Agentica 2.0 Hackathon',
    award: 'Winner // 1st Place',
    prize: '₹5,000 Cash Prize',
    period: '2025',
    description: 'Developed an innovative solution utilizing robust agentic workflows and intelligent system logic. Secured the top spot and cash prize after rigorous evaluation under national standards.',
    tags: ['Agentic Core', 'AI System', 'FastAPI', 'Automation'],
    colorTheme: 'yellow',
  },
  {
    id: 'hack-freshathon',
    title: 'Freshathon',
    award: '2nd Place Runner Up',
    prize: 'Silver Trophy Honors',
    period: '2024',
    description: 'Designed and engineered an adaptive full-stack system layout under intense time-sprint pressure. Recognized for superb responsiveness and client-facing usability.',
    tags: ['React', 'Next.js', 'Figma', 'Speed Coding'],
    colorTheme: 'cyan',
  },
  {
    id: 'hack-zeroday',
    title: 'ZeroDay Hackathon',
    award: '2nd Place Runner Up',
    prize: 'Special Achievements Citation',
    period: '2024',
    description: 'Devised real-time vulnerability scanner and analytics dashboard dashboards. Optimized critical data payloads and simplified the complex alerts routing model.',
    tags: ['Security Shield', 'Real-time Stats', 'Algorithms', 'MNC Evaluation'],
    colorTheme: 'pink',
  },
  {
    id: 'hack-national',
    title: 'National Level Hackathons',
    award: '3x National Code Finalist',
    prize: 'Distinguished Finalist badge',
    period: '2024 - 2025',
    description: 'Competed with elite developers across top-tier institutions. Successfully qualified for project showcase rounds in three major high-stake engineering hackathons.',
    tags: ['ML Prototyping', 'Database Architecture', 'Team Leadership'],
    colorTheme: 'lime',
  }
];

