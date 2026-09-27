import { NextRequest, NextResponse } from "next/server";
import {
  GameEvent,
  feedbackPickerQuestion,
  progressPickerQuestion,
  interactionPickerQuestion,
  formatEventPrompt,
  JevDecision,
} from "@/lib/jev/pixelUIQuestions";

interface RequestBody {
  event: GameEvent;
  pickerType?: "feedback" | "progress" | "interaction";
  decisionType?: "feedback" | "progress" | "interaction";
}

interface OpenRouterDecisionsResponse {
  model: string;
  answers: Record<
    string,
    {
      type: string;
      choice: string;
      confidence?: number;
      probabilities?: Record<string, number>;
    }
  >;
  usage?: {
    input_tokens: number;
    output_tokens: number;
    cost: number;
  };
  id?: string;
  provider?: string;
  error?: {
    message: string;
    code?: number;
  };
}

/**
 * Invoke TypeSafe AI's Jev model via OpenRouter Decisions API.
 * Pinned model: typesafe/jev-1.13
 */
async function callOpenRouterJev(
  apiKey: string,
  model: string,
  statePrompt: string,
  questionId: string,
  instructions: string,
  criteria: Record<string, string>
): Promise<{ choice: string; confidence: number; scores: Record<string, number>; model: string }> {
  const endpoint =
    process.env.OPENROUTER_DECISIONS_ENDPOINT || "https://openrouter.ai/api/alpha/decisions";

  const payload = {
    model,
    state: statePrompt,
    questions: {
      [questionId]: {
        type: "choice",
        instructions,
        criteria,
      },
    },
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "JUI Pixel UI Decision Layer",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(6000),
  });

  if (!res.ok) {
    const errorText = await res.text();
    let parsedMessage = errorText;
    try {
      const parsed = JSON.parse(errorText);
      if (parsed?.error?.message) {
        parsedMessage = parsed.error.message;
      }
    } catch {
      // ignore
    }
    throw new Error(`OpenRouter Decisions API error (${res.status}): ${parsedMessage}`);
  }

  const data = (await res.json()) as OpenRouterDecisionsResponse;

  if (data.error) {
    throw new Error(`OpenRouter Decisions API error: ${data.error.message}`);
  }

  const answer = data.answers?.[questionId];
  if (!answer) {
    throw new Error(
      `OpenRouter Decisions API returned no answer for question '${questionId}'.`
    );
  }

  const choice = answer.choice;
  const probabilities = answer.probabilities || {};
  const confidence =
    answer.confidence !== undefined
      ? answer.confidence
      : probabilities[choice] !== undefined
      ? probabilities[choice]
      : 0.95;

  return {
    choice,
    confidence,
    scores: probabilities,
    model: data.model || model,
  };
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const body = (await req.json()) as RequestBody;
    const { event } = body;
    const pickerType = body.pickerType || body.decisionType || "feedback";

    if (!event || !event.type || !event.title) {
      return NextResponse.json(
        { error: "Invalid request payload. 'event' with 'type' and 'title' is required." },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.OPENROUTER_API_KEY ||
      process.env.TYPESAFE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Missing OpenRouter API key. Please configure OPENROUTER_API_KEY in .env.local to query the Jev model.",
        },
        { status: 401 }
      );
    }

    // Default to the official TypeSafe Jev 1.13 decision model
    const model = process.env.JEV_MODEL || "typesafe/jev-1.13";
    const questionSchema =
      pickerType === "progress"
        ? progressPickerQuestion
        : pickerType === "interaction"
        ? interactionPickerQuestion
        : feedbackPickerQuestion;

    const criteria: Record<string, string> = {};
    for (const opt of questionSchema.options) {
      criteria[opt.id] = `${opt.label}: ${opt.description}`;
    }

    // Call Jev directly with no silent fallback to random decisions
    const result = await callOpenRouterJev(
      apiKey,
      model,
      formatEventPrompt(event),
      questionSchema.id,
      questionSchema.prompt,
      criteria
    );

    const latencyMs = Date.now() - startTime;

    const decision: JevDecision<string> = {
      choice: result.choice,
      confidence: result.confidence,
      rationale: `Jev model (${result.model}) chose '${result.choice}' with ${(result.confidence * 100).toFixed(1)}% confidence.`,
      scores: result.scores,
    };

    return NextResponse.json({
      decision,
      model: result.model,
      source: "live",
      latencyMs,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Error executing Jev model decision:", errorMessage);

    // Explicit error response, NO silent fallback to random decisions
    return NextResponse.json(
      {
        error: `Jev decision failed: ${errorMessage}`,
      },
      { status: 502 }
    );
  }
}
