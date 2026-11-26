import { describe, expect, it } from 'vitest'
import { parseNumber } from './parse'

describe('parseNumber', () => {
  it.each([
    ['72.5', 72.5],
    ['72,5', 72.5],
    ['8', 8],
    ['  135 ', 135],
    ['0', 0],
  ])('parses %j as %d', (input, expected) => {
    expect(parseNumber(input)).toBe(expected)
  })

  it.each(['', '   ', 'abc', '7 2', '1,2,3', 'Infinity', '-5'])(
    'returns null for %j',
    (input) => {
      expect(parseNumber(input)).toBeNull()
    },
  )
})
