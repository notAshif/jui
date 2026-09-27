import { NextRequest, NextResponse } from "next/server";
import {
  GameEvent,
  feedbackPickerQuestion,
  progressPickerQuestion,
  interactionPickerQuestion,
  formatEventPrompt,
  JevDecision,
} from "@/lib/jev/pixelUIQuestions";
import {
  mockClassifyFeedback,
  mockClassifyProgress,
  mockClassifyInteraction,
} from "@/lib/jev/mock";

interface RequestBody {
  event: GameEvent;
  pickerType?: "feedback" | "progress" | "interaction";
}

interface TypeSafeAISystemOnePayload {
  questionId: string;
  prompt: string;
  options: { id: string; description: string }[];
}

interface TypeSafeAISystemOneResponse {
  choice: string;
  confidence: number;
  rationale?: string;
  scores?: Record<string, number>;
}

/**
 * Invoke TypeSafe AI's Jev (System One) API endpoint.
 */
async function callTypeSafeAISystemOne(
  apiKey: string,
  payload: TypeSafeAISystemOnePayload
): Promise<TypeSafeAISystemOneResponse> {
  const endpoint =
    process.env.TYPESAFE_AI_ENDPOINT || "https://api.typesafe.ai/v1/system-one";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
    // Fast-fail timeout for game runtime responsiveness
    signal: AbortSignal.timeout(2500),
  });

  if (!res.ok) {
    throw new Error(`TypeSafe AI returned HTTP ${res.status}: ${res.statusText}`);
  }

  const data = (await res.json()) as TypeSafeAISystemOneResponse;
  return data;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const body = (await req.json()) as RequestBody;
    const { event, pickerType = "feedback" } = body;

    if (!event || !event.type || !event.title) {
      return NextResponse.json(
        { error: "Invalid request payload. 'event' with 'type' and 'title' is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.TYPESAFE_AI_API_KEY;
    let decision: JevDecision<string>;
    let source: "live" | "mock" = "mock";

    if (apiKey) {
      try {
        const questionSchema =
          pickerType === "progress"
            ? progressPickerQuestion
            : pickerType === "interaction"
            ? interactionPickerQuestion
            : feedbackPickerQuestion;

        const liveResponse = await callTypeSafeAISystemOne(apiKey, {
          questionId: questionSchema.id,
          prompt: formatEventPrompt(event),
          options: questionSchema.options.map((opt) => ({
            id: opt.id,
            description: opt.description,
          })),
        });

        decision = {
          choice: liveResponse.choice,
          confidence: liveResponse.confidence,
          rationale: liveResponse.rationale,
          scores: liveResponse.scores,
        };
        source = "live";
      } catch (err: unknown) {
        console.warn(
          "TypeSafe AI live call failed or timed out. Falling back to offline mock:",
          err instanceof Error ? err.message : String(err)
        );
        decision =
          pickerType === "progress"
            ? mockClassifyProgress(event)
            : pickerType === "interaction"
            ? mockClassifyInteraction(event)
            : mockClassifyFeedback(event);
        source = "mock";
      }
    } else {
      // Deterministic offline classifier execution
      decision =
        pickerType === "progress"
          ? mockClassifyProgress(event)
          : pickerType === "interaction"
          ? mockClassifyInteraction(event)
          : mockClassifyFeedback(event);
      source = "mock";
    }

    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      decision,
      source,
      latencyMs,
    });
  } catch (err: unknown) {
    console.error("Internal error processing pixel intent:", err);
    return NextResponse.json(
      { error: "Failed to evaluate pixel intent." },
      { status: 500 }
    );
  }
}
