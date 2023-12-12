# Quoll

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Visualise your personal data all in one place!

<img src="assets/screenshot.png" alt="screenshot" style="max-width: 700px"/>

Currently supports:

- [Strava](https://www.strava.com) - Fitness tracking
- [Toshl](https://toshl.com) - Finance tracking
- [Uber](https://www.uber.com) - Ride sharing

Previously supported:

- [Moves](https://www.moves-app.com/) - Fitness tracking (RIP 🙏)

## Getting Started

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

4. Add environment variables for 3rd party API credentials. Refer to to `packages/api/feed-apis/` for usage.

5. Start the dev server for each package in its own terminal.

```
yarn start <package-name>
```

## TODO & Issue Tracking

Refer to [issues](https://github.com/mzogheib/quoll/issues).
