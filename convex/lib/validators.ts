import { v } from "convex/values";

/** Shared validators so schema and function returns cannot drift apart. */
export const roleValidator = v.union(v.literal("user"), v.literal("admin"));

export const categoryValidator = v.union(
  v.literal("power-tools"),
  v.literal("garden"),
  v.literal("kitchen"),
  v.literal("camping"),
  v.literal("cleaning"),
  v.literal("other"),
);

export const conditionValidator = v.union(
  v.literal("new"),
  v.literal("good"),
  v.literal("fair"),
  v.literal("worn"),
);

export const loanStatusValidator = v.union(
  v.literal("pending"),
  v.literal("approved"),
  v.literal("declined"),
  v.literal("cancelled"),
  v.literal("returned"),
);

export const webhookEventTypeValidator = v.union(
  v.literal("loan.requested"),
  v.literal("loan.approved"),
  v.literal("loan.declined"),
  v.literal("loan.cancelled"),
  v.literal("loan.returned"),
);

/**
 * Exact outbound payload shape. Declaring it in the schema means an accidental
 * extra field (an ID, a second party's email, a description) fails validation
 * instead of silently leaking data.
 */
export const webhookPayloadValidator = v.object({
  eventId: v.string(),
  type: webhookEventTypeValidator,
  loanId: v.string(),
  toolName: v.string(),
  startDate: v.string(),
  endDate: v.string(),
  status: loanStatusValidator,
  recipient: v.object({ name: v.string(), email: v.string() }),
});

export const deliveryStatusValidator = v.union(
  v.literal("pending"),
  v.literal("delivered"),
  v.literal("failed"),
);

export const automationKindValidator = v.union(
  v.literal("reminder"),
  v.literal("workflow_error"),
  v.literal("delivery_failed"),
);
