import { addDays, parseYmd } from './dates'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

/** "Thu" */
export function weekdayShort(ymd: string): string {
  return WEEKDAYS[parseYmd(ymd).getDay()] ?? ''
}

/** "Nov 9" */
export function shortDate(ymd: string): string {
  const date = parseYmd(ymd)
  return `${MONTHS[date.getMonth()] ?? ''} ${String(date.getDate())}`
}

/** "Thu, Nov 26" */
export function dayLabel(ymd: string): string {
  return `${weekdayShort(ymd)}, ${shortDate(ymd)}`
}

/** "Today", "Yesterday" or "Tomorrow" relative to `today`, otherwise null. */
export function relativeDay(ymd: string, today: string): string | null {
  if (ymd === today) return 'Today'
  if (ymd === addDays(today, -1)) return 'Yesterday'
  if (ymd === addDays(today, 1)) return 'Tomorrow'
  return null
}
