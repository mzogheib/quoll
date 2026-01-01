# Quoll

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Visualise your personal data all in one place!

<img src="assets/screenshot.png" alt="screenshot" style="max-width: 700px"/>

Currently supports:

- [Strava](https://www.strava.com) - Fitness tracking
- [Toshl](https://toshl.com) - Finance tracking

Previously supported:

- [Moves](https://www.moves-app.com/) - Fitness tracking (RIP 🙏)
- [Uber](https://www.uber.com) - Ride sharing (deprecated)

## Getting Started

1. Clone the repo and navigate to it
   ```sh
   git clone https://github.com/mzogheib/quoll.git
   cd quoll
   ```
1. Install the specified Node.js version and enable [corepack](https://github.com/nodejs/corepack)
   ```sh
   corepack enable
   ```
1. Install dependencies and prepare Husky
   ```sh
   yarn
   yarn prepare
   ```
1. Add environment variables for 3rd party API credentials. Refer to to `packages/api/feed-apis/` for usage.
1. From the root directory run the following and select which package to run. To run another package, open a new terminal and repeat.
   ```sh
   yarn start
   ```

## Release process

See [here](https://github.com/mzogheib/quoll/wiki/Release-Instructions).

## TODO & Issue Tracking

Refer to [issues](https://github.com/mzogheib/quoll/issues).
