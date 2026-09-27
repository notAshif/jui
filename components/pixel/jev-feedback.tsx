"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { GameEvent, FeedbackChoice, JevDecision } from "@/lib/jev/pixelUIQuestions";
import { useDecisionSmoothing } from "@/lib/decide";
import { DynamicPixelFeedback } from "@/components/pixel/registry";
import { PixelButton } from "@/components/pixel/button";
import { PixelBadge } from "@/components/pixel/badge";

export interface PixelJevFeedbackProps {
  /** The incoming game event to evaluate and render */
  event?: GameEvent;
  /** Whether to automatically classify when the event changes (default: true) */
  autoClassify?: boolean;
  /** Whether to display the trust & model inspector drawer (default: true) */
  showInspector?: boolean;
  /** Whether to include quick scenario buttons so users can test live (default: true) */
  interactive?: boolean;
  /** API endpoint for the Jev model (default: "/api/pixel-intent") */
  endpoint?: string;
  /** Callback fired when a Jev decision is evaluated */
  onDecision?: (decision: JevDecision<FeedbackChoice>, latencyMs: number) => void;
  /** Optional custom class name */
  className?: string;
}

const DEFAULT_EVENT: GameEvent = {
  id: "evt-init",
  type: "item_pickup",
  title: "Sunstone Shard Discovered",
  message: "Added +1 Sunstone Shard (+5 Radiant Glow) to pouch.",
  urgency: "low",
};

const PRESET_EVENTS: Array<{ label: string; tag: string; event: GameEvent }> = [
  {
    label: "Loot Pickup",
    tag: "ambient",
    event: {
      type: "item_pickup",
      title: "Gold Pouch Found",
      message: "+150 Gold Coins added to inventory.",
      urgency: "low",
    },
  },
  {
    label: "Poison Debuff",
    tag: "tactical",
    event: {
      type: "hazard_damage",
      title: "Toxic Spores Inhaled",
      message: "Poisoned! -8 HP/sec for 12 seconds. Antidote required.",
      urgency: "high",
    },
  },
  {
    label: "Boss Defeated",
    tag: "milestone",
    event: {
      type: "boss_defeat",
      title: "Ancient Wyrm Vanquished",
      message: "The Dragon Lord has fallen. The Citadel Gates are now open.",
      urgency: "critical",
      requiresAck: true,
    },
  },
  {
    label: "Ambiguous Noise",
    tag: "fallback",
    event: {
      type: "mysterious_sound",
      title: "Faint Stone Murmur",
      message: "A distant low rumble echoes through the cavern.",
      urgency: "low",
    },
  },
];

/**
 * PixelJevFeedback
 *
 * A self-contained, drop-in AI decision primitive powered by TypeSafe AI's Jev model.
 * Evaluates game event context in real-time, applies confidence smoothing,
 * and renders the optimal pixel UI component (PixelToast, PixelAlert, or PixelDialog).
 *
 * Category: AI Decision Primitives
 */
export const PixelJevFeedback: React.FC<PixelJevFeedbackProps> = ({
  event = DEFAULT_EVENT,
  autoClassify = true,
  showInspector = true,
  interactive = true,
  endpoint = "/api/pixel-intent",
  onDecision,
  className,
}) => {
  const [activeEvent, setActiveEvent] = useState<GameEvent>(event);
  const [loading, setLoading] = useState(false);
  const [latencyMs, setLatencyMs] = useState(0);
  const [modelName, setModelName] = useState("typesafe/jev-1.13");
  const [source, setSource] = useState<"live" | "mock">("live");
  const [scores, setScores] = useState<Record<string, number>>({});
  const [rationale, setRationale] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [inspectorOpen, setInspectorOpen] = useState(showInspector);

  // Confidence-smoothing state machine to prevent UI flicker
  const { state: decisionState, processDecision, reset } = useDecisionSmoothing<FeedbackChoice>({
    safeDefault: "toast",
    highConfidenceThreshold: 0.85,
    lowConfidenceThreshold: 0.60,
    windowMs: 1200,
  });

  const classifyEvent = useCallback(
    async (targetEvent: GameEvent) => {
      setLoading(true);
      setError(null);
      const startTime = Date.now();

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: targetEvent,
            pickerType: "feedback",
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Jev API error (${res.status}): ${res.statusText}`);
        }

        const data = await res.json();
        const duration = data.latencyMs || Date.now() - startTime;
        setLatencyMs(duration);
        setModelName(data.model || "typesafe/jev-1.13");
        setSource(data.source || "live");
        setScores(data.decision.scores || {});
        setRationale(data.decision.rationale || "");

        processDecision(data.decision);
        onDecision?.(data.decision, duration);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("PixelJevFeedback classification failed:", msg);
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [endpoint, onDecision, processDecision]
  );

  // Automatically classify when external event prop changes
  useEffect(() => {
    if (autoClassify && event) {
      setActiveEvent(event);
      classifyEvent(event);
    }
  }, [event, autoClassify, classifyEvent]);

  const handleSelectPreset = (preset: GameEvent) => {
    setActiveEvent(preset);
    classifyEvent(preset);
  };

  const confidencePct = Math.round(decisionState.confidence * 100);

  return (
    <div
      className={cn(
        "w-full bg-(--surface-card) pixel-border-panel p-4 sm:p-5 font-pixel space-y-4 select-none",
        className
      )}
    >
      {/* Component Header & Trust Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-(--espresso)">
            PixelJevFeedback
          </span>
          <PixelBadge variant="default" className="text-[9px]">
            AI DECISION
          </PixelBadge>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setInspectorOpen((prev) => !prev)}
            className="text-[10px] font-bold text-(--caramel) hover:text-(--caramel-hover) uppercase tracking-wide cursor-pointer flex items-center gap-1 p-1"
          >
            <span>[ {inspectorOpen ? "HIDE INSPECTOR" : "SHOW INSPECTOR"} ]</span>
          </button>
        </div>
      </div>

      {/* Interactive Scenario Buttons for User Testing */}
      {interactive && (
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-(--foreground/70) block">
            Test Live Event Triggers:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESET_EVENTS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                disabled={loading}
                onClick={() => handleSelectPreset(preset.event)}
                className={cn(
                  "p-2 text-left bg-(--surface-muted) pixel-border-bevel transition-all text-xs cursor-pointer",
                  "hover:bg-(--surface) active:scale-[0.96]",
                  activeEvent.title === preset.event.title && "bg-(--caramel)/15 border-(--caramel)",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-bold text-[10px] uppercase text-(--espresso) truncate">
                    {preset.label}
                  </span>
                </div>
                <span className="text-[9px] text-(--foreground/60) uppercase block">
                  {preset.tag}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Component Render Area */}
      <div className="min-h-[140px] p-4 bg-(--surface) border-2 border-dashed border-(--border-strong) flex items-center justify-center relative">
        {loading ? (
          <div className="flex items-center gap-2 py-4">
            <span className="w-2.5 h-2.5 bg-(--caramel) animate-ping inline-block" />
            <span className="text-xs uppercase font-bold text-(--caramel) tracking-wider animate-pulse">
              Jev Evaluating Event Signals...
            </span>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <DynamicPixelFeedback
              choice={decisionState.activeChoice}
              event={activeEvent}
              isPending={decisionState.status === "pending"}
              onDismiss={() => reset()}
              onConfirm={() => reset()}
            />
          </div>
        )}
      </div>

      {/* Error Alert Display */}
      {error && (
        <div className="p-3 bg-(--destructive)/10 border-2 border-(--destructive) text-(--destructive) text-xs">
          <span className="font-bold uppercase block mb-1">Model Inference Error:</span>
          <p className="leading-snug">{error}</p>
        </div>
      )}

      {/* Trust & Model Telemetry Inspector */}
      {inspectorOpen && (
        <div className="p-3 sm:p-4 bg-(--background) pixel-border-bevel space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-(--border-strong) pb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-(--espresso)">
                Model Telemetry:
              </span>
              <span className="text-[10px] px-1.5 py-0.5 bg-(--surface-card) border border-(--border-strong) font-bold text-(--caramel)">
                {modelName}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-(--foreground/60)">LATENCY:</span>
              <span className="font-bold text-(--espresso)">{latencyMs}ms</span>
              <span className="text-(--border-strong)">|</span>
              <span className="text-(--foreground/60)">SOURCE:</span>
              <span className="font-bold text-(--success) uppercase">{source}</span>
            </div>
          </div>

          {/* Calibrated Confidence Meter */}
          <div>
            <div className="flex justify-between items-center text-[10px] font-bold mb-1">
              <span className="uppercase text-(--foreground/70)">Model Confidence:</span>
              <span
                className={
                  confidencePct >= 85
                    ? "text-(--success)"
                    : confidencePct >= 60
                    ? "text-(--warning)"
                    : "text-(--destructive)"
                }
              >
                {confidencePct}% (
                {decisionState.status === "committed" ? "COMMITTED" : "PENDING GHOST"}
                )
              </span>
            </div>
            <div className="w-full h-2.5 bg-(--surface-muted) border border-(--border-strong) p-0.5">
              <div
                className={cn(
                  "h-full transition-all duration-300",
                  confidencePct >= 85
                    ? "bg-(--success)"
                    : confidencePct >= 60
                    ? "bg-(--warning)"
                    : "bg-(--destructive)"
                )}
                style={{ width: `${Math.min(100, confidencePct)}%` }}
              />
            </div>
          </div>

          {/* Probabilities Distribution */}
          {Object.keys(scores).length > 0 && (
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              {Object.entries(scores).map(([choiceKey, scoreVal]) => (
                <div
                  key={choiceKey}
                  className={cn(
                    "p-1.5 bg-(--surface-card) border border-(--border-strong) text-center",
                    decisionState.activeChoice === choiceKey && "border-(--caramel) bg-(--caramel)/10 font-bold"
                  )}
                >
                  <span className="block uppercase text-(--foreground/60)">{choiceKey}</span>
                  <span className="text-(--espresso)">{(scoreVal * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          )}

          {/* Jev Decision Rationale */}
          {rationale && (
            <p className="text-[10px] text-(--foreground/75) leading-relaxed italic border-l-2 border-(--caramel) pl-2">
              &quot;{rationale}&quot;
            </p>
          )}
        </div>
      )}
    </div>
  );
};

PixelJevFeedback.displayName = "PixelJevFeedback";

// Export alias matching both naming conventions
export const JevPixelFeedback = PixelJevFeedback;
export default PixelJevFeedback;
