const { fetchGoogleJobs } = require("./jobFetchers/google");
const { fetchSeekJobs } = require("./jobFetchers/seek");

async function fetchJobs({ searchTerms, location, resultsPerPage = 15 }) {
  const loc = location || "Tasmania";
  const terms = searchTerms.length
    ? searchTerms
    : ["software developer", "frontend developer"];

  const results = await Promise.allSettled([
    fetchGoogleJobs({ searchTerms: terms, location: loc }),
    fetchSeekJobs({ searchTerms: terms, location: loc }),
  ]);

  const allJobs = [];
  for (const result of results) {
    if (result.status === "fulfilled" && Array.isArray(result.value)) {
      allJobs.push(...result.value);
    }
  }

  // Deduplicate by URL
  const seen = new Set();
  const unique = allJobs.filter((job) => {
    const key = job.url || job.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return unique;
}

module.exports = { fetchJobs };
