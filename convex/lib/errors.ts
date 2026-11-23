import { ConvexError } from "convex/values";

export const ErrorCode = {
  UNAUTHENTICATED: "UNAUTHENTICATED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  INVALID_ARGUMENT: "INVALID_ARGUMENT",
  INVALID_TRANSITION: "INVALID_TRANSITION",
  CONFLICT: "CONFLICT",
  RATE_LIMITED: "RATE_LIMITED",
  EMAIL_REQUIRED: "EMAIL_REQUIRED",
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export type AppError = { code: ErrorCode; message: string };

/** Expected failures only. Unexpected exceptions should remain generic. */
export function appError(code: ErrorCode, message: string): never {
  throw new ConvexError({ code, message } satisfies AppError);
}
