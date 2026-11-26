/**
 * Turns a weight or reps input into a number, or null when it is empty or not
 * a usable number. Accepts a comma as the decimal separator ("72,5").
 * Never returns NaN, Infinity or a negative value.
 */
export function parseNumber(input: string): number | null {
  const text = input.trim().replace(',', '.')
  if (text === '') return null
  const value = Number(text)
  return Number.isFinite(value) && value >= 0 ? value : null
}
