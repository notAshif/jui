/**
 * Confidence-Smoothing State Machine for Jev Decisions
 *
 * Prevents UI component flickering during rapid game events by requiring either:
 * 1. Very high confidence (> 0.85) on a single call to commit immediately, OR
 * 2. Two identical successive answers within a time window (default 1000ms) before committing.
 *
 * If incoming confidence is below 0.60, falls back immediately to a safe default component.
 * Exposes "pending" vs "committed" state for UI ghost/loading feedback.
 */

import { useState, useCallback, useRef } from "react";
import { JevDecision } from "./jev/pixelUIQuestions";

export type DecisionStatus = "idle" | "pending" | "committed";

export interface StateMachineConfig<T extends string> {
  safeDefault: T;
  highConfidenceThreshold?: number; // default: 0.85
  lowConfidenceThreshold?: number;  // default: 0.60
  windowMs?: number;                // default: 1000ms
}

export interface DecisionState<T extends string> {
  status: DecisionStatus;
  activeChoice: T;
  pendingChoice: T | null;
  confidence: number;
  consecutiveMatches: number;
  isFallback: boolean;
  lastUpdated: number;
  rationale?: string;
}

export class DecisionStateMachine<T extends string> {
  private config: Required<StateMachineConfig<T>>;
  private state: DecisionState<T>;

  constructor(config: StateMachineConfig<T>) {
    this.config = {
      safeDefault: config.safeDefault,
      highConfidenceThreshold: config.highConfidenceThreshold ?? 0.85,
      lowConfidenceThreshold: config.lowConfidenceThreshold ?? 0.60,
      windowMs: config.windowMs ?? 1000,
    };

    this.state = {
      status: "idle",
      activeChoice: config.safeDefault,
      pendingChoice: null,
      confidence: 1.0,
      consecutiveMatches: 0,
      isFallback: false,
      lastUpdated: 0,
    };
  }

  /**
   * Process a new decision from Jev (or the mock) and return the updated state.
   */
  public processDecision(decision: JevDecision<T>, timestamp = Date.now()): DecisionState<T> {
    const { choice, confidence, rationale } = decision;
    const { safeDefault, highConfidenceThreshold, lowConfidenceThreshold, windowMs } = this.config;
    const isWithinWindow = timestamp - this.state.lastUpdated <= windowMs;

    // Rule 1: Confidence is below safe threshold (< 0.60) -> Fallback to Safe Default
    if (confidence < lowConfidenceThreshold) {
      this.state = {
        status: "committed",
        activeChoice: safeDefault,
        pendingChoice: null,
        confidence,
        consecutiveMatches: 0,
        isFallback: true,
        lastUpdated: timestamp,
        rationale: rationale || `Confidence (${confidence.toFixed(2)}) below threshold; reverted to safe default.`,
      };
      return { ...this.state };
    }

    // Rule 2: High confidence (>= 0.85) -> Immediately commit the choice
    if (confidence >= highConfidenceThreshold) {
      this.state = {
        status: "committed",
        activeChoice: choice,
        pendingChoice: null,
        confidence,
        consecutiveMatches: 1,
        isFallback: false,
        lastUpdated: timestamp,
        rationale,
      };
      return { ...this.state };
    }

    // Rule 3: Moderate confidence (0.60 <= confidence < 0.85)
    // If incoming choice matches the already active choice, remain committed
    if (choice === this.state.activeChoice) {
      this.state = {
        status: "committed",
        activeChoice: choice,
        pendingChoice: null,
        confidence,
        consecutiveMatches: this.state.consecutiveMatches + 1,
        isFallback: false,
        lastUpdated: timestamp,
        rationale,
      };
      return { ...this.state };
    }

    // If incoming choice matches the pending choice within the window -> commit (2nd consecutive hit)
    if (isWithinWindow && choice === this.state.pendingChoice) {
      this.state = {
        status: "committed",
        activeChoice: choice,
        pendingChoice: null,
        confidence,
        consecutiveMatches: 2,
        isFallback: false,
        lastUpdated: timestamp,
        rationale: rationale || "Committed after consecutive moderate-confidence confirmations.",
      };
      return { ...this.state };
    }

    // First time seeing this moderate choice: stage as "pending" without swapping active component
    this.state = {
      status: "pending",
      activeChoice: this.state.activeChoice, // Maintain current component to prevent flicker
      pendingChoice: choice,
      confidence,
      consecutiveMatches: 1,
      isFallback: false,
      lastUpdated: timestamp,
      rationale: rationale || "Pending verification: awaiting second event or higher confidence.",
    };

    return { ...this.state };
  }

  public getState(): DecisionState<T> {
    return { ...this.state };
  }

  public reset(): DecisionState<T> {
    this.state = {
      status: "idle",
      activeChoice: this.config.safeDefault,
      pendingChoice: null,
      confidence: 1.0,
      consecutiveMatches: 0,
      isFallback: false,
      lastUpdated: Date.now(),
    };
    return { ...this.state };
  }
}

/**
 * React hook integrating the DecisionStateMachine for reactive UI state.
 */
export function useDecisionSmoothing<T extends string>(config: StateMachineConfig<T>) {
  const machineRef = useRef<DecisionStateMachine<T> | null>(null);
  if (!machineRef.current) {
    machineRef.current = new DecisionStateMachine<T>(config);
  }

  const [state, setState] = useState<DecisionState<T>>(() => machineRef.current!.getState());

  const processDecision = useCallback((decision: JevDecision<T>, timestamp?: number) => {
    const nextState = machineRef.current!.processDecision(decision, timestamp);
    setState(nextState);
    return nextState;
  }, []);

  const reset = useCallback(() => {
    const nextState = machineRef.current!.reset();
    setState(nextState);
    return nextState;
  }, []);

  return {
    state,
    processDecision,
    reset,
  };
}
