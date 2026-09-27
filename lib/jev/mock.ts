/**
 * Deterministic Offline Fallback Classifier for Jev
 * Implements the exact same input/output signature as TypeSafe AI's Jev model.
 * Provides zero-latency, hermetic offline execution and unit testing without network or API key dependencies.
 */

import {
  GameEvent,
  JevDecision,
  FeedbackChoice,
  ProgressChoice,
  InteractionChoice,
} from "./pixelUIQuestions";

/**
 * Classify feedback container for a game event using deterministic rule & keyword heuristics.
 */
export function mockClassifyFeedback(event: GameEvent): JevDecision<FeedbackChoice> {
  const text = `${event.type} ${event.title} ${event.message}`.toLowerCase();
  const requiresAck = event.requiresAck === true;
  const isCritical = event.urgency === "critical";
  const isHigh = event.urgency === "high";

  // 1. Explicit acknowledgment or major milestones -> Dialog
  const dialogKeywords = [
    "boss",
    "defeat",
    "victory",
    "game over",
    "quest complete",
    "quest finished",
    "level up milestone",
    "cutscene",
    "achievement unlocked",
    "critical story",
  ];

  if (requiresAck || isCritical || dialogKeywords.some((kw) => text.includes(kw))) {
    return {
      choice: "dialog",
      confidence: requiresAck || isCritical ? 0.96 : 0.91,
      rationale: "Event requires explicit player acknowledgment or marks a major gameplay milestone.",
      scores: {
        dialog: 0.94,
        alert: 0.04,
        toast: 0.02,
      },
    };
  }

  // 2. Tactical ongoing hazards / warnings -> Alert
  const alertKeywords = [
    "poison",
    "hazard",
    "trap",
    "bleeding",
    "low health",
    "low mana",
    "damaged weapon",
    "broken armor",
    "warning",
    "debuff",
    "cold",
    "burning",
  ];

  if (isHigh || alertKeywords.some((kw) => text.includes(kw))) {
    return {
      choice: "alert",
      confidence: isHigh ? 0.92 : 0.89,
      rationale: "Ongoing tactical condition or hazard requiring visual persistence without freezing controls.",
      scores: {
        alert: 0.89,
        toast: 0.08,
        dialog: 0.03,
      },
    };
  }

  // 3. Ambiguous / vague inputs for threshold testing -> Low confidence (< 0.60)
  const lowConfidenceKeywords = ["vague", "ambient", "mysterious", "whisper", "rumor", "neutral", "glance"];
  if (lowConfidenceKeywords.some((kw) => text.includes(kw))) {
    return {
      choice: "toast",
      confidence: 0.54, // Below 0.60 threshold to trigger safe default fallback
      rationale: "Ambiguous signals with low certainty; caller should evaluate safe default fallback.",
      scores: {
        toast: 0.54,
        alert: 0.28,
        dialog: 0.18,
      },
    };
  }

  // 4. Default ambient notifications -> Toast
  return {
    choice: "toast",
    confidence: 0.90,
    rationale: "Standard transient event suitable for auto-dismissing toast notification.",
    scores: {
      toast: 0.90,
      alert: 0.07,
      dialog: 0.03,
    },
  };
}

/**
 * Classify progress display container (HealthBar vs ProgressBar vs Badge)
 */
export function mockClassifyProgress(event: GameEvent): JevDecision<ProgressChoice> {
  const text = `${event.type} ${event.title} ${event.message}`.toLowerCase();

  if (text.includes("health") || text.includes("mana") || text.includes("stamina") || text.includes("shield")) {
    return {
      choice: "health_bar",
      confidence: 0.93,
      rationale: "Vital depleting combat pool.",
      scores: { health_bar: 0.93, progress_bar: 0.05, badge: 0.02 },
    };
  }

  if (text.includes("count") || text.includes("kill") || text.includes("gold") || text.includes("potion")) {
    return {
      choice: "badge",
      confidence: 0.88,
      rationale: "Discrete scalar count or tag.",
      scores: { badge: 0.88, progress_bar: 0.09, health_bar: 0.03 },
    };
  }

  return {
    choice: "progress_bar",
    confidence: 0.89,
    rationale: "Accumulating linear progress or timer.",
    scores: { progress_bar: 0.89, health_bar: 0.06, badge: 0.05 },
  };
}

/**
 * Classify interaction container (InventoryGrid vs DialogBox vs PixelPanel)
 */
export function mockClassifyInteraction(event: GameEvent): JevDecision<InteractionChoice> {
  const text = `${event.type} ${event.title} ${event.message}`.toLowerCase();

  if (text.includes("inventory") || text.includes("item") || text.includes("loot") || text.includes("slot")) {
    return {
      choice: "inventory_grid",
      confidence: 0.92,
      rationale: "Slot-based item manipulation interface.",
      scores: { inventory_grid: 0.92, panel: 0.05, dialog_box: 0.03 },
    };
  }

  if (text.includes("talk") || text.includes("npc") || text.includes("dialogue") || text.includes("story")) {
    return {
      choice: "dialog_box",
      confidence: 0.95,
      rationale: "Conversational branching dialogue moment.",
      scores: { dialog_box: 0.95, panel: 0.03, inventory_grid: 0.02 },
    };
  }

  return {
    choice: "panel",
    confidence: 0.87,
    rationale: "Standard static information panel.",
    scores: { panel: 0.87, inventory_grid: 0.08, dialog_box: 0.05 },
  };
}
