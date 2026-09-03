import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('./firebase', () => ({
  auth: null,
  db: null,
  isFirebaseConfigured: false,
}))

import { login, register, getUser, logout, saveRating, getRatings, getRating, getAggregates } from './dataService'
import { STARTUPS } from '../data/startups'

beforeEach(() => localStorage.clear())

describe('auth (mock capture)', () => {
  it('stores registration details and loginAt', async () => {
    const u = await register({ name: 'Sid', company: 'Acme Ventures', email: 'sid@example.com', password: 'secret1' })
    expect(u.name).toBe('Sid')
    expect(u.company).toBe('Acme Ventures')
    expect(getUser().email).toBe('sid@example.com')
    expect(getUser().company).toBe('Acme Ventures')
    expect(new Date(getUser().loginAt).getTime()).not.toBeNaN()
  })
  it('rejects empty credentials', async () => {
    await expect(register({ name: '', company: 'Acme', email: 'x@y.z', password: 'secret1' })).rejects.toThrow('Name and company are required.')
    await expect(login({ email: 'x@y.z', password: '' })).rejects.toThrow('Password must be at least 6 characters.')
  })
  it('logout clears user', async () => {
    await register({ name: 'Sid', company: 'Acme', email: 'sid@example.com', password: 'secret1' })
    await logout()
    expect(getUser()).toBeNull()
  })
})

describe('ratings', () => {
  it('saves and reads a rating', async () => {
    await saveRating('biddano', 8)
    expect(getRating('biddano').score).toBe(8)
    expect(getRatings().biddano.score).toBe(8)
  })
  it('locks ratings permanently', async () => {
    await saveRating('biddano', 8)
    await expect(saveRating('biddano', 3)).rejects.toThrow('rating already locked')
    expect(getRating('biddano').score).toBe(8)
  })
  it('validates score range', async () => {
    await expect(saveRating('biddano', 0)).rejects.toThrow('score must be 1-10')
    await expect(saveRating('biddano', 11)).rejects.toThrow('score must be 1-10')
    await expect(saveRating('biddano', 5.5)).rejects.toThrow('score must be 1-10')
  })
})

describe('aggregates', () => {
  it('returns seed values when user has not rated', () => {
    const zing = getAggregates().find((a) => a.id === 'biddano')
    const seed = STARTUPS.find((s) => s.id === 'biddano').seed
    expect(zing.avgScore).toBe(seed.avgScore)
    expect(zing.raterCount).toBe(seed.raterCount)
  })
  it('blends the local rating into the aggregate', async () => {
    const seed = STARTUPS.find((s) => s.id === 'biddano').seed
    await saveRating('biddano', 10)
    const zing = getAggregates().find((a) => a.id === 'biddano')
    expect(zing.raterCount).toBe(seed.raterCount + 1)
    const expected = Math.round(((seed.avgScore * seed.raterCount + 10) / (seed.raterCount + 1)) * 10) / 10
    expect(zing.avgScore).toBe(expected)
  })
})
