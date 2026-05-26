import OpenAI from "openai";

import type { AnalysisInput, AnalysisResponse } from "@/lib/types";
import { isAnalysisResponse } from "@/lib/validation";

const SYSTEM_PROMPT = `You are an expert youth and high school basketball coach helping turn post-game observations into an actionable next-practice plan.

Return ONLY valid JSON matching this exact shape:
{
  "rootCauses": [
    { "cause": string, "explanation": string, "confidence": "High" | "Medium" | "Low" }
  ],
  "developmentPriorities": [
    { "priority": string, "whyItMatters": string, "rank": 1 | 2 | 3 }
  ],
  "drills": [
    {
      "name": string,
      "timeBlock": string,
      "purpose": string,
      "setup": string,
      "coachingCue": string,
      "whyItFits": string,
      "linkedRootCause": string,
      "linkedPriority": string,
      "successMetric": string
    }
  ],
  "weeklyTarget": {
    "goal": string,
    "metric": string,
    "howToTrack": string
  }
}

Rules:
- Provide exactly 3 rootCauses, 3 developmentPriorities (rank 1-3), and 3 drills.
- Each drill must explicitly link to one root cause and one priority via linkedRootCause and linkedPriority (copy the exact text).
- Root causes must explain WHY the observed issues happened, not restate symptoms.
- Priorities must be ordered by impact for the next practice.
- Drills must be realistic for a 90-minute practice with named time blocks (e.g. "12 minutes").
- weeklyTarget must be one measurable goal for the next game with a clear tracking method.
- Confidence reflects how strongly the coach's issues and notes support each cause.
- Write for a real coach on the bench — specific, direct, no fluff.
- Ground advice in the team's stated playing style.`;

function buildUserPrompt(input: AnalysisInput) {
  const notesBlock = input.notes.trim()
    ? input.notes.trim()
    : "No additional coach notes provided.";

  return [
    "Build a practice plan from this post-game input.",
    "",
    `Team style: ${input.teamIdentity}`,
    "",
    "Observed game issues:",
    ...input.issues.map((issue) => `- ${issue}`),
    "",
    "Coach notes:",
    notesBlock,
  ].join("\n");
}

export async function generateAiAnalysis(
  input: AnalysisInput,
): Promise<AnalysisResponse | null> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  const client = new OpenAI({ apiKey });
  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";

  try {
    const completion = await client.chat.completions.create({
      model,
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(input) },
      ],
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return null;
    }

    const parsed: unknown = JSON.parse(content);

    if (!isAnalysisResponse(parsed)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}
