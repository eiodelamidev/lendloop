/** Tiny class joiner so UI components stay dependency-free. */
export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
