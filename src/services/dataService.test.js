import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('./firebase', () => ({
  auth: null,
  db: null,
  isFirebaseConfigured: false,
}))

import { login, register, getUser, logout, saveRating, getRatings, getRating, getAggregates, fetchAllRatings, ratingsToCsv } from './dataService'
import { INNOVATOR_STARTUPS } from '../data/startups'

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
    await saveRating('cautio', 8)
    expect(getRating('cautio').score).toBe(8)
    expect(getRatings().cautio.score).toBe(8)
  })
  it('locks ratings permanently', async () => {
    await saveRating('cautio', 8)
    await expect(saveRating('cautio', 3)).rejects.toThrow('rating already locked')
    expect(getRating('cautio').score).toBe(8)
  })
  it('validates score range', async () => {
    await expect(saveRating('cautio', 0)).rejects.toThrow('score must be 1-10')
    await expect(saveRating('cautio', 11)).rejects.toThrow('score must be 1-10')
    await expect(saveRating('cautio', 5.5)).rejects.toThrow('score must be 1-10')
  })
})

describe('ratings export', () => {
  it('returns flat rows with rater identity and startup name', async () => {
    await register({ name: 'Sid', company: 'Acme Ventures', email: 'sid@example.com', password: 'secret1' })
    await saveRating('cautio', 8)
    const rows = await fetchAllRatings()
    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({
      startupId: 'cautio',
      startupName: 'Cautio',
      userName: 'Sid',
      userCompany: 'Acme Ventures',
      score: 8,
    })
    expect(new Date(rows[0].lockedAt).getTime()).not.toBeNaN()
  })
  it('serialises rows to CSV with a header and escaping', () => {
    const csv = ratingsToCsv([
      { startupName: 'Cautio', userName: 'Sid, Jr.', userCompany: 'Acme', userId: 'sid@example.com', score: 8, lockedAt: '2026-09-04T00:00:00.000Z' },
    ])
    const [header, row] = csv.split('\r\n')
    expect(header).toBe('Innovator,Rater,Company,Rater ID,Score,Locked at')
    expect(row).toBe('Cautio,"Sid, Jr.",Acme,sid@example.com,8,2026-09-04T00:00:00.000Z')
  })
})

describe('aggregates', () => {
  it('returns seed values when user has not rated', () => {
    const zing = getAggregates().find((a) => a.id === 'cautio')
    const seed = INNOVATOR_STARTUPS.find((s) => s.id === 'cautio').seed
    expect(zing.avgScore).toBe(seed.avgScore)
    expect(zing.raterCount).toBe(seed.raterCount)
  })
  it('blends the local rating into the aggregate', async () => {
    const seed = INNOVATOR_STARTUPS.find((s) => s.id === 'cautio').seed
    await saveRating('cautio', 10)
    const zing = getAggregates().find((a) => a.id === 'cautio')
    expect(zing.raterCount).toBe(seed.raterCount + 1)
    const expected = Math.round(((seed.avgScore * seed.raterCount + 10) / (seed.raterCount + 1)) * 10) / 10
    expect(zing.avgScore).toBe(expected)
  })
})
