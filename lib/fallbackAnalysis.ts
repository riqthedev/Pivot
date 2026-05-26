import { TEAM_IDENTITIES } from "@/lib/constants";
import type {
  AnalysisInput,
  AnalysisResponse,
  ConfidenceLevel,
  DevelopmentPriority,
  DrillRecommendation,
  RootCause,
} from "@/lib/types";

type BucketId =
  | "ballSecurity"
  | "transitionRecovery"
  | "spacingExecution"
  | "paceIntent"
  | "shotReadiness"
  | "closeoutDiscipline"
  | "reboundingPhysicality"
  | "communication"
  | "conditioning"
  | "burst"
  | "competeLevel";

interface BucketBlueprint {
  cause: string;
  explanationCore: string;
  priority: string;
  priorityWhy: string;
  noteSignal: string;
  identityAngle: string;
  keywords: string[];
  drill: {
    name: string;
    timeBlock: string;
    purpose: string;
    setup: string;
    coachingCue: string;
    successMetric: string;
  };
  weeklyTarget: {
    goal: string;
    metric: string;
    howToTrack: string;
  };
}

interface RankedBucket {
  id: BucketId;
  score: number;
  matchedIssues: Set<string>;
  noteHits: number;
}

const BLUEPRINTS: Record<BucketId, BucketBlueprint> = {
  ballSecurity: {
    cause: "Live-ball turnovers are putting the team in scramble mode.",
    explanationCore:
      "Rushed decisions and loose passing are creating empty possessions before the defense can get organized.",
    priority: "Improve decision-making under pressure.",
    priorityWhy:
      "Better possession control protects your shot volume and keeps the team from giving away easy points.",
    noteSignal: "lazy passes or rushed decisions",
    identityAngle: "control of tempo and possession quality",
    keywords: ["lazy pass", "lazy passes", "turnover", "careless", "rushed", "soft pass"],
    drill: {
      name: "Advantage Decision Break",
      timeBlock: "12 minutes",
      purpose: "Train players to make the next simple play instead of forcing risky passes.",
      setup:
        "Play continuous 3-on-2 into 2-on-1. The ball handler must advance under control, hit the paint, or make the easy outlet.",
      coachingCue: "See two defenders, then make one clean decision.",
      successMetric:
        "Finish at least 70% of reps with a paint touch or clean shot and no live-ball turnover.",
    },
    weeklyTarget: {
      goal: "Hold live-ball turnovers to 8 or fewer.",
      metric: "Live-ball turnovers that directly create transition chances.",
      howToTrack:
        "Chart every turnover that immediately leads to an opponent advantage break or uncontested early attack.",
    },
  },
  transitionRecovery: {
    cause: "Transition recovery is breaking down after mistakes and long possessions.",
    explanationCore:
      "The first three steps back are too slow, so opponents are getting numbers before matchups are formed.",
    priority: "Sprint back and match up earlier.",
    priorityWhy:
      "Fixing transition habits removes the easiest points opponents are getting and stabilizes the whole defense.",
    noteSignal: "poor sprint-back habits or late recovery effort",
    identityAngle: "your ability to play fast without losing defensive balance",
    keywords: ["sprint", "sprinting", "back", "fastbreak", "runout", "transition", "jogging"],
    drill: {
      name: "3-on-2 Continuous Transition",
      timeBlock: "15 minutes",
      purpose: "Train immediate sprint-back habits and early communication in conversion defense.",
      setup:
        "Three offensive players attack two defenders. On the shot, score, or turnover, the defense outlets and goes back the other way.",
      coachingCue: "First three steps after the change must be a sprint, not a turn-and-look.",
      successMetric:
        "Hold the offense to one shot or less on 70% of live reps.",
    },
    weeklyTarget: {
      goal: "Give up no more than 6 fastbreak points.",
      metric: "Opponent points scored before the defense is matched and set.",
      howToTrack:
        "Tag any basket scored in the first wave or before all five defenders are below the free throw line.",
    },
  },
  spacingExecution: {
    cause: "Floor balance and spacing are shrinking driving and passing windows.",
    explanationCore:
      "Players are drifting into crowded spots, which makes reads late and lowers the quality of catch decisions.",
    priority: "Hold corners, fill lanes, and keep clear passing angles.",
    priorityWhy:
      "Better spacing makes the first action cleaner and gives ball handlers simple reads instead of traffic.",
    noteSignal: "players bunching up or cutting into the same space",
    identityAngle: "cleaner half-court structure and better paint-touch spacing",
    keywords: ["spacing", "crowded", "bunched", "same spot", "clogged", "traffic"],
    drill: {
      name: "Drive-Kick-Replace Advantage",
      timeBlock: "12 minutes",
      purpose: "Build spacing discipline around drives, kick-outs, and quick relocation.",
      setup:
        "Play 4-on-4 in the half court. Every drive must trigger a corner hold, slot lift, and baseline drift or replace.",
      coachingCue: "Do not follow the ball. Move to create the next passing window.",
      successMetric:
        "Create a paint touch followed by an open catch without spacing violations on 8 of 10 trips.",
    },
    weeklyTarget: {
      goal: "Create 12 or more paint-touch kick-out possessions.",
      metric: "Possessions with one paint touch followed by an open perimeter catch.",
      howToTrack:
        "Chart every possession where spacing leads to a clean kick-out or extra-pass shot without a forced dribble.",
    },
  },
  paceIntent: {
    cause: "The team is not getting into early offense with enough intent.",
    explanationCore:
      "The ball is advancing too slowly, which lets the defense get set and turns possessions into late-clock offense.",
    priority: "Push the ball with purpose in the first 6 seconds.",
    priorityWhy:
      "A faster advance creates easier looks before the defense loads to the ball.",
    noteSignal: "hesitation or slow push after rebounds and outlets",
    identityAngle: "the pace advantage your style depends on",
    keywords: ["slow", "low pace", "walk", "walking", "hesitate", "hesitation"],
    drill: {
      name: "5-Second Advance Break",
      timeBlock: "10 minutes",
      purpose: "Train quick outlets, lane fills, and early paint pressure.",
      setup:
        "Start with a rebound or made basket. The group must get the ball across half court and attack within five seconds.",
      coachingCue: "Advance it early, then play off the advantage instead of resetting the whole floor.",
      successMetric:
        "Get into an early offense touch inside five seconds on 75% of reps.",
    },
    weeklyTarget: {
      goal: "Win the race to first paint touch more often.",
      metric: "Possessions reaching the paint within the first 6 seconds.",
      howToTrack:
        "Track how many offensive trips get a paint touch before the defense is fully set.",
    },
  },
  shotReadiness: {
    cause: "Shot preparation habits are lowering open-shot conversion.",
    explanationCore:
      "Players are arriving to catches off balance, so open looks are not becoming high-quality attempts.",
    priority: "Be shot-ready on the catch.",
    priorityWhy:
      "Cleaner footwork and earlier preparation turn created advantages into points instead of wasted looks.",
    noteSignal: "hesitant or off-balance shot prep",
    identityAngle: "conversion on the good looks your offense is already creating",
    keywords: ["missed open", "open shots", "off balance", "hesitant shot", "feet", "rushed shot"],
    drill: {
      name: "0.5 Catch-and-Shoot Series",
      timeBlock: "10 minutes",
      purpose: "Sharpen catch-ready feet, quick shot prep, and immediate decisions off drive-and-kick action.",
      setup:
        "Use two passers and two shooters. Players relocate, catch on balance, and must shoot, drive, or move it within half a second.",
      coachingCue: "Show your hands early and get your feet down before the ball arrives.",
      successMetric:
        "Make 65% of uncontested reps with no slow, extra dip or drift on the catch.",
    },
    weeklyTarget: {
      goal: "Raise open-shot conversion on clean feet-set looks.",
      metric: "Team field-goal percentage on uncontested catch-and-shoot attempts.",
      howToTrack:
        "Clip or chart only the shots that are open and feet-set to separate shot quality from forced attempts.",
    },
  },
  closeoutDiscipline: {
    cause: "Closeout discipline is giving opponents rhythm shots and straight-line drives.",
    explanationCore:
      "Defenders are arriving late or out of control, which means the first defensive effort is already compromised.",
    priority: "Control the last two steps on the closeout.",
    priorityWhy:
      "Better closeouts protect the arc without opening driving lanes behind the contest.",
    noteSignal: "late or reckless closeouts",
    identityAngle: "your ability to finish defensive possessions cleanly on the perimeter",
    keywords: ["closeout", "closeouts", "late contest", "fly by", "straight line drive"],
    drill: {
      name: "Shell to Live Closeout",
      timeBlock: "14 minutes",
      purpose: "Train on-time, under-control closeouts that can still absorb the first drive.",
      setup:
        "Start in shell alignment. Coach drives a pass to the perimeter and the defender must close, contain one dribble, and finish the rep.",
      coachingCue: "Chop the last two steps and arrive with high hands and a low chest.",
      successMetric:
        "Contest without giving up a straight-line middle drive on 8 of 10 reps.",
    },
    weeklyTarget: {
      goal: "Reduce clean perimeter looks off simple ball movement.",
      metric: "Opponent uncontested catch-and-shoot attempts from the perimeter.",
      howToTrack:
        "Tag any perimeter shot where the contest arrives late enough that the shooter stays on rhythm.",
    },
  },
  reboundingPhysicality: {
    cause: "The team is losing first contact on the glass.",
    explanationCore:
      "Rebounding is starting too late, with players chasing the ball instead of hitting first and carving space.",
    priority: "Win first contact and finish the possession.",
    priorityWhy:
      "Defensive stands do not matter if the opponent gets a second shot or your group fails to secure the ball.",
    noteSignal: "soft first contact or ball-watching on the glass",
    identityAngle: "ending defensive possessions with physical control",
    keywords: ["rebound", "rebounds", "boxed out", "box out", "second chance", "physical"],
    drill: {
      name: "Triangle Hit-and-Get",
      timeBlock: "12 minutes",
      purpose: "Train early contact, pursuit angles, and finishing the rebound with two hands.",
      setup:
        "Three offensive players and three defenders form a triangle around the lane. On the shot, defenders must hit, locate, and secure before outleting.",
      coachingCue: "Hit first, then go get it with two hands and chin it.",
      successMetric:
        "Finish 80% of defensive reps with one clean rebound and outlet.",
    },
    weeklyTarget: {
      goal: "Win the defensive rebound battle on missed shots.",
      metric: "Opponent offensive rebound rate.",
      howToTrack:
        "Track how many opponent misses become second possessions instead of defensive rebounds.",
    },
  },
  communication: {
    cause: "Defensive communication is arriving too late to organize the possession.",
    explanationCore:
      "The team is seeing the action but not calling it early enough, which delays help, tags, and closeouts.",
    priority: "Make the first defensive call earlier and louder.",
    priorityWhy:
      "Earlier talk gets five players solving the same problem instead of reacting one at a time.",
    noteSignal: "quiet possessions or late help calls",
    identityAngle: "connected team defense and cleaner rotations",
    keywords: ["talk", "talking", "quiet", "communication", "call", "help"],
    drill: {
      name: "4-on-4 Constraint Shell",
      timeBlock: "12 minutes",
      purpose: "Force early talk on drives, skips, and cutters before the live play speeds up.",
      setup:
        "Play 4-on-4 shell. The defense only gets a stop if the required help, gap, and closeout calls happen before the ball arrives.",
      coachingCue: "Call it on the flight of the ball, not after the catch.",
      successMetric:
        "Complete 3 straight defensive possessions with every required call made on time.",
    },
    weeklyTarget: {
      goal: "Raise the number of organized defensive possessions.",
      metric: "Possessions with early gap, help, and match-up communication.",
      howToTrack:
        "Have an assistant tag possessions where the first help or coverage call comes before the ball arrives.",
    },
  },
  conditioning: {
    cause: "Second-half drop-off is reducing execution quality and recovery effort.",
    explanationCore:
      "Fatigue is showing up in sprint-back habits, decision quality, and defensive detail later in possessions.",
    priority: "Sustain sprint effort deeper into the rep and later into practice.",
    priorityWhy:
      "If energy drops, every other fix becomes harder to hold when the game gets long.",
    noteSignal: "visible fatigue or late-game drop-off",
    identityAngle: "your ability to sustain your style for a full game",
    keywords: ["tired", "fatigue", "gassed", "second half", "legs", "winded"],
    drill: {
      name: "Sprint-Back Conversion Series",
      timeBlock: "10 minutes",
      purpose: "Train conditioning inside game-like change-of-possession demands.",
      setup:
        "Run short, competitive transition reps with a made-basket or turnover trigger. Players must convert from offense to defense without a jog phase.",
      coachingCue: "No dead body language after a mistake. Change ends with purpose.",
      successMetric:
        "Hit the sprint-back standard on 8 straight change-of-possession reps.",
    },
    weeklyTarget: {
      goal: "Reduce second-half breakdowns tied to fatigue.",
      metric: "Second-half turnovers plus fastbreak points allowed.",
      howToTrack:
        "Compare first-half and second-half breakdown numbers to see if execution drops once the legs go.",
    },
  },
  burst: {
    cause: "The group is not winning enough first-step or first-reaction moments.",
    explanationCore:
      "Slow first movement is showing up in both transition races and defensive recovery situations.",
    priority: "Improve first-step burst and reaction speed.",
    priorityWhy:
      "Winning the first movement buys margin everywhere else, especially in open-floor situations.",
    noteSignal: "slow reactions or lack of first-step pop",
    identityAngle: "the speed edge your team needs in open space",
    keywords: ["slow", "speed", "lack of speed", "reaction", "flat-footed"],
    drill: {
      name: "Mirror Burst Closeout",
      timeBlock: "8 minutes",
      purpose: "Train first-step reaction, hip turn, and recovery burst.",
      setup:
        "Partners mirror on a coach cue, then sprint into a short recovery closeout or chase angle.",
      coachingCue: "Win the first move, then stay low through the turn.",
      successMetric:
        "Beat the offensive player to the recovery spot on 70% of reps.",
    },
    weeklyTarget: {
      goal: "Improve first-step races in transition and recovery.",
      metric: "Loose-ball wins or transition recovery wins in 50-50 situations.",
      howToTrack:
        "Chart possessions where the team wins or loses the first race to the spot after the ball changes hands.",
    },
  },
  competeLevel: {
    cause: "The response standard after mistakes is not consistent enough.",
    explanationCore:
      "Low motor possessions are extending breakdowns because the next play effort is not immediate.",
    priority: "Raise the response standard after every mistake.",
    priorityWhy:
      "A better next-play response can clean up multiple issues without changing the whole system.",
    noteSignal: "low effort or poor response after mistakes",
    identityAngle: "competitive consistency on possessions that swing momentum",
    keywords: ["effort", "low effort", "jog", "jogging", "flat", "coast"],
    drill: {
      name: "Mistake-to-Next-Play Challenge",
      timeBlock: "8 minutes",
      purpose: "Build an automatic sprint-and-recover response after turnovers, misses, and broken possessions.",
      setup:
        "Play short live segments where the only scored point is for the team that wins the next action immediately after a mistake.",
      coachingCue: "No frustration pause. Sprint to the next job.",
      successMetric:
        "Win the immediate next action after a mistake on at least 70% of scored reps.",
    },
    weeklyTarget: {
      goal: "Eliminate low-motor breakdown possessions.",
      metric: "Mistake possessions where the team fails to sprint or recover on the next action.",
      howToTrack:
        "Chart any sequence where the body language or recovery effort drops right after a turnover, miss, or whistle.",
    },
  },
};

const ISSUE_TO_BUCKETS: Record<string, BucketId[]> = {
  "Too many turnovers": ["ballSecurity", "transitionRecovery"],
  "Bad spacing": ["spacingExecution", "ballSecurity"],
  "Low pace": ["paceIntent", "transitionRecovery"],
  "Missed open shots": ["shotReadiness", "spacingExecution"],
  "Poor shot selection": ["shotReadiness", "ballSecurity"],
  "Stalled in half court": ["paceIntent", "spacingExecution"],
  "Struggled vs. ball pressure": ["ballSecurity", "spacingExecution"],
  "Low paint touches": ["spacingExecution", "paceIntent"],
  "Weak extra-pass reads": ["shotReadiness", "spacingExecution"],
  "Gave up fastbreak points": ["transitionRecovery", "ballSecurity"],
  "Poor closeouts": ["closeoutDiscipline", "communication"],
  "Lost rebounds": ["reboundingPhysicality", "competeLevel"],
  "Communication issues": ["communication", "closeoutDiscipline"],
  "Help defense breakdown": ["communication", "closeoutDiscipline"],
  "Gave up paint points": ["closeoutDiscipline", "communication"],
  "Too many fouls": ["closeoutDiscipline", "competeLevel"],
  "Pick-and-roll breakdown": ["communication", "closeoutDiscipline"],
  "Slow rotations": ["communication", "transitionRecovery"],
  Fatigue: ["conditioning", "transitionRecovery"],
  "Lack of speed": ["burst", "transitionRecovery"],
  "Low effort": ["competeLevel", "conditioning"],
  "Slow reactions": ["burst", "transitionRecovery"],
  "Poor after-mistake response": ["competeLevel", "transitionRecovery"],
  "Second-half drop-off": ["conditioning", "competeLevel"],
};

const IDENTITY_DEFAULTS: Record<(typeof TEAM_IDENTITIES)[number], BucketId[]> = {
  "Run and Gun": ["paceIntent", "ballSecurity", "transitionRecovery"],
  "Defensive Minded": ["closeoutDiscipline", "reboundingPhysicality", "communication"],
  "Pace and Space": ["spacingExecution", "shotReadiness", "paceIntent"],
  Balanced: ["ballSecurity", "communication", "reboundingPhysicality"],
  "Motion Offense": ["spacingExecution", "ballSecurity", "shotReadiness"],
  "Transition Focused": ["transitionRecovery", "ballSecurity", "conditioning"],
};

function joinLabels(items: string[]) {
  if (items.length === 0) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function lowercaseFirst(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function stripTrailingPeriod(text: string) {
  return text.replace(/\.$/, "");
}

function confidenceFromScore(score: number): ConfidenceLevel {
  if (score >= 6) {
    return "High";
  }

  if (score >= 3) {
    return "Medium";
  }

  return "Low";
}

function noteHits(notes: string, keywords: string[]) {
  return keywords.reduce((hits, keyword) => {
    return hits + (notes.includes(keyword) ? 1 : 0);
  }, 0);
}

function rankBuckets(input: AnalysisInput) {
  const notes = input.notes.toLowerCase();
  const ranked = new Map<BucketId, RankedBucket>();

  (Object.keys(BLUEPRINTS) as BucketId[]).forEach((id) => {
    ranked.set(id, {
      id,
      score: 0,
      matchedIssues: new Set<string>(),
      noteHits: 0,
    });
  });

  input.issues.forEach((issue) => {
    const matches = ISSUE_TO_BUCKETS[issue] ?? [];

    matches.forEach((bucketId, index) => {
      const bucket = ranked.get(bucketId);

      if (!bucket) {
        return;
      }

      bucket.score += index === 0 ? 3 : 1;
      bucket.matchedIssues.add(issue);
    });
  });

  (Object.keys(BLUEPRINTS) as BucketId[]).forEach((bucketId) => {
    const bucket = ranked.get(bucketId);

    if (!bucket) {
      return;
    }

    const bucketNoteHits = noteHits(notes, BLUEPRINTS[bucketId].keywords);
    bucket.noteHits = bucketNoteHits;
    bucket.score += bucketNoteHits;
  });

  IDENTITY_DEFAULTS[input.teamIdentity as (typeof TEAM_IDENTITIES)[number]].forEach(
    (bucketId, index) => {
      const bucket = ranked.get(bucketId);

      if (!bucket) {
        return;
      }

      bucket.score += index === 0 ? 2 : 1;
    },
  );

  return [...ranked.values()].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    if (b.matchedIssues.size !== a.matchedIssues.size) {
      return b.matchedIssues.size - a.matchedIssues.size;
    }

    return b.noteHits - a.noteHits;
  });
}

function buildExplanation(
  teamIdentity: string,
  rankedBucket: RankedBucket,
  blueprint: BucketBlueprint,
) {
  const issues = [...rankedBucket.matchedIssues];
  const issueLead =
    issues.length > 0
      ? `${joinLabels(issues)} ${issues.length === 1 ? "points" : "point"} to a problem where ${lowercaseFirst(
          blueprint.explanationCore,
        )}`
      : blueprint.explanationCore;
  const noteLead =
    rankedBucket.noteHits > 0
      ? ` The notes also reinforce it with signs of ${blueprint.noteSignal}.`
      : "";

  return `${issueLead} That matters even more for a ${teamIdentity} team because it affects ${blueprint.identityAngle}.${noteLead}`;
}

function buildPriorityWhy(teamIdentity: string, blueprint: BucketBlueprint) {
  return `${blueprint.priorityWhy} For a ${teamIdentity} team, this helps stabilize ${blueprint.identityAngle}.`;
}

function buildDrillWhy(
  rankedBucket: RankedBucket,
  blueprint: BucketBlueprint,
  rootCause: RootCause,
  priority: DevelopmentPriority,
) {
  const issues = [...rankedBucket.matchedIssues];
  const issueText =
    issues.length > 0 ? ` It directly targets ${joinLabels(issues)}.` : "";

  return `This drill fits the root cause of ${lowercaseFirst(
    stripTrailingPeriod(rootCause.cause),
  )} because it forces players to work on the priority of ${lowercaseFirst(
    stripTrailingPeriod(priority.priority),
  )} in live basketball actions.${issueText}`;
}

export function generateFallbackAnalysis(input: AnalysisInput): AnalysisResponse {
  const rankedBuckets = rankBuckets(input);
  const selectedBuckets = rankedBuckets.slice(0, 3);

  const rootCauses: RootCause[] = selectedBuckets.map((rankedBucket) => {
    const blueprint = BLUEPRINTS[rankedBucket.id];

    return {
      cause: blueprint.cause,
      explanation: buildExplanation(input.teamIdentity, rankedBucket, blueprint),
      confidence: confidenceFromScore(rankedBucket.score),
    };
  });

  const developmentPriorities: DevelopmentPriority[] = selectedBuckets.map(
    (rankedBucket, index) => {
      const blueprint = BLUEPRINTS[rankedBucket.id];

      return {
        priority: blueprint.priority,
        whyItMatters: buildPriorityWhy(input.teamIdentity, blueprint),
        rank: index + 1,
      };
    },
  );

  const drills: DrillRecommendation[] = selectedBuckets.map((rankedBucket, index) => {
    const blueprint = BLUEPRINTS[rankedBucket.id];
    const rootCause = rootCauses[index];
    const priority = developmentPriorities[index];

    return {
      name: blueprint.drill.name,
      timeBlock: blueprint.drill.timeBlock,
      purpose: blueprint.drill.purpose,
      setup: blueprint.drill.setup,
      coachingCue: blueprint.drill.coachingCue,
      whyItFits: buildDrillWhy(rankedBucket, blueprint, rootCause, priority),
      linkedRootCause: rootCause.cause,
      linkedPriority: priority.priority,
      successMetric: blueprint.drill.successMetric,
    };
  });

  const topBucket = BLUEPRINTS[selectedBuckets[0].id];

  return {
    rootCauses,
    developmentPriorities,
    drills,
    weeklyTarget: {
      goal: topBucket.weeklyTarget.goal,
      metric: topBucket.weeklyTarget.metric,
      howToTrack: topBucket.weeklyTarget.howToTrack,
    },
  };
}
