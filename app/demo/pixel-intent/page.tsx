"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { GameEvent, FeedbackChoice } from "@/lib/jev/pixelUIQuestions";
import { useDecisionSmoothing } from "@/lib/decide";
import { DynamicPixelFeedback } from "@/components/pixel/registry";
import { PixelButton } from "@/components/pixel/button";
import { PixelBadge } from "@/components/pixel/badge";
import {
  PixelCard,
  PixelCardHeader,
  PixelCardTitle,
  PixelCardDescription,
  PixelCardContent,
} from "@/components/pixel/card";

interface TelemetryData {
  source: "live" | "mock";
  model: string;
  latencyMs: number;
  lastEvent: GameEvent | null;
  error: string | null;
  history: Array<{
    timestamp: string;
    choice: FeedbackChoice;
    confidence: number;
    status: string;
    source: string;
    model?: string;
    title: string;
  }>;
}

export default function PixelIntentDemoPage() {
  const { state: decisionState, processDecision, reset } = useDecisionSmoothing<FeedbackChoice>({
    safeDefault: "toast",
    highConfidenceThreshold: 0.85,
    lowConfidenceThreshold: 0.60,
    windowMs: 1200,
  });

  const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null);
  const [loading, setLoading] = useState(false);
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    source: "live",
    model: "typesafe/jev-1.13",
    latencyMs: 0,
    lastEvent: null,
    error: null,
    history: [],
  });

  // Custom Event Form State
  const [customTitle, setCustomTitle] = useState("Mysterious Ancient Chest");
  const [customMessage, setCustomMessage] = useState("You discovered a glowing locked sarcophagus.");
  const [customUrgency, setCustomUrgency] = useState<GameEvent["urgency"]>("high");
  const [customType, setCustomType] = useState("chest_discovery");

  const sendEventToJev = useCallback(
    async (event: GameEvent) => {
      setLoading(true);
      setActiveEvent(event);
      try {
        setTelemetry((prev) => ({ ...prev, error: null }));
        const res = await fetch("/api/pixel-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event,
            pickerType: "feedback",
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `API error (${res.status}): ${res.statusText}`);
        }

        const data = await res.json();
        const nextState = processDecision(data.decision);

        setTelemetry((prev) => ({
          source: data.source,
          model: data.model || "typesafe/jev-1.13",
          latencyMs: data.latencyMs,
          lastEvent: event,
          error: null,
          history: [
            {
              timestamp: new Date().toLocaleTimeString(),
              choice: nextState.activeChoice,
              confidence: data.decision.confidence,
              status: nextState.status,
              source: data.source,
              model: data.model,
              title: event.title,
            },
            ...prev.history.slice(0, 9),
          ],
        }));
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error("Failed to query Jev decision layer:", errorMsg);
        setTelemetry((prev) => ({
          ...prev,
          error: errorMsg,
        }));
      } finally {
        setLoading(false);
      }
    },
    [processDecision]
  );

  const handleReset = () => {
    reset();
    setActiveEvent(null);
    setTelemetry((prev) => ({
      ...prev,
      lastEvent: null,
    }));
  };

  // Pre-configured test scenarios
  const scenarios = [
    {
      label: "Minor Loot",
      tag: "ambient",
      desc: "Loot pickup event -> Resolves to PixelToast (high confidence)",
      event: {
        type: "item_pickup",
        title: "Iron Dagger Found",
        message: "Added Iron Dagger (+2 ATK) to inventory.",
        urgency: "low" as const,
      },
    },
    {
      label: "Hazard / Poison",
      tag: "tactical",
      desc: "Ongoing debuff -> Resolves to PixelAlert (high confidence)",
      event: {
        type: "hazard_damage",
        title: "Toxic Spores Inhaled",
        message: "Poisoned! -5 HP/sec for 10 seconds. Purge required.",
        urgency: "high" as const,
      },
    },
    {
      label: "Boss Defeated",
      tag: "modal",
      desc: "Climactic milestone -> Resolves to PixelDialog modal (high confidence)",
      event: {
        type: "boss_defeat",
        title: "Dragon Lord Vanquished",
        message: "The Ancient Wyrm has fallen. A legendary portal has unlocked.",
        urgency: "critical" as const,
      },
    },
    {
      label: "Ambiguous Whisper",
      tag: "fallback",
      desc: "Low confidence (<0.60) event -> Falls back to safe default PixelToast",
      event: {
        type: "mysterious_sound",
        title: "Faint Echo",
        message: "A faint whisper echoes through the damp cavern stones.",
        urgency: "low" as const,
      },
    },
  ];

  const handleRapidSpam = async () => {
    // Fire a moderate-confidence event to demonstrate pending ghost state vs committed state
    const spamEvent: GameEvent = {
      type: "spammer_event",
      title: "Tactical Warning Beacon",
      message: "Unconfirmed motion sensors detected incoming scout party.",
      urgency: "medium",
    };
    await sendEventToJev(spamEvent);
  };

  return (
    <div className="min-h-screen bg-(--background) text-(--foreground) font-pixel p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-(--border-strong) pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase px-2 py-0.5 bg-(--caramel) text-(--cream)">
                TypeSafe AI :: Jev
              </span>
              <span className="text-xs uppercase px-2 py-0.5 bg-(--espresso) text-(--cream)">
                System One Engine
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide uppercase text-(--espresso)">
              Pixel UI Decision Layer Playground
            </h1>
            <p className="text-xs text-(--foreground/70) mt-1">
              Deterministic choice/score inference + confidence-smoothing state machine for dynamic retro components.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/components-demo">
              <PixelButton variant="secondary" size="sm" className="text-xs">
                &lt; Components Demo
              </PixelButton>
            </Link>
            <Link href="/">
              <PixelButton variant="outline" size="sm" className="text-xs">
                Home
              </PixelButton>
            </Link>
          </div>
        </div>

        {/* Top Control & Status Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1 & 2: Interactive Scenarios & Custom Dispatcher */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Trigger Scenarios */}
            <PixelCard>
              <PixelCardHeader>
                <PixelCardTitle>1. Pre-Configured Game Event Scenarios</PixelCardTitle>
                <PixelCardDescription>
                  Select a game event to evaluate against Jev question schemas and the state machine.
                </PixelCardDescription>
              </PixelCardHeader>
              <PixelCardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scenarios.map((sc, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendEventToJev(sc.event)}
                      disabled={loading}
                      className="text-left p-3 border-2 border-(--border-strong) bg-(--surface) hover:bg-(--surface-muted) transition-colors cursor-pointer group disabled:opacity-50"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs uppercase text-(--espresso) group-hover:text-(--caramel)">
                          [ {sc.label} ]
                        </span>
                        <PixelBadge
                          variant={
                            sc.tag === "modal"
                              ? "destructive"
                              : sc.tag === "tactical"
                              ? "warning"
                              : sc.tag === "fallback"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {sc.tag}
                        </PixelBadge>
                      </div>
                      <p className="text-[11px] text-(--foreground/80) leading-snug">
                        {sc.desc}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-dashed border-(--border-strong) flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-(--espresso) block">
                      Rapid Event Burst Test:
                    </span>
                    <span className="text-[11px] text-(--foreground/70)">
                      Click repeatedly to trigger moderate confidence &amp; test smoothing window (1.2s).
                    </span>
                  </div>
                  <PixelButton
                    variant="secondary"
                    size="sm"
                    onClick={handleRapidSpam}
                    disabled={loading}
                    className="text-xs"
                  >
                    ⚡ Trigger Burst Event
                  </PixelButton>
                </div>
              </PixelCardContent>
            </PixelCard>

            {/* Custom Event Creator */}
            <PixelCard>
              <PixelCardHeader>
                <PixelCardTitle>2. Custom Game Event Simulator</PixelCardTitle>
                <PixelCardDescription>
                  Craft your own event parameters and send them directly to the decision layer.
                </PixelCardDescription>
              </PixelCardHeader>
              <PixelCardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase mb-1">
                      Event Type Key
                    </label>
                    <input
                      type="text"
                      value={customType}
                      onChange={(e) => setCustomType(e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-(--surface) border border-(--border-strong) outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase mb-1">
                      Urgency Level
                    </label>
                    <select
                      value={customUrgency}
                      onChange={(e) => setCustomUrgency(e.target.value as GameEvent["urgency"])}
                      className="w-full px-2 py-1 text-xs bg-(--surface) border border-(--border-strong) outline-none"
                    >
                      <option value="low">Low (Ambient / Non-disruptive)</option>
                      <option value="medium">Medium (Tactical / Persistent)</option>
                      <option value="high">High (Threat / Action Needed)</option>
                      <option value="critical">Critical (Blocking / Game-altering)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full px-2 py-1 text-xs bg-(--surface) border border-(--border-strong) outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase mb-1">
                    Event Message
                  </label>
                  <textarea
                    rows={2}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="w-full px-2 py-1 text-xs bg-(--surface) border border-(--border-strong) outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <PixelButton
                    variant="primary"
                    size="sm"
                    disabled={loading || !customTitle}
                    onClick={() =>
                      sendEventToJev({
                        type: customType,
                        title: customTitle,
                        message: customMessage,
                        urgency: customUrgency,
                      })
                    }
                    className="text-xs"
                  >
                    {loading ? "INFERRING..." : "▶ CLASSIFY & DISPATCH"}
                  </PixelButton>
                </div>
              </PixelCardContent>
            </PixelCard>
          </div>

          {/* Column 3: Live Telemetry & Model Stats */}
          <div className="space-y-6">
            <PixelCard>
              <PixelCardHeader>
                <div className="flex items-center justify-between">
                  <PixelCardTitle>Live Telemetry</PixelCardTitle>
                  <PixelBadge
                    variant={
                      decisionState.status === "committed"
                        ? "success"
                        : decisionState.status === "pending"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {decisionState.status.toUpperCase()}
                  </PixelBadge>
                </div>
                <PixelCardDescription>
                  State machine status, confidence smoothing, and model latency.
                </PixelCardDescription>
              </PixelCardHeader>
              <PixelCardContent className="space-y-4">
                {telemetry.error && (
                  <div className="p-3 bg-(--destructive)/10 border-2 border-(--destructive) text-(--destructive) text-xs">
                    <span className="font-bold block uppercase mb-1">Jev API Error:</span>
                    <p className="leading-snug">{telemetry.error}</p>
                  </div>
                )}

                {/* Active Choice */}
                <div className="p-3 bg-(--surface) border border-(--border-strong)">
                  <span className="text-[10px] uppercase text-(--foreground/70) block">
                    Rendered Component
                  </span>
                  <span className="text-base font-bold text-(--espresso) uppercase">
                    Pixel{decisionState.activeChoice.charAt(0).toUpperCase() + decisionState.activeChoice.slice(1)}
                  </span>
                  {decisionState.pendingChoice && (
                    <span className="block text-[10px] text-(--warning) mt-0.5">
                      Pending Choice: {decisionState.pendingChoice}
                    </span>
                  )}
                </div>

                {/* Confidence Bar */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-bold">
                    <span>Model Confidence</span>
                    <span
                      className={
                        decisionState.confidence >= 0.85
                          ? "text-(--success)"
                          : decisionState.confidence >= 0.60
                          ? "text-(--warning)"
                          : "text-(--destructive)"
                      }
                    >
                      {(decisionState.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-(--surface-muted) border border-(--border-strong) overflow-hidden p-0.5">
                    <div
                      className={`h-full transition-all duration-300 ${
                        decisionState.confidence >= 0.85
                          ? "bg-(--success)"
                          : decisionState.confidence >= 0.60
                          ? "bg-(--warning)"
                          : "bg-(--destructive)"
                      }`}
                      style={{ width: `${Math.min(100, decisionState.confidence * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-(--foreground/60) mt-1">
                    <span>Safe Def (&lt;60%)</span>
                    <span>Pending (60-84%)</span>
                    <span>Commit (85%+)</span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-(--surface) border border-(--border-strong)">
                    <span className="text-[10px] text-(--foreground/60) block uppercase">
                      Jev Model
                    </span>
                    <span className="font-bold text-(--espresso) text-[11px] block truncate" title={telemetry.model}>
                      {telemetry.model}
                    </span>
                  </div>
                  <div className="p-2 bg-(--surface) border border-(--border-strong)">
                    <span className="text-[10px] text-(--foreground/60) block uppercase">
                      Roundtrip Latency
                    </span>
                    <span className="font-bold text-(--espresso)">
                      {telemetry.latencyMs} ms
                    </span>
                  </div>
                  <div className="p-2 bg-(--surface) border border-(--border-strong)">
                    <span className="text-[10px] text-(--foreground/60) block uppercase">
                      Consecutive Hits
                    </span>
                    <span className="font-bold text-(--espresso)">
                      {decisionState.consecutiveMatches} / 2
                    </span>
                  </div>
                  <div className="p-2 bg-(--surface) border border-(--border-strong)">
                    <span className="text-[10px] text-(--foreground/60) block uppercase">
                      Decision Source
                    </span>
                    <span className="font-bold text-(--success) uppercase">
                      {telemetry.source === "live" ? "Live OpenRouter" : "Mock"}
                    </span>
                  </div>
                </div>

                {/* Rationale Box */}
                {decisionState.rationale && (
                  <div className="p-2 text-[10px] leading-relaxed bg-(--surface-muted) border-l-2 border-(--caramel)">
                    <span className="font-bold block uppercase mb-0.5">Rationale:</span>
                    {decisionState.rationale}
                  </div>
                )}

                <div className="pt-2">
                  <PixelButton
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="w-full text-xs"
                  >
                    Reset Decision State
                  </PixelButton>
                </div>
              </PixelCardContent>
            </PixelCard>
          </div>
        </div>

        {/* Active Render Area */}
        <PixelCard>
          <PixelCardHeader>
            <div className="flex items-center justify-between">
              <PixelCardTitle>3. Dynamic Pixel Component Output Canvas</PixelCardTitle>
              {activeEvent && (
                <PixelBadge variant="outline">
                  EVENT: {activeEvent.type.toUpperCase()}
                </PixelBadge>
              )}
            </div>
            <PixelCardDescription>
              Rendered in real-time via &lt;DynamicPixelFeedback /&gt; with ghost state damping during pending phases.
            </PixelCardDescription>
          </PixelCardHeader>
          <PixelCardContent>
            <div className="min-h-[220px] p-6 bg-(--surface) border-2 border-dashed border-(--border-strong) flex flex-col items-center justify-center relative">
              {activeEvent ? (
                <div className="w-full max-w-lg">
                  <DynamicPixelFeedback
                    choice={decisionState.activeChoice}
                    event={activeEvent}
                    isPending={decisionState.status === "pending"}
                    onDismiss={() => {
                      setActiveEvent(null);
                    }}
                    onConfirm={() => {
                      setActiveEvent(null);
                    }}
                  />
                </div>
              ) : (
                <div className="text-center space-y-2 py-8">
                  <div className="text-2xl opacity-40">🎮</div>
                  <p className="text-xs text-(--foreground/60) uppercase tracking-wider">
                    Awaiting Game Event...
                  </p>
                  <p className="text-[11px] text-(--foreground/50) max-w-sm mx-auto">
                    Click one of the scenario buttons above or trigger a custom event to watch the Jev decision layer pick the appropriate pixel component.
                  </p>
                </div>
              )}
            </div>
          </PixelCardContent>
        </PixelCard>

        {/* Event History Log */}
        {telemetry.history.length > 0 && (
          <PixelCard>
            <PixelCardHeader>
              <PixelCardTitle>Decision History Stream</PixelCardTitle>
              <PixelCardDescription>
                Recent events dispatched and their resolved component targets.
              </PixelCardDescription>
            </PixelCardHeader>
            <PixelCardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-(--border-strong) text-[10px] uppercase text-(--foreground/60)">
                      <th className="pb-2">Time</th>
                      <th className="pb-2">Event Title</th>
                      <th className="pb-2">Chosen Component</th>
                      <th className="pb-2">Confidence</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-(--border)">
                    {telemetry.history.map((item, idx) => (
                      <tr key={idx} className="hover:bg-(--surface-muted)">
                        <td className="py-2 text-[10px] text-(--foreground/70)">{item.timestamp}</td>
                        <td className="py-2 font-bold">{item.title}</td>
                        <td className="py-2 uppercase">
                          <span className="px-1.5 py-0.5 bg-(--cream-dark) border border-(--border-strong) text-[10px]">
                            {item.choice}
                          </span>
                        </td>
                        <td className="py-2">{(item.confidence * 100).toFixed(0)}%</td>
                        <td className="py-2 uppercase text-[10px]">{item.status}</td>
                        <td className="py-2 text-[10px] text-(--foreground/70)">{item.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PixelCardContent>
          </PixelCard>
        )}
      </div>
    </div>
  );
}
