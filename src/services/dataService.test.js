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
    saveRating('medloop', 8)
    expect(getRating('medloop').score).toBe(8)
    expect(getRatings().medloop.score).toBe(8)
  })
  it('locks ratings permanently', () => {
    saveRating('medloop', 8)
    expect(() => saveRating('medloop', 3)).toThrow('rating already locked')
    expect(getRating('medloop').score).toBe(8)
  })
  it('validates score range', () => {
    expect(() => saveRating('medloop', 0)).toThrow('score must be 1-10')
    expect(() => saveRating('medloop', 11)).toThrow('score must be 1-10')
    expect(() => saveRating('medloop', 5.5)).toThrow('score must be 1-10')
  })
})

describe('aggregates', () => {
  it('returns seed values when user has not rated', () => {
    const med = getAggregates().find((a) => a.id === 'medloop')
    const seed = STARTUPS.find((s) => s.id === 'medloop').seed
    expect(med.avgScore).toBe(seed.avgScore)
    expect(med.raterCount).toBe(seed.raterCount)
  })
  it('blends the local rating into the aggregate', () => {
    const seed = STARTUPS.find((s) => s.id === 'medloop').seed
    saveRating('medloop', 10)
    const med = getAggregates().find((a) => a.id === 'medloop')
    expect(med.raterCount).toBe(seed.raterCount + 1)
    const expected = Math.round(((seed.avgScore * seed.raterCount + 10) / (seed.raterCount + 1)) * 10) / 10
    expect(med.avgScore).toBe(expected)
  })
})
