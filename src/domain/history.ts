import type { DayLog, SetEntry } from './types'

export interface LastTime {
  /** Date of the earlier session, YYYY-MM-DD. */
  date: string
  /** Only the sets that had a weight or reps logged, in order. */
  sets: SetEntry[]
}

const normalize = (name: string) => name.trim().toLowerCase()

export const isLogged = (set: SetEntry) => set.w !== null || set.r !== null

/**
 * The most recent log of an exercise strictly before `before`.
 * Names match case-insensitively after trimming, so "lat pulldown " finds
 * "Lat Pulldown". Days where the exercise has no logged sets are skipped.
 */
export function lastFor(
  days: Readonly<Record<string, DayLog>>,
  name: string,
  before: string,
): LastTime | null {
  const key = normalize(name)
  if (key === '') return null

  // YYYY-MM-DD strings sort in date order, so a plain string sort works.
  const earlier = Object.keys(days)
    .filter((date) => date < before)
    .sort()
    .reverse()

  for (const date of earlier) {
    const exercise = days[date]?.exercises.find(
      (e) => normalize(e.name) === key,
    )
    const sets = exercise?.sets.filter(isLogged) ?? []
    if (sets.length > 0) return { date, sets }
  }
  return null
}

/** "75×8 · BW×12 · 80×?" */
export function formatSets(sets: readonly SetEntry[]): string {
  return sets
    .map(
      (s) =>
        `${s.w === null ? 'BW' : String(s.w)}×${s.r === null ? '?' : String(s.r)}`,
    )
    .join(' · ')
}
