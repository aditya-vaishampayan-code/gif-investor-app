import { STARTUPS } from '../data/startups'

const USER_KEY = 'gif_user'
const RATINGS_KEY = 'gif_ratings'

const read = (key, fallback) => {
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) : fallback
}

export function login({ name, email }) {
  if (!name?.trim() || !email?.trim()) throw new Error('name and email required')
  const user = { name: name.trim(), email: email.trim(), loginAt: new Date().toISOString() }
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return user
}

export const getUser = () => read(USER_KEY, null)
export const logout = () => localStorage.removeItem(USER_KEY)

export function saveRating(startupId, score) {
  if (!Number.isInteger(score) || score < 1 || score > 10) throw new Error('score must be 1-10')
  const ratings = read(RATINGS_KEY, {})
  if (ratings[startupId]) throw new Error('rating already locked')
  ratings[startupId] = { score, lockedAt: new Date().toISOString() }
  localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings))
  return ratings[startupId]
}

export const getRatings = () => read(RATINGS_KEY, {})
export const getRating = (startupId) => getRatings()[startupId] ?? null

export function getAggregates() {
  const ratings = getRatings()
  return STARTUPS.map(({ id, name, seed }) => {
    const mine = ratings[id]
    if (!mine) return { id, name, avgScore: seed.avgScore, raterCount: seed.raterCount }
    const raterCount = seed.raterCount + 1
    const avgScore = Math.round(((seed.avgScore * seed.raterCount + mine.score) / raterCount) * 10) / 10
    return { id, name, avgScore, raterCount }
  })
}
