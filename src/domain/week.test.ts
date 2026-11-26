import { describe, expect, it } from 'vitest'
import { mondayOf, weekDates } from './week'

describe('mondayOf', () => {
  it('starts the week on Monday', () => {
    expect(mondayOf('2026-11-23')).toBe('2026-11-23') // Monday
    expect(mondayOf('2026-11-26')).toBe('2026-11-23') // Thursday
    expect(mondayOf('2026-11-29')).toBe('2026-11-23') // Sunday, not the next week
  })
})

describe('weekDates', () => {
  it('returns Monday to Sunday across a month boundary', () => {
    expect(weekDates('2026-12-02')).toEqual([
      '2026-11-30',
      '2026-12-01',
      '2026-12-02',
      '2026-12-03',
      '2026-12-04',
      '2026-12-05',
      '2026-12-06',
    ])
  })

  it('spans the new year', () => {
    const week = weekDates('2027-01-01')
    expect(week[0]).toBe('2026-12-28')
    expect(week[6]).toBe('2027-01-03')
  })
})
