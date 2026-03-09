# Job Parser Slack

Fetches jobs from configurable sources (RSS, Seek) and posts them to Slack via webhooks. Runs daily at 8am (Australia/Sydney).

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` with your Slack webhook URLs (`SLACK_WEBHOOK_GOOGLE`, `SLACK_WEBHOOK_SEEK`, etc.).  
Edit `config.js` to add RSS sources and job titles.

## Run

```bash
npm start
```
