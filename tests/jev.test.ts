import { describe, it } from "node:test";
import assert from "node:assert";
import { mockClassifyFeedback } from "../lib/jev/mock";
import { DecisionStateMachine } from "../lib/decide";
import {
  feedbackComponentRegistry,
  getFeedbackComponent,
  FeedbackToastAdapter,
  FeedbackDialogAdapter,
  FeedbackAlertAdapter,
} from "../components/pixel/registry";
import { GameEvent, FeedbackChoice } from "../lib/jev/pixelUIQuestions";

describe("Jev Decision Layer", () => {
  // -------------------------------------------------------------
  // 1. Offline Mock Classifier Tests
  // -------------------------------------------------------------
  describe("Offline Mock Classifier (mockClassifyFeedback)", () => {
    it("should classify boss defeats as dialog requiring acknowledgment with high confidence", () => {
      const event: GameEvent = {
        id: "evt-1",
        type: "combat",
        title: "Dragon Slain!",
        message: "You have defeated Ignis the Flame Lord. The kingdom is saved!",
        urgency: "critical",
        requiresAck: true,
      };

      const decision = mockClassifyFeedback(event);
      assert.strictEqual(decision.choice, "dialog");
      assert.ok(decision.confidence >= 0.85, `Expected confidence >= 0.85, got ${decision.confidence}`);
      assert.ok(decision.scores?.dialog && decision.scores.dialog > 0.8);
    });

    it("should classify environmental hazard / poison as alert", () => {
      const event: GameEvent = {
        id: "evt-2",
        type: "hazard",
        title: "Poison Gas Inhaled",
        message: "You are losing 8 HP every second. Find an antidote quickly!",
        urgency: "high",
        requiresAck: false,
      };

      const decision = mockClassifyFeedback(event);
      assert.strictEqual(decision.choice, "alert");
      assert.ok(decision.confidence >= 0.85, `Expected confidence >= 0.85, got ${decision.confidence}`);
    });

    it("should classify small ambient loot as toast", () => {
      const event: GameEvent = {
        id: "evt-3",
        type: "inventory",
        title: "Gold Picked Up",
        message: "+25 Gold Coins collected.",
        urgency: "low",
        requiresAck: false,
      };

      const decision = mockClassifyFeedback(event);
      assert.strictEqual(decision.choice, "toast");
      assert.ok(decision.confidence >= 0.85);
    });

    it("should yield low confidence (< 0.60) on ambiguous ambient signals to test fallback", () => {
      const event: GameEvent = {
        id: "evt-4",
        type: "ambient",
        title: "Vague Whisper Heard",
        message: "A distant ambient murmur echoes through the cave.",
        urgency: "low",
      };

      const decision = mockClassifyFeedback(event);
      assert.ok(decision.confidence < 0.60, `Expected confidence < 0.60, got ${decision.confidence}`);
    });
  });

  // -------------------------------------------------------------
  // 2. Confidence-Smoothing State Machine Tests
  // -------------------------------------------------------------
  describe("Confidence-Smoothing State Machine (DecisionStateMachine)", () => {
    it("should immediately commit a choice if confidence is >= 0.85 on single call", () => {
      const sm = new DecisionStateMachine<FeedbackChoice>({
        safeDefault: "toast",
        highConfidenceThreshold: 0.85,
        lowConfidenceThreshold: 0.60,
      });

      const res = sm.processDecision({
        choice: "dialog",
        confidence: 0.92,
        rationale: "Defeated boss",
      });

      assert.strictEqual(res.status, "committed");
      assert.strictEqual(res.activeChoice, "dialog");
      assert.strictEqual(res.pendingChoice, null);
      assert.strictEqual(res.isFallback, false);
    });

    it("should fall back to safeDefault immediately if confidence < 0.60", () => {
      const sm = new DecisionStateMachine<FeedbackChoice>({
        safeDefault: "toast",
        lowConfidenceThreshold: 0.60,
      });

      // First set state to dialog
      sm.processDecision({ choice: "dialog", confidence: 0.95 });
      assert.strictEqual(sm.getState().activeChoice, "dialog");

      // Now receive ambiguous low-confidence input
      const res = sm.processDecision({
        choice: "alert",
        confidence: 0.52,
      });

      assert.strictEqual(res.status, "committed");
      assert.strictEqual(res.activeChoice, "toast"); // Reverts to safeDefault
      assert.strictEqual(res.isFallback, true);
    });

    it("should hold moderate confidence in pending state, then commit upon second consecutive confirmation", () => {
      const sm = new DecisionStateMachine<FeedbackChoice>({
        safeDefault: "toast",
        highConfidenceThreshold: 0.85,
        lowConfidenceThreshold: 0.60,
        windowMs: 1000,
      });

      const t0 = 10000;

      // 1st call with moderate confidence (0.75)
      const step1 = sm.processDecision({ choice: "alert", confidence: 0.75 }, t0);
      assert.strictEqual(step1.status, "pending");
      assert.strictEqual(step1.activeChoice, "toast"); // Kept previous activeChoice
      assert.strictEqual(step1.pendingChoice, "alert");

      // 2nd call with same choice within 1000ms window
      const step2 = sm.processDecision({ choice: "alert", confidence: 0.76 }, t0 + 200);
      assert.strictEqual(step2.status, "committed");
      assert.strictEqual(step2.activeChoice, "alert"); // Successfully transitioned!
      assert.strictEqual(step2.pendingChoice, null);
      assert.strictEqual(step2.consecutiveMatches, 2);
    });

    it("should not commit moderate confidence if second call occurs outside window", () => {
      const sm = new DecisionStateMachine<FeedbackChoice>({
        safeDefault: "toast",
        highConfidenceThreshold: 0.85,
        lowConfidenceThreshold: 0.60,
        windowMs: 1000,
      });

      const t0 = 10000;

      // 1st call at t0
      sm.processDecision({ choice: "alert", confidence: 0.75 }, t0);

      // 2nd call at t0 + 2000ms (outside 1000ms window)
      const step2 = sm.processDecision({ choice: "alert", confidence: 0.75 }, t0 + 2000);
      assert.strictEqual(step2.status, "pending");
      assert.strictEqual(step2.activeChoice, "toast"); // Remained unswapped
    });
  });

  // -------------------------------------------------------------
  // 3. Component Registry Lookup Tests
  // -------------------------------------------------------------
  describe("Pixel Component Registry", () => {
    it("should map choice keys to appropriate adapters", () => {
      assert.strictEqual(feedbackComponentRegistry.toast, FeedbackToastAdapter);
      assert.strictEqual(feedbackComponentRegistry.dialog, FeedbackDialogAdapter);
      assert.strictEqual(feedbackComponentRegistry.alert, FeedbackAlertAdapter);
    });

    it("getFeedbackComponent should return correct component or safe default", () => {
      assert.strictEqual(getFeedbackComponent("toast"), FeedbackToastAdapter);
      assert.strictEqual(getFeedbackComponent("dialog"), FeedbackDialogAdapter);
      assert.strictEqual(getFeedbackComponent("alert"), FeedbackAlertAdapter);

      // Cast unknown key
      assert.strictEqual(getFeedbackComponent("unknown" as FeedbackChoice), FeedbackToastAdapter);
    });
  });
});
