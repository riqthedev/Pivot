# Pivot

Pivot is a single-page AI basketball coaching assistant built for a hackathon MVP. Find what changes games — it turns a coach's team identity, observed game issues, and free-form notes into:

- Root cause analysis
- Top development priorities for the next practice
- Drill recommendations tied directly to those root causes
- One measurable target for the next game

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Local rules-based basketball analysis engine

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## How it works

The homepage keeps all form state in React. When the coach submits the form, the app sends a `POST` request to `/api/analyze` with:

- One team identity
- One or more observed issues
- Optional coach notes

The API route runs a deterministic basketball analysis engine that:

- Scores likely root causes from the selected issues
- Uses coach note keywords to increase confidence in matching causes
- Applies team-identity context so the advice still feels specific
- Returns the same structured JSON shape every time for clean UI rendering

## Demo flow

Use this sample input for a demo:

- Team identity: `Transition Focused`
- Issues: `Gave up fastbreak points`, `Too many turnovers`, `Fatigue`
- Notes: `Players stopped sprinting back. Too many lazy passes. Team looked tired in the second half.`

Expected behavior:

- Root causes mention transition recovery and live-ball turnover problems
- Priorities focus on decision-making, sprint-back habits, and second-half energy
- Drills clearly explain why they fit the diagnosed problem
- The weekly target gives one measurable game metric to track

## Validation and error handling

- The form requires a team identity
- The form requires at least one observed issue
- The API returns deterministic structured output with no quota or billing risk
- Invalid request bodies still return clear validation errors

## Scripts

```bash
npm run dev
npm run lint
npm run build
```
