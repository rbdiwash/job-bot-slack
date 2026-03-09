require("dotenv").config();
const cron = require("node-cron");
const config = require("../config");
const { parseResumeText } = require("./services/resumeParser");
const { fetchJobs } = require("./services/jobFetcher");
const { postJobsToSlack } = require("./services/slackNotifier");

// Webhook URL for each source → post to that channel
const WEBHOOKS = {
  LinkedIn: process.env.SLACK_WEBHOOK_LINKEDIN,
  Indeed: process.env.SLACK_WEBHOOK_INDEED,
  Google: process.env.SLACK_WEBHOOK_LINKEDIN,
  Seek: process.env.SLACK_WEBHOOK_SEEK,
};

// Keep track of job URLs we've already sent during this process lifetime
const sentJobKeys = new Set();

async function runJobSearch() {
  try {
    let searchTerms = parseResumeText(config.resumeText, config.jobTitles);
    if (searchTerms.length === 0) {
      searchTerms = [
        "software developer",
        "frontend developer",
        "full-stack developer",
        "IT",
        "IT Manager",
        "IT Support",
        "IT Consultant",
        "IT Analyst",
        "IT Architect",
        "IT Engineer",
        "IT Specialist",
        "IT Director",
      ];
    }

    const jobs = await fetchJobs({
      searchTerms,
      location: config.location,
      resultsPerPage: 15,
    });

    // filter out jobs we’ve already sent before
    const newJobs = jobs.filter((job) => {
      const key = job.url || job.id;
      if (!key) return true; // if no key, treat as new
      if (sentJobKeys.has(key)) return false;
      sentJobKeys.add(key);
      return true;
    });

    if (newJobs.length === 0) {
      console.log("No new jobs to post.");
      return;
    }

    // existing grouping + posting, but use newJobs instead of jobs
    const bySource = {};
    for (const job of newJobs) {
      const source = job.source || "Google";
      if (!bySource[source]) bySource[source] = [];
      bySource[source].push(job);
    }
    for (const [source, sourceJobs] of Object.entries(bySource)) {
      const webhook = WEBHOOKS[source];

      if (!webhook) {
        console.log(
          `No webhook for ${source}, skipping ${sourceJobs.length} jobs.`,
        );
        continue;
      }

      await postJobsToSlack(sourceJobs, webhook);
      console.log(`Posted ${sourceJobs.length} ${source} jobs to Slack.`);
    }
  } catch (err) {
    console.error("Job search failed:", err.message);
  }
}

// Run every day at 8:00 AM Australia/Sydney time
cron.schedule("0 8 * * *", runJobSearch, {
  timezone: "Australia/Sydney",
});

console.log("Job Parser Slack running. Next run: 8:00 AM Australia/Sydney.");

runJobSearch();
