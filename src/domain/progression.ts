import type { LastTime } from './history'

/** Top of a rep target: the last whole number in it. "6–8" → 8, "15" → 15. */
export function topRep(target: string): number | null {
  const match = /(\d+)\s*$/.exec(target)
  return match ? Number(match[1]) : null
}

/**
 * The "add weight" hint, or null. It shows when last time had at least as many
 * logged sets as are planned now, and every one of them reached the top of the
 * rep target. It is only advice; it never changes any numbers.
 */
export function progressionHint(
  last: LastTime | null,
  plannedSets: number,
  target: string,
): string | null {
  const top = topRep(target)
  if (!last || top === null || last.sets.length < plannedSets) return null
  const hitTop = last.sets.every((s) => s.r !== null && s.r >= top)
  return hitTop ? `Hit ${String(top)} on every set. Add weight.` : null
}
