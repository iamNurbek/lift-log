# Lift Log

A phone-first workout log. Pick a day, pick the session you're actually doing, and log weight and reps for every set, with last time's numbers right there to beat.

> Screenshot coming once the UI lands.

**Live demo:** Coming soon

## Tech stack

- React + TypeScript (strict mode), built with Vite
- Tailwind CSS, with design tokens defined in one place
- Vitest and React Testing Library
- ESLint and Prettier
- `localStorage` behind a storage adapter interface
- GitHub Actions for CI and deploys to GitHub Pages

## Features

- Monday-to-Sunday week strip with a jump-to-date picker
- A weekly plan that fills in each day's session, which you can switch when plans change
- Per-set weight and reps inputs built for one-handed use between sets
- "Last time" line for each exercise, plus last session's numbers as placeholders
- A progression hint when you've hit the top of the rep range on every set
- Optional cardio block and notes on any day
- Autosave, including when the phone locks mid-workout
- JSON export and import for backups
- Light and dark themes that follow the system setting

## Run locally

Requires Node 20 or newer.

```bash
git clone https://github.com/iamNurbek/lift-log.git
cd lift-log
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run test`, `npm run lint`, `npm run typecheck`.

## What I learned

- Dates are stored as local `YYYY-MM-DD` strings built from the date parts. `toISOString()` uses UTC, so in New York it returns tomorrow's date after about 7 pm.
- Components never touch `localStorage` directly. Everything goes through a small storage interface, so a real backend can replace it later without touching the UI.

## License

[MIT](LICENSE)
