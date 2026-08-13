export const qualificationGoals = [
  "Make our brand easier for AI to understand",
  "Build accountable AI systems",
  "See how we are represented in AI answers",
  "Talk through a different challenge",
] as const;

export const qualificationStages = [
  "We are exploring the problem",
  "We need a practical plan",
  "We are ready to move",
] as const;

export type QualificationGoal = (typeof qualificationGoals)[number];
export type QualificationStage = (typeof qualificationStages)[number];

export function getQualificationStep(goal: QualificationGoal | null, stage: QualificationStage | null): 1 | 2 | 3 {
  if (!goal) return 1;
  if (!stage) return 2;
  return 3;
}

export function validateQualifiedName(value: string) {
  const clean = value.trim();
  if (!clean) return "Please enter your name.";
  if (clean.length < 2) return "Please use at least two characters.";
  if (clean.length > 160) return "Please keep your name under 160 characters.";
  return true;
}

export function validateQualifiedWorkEmail(value: string) {
  const clean = value.trim();
  if (!clean) return "Please enter your email address.";
  if (!/^\S+@\S+\.\S+$/.test(clean)) return "Please enter a valid email address.";
  if (clean.length > 320) return "Please keep your email under 320 characters.";
  return true;
}

export function buildQualificationMessage(goal: QualificationGoal, stage: QualificationStage, note?: string) {
  const context = note?.trim() ? ` Additional context: ${note.trim()}` : " No additional context was supplied.";
  return `Conversation goal: ${goal}. Current stage: ${stage}.${context}`;
}
