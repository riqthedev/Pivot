import { ALL_ISSUES, TEAM_IDENTITIES } from "@/lib/constants";
import type { AnalysisInput, AnalysisResponse, ValidationErrors } from "@/lib/types";

const VALID_ISSUES = new Set<string>(ALL_ISSUES);

export function isValidTeamIdentity(teamIdentity: string) {
  return TEAM_IDENTITIES.includes(teamIdentity as (typeof TEAM_IDENTITIES)[number]);
}

export function areValidIssues(issues: string[]) {
  return issues.length > 0 && issues.every((issue) => VALID_ISSUES.has(issue));
}

export function validateAnalysisInput(input: AnalysisInput): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!isValidTeamIdentity(input.teamIdentity)) {
    errors.teamIdentity = "Choose the team style you want the plan built around.";
  }

  if (!areValidIssues(input.issues)) {
    errors.issues = "Select at least one game issue.";
  }

  return errors;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isConfidenceLevel(value: unknown) {
  return value === "High" || value === "Medium" || value === "Low";
}

export function isAnalysisResponse(value: unknown): value is AnalysisResponse {
  if (!isRecord(value)) {
    return false;
  }

  const rootCauses = value.rootCauses;
  const developmentPriorities = value.developmentPriorities;
  const drills = value.drills;
  const weeklyTarget = value.weeklyTarget;

  if (
    !Array.isArray(rootCauses) ||
    rootCauses.length < 2 ||
    rootCauses.length > 4 ||
    !Array.isArray(developmentPriorities) ||
    developmentPriorities.length !== 3 ||
    !Array.isArray(drills) ||
    drills.length < 2 ||
    drills.length > 4 ||
    !isRecord(weeklyTarget)
  ) {
    return false;
  }

  const validRootCauses = rootCauses.every(
    (item) =>
      isRecord(item) &&
      typeof item.cause === "string" &&
      typeof item.explanation === "string" &&
      isConfidenceLevel(item.confidence),
  );

  const validPriorities = developmentPriorities.every(
    (item) =>
      isRecord(item) &&
      typeof item.priority === "string" &&
      typeof item.whyItMatters === "string" &&
      typeof item.rank === "number",
  );

  const validDrills = drills.every(
    (item) =>
      isRecord(item) &&
      typeof item.name === "string" &&
      typeof item.timeBlock === "string" &&
      typeof item.purpose === "string" &&
      typeof item.setup === "string" &&
      typeof item.coachingCue === "string" &&
      typeof item.whyItFits === "string" &&
      typeof item.linkedRootCause === "string" &&
      typeof item.linkedPriority === "string" &&
      typeof item.successMetric === "string",
  );

  const validWeeklyTarget =
    typeof weeklyTarget.goal === "string" &&
    typeof weeklyTarget.metric === "string" &&
    typeof weeklyTarget.howToTrack === "string";

  return validRootCauses && validPriorities && validDrills && validWeeklyTarget;
}
