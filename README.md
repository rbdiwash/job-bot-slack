# Job Parser Slack

Fetches jobs from **LinkedIn, Indeed, Google Jobs, and Seek** and posts each source to its **own Slack channel** via webhooks (8am daily).

## Setup

### 1. Install

```bash
npm install
```

### 2. Slack webhooks (one per channel)

Create one Incoming Webhook per channel:

1. [api.slack.com/apps](https://api.slack.com/apps) → Create New App → From scratch
2. **Incoming Webhooks** → **On** → **Add New Webhook to Workspace**
3. Choose the channel (e.g. #linkedin-jobs) and copy the webhook URL
4. Repeat for each channel you want (e.g. #indeed-jobs, #google-jobs, #seek-jobs)

### 3. Configure

```bash
cp .env.example .env
```

In `.env`, set the webhook for each source you use (you can omit any you don’t want):

```
SLACK_WEBHOOK_LINKEDIN=https://hooks.slack.com/services/.../linkedin-channel
SLACK_WEBHOOK_INDEED=https://hooks.slack.com/services/.../indeed-channel
SLACK_WEBHOOK_GOOGLE=https://hooks.slack.com/services/.../google-channel
SLACK_WEBHOOK_SEEK=https://hooks.slack.com/services/.../seek-channel
```

Only sources with a webhook URL will be posted; others are skipped.

### 4. LinkedIn jobs via RSS (free, no API key)

1. Go to [linkedin.com/jobs/search](https://www.linkedin.com/jobs/search/) and set your job title and location.
2. Copy the full URL from the address bar.
3. Go to [rss.app](https://rss.app/rss-feed), paste the URL, click **Generate**, then copy the RSS feed URL.
4. In `.env` set `LINKEDIN_RSS_URL=<your rss feed url>`.

To use **job title and location from config** dynamically, use placeholders in the URL (if your RSS provider supports it): `{keywords}` and `{location}`.

### 5. Resume (optional)

Edit `config.js` and paste your resume in `resumeText` to improve job matching.

## Run

```bash
npm start
```

Runs once on start, then every day at **8:00 AM** (Australia/Sydney). Jobs are grouped by source (LinkedIn, Indeed, Google, Seek) and each group is posted to its webhook’s channel.
