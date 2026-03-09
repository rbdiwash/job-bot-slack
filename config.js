module.exports = {
  // Paste your resume here (skills, experience, etc.)
  SOURCES: [
    {
      type: "rss",
      url: "https://www.google.com/search?q=software+developer+jobs&tbm=nws",
    },
    {
      type: "rss",
      url: "https://www.google.com/search?q=frontend+developer+jobs&tbm=nws",
    },
  ],

  resumeText: `
   PROFESSIONAL SUMMARY
Full-Stack Engineer with 4+ years of experience building scalable web and mobile applications using React, Next.js,
Node.js, Express, TypeScript, and AWS. Strong track record of owning features end-to-end, shipping production systems
rapidly, and simplifying complex workflows into fast, elegant user experiences. Experienced in REST API design,
cloud-native architectures on AWS, CI/CD pipeline automation, and test-driven development practices. Led internal
dashboards, automation systems, and high-growth product initiatives across EdTech, SaaS, and mobile platforms.
PROFESSIONAL EXPERIENCE
Software Developer Kothar Educational Services | Sydney, NSW, Australia | Feb 2025 – Jan 2026
● Built and deployed a full-stack company website and internal admin CRM system using React.js, Node.js, NestJS
and TypeScript, reducing manual operational processing time by 40% and enabling staff to manage 3x more
applications per day.
● Led end-to-end development of the CAM Cricket mobile platform and admin dashboard using React Native and
Node.js, coordinating across 2 time zones to ship 5+ features in the first quarter, reducing release cycle time by
25%.
● Authored detailed SRS documents, coordinated milestones, and ensured development velocity in a startup
environment.
● Accomplished enhanced system reliability and scalability by managing integrations, performance tuning, and
codebase refactoring, resulting in a 40% reduction in failures and 30% faster response times.
● Developed a Slack bot that automated real-time delivery of education consultancy regulatory updates, reducing
manual news monitoring effort by 70% and accelerating team response times.
Tech: React.js, Node.js, Express, TypeScript, AWS (S3, Lambda), MongoDB, MySQL, CI/CD, Docker, NestJS
Software Developer Varicon | Remote, Australia | July 2021 – July 2023
● Engineered 5+ responsive React.js features used by 1,000+ users, reducing average task completion time by 30%
through optimized component architecture and async data handling.
● Integrated RESTful APIs (Python/Django) with robust async data handling and caching for performance.
● Delivered 5+ end-to-end product features per sprint cycle, writing unit and integration tests with Jest and
conducting peer code reviews that reduced post-release bug rates by 20%.
● Optimized GitHub Actions CI/CD pipelines, reducing average build time by 40%; mentored 4 junior developers
through weekly code reviews, improving team code quality and reducing PR review cycles.
● Helped troubleshoot critical production issues through logs, monitoring, and performance profiling.
Tech: React.js, Python/Django, REST APIs, AWS, GitHub Actions, Jest
Frontend Developer Graphene | Kathmandu, Nepal | Sept 2020 – July 2021
● Led UI/UX redesign for multiple enterprise clients, boosting engagement metrics by 25%+.
● Revamped the full CG Corporation website for performance, accessibility, and modern UX.
● Built custom WordPress themes/plugins and optimized web performance across multiple properties.
● Collaborated with backend teams to integrate APIs and deliver end-to-end product improvements.
TECHNICAL SKILLS
● Frontend: React.js, Next.js, Nuxt, TypeScript, JavaScript (ES6+), React Native, Tailwind CSS, Material UI
● Backend: Node.js, Express.js, NestJS, PHP
● Database: MySQL, MongoDB, Firebase, PostgreSQL
● Cloud: AWS (S3,Lambda, EC2, SES), Docker, CI/CD
● Tools: WordPress, Shopify, Figma, Jest, Cypress, Strapi, Cursor, Claude Code
EDUCATION
Master of Engineering (Computer Engineering) (72.06 WAM) July 2023 – July 2025
University of Wollongong | Wollongong, NSW, Australia
KEY PROJECTS
SuperMerch: www.supermerch.com.au
● Mentored junior developers and contributed as a coder to the refactoring and stabilization of SuperMerch
(supermerch.com.au), an e-commerce platform serving 50,000+ products, reducing Node.js API response times by
~40% and improving frontend load performance through React component optimization and code splitting.
Geshan’s Blog : www.geshan.com.np
● Contributed to an open-source project by optimizing and redesigning a tech blog (geshan.com.np) serving 1,000+
daily readers, achieving near-perfect PageSpeed scores (Performance: 99, Accessibility: 100, SEO: 100) using
Eleventy (11ty).
Gharbeti (In Development)
● Full-stack rental management mobile application for the Nepali market.
● Built with React Native, Node.js, Express, and MongoDB.
● Features include tenant management, automated rent reminders, maintenance tracking, document verification,
and in-app messaging.
  `,

  // Job search settings (Tasmania, 8am daily)
  location: "Tasmania",
  country: "au",

  // LinkedIn jobs via RSS (no API key). Create a feed at rss.app from your LinkedIn job search URL.
  // Use {keywords} and {location} to build URL from job title + location, or paste a static RSS URL.
  linkedInRssUrl: process.env.LINKEDIN_RSS_URL || "",

  jobTitles: [
    "software developer",
    "frontend developer",
    "full-stack developer",
    "IT",
  ],
  cronSchedule: "0 8 * * *", // 8:00 AM every day
};
