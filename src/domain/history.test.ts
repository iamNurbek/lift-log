import { describe, expect, it } from 'vitest'
import { formatSets, lastFor } from './history'
import type { DayLog, SetEntry } from './types'

const day = (date: string, exercises: Record<string, SetEntry[]>): DayLog => ({
  date,
  type: 'cb-a',
  exercises: Object.entries(exercises).map(([name, sets], i) => ({
    id: `${date}-${String(i)}`,
    name,
    target: '6–8',
    sets,
  })),
  cardio: null,
  notes: '',
  updatedAt: 0,
})

const days = Object.fromEntries(
  [
    day('2026-11-09', { 'Lat pulldown': [{ w: 120, r: 8 }] }),
    day('2026-11-16', {
      'Lat pulldown': [
        { w: 130, r: 8 },
        { w: null, r: null },
        { w: 130, r: 6 },
      ],
    }),
    // Planned but never logged: should be skipped.
    day('2026-11-20', { 'Lat pulldown': [{ w: null, r: null }] }),
    day('2026-11-23', { 'Lat pulldown': [{ w: 140, r: 7 }] }),
    day('2026-11-30', { 'Lat pulldown': [{ w: 150, r: 5 }] }),
  ].map((d) => [d.date, d]),
)

describe('lastFor', () => {
  it('ignores the viewed date and anything after it', () => {
    expect(lastFor(days, 'Lat pulldown', '2026-11-23')?.date).toBe('2026-11-16')
  })

  it('skips days where the exercise has no logged sets', () => {
    expect(lastFor(days, 'Lat pulldown', '2026-11-21')?.date).toBe('2026-11-16')
  })

  it('keeps only the logged sets, in order', () => {
    expect(lastFor(days, 'Lat pulldown', '2026-11-17')?.sets).toEqual([
      { w: 130, r: 8 },
      { w: 130, r: 6 },
    ])
  })

  it('matches names case-insensitively after trimming', () => {
    expect(lastFor(days, '  LAT PULLDOWN ', '2026-11-10')?.date).toBe(
      '2026-11-09',
    )
  })

  it('returns null when there is no earlier log', () => {
    expect(lastFor(days, 'Lat pulldown', '2026-11-09')).toBeNull()
    expect(lastFor(days, 'Pec deck', '2026-12-31')).toBeNull()
    expect(lastFor(days, '   ', '2026-12-31')).toBeNull()
  })
})

describe('formatSets', () => {
  it('prints BW for no weight and ? for no reps', () => {
    expect(
      formatSets([
        { w: 75, r: 8 },
        { w: null, r: 12 },
        { w: 72.5, r: null },
      ]),
    ).toBe('75×8 · BW×12 · 72.5×?')
  })
})
