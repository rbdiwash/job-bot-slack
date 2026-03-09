/**
 * Post jobs to a Slack channel using an Incoming Webhook.
 * Each source (LinkedIn, Indeed, Google, Seek) can have its own webhook → own channel.
 */
async function postJobsToSlack(jobs, webhookUrl) {
  if (!webhookUrl || jobs.length === 0) return;

  const lines = ["*Job matches for you*", `Found ${jobs.length} jobs:`, ""];

  for (const job of jobs) {
    const salary =
      job.salaryMin || job.salaryMax
        ? ` • $${[job.salaryMin, job.salaryMax]
            .filter(Boolean)
            .map((s) => (typeof s === "number" ? s.toLocaleString() : s))
            .join(" - ")}`
        : "";
    lines.push(`• *${job.title}* at ${job.company}`);
    lines.push(`  ${job.location}${salary}`);
    lines.push(`  <${job.url || "#"}|View job>`);
    lines.push("");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: lines.join("\n") }),
  });

  if (!response.ok) {
    throw new Error(`Slack webhook failed: ${response.status}`);
  }
}

module.exports = { postJobsToSlack };
