import { describe, expect, it } from 'vitest'
import { addDays, parseYmd, toYmd, weekdayOf } from './dates'

describe('toYmd', () => {
  it('keeps 11:30 pm on the same local day', () => {
    const lateNight = new Date(2026, 10, 25, 23, 30)
    // Proves the test runs in New York time, where the UTC shortcut is wrong.
    expect(lateNight.toISOString().slice(0, 10)).toBe('2026-11-26')
    expect(toYmd(lateNight)).toBe('2026-11-25')
  })

  it('pads single-digit months and days', () => {
    expect(toYmd(new Date(2027, 0, 5))).toBe('2027-01-05')
  })
})

describe('parseYmd', () => {
  it('round trips with toYmd', () => {
    expect(toYmd(parseYmd('2026-03-08'))).toBe('2026-03-08')
  })

  it.each(['2026-02-31', '2026-13-01', '26-1-5', 'abc', ''])(
    'rejects %j',
    (input) => {
      expect(() => parseYmd(input)).toThrow(RangeError)
    },
  )
})

describe('addDays', () => {
  it('crosses month and year boundaries', () => {
    expect(addDays('2026-11-30', 1)).toBe('2026-12-01')
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01')
    expect(addDays('2027-01-01', -1)).toBe('2026-12-31')
  })

  it('is not thrown off by daylight saving changes', () => {
    expect(addDays('2026-03-07', 1)).toBe('2026-03-08')
    expect(addDays('2026-03-08', 1)).toBe('2026-03-09')
    expect(addDays('2026-11-01', 1)).toBe('2026-11-02')
  })
})

describe('weekdayOf', () => {
  it('returns the Date#getDay() weekday', () => {
    expect(weekdayOf('2026-11-26')).toBe(4)
    expect(weekdayOf('2026-11-29')).toBe(0)
  })
})
