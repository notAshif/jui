/**
 * Jev System One Question Schemas & Decision Contracts
 * TypeSafe AI question definitions for dynamic pixel component selection.
 */

export interface GameEvent {
  id?: string;
  type: string;
  title: string;
  message: string;
  urgency?: "low" | "medium" | "high" | "critical";
  requiresAck?: boolean;
  metadata?: Record<string, unknown>;
}

export interface JevChoiceOption<T extends string = string> {
  id: T;
  label: string;
  description: string;
}

export interface JevQuestionSchema<T extends string = string> {
  id: string;
  title: string;
  prompt: string;
  options: JevChoiceOption<T>[];
}

export interface JevDecision<T extends string = string> {
  choice: T;
  confidence: number;
  rationale?: string;
  scores?: Record<T, number>;
}

// -------------------------------------------------------------
// 1. Feedback Picker Question Schema (Toast vs Dialog vs Alert)
// -------------------------------------------------------------

export type FeedbackChoice = "toast" | "dialog" | "alert";

export const feedbackPickerQuestion: JevQuestionSchema<FeedbackChoice> = {
  id: "feedback_component_picker",
  title: "Feedback Component Picker",
  prompt:
    "Evaluate the game event signals. Choose whether to display an ambient transient Toast, a modal Dialog requiring player confirmation, or a persistent tactical Alert panel.",
  options: [
    {
      id: "toast",
      label: "PixelToast",
      description:
        "Ambient, transient, non-blocking notification (e.g. minor loot pickup, experience gain, small stat bump, non-critical status update) that disappears automatically without disrupting player action.",
    },
    {
      id: "dialog",
      label: "DialogBox",
      description:
        "Urgent, blocking modal dialog that interrupts gameplay and requires explicit player acknowledgment (Enter / continue) before action resumes (e.g. boss defeated, story milestone, level completion, death/defeat).",
    },
    {
      id: "alert",
      label: "PixelAlert",
      description:
        "Persistent or high-visibility inline warning banner for ongoing tactical hazards, poison ticks, equipment breakdown, or critical status alerts that require immediate player awareness without trapping keyboard focus.",
    },
  ],
};

// -------------------------------------------------------------
// 2. Progress Display Picker Question Schema (HealthBar vs ProgressBar vs Badge)
// -------------------------------------------------------------

export type ProgressChoice = "health_bar" | "progress_bar" | "badge";

export const progressPickerQuestion: JevQuestionSchema<ProgressChoice> = {
  id: "progress_display_picker",
  title: "Progress Display Picker",
  prompt:
    "Evaluate the stat update. Choose between a dedicated HealthBar (depleting vital pool), a standard PixelProgressBar (accumulating XP/progress), or a PixelBadge (discrete count).",
  options: [
    {
      id: "health_bar",
      label: "HealthBar",
      description:
        "Dynamic segment or fluid bar representing vital depleting combat pools (Health, Mana, Stamina, Shield energy).",
    },
    {
      id: "progress_bar",
      label: "PixelProgressBar",
      description:
        "Linear accumulating progress bar for goals, experience progression, cooldown timers, download/crafting meters.",
    },
    {
      id: "badge",
      label: "PixelBadge",
      description:
        "Compact numerical or status tag for discrete counts (kill counts, potion quantities, currency badges, level badges).",
    },
  ],
};

// -------------------------------------------------------------
// 3. Interaction Container Picker Question Schema (Inventory vs Dialog vs Panel)
// -------------------------------------------------------------

export type InteractionChoice = "inventory_grid" | "dialog_box" | "panel";

export const interactionPickerQuestion: JevQuestionSchema<InteractionChoice> = {
  id: "interaction_container_picker",
  title: "Interaction Container Picker",
  prompt:
    "Evaluate the interactive gameplay moment. Choose between an InventoryGrid (slot-based management), a DialogBox (dialogue/story interaction), or a PixelPanel (general static info menu).",
  options: [
    {
      id: "inventory_grid",
      label: "InventoryGrid",
      description:
        "Matrix container composed of item slots for looting, equipment checking, item transfer, and backpack management.",
    },
    {
      id: "dialog_box",
      label: "DialogBox",
      description:
        "Rich dialogue and prompt container for NPC conversations, cutscenes, lore scrolls, and branching narrative choices.",
    },
    {
      id: "panel",
      label: "PixelPanel",
      description:
        "General-purpose tactile container for statistics, settings, quest logs, maps, and character overview displays.",
    },
  ],
};

/**
 * Format a GameEvent into a concise, high-signal context string for Jev evaluation.
 */
export function formatEventPrompt(event: GameEvent): string {
  const parts = [
    `Event Type: ${event.type}`,
    `Title: "${event.title}"`,
    `Message: "${event.message}"`,
  ];

  if (event.urgency) {
    parts.push(`Urgency: ${event.urgency}`);
  }

  if (typeof event.requiresAck === "boolean") {
    parts.push(`Requires Acknowledgment: ${event.requiresAck ? "YES (blocking)" : "NO (ambient)"}`);
  }

  if (event.metadata && Object.keys(event.metadata).length > 0) {
    parts.push(`Metadata: ${JSON.stringify(event.metadata)}`);
  }

  return parts.join(" | ");
}
