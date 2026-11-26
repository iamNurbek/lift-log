export type SessionType =
  'cb-a' | 'cb-b' | 'sh-a' | 'sh-b' | 'legs' | 'cardio' | 'rest'

/** One set. `null` means the field was left empty (e.g. no weight for bodyweight work). */
export interface SetEntry {
  w: number | null
  r: number | null
}

export interface ExerciseLog {
  /** Stable identity from crypto.randomUUID(), never the array index. */
  id: string
  name: string
  /** Target rep range as displayed, e.g. "6–8" or "15". */
  target: string
  sets: SetEntry[]
}

export interface CardioLog {
  kind: string
  min: number | null
  dist: number | null
}

export interface DayLog {
  /** Local calendar date, YYYY-MM-DD. */
  date: string
  type: SessionType
  exercises: ExerciseLog[]
  cardio: CardioLog | null
  notes: string
  /** Milliseconds since epoch. */
  updatedAt: number
}

export interface PersistedState {
  version: 1
  days: Record<string, DayLog>
}

/** Day of week as returned by Date#getDay(): 0 is Sunday, 6 is Saturday. */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6
