import type { SessionType, Weekday } from '../domain/types'

export interface ExerciseTemplate {
  name: string
  sets: number
  target: string
}

export interface SessionTemplate {
  label: string
  short: string
  exercises: readonly ExerciseTemplate[]
}

const ex = (name: string, sets: number, target: string): ExerciseTemplate => ({
  name,
  sets,
  target,
})

export const SESSIONS: Readonly<Record<SessionType, SessionTemplate>> = {
  'cb-a': {
    label: 'Chest & Back A',
    short: 'C&B A',
    exercises: [
      ex('Incline DB press', 4, '6–8'),
      ex('Lat pulldown', 4, '6–8'),
      ex('Flat bench / machine chest press', 3, '6–10'),
      ex('Chest-supported row', 3, '8–10'),
      ex('Low-to-high cable fly', 3, '10–15'),
      ex('Single-arm cable row', 3, '10–12'),
      ex('Hanging knee raise', 3, '10–15'),
      ex('Cable crunch', 3, '10–15'),
    ],
  },
  'cb-b': {
    label: 'Chest & Back B',
    short: 'C&B B',
    exercises: [
      ex('Pull-ups', 4, '6–10'),
      ex('Flat DB press', 3, '6–10'),
      ex('Seated cable row', 3, '8–12'),
      ex('Incline machine / Smith press', 3, '8–10'),
      ex('Single-arm DB row', 3, '8–12'),
      ex('Pec deck', 3, '12–15'),
    ],
  },
  'sh-a': {
    label: 'Sharms A',
    short: 'Sharms A',
    exercises: [
      ex('Seated DB shoulder press', 3, '6–10'),
      ex('Cable lateral raise', 4, '12–15'),
      ex('Reverse pec deck', 3, '12–15'),
      ex('EZ-bar curl', 3, '8–10'),
      ex('Overhead cable triceps extension', 3, '10–12'),
      ex('Incline DB curl', 3, '10–12'),
      ex('Triceps pushdown', 3, '10–12'),
    ],
  },
  'sh-b': {
    label: 'Sharms B',
    short: 'Sharms B',
    exercises: [
      ex('Machine shoulder press', 3, '8–10'),
      ex('DB lateral raise', 4, '12–20'),
      ex('Rear delt cable fly', 3, '15'),
      ex('Close-grip bench', 3, '6–10'),
      ex('Preacher curl', 3, '8–12'),
      ex('Hammer curl', 3, '10–12'),
      ex('Overhead DB triceps extension', 3, '10–12'),
      ex('Hanging leg raise', 3, '10–15'),
      ex('Cable crunch', 3, '10–15'),
    ],
  },
  legs: {
    label: 'Legs',
    short: 'Legs',
    exercises: [
      ex('Hack squat / leg press', 3, '8–10'),
      ex('Romanian deadlift', 3, '8–10'),
      ex('Leg extension', 2, '12–15'),
      ex('Seated leg curl', 2, '10–12'),
      ex('Standing calf raise', 3, '10–15'),
      ex('Ab wheel / plank', 3, '10–15'),
      ex('Cable crunch', 3, '12'),
    ],
  },
  cardio: { label: 'Cardio', short: 'Cardio', exercises: [] },
  rest: { label: 'Rest', short: 'Rest', exercises: [] },
}

/** Order of the session chips in the UI. */
export const SESSION_ORDER: readonly SessionType[] = [
  'cb-a',
  'cb-b',
  'sh-a',
  'sh-b',
  'legs',
  'cardio',
  'rest',
]

/** Default session for each weekday, keyed by Date#getDay() (0 = Sunday). */
export const WEEKLY_PLAN: Readonly<Record<Weekday, SessionType>> = {
  1: 'cb-a',
  2: 'sh-a',
  3: 'legs',
  4: 'rest',
  5: 'cb-b',
  6: 'sh-b',
  0: 'rest',
}

export const CARDIO_KINDS = [
  'Incline walk',
  'Walk outside',
  'Run',
  'Bike',
  'Stairmaster',
  'Other',
] as const

export const DEFAULT_CARDIO_KIND = CARDIO_KINDS[0]

/** Defaults for an exercise added by hand from the "Add an exercise" input. */
export const NEW_EXERCISE_DEFAULTS = { sets: 3, target: '8–12' } as const

export const REST_DAY_MESSAGE =
  'Rest day. Walk 30–45 min and get to 8,000 steps.'
