// Common tech skills to extract from resume text
const SKILL_KEYWORDS = [
  "javascript",
  "typescript",
  "python",
  "java",
  "c#",
  "c++",
  "go",
  "rust",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "react",
  "vue",
  "angular",
  "node",
  "nodejs",
  "express",
  "nextjs",
  "django",
  "flask",
  "fastapi",
  "aws",
  "azure",
  "gcp",
  "docker",
  "kubernetes",
  "terraform",
  "ci/cd",
  "jenkins",
  "github actions",
  "sql",
  "mongodb",
  "postgresql",
  "redis",
  "graphql",
  "rest api",
  "microservices",
  "machine learning",
  "ml",
  "ai",
  "data science",
  "tensorflow",
  "pytorch",
  "html",
  "css",
  "tailwind",
  "sass",
  "redux",
  "webpack",
  "vite",
  "agile",
  "scrum",
  "jira",
  "git",
  "linux",
  "testing",
  "jest",
  "cypress",
  "IT",
];

function parseResumeText(text, jobTitles = []) {
  const lowerText = (text || "").toLowerCase();
  const keywords = new Set(jobTitles.map((t) => t.toLowerCase()));

  for (const skill of SKILL_KEYWORDS) {
    if (lowerText.includes(skill)) {
      keywords.add(skill);
    }
  }

  return Array.from(keywords);
}

module.exports = { parseResumeText };
