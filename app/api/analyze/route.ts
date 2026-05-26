import { NextResponse } from "next/server";

import { generateAiAnalysis } from "@/lib/aiAnalysis";
import { generateFallbackAnalysis } from "@/lib/fallbackAnalysis";
import type { AnalysisApiResponse, AnalysisInput } from "@/lib/types";
import { validateAnalysisInput } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: AnalysisInput;

  try {
    const payload = (await request.json()) as Partial<AnalysisInput> | null;

    body = {
      teamIdentity:
        typeof payload?.teamIdentity === "string" ? payload.teamIdentity : "",
      issues: Array.isArray(payload?.issues)
        ? payload.issues.filter((issue): issue is string => typeof issue === "string")
        : [],
      notes: typeof payload?.notes === "string" ? payload.notes : "",
    };
  } catch {
    return NextResponse.json<AnalysisApiResponse>(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const errors = validateAnalysisInput(body);

  if (errors.teamIdentity || errors.issues) {
    return NextResponse.json<AnalysisApiResponse>(
      {
        success: false,
        error: errors.teamIdentity ?? errors.issues ?? "Invalid request.",
      },
      { status: 400 },
    );
  }

  try {
    const aiResult = await generateAiAnalysis(body);

    if (aiResult) {
      return NextResponse.json<AnalysisApiResponse>({
        success: true,
        data: aiResult,
        source: "ai",
      });
    }

    return NextResponse.json<AnalysisApiResponse>({
      success: true,
      data: generateFallbackAnalysis(body),
      source: "rules",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "The analysis engine failed.";

    return NextResponse.json<AnalysisApiResponse>(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
