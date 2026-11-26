import { describe, expect, it } from 'vitest'
import type { SessionType } from '../domain/types'
import { SESSION_ORDER, SESSIONS, WEEKLY_PLAN } from './templates'

describe('workout templates', () => {
  it('lists every session type exactly once in chip order', () => {
    expect([...SESSION_ORDER].sort()).toEqual(Object.keys(SESSIONS).sort())
  })

  it('plans a session for all seven weekdays, starting the week on Monday', () => {
    const week = ([1, 2, 3, 4, 5, 6, 0] as const).map((d) => WEEKLY_PLAN[d])
    expect(week).toEqual<SessionType[]>([
      'cb-a',
      'sh-a',
      'legs',
      'rest',
      'cb-b',
      'sh-b',
      'rest',
    ])
  })

  it('keeps cardio and rest free of template exercises', () => {
    expect(SESSIONS.cardio.exercises).toHaveLength(0)
    expect(SESSIONS.rest.exercises).toHaveLength(0)
  })

  it('gives every exercise a positive set count and a rep target ending in a number', () => {
    for (const session of Object.values(SESSIONS)) {
      for (const e of session.exercises) {
        expect(e.name.trim()).not.toBe('')
        expect(e.sets).toBeGreaterThan(0)
        expect(e.target).toMatch(/^\d+(–\d+)?$/)
      }
    }
  })
})
