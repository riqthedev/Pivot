export const TEAM_IDENTITIES = [
  "Run and Gun",
  "Defensive Minded",
  "Pace and Space",
  "Balanced",
  "Motion Offense",
  "Transition Focused",
] as const;

export const ISSUE_GROUPS = [
  {
    id: "offense",
    label: "Offense",
    issues: [
      "Too many turnovers",
      "Bad spacing",
      "Low pace",
      "Missed open shots",
      "Poor shot selection",
      "Stalled in half court",
      "Struggled vs. ball pressure",
      "Low paint touches",
      "Weak extra-pass reads",
    ],
  },
  {
    id: "defense",
    label: "Defense",
    issues: [
      "Gave up fastbreak points",
      "Poor closeouts",
      "Lost rebounds",
      "Communication issues",
      "Help defense breakdown",
      "Gave up paint points",
      "Too many fouls",
      "Pick-and-roll breakdown",
      "Slow rotations",
    ],
  },
  {
    id: "physical",
    label: "Physical & Effort",
    issues: [
      "Fatigue",
      "Lack of speed",
      "Low effort",
      "Slow reactions",
      "Poor after-mistake response",
      "Second-half drop-off",
    ],
  },
] as const;

export const ALL_ISSUES = ISSUE_GROUPS.flatMap((group) => group.issues);
