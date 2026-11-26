import type { Weekday } from './types'

const YMD = /^(\d{4})-(\d{2})-(\d{2})$/

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Local calendar date as YYYY-MM-DD.
 * Built from local getters on purpose: toISOString() is UTC, so in New York
 * it returns tomorrow's date for any time after 7 pm.
 */
export function toYmd(date: Date): string {
  return `${String(date.getFullYear())}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function todayYmd(): string {
  return toYmd(new Date())
}

/** Parses YYYY-MM-DD as local midnight. Throws on malformed or impossible dates. */
export function parseYmd(ymd: string): Date {
  const match = YMD.exec(ymd)
  const date = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : null
  // Round trip catches dates like 2026-02-31, which Date would roll into March.
  if (!date || toYmd(date) !== ymd) {
    throw new RangeError(`Invalid date: ${ymd}`)
  }
  return date
}

export function addDays(ymd: string, days: number): string {
  const date = parseYmd(ymd)
  date.setDate(date.getDate() + days)
  return toYmd(date)
}

export function weekdayOf(ymd: string): Weekday {
  return parseYmd(ymd).getDay() as Weekday
}
