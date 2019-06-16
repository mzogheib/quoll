# Quoll

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Visualise your personal data all in one place!

<img src="assets/screenshot.png" alt="screenshot" style="max-width: 700px"/>

Currently supports:

- [Strava](https://www.strava.com) - Fitness tracking
- [Toshl](https://toshl.com) - Finance tracking
- [Uber](https://www.uber.com) - Ride sharing

Previously supported:

- [Moves](https://www.moves-app.com/) - Fitness tracking (RIP 🙏)

## Getting Started

_Note: This project is currently in local development only. Production build & deployment support is coming soon._

1. Clone the repo

```
git clone https://github.com/mzogheib/quoll.git
```

2. Install yarn

```
npm install -g yarn
```

3. Install dependencies

```
cd quoll && yarn
```

4. Add 3rd party API credential files to `packages/server/feed-apis/private/`. Refer below.

5. Start the dev servers

```
yarn start
```

### 3rd Party API credentials

Files to add:

- strava-auth.json
- toshl-auth.json
- uber-auth.json

File contents:

```
{
  "client_id": "XXXXXXXXXX",
  "client_secret": "XXXXXXXXXX",
}
```

## TODO & Issue Tracking

Refer to [issues](https://github.com/mzogheib/quoll/issues).
