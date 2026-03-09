/**
 * Seek.com.au scraper - Australian job board
 * Uses Puppeteer for client-side rendered content
 */
async function fetchSeekJobs({ searchTerms, location = "Tasmania" }) {
  try {
    const puppeteer = require("puppeteer");
    const keyword = searchTerms[0]?.replace(/\s+/g, "-") || "software-developer";
    const loc = (location || "Tasmania").replace(/\s+/g, "-");
    const searchUrl = `https://www.seek.com.au/${keyword}-jobs/in-${loc}-TAS`;

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
      );
      await page.goto(searchUrl, { waitUntil: "networkidle2", timeout: 15000 });

      const jobs = await page.evaluate(() => {
        const results = [];
        const cards = document.querySelectorAll('[data-search-sol-meta], article[data-automation="normalJob"]');
        cards.forEach((card) => {
          const link = card.querySelector("a[href*='/job/']");
          const titleEl = card.querySelector("h1 a, h2 a, h3 a, [data-automation='jobTitle']");
          const companyEl = card.querySelector("[data-automation='jobCompany']");
          const locEl = card.querySelector("[data-automation='jobLocation']");
          if (link?.href) {
            results.push({
              title: titleEl?.textContent?.trim() || "Unknown",
              company: companyEl?.textContent?.trim() || "Unknown",
              location: locEl?.textContent?.trim() || "Not specified",
              url: link.href,
            });
          }
        });
        return results;
      });

      await browser.close();

      return jobs.slice(0, 15).map((job, i) => ({
        id: `seek-${i}-${job.url}`,
        title: job.title,
        company: job.company,
        location: job.location,
        salaryMin: null,
        salaryMax: null,
        url: job.url,
        source: "Seek",
      }));
    } finally {
      await browser.close();
    }
  } catch (err) {
    console.warn("Seek scraper failed:", err.message);
    return [];
  }
}

module.exports = { fetchSeekJobs };
