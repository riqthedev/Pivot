export type ConfidenceLevel = "High" | "Medium" | "Low";

export interface AnalysisInput {
  teamIdentity: string;
  issues: string[];
  notes: string;
}

export interface RootCause {
  cause: string;
  explanation: string;
  confidence: ConfidenceLevel;
}

export interface DevelopmentPriority {
  priority: string;
  whyItMatters: string;
  rank: number;
}

export interface DrillRecommendation {
  name: string;
  timeBlock: string;
  purpose: string;
  setup: string;
  coachingCue: string;
  whyItFits: string;
  linkedRootCause: string;
  linkedPriority: string;
  successMetric: string;
}

export interface WeeklyTarget {
  goal: string;
  metric: string;
  howToTrack: string;
}

export interface AnalysisResponse {
  rootCauses: RootCause[];
  developmentPriorities: DevelopmentPriority[];
  drills: DrillRecommendation[];
  weeklyTarget: WeeklyTarget;
}

export interface ValidationErrors {
  teamIdentity?: string;
  issues?: string;
}

export type AnalysisSource = "ai" | "rules";

export type AnalysisApiResponse =
  | {
      success: true;
      data: AnalysisResponse;
      source: AnalysisSource;
    }
  | {
      success: false;
      error?: string;
      raw?: string;
    };
