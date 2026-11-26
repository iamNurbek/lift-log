import { addDays, weekdayOf } from './dates'

/** Monday of the week containing `ymd`. Weeks run Monday to Sunday. */
export function mondayOf(ymd: string): string {
  const daysSinceMonday = (weekdayOf(ymd) + 6) % 7
  return addDays(ymd, -daysSinceMonday)
}

/** The seven dates, Monday first, of the week containing `ymd`. */
export function weekDates(ymd: string): string[] {
  const monday = mondayOf(ymd)
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i))
}
