const Parser = require("rss-parser");
const { SOURCES } = require("../../../config");

const parser = new Parser();

async function fetchGoogleJobs({ searchTerms, location }) {
  const jobs = [];
  console.log("SOURCES", SOURCES);
  for (const source of SOURCES) {
    if (source.type !== "rss") continue;
    const feed = await parser.parseURL(source.url);
    console.log("feed", feed);
    jobs.push(
      ...feed.items.map((item) => ({
        id: item.link,
        title: item.title,
        company: item.creator || "Unknown",
        location: item.contentSnippet || "",
        url: item.link,
        source: "Google",
      })),
    );
  }

  return jobs;
}

module.exports = { fetchGoogleJobs };
