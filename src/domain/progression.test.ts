import { describe, expect, it } from 'vitest'
import type { LastTime } from './history'
import { progressionHint, topRep } from './progression'

const last = (...reps: (number | null)[]): LastTime => ({
  date: '2026-11-16',
  sets: reps.map((r) => ({ w: 100, r })),
})

describe('topRep', () => {
  it.each([
    ['6–8', 8],
    ['15', 15],
    ['12–20', 20],
    ['8-12', 12],
  ])('reads %j as %d', (target, expected) => {
    expect(topRep(target)).toBe(expected)
  })

  it('returns null when the target has no trailing number', () => {
    expect(topRep('')).toBeNull()
    expect(topRep('AMRAP')).toBeNull()
  })
})

describe('progressionHint', () => {
  it('shows when every set hit the top of the range', () => {
    expect(progressionHint(last(8, 8, 9), 3, '6–8')).toBe(
      'Hit 8 on every set. Add weight.',
    )
  })

  it('works with a single-number target and a wide range', () => {
    expect(progressionHint(last(15, 15, 15), 3, '15')).toBe(
      'Hit 15 on every set. Add weight.',
    )
    expect(progressionHint(last(20, 20, 20, 20), 4, '12–20')).toBe(
      'Hit 20 on every set. Add weight.',
    )
  })

  it('stays hidden when any set fell short', () => {
    expect(progressionHint(last(8, 7, 8), 3, '6–8')).toBeNull()
    expect(progressionHint(last(19, 20, 20, 20), 4, '12–20')).toBeNull()
  })

  it('stays hidden when fewer sets were logged than are planned', () => {
    expect(progressionHint(last(8, 8), 3, '6–8')).toBeNull()
  })

  it('stays hidden when a set has no reps', () => {
    expect(progressionHint(last(8, null, 8), 3, '6–8')).toBeNull()
  })

  it('stays hidden with no previous log', () => {
    expect(progressionHint(null, 3, '6–8')).toBeNull()
  })
})
