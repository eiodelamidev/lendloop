import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  automationKindValidator,
  categoryValidator,
  conditionValidator,
  deliveryStatusValidator,
  loanStatusValidator,
  roleValidator,
  webhookEventTypeValidator,
  webhookPayloadValidator,
} from "./lib/validators";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    role: roleValidator,
    trustedLender: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_email", ["email"]),

  tools: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    category: categoryValidator,
    condition: conditionValidator,
    description: v.string(),
    deletedAt: v.optional(v.number()),
  })
    .index("by_owner", ["ownerId"])
    .index("by_category_and_deletedAt", ["category", "deletedAt"]),

  loans: defineTable({
    toolId: v.id("tools"),
    ownerId: v.id("users"),
    borrowerId: v.id("users"),
    startDate: v.string(),
    endDate: v.string(),
    status: loanStatusValidator,
    decidedAt: v.optional(v.number()),
    returnedAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_tool", ["toolId"])
    .index("by_owner", ["ownerId"])
    .index("by_borrower", ["borrowerId"])
    .index("by_tool_status_endDate", ["toolId", "status", "endDate"]),

  webhookDeliveries: defineTable({
    eventId: v.string(),
    type: webhookEventTypeValidator,
    payload: webhookPayloadValidator,
    status: deliveryStatusValidator,
    attempts: v.number(),
    nextAttemptAt: v.number(),
    lastError: v.optional(v.string()),
    loanId: v.id("loans"),
    createdAt: v.number(),
  })
    .index("by_eventId", ["eventId"])
    .index("by_status", ["status"])
    .index("by_loanId", ["loanId"]),

  automationEvents: defineTable({
    loanId: v.optional(v.id("loans")),
    kind: automationKindValidator,
    status: v.string(),
    idempotencyKey: v.string(),
    detail: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_idempotencyKey", ["idempotencyKey"])
    .index("by_loanId", ["loanId"])
    .index("by_kind", ["kind"]),
});
