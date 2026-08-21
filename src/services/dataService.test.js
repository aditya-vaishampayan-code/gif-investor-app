import { beforeEach, describe, expect, it } from 'vitest'
import { login, getUser, logout, saveRating, getRatings, getRating, getAggregates } from './dataService'
import { STARTUPS } from '../data/startups'

beforeEach(() => localStorage.clear())

describe('auth (mock FPD capture)', () => {
  it('stores name, email and loginAt on login', () => {
    const u = login({ name: 'Sid', email: 'sid@example.com' })
    expect(u.name).toBe('Sid')
    expect(getUser().email).toBe('sid@example.com')
    expect(new Date(getUser().loginAt).getTime()).not.toBeNaN()
  })
  it('rejects empty credentials', () => {
    expect(() => login({ name: '', email: 'x@y.z' })).toThrow('name and email required')
  })
  it('logout clears user', () => {
    login({ name: 'Sid', email: 'sid@example.com' })
    logout()
    expect(getUser()).toBeNull()
  })
})

describe('ratings', () => {
  it('saves and reads a rating', () => {
    saveRating('zingbus', 8)
    expect(getRating('zingbus').score).toBe(8)
    expect(getRatings().zingbus.score).toBe(8)
  })
  it('locks ratings permanently', () => {
    saveRating('zingbus', 8)
    expect(() => saveRating('zingbus', 3)).toThrow('rating already locked')
    expect(getRating('zingbus').score).toBe(8)
  })
  it('validates score range', () => {
    expect(() => saveRating('zingbus', 0)).toThrow('score must be 1-10')
    expect(() => saveRating('zingbus', 11)).toThrow('score must be 1-10')
    expect(() => saveRating('zingbus', 5.5)).toThrow('score must be 1-10')
  })
})

describe('aggregates', () => {
  it('returns seed values when user has not rated', () => {
    const zing = getAggregates().find((a) => a.id === 'zingbus')
    const seed = STARTUPS.find((s) => s.id === 'zingbus').seed
    expect(zing.avgScore).toBe(seed.avgScore)
    expect(zing.raterCount).toBe(seed.raterCount)
  })
  it('blends the local rating into the aggregate', () => {
    const seed = STARTUPS.find((s) => s.id === 'zingbus').seed
    saveRating('zingbus', 10)
    const zing = getAggregates().find((a) => a.id === 'zingbus')
    expect(zing.raterCount).toBe(seed.raterCount + 1)
    const expected = Math.round(((seed.avgScore * seed.raterCount + 10) / (seed.raterCount + 1)) * 10) / 10
    expect(zing.avgScore).toBe(expected)
  })
})
