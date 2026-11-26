import { describe, expect, it } from 'vitest'
import { dayLabel, relativeDay, shortDate, weekdayShort } from './format'

describe('date labels', () => {
  it('formats short dates without leading zeros', () => {
    expect(shortDate('2026-11-09')).toBe('Nov 9')
    expect(shortDate('2027-01-01')).toBe('Jan 1')
  })

  it('formats the weekday and the day header label', () => {
    expect(weekdayShort('2026-11-26')).toBe('Thu')
    expect(dayLabel('2026-11-26')).toBe('Thu, Nov 26')
  })
})

describe('relativeDay', () => {
  const today = '2027-01-01'

  it('names today and its neighbors, across a year boundary', () => {
    expect(relativeDay('2027-01-01', today)).toBe('Today')
    expect(relativeDay('2026-12-31', today)).toBe('Yesterday')
    expect(relativeDay('2027-01-02', today)).toBe('Tomorrow')
  })

  it('returns null for any other day', () => {
    expect(relativeDay('2026-12-30', today)).toBeNull()
  })
})
