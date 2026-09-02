import { STARTUPS } from '../data/startups'
import { auth, db, isFirebaseConfigured } from './firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { doc, setDoc, getDoc, collection, onSnapshot } from 'firebase/firestore'

const USER_KEY = 'gif_user'
const RATINGS_KEY = 'gif_ratings'

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const validateCredentials = (email, password) => {
  if (!email?.trim()) throw new Error('Email is required.')
  if (!password?.trim() || password.trim().length < 6) {
    throw new Error('Password must be at least 6 characters.')
  }
}

const blendSeed = (seed, scores) => {
  if (scores.length === 0) return { avgScore: seed.avgScore, raterCount: seed.raterCount }
  const sum = scores.reduce((acc, val) => acc + val, 0)
  const raterCount = seed.raterCount + scores.length
  const avgScore = Math.round(((seed.avgScore * seed.raterCount + sum) / raterCount) * 10) / 10
  return { avgScore, raterCount }
}

const firebaseError = (err, fallback) => {
  if (err.code === 'auth/email-already-in-use') return new Error('An account already exists for this email. Please log in.')
  if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
    return new Error('Incorrect email or password.')
  }
  if (err.code === 'auth/user-not-found') return new Error('No account found for this email. Please register first.')
  if (err.code === 'auth/invalid-email') return new Error('Please enter a valid email address.')
  return new Error(err.message || fallback)
}

export async function register({ name, company = '', email, password = '' }) {
  if (!name?.trim() || !company?.trim()) throw new Error('Name and company are required.')
  validateCredentials(email, password)

  const cleanName = name.trim()
  const cleanCompany = company.trim()
  const cleanEmail = email.trim().toLowerCase()
  const cleanPassword = password.trim()

  if (isFirebaseConfigured && auth) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword)
      const userData = { uid: userCredential.user.uid, name: cleanName, company: cleanCompany, email: cleanEmail, loginAt: new Date().toISOString() }
      await saveProfile(userData)
      localStorage.setItem(USER_KEY, JSON.stringify(userData))
      return userData
    } catch (err) {
      throw firebaseError(err, 'Registration failed.')
    }
  }

  if (getUser()?.email === cleanEmail) {
    throw new Error('An account already exists for this email. Please log in.')
  }
  const userData = { name: cleanName, company: cleanCompany, email: cleanEmail, loginAt: new Date().toISOString() }
  localStorage.setItem(USER_KEY, JSON.stringify(userData))
  return userData
}

async function saveProfile(user) {
  if (!db || !user.uid) return
  try {
    await setDoc(doc(db, 'users', user.uid), { ...user, updatedAt: new Date().toISOString() }, { merge: true })
  } catch (err) {
    console.warn('Failed to write user profile to Firestore:', err)
  }
}

export async function login({ email, password = '' }) {
  validateCredentials(email, password)
  const cleanEmail = email.trim().toLowerCase()
  const cleanPassword = password.trim()

  if (isFirebaseConfigured && auth) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword)
      const firebaseUser = userCredential.user
      let profile = {}
      try {
        if (db) {
          const profileSnapshot = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (profileSnapshot.exists()) profile = profileSnapshot.data()
        }
      } catch (err) {
        console.warn('Failed to load user profile from Firestore:', err)
      }
      const userData = { ...profile, uid: firebaseUser.uid, email: cleanEmail, loginAt: new Date().toISOString() }
      localStorage.setItem(USER_KEY, JSON.stringify(userData))
      return userData
    } catch (err) {
      throw firebaseError(err, 'Login failed.')
    }
  }

  const existingUser = getUser()
  if (!existingUser || existingUser.email !== cleanEmail) {
    throw new Error('No account found for this email. Please register first.')
  }
  const userData = { ...existingUser, loginAt: new Date().toISOString() }
  localStorage.setItem(USER_KEY, JSON.stringify(userData))
  return userData
}

export const getUser = () => read(USER_KEY, null)

export async function logout() {
  localStorage.removeItem(USER_KEY)
  if (isFirebaseConfigured && auth) {
    try {
      await firebaseSignOut(auth)
    } catch (err) {
      console.warn('Firebase signout error:', err)
    }
  }
}

export async function updateUser({ name, company, email }) {
  const user = getUser()
  if (!user) throw new Error('not logged in')

  const updated = {
    ...user,
    name: name !== undefined ? name.trim() : user.name,
    company: company !== undefined ? company.trim() : user.company || '',
    email: email !== undefined ? email.trim().toLowerCase() : user.email,
  }

  localStorage.setItem(USER_KEY, JSON.stringify(updated))

  if (isFirebaseConfigured) await saveProfile(updated)

  return updated
}

export async function saveRating(startupId, score) {
  if (!Number.isInteger(score) || score < 1 || score > 10) {
    throw new Error('score must be 1-10')
  }
  const ratings = read(RATINGS_KEY, {})
  if (ratings[startupId]) {
    throw new Error('rating already locked')
  }

  const ratingObj = { score, lockedAt: new Date().toISOString() }
  ratings[startupId] = ratingObj
  localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings))

  const user = getUser()
  if (isFirebaseConfigured && db && user) {
    const docId = `${user.uid || user.email}_${startupId}`
    try {
      await setDoc(
        doc(db, 'ratings', docId),
        {
          docId,
          userId: user.uid || user.email,
          userName: user.name,
          userCompany: user.company || '',
          startupId,
          score,
          lockedAt: ratingObj.lockedAt,
        },
        { merge: true }
      )
    } catch (err) {
      console.warn('Firestore rating save failed, local copy retained:', err)
    }
  }

  return ratingObj
}

export const getRatings = () => read(RATINGS_KEY, {})
export const getRating = (startupId) => getRatings()[startupId] ?? null

export function getAggregates() {
  const ratings = getRatings()
  return STARTUPS.map(({ id, name, seed }) => {
    const mine = ratings[id]
    return { id, name, ...blendSeed(seed, mine ? [mine.score] : []) }
  })
}

export function subscribeLeaderboard(onUpdate) {
  const fallback = () => onUpdate(getAggregates())

  if (!isFirebaseConfigured || !db) {
    fallback()
    return () => {}
  }

  try {
    return onSnapshot(
      collection(db, 'ratings'),
      (snapshot) => {
        const remoteRatingsByStartup = {}
        snapshot.forEach((docSnap) => {
          const data = docSnap.data()
          if (data.startupId && typeof data.score === 'number') {
            if (!remoteRatingsByStartup[data.startupId]) remoteRatingsByStartup[data.startupId] = []
            remoteRatingsByStartup[data.startupId].push(data.score)
          }
        })

        onUpdate(
          STARTUPS.map(({ id, name, seed }) => {
            const liveScores = remoteRatingsByStartup[id] || []
            const mine = getRating(id)
            const scores = liveScores.length > 0 ? liveScores : mine ? [mine.score] : []
            return { id, name, ...blendSeed(seed, scores) }
          })
        )
      },
      (error) => {
        console.warn('Leaderboard subscription error, falling back to local:', error)
        fallback()
      }
    )
  } catch (err) {
    console.warn('Failed to setup leaderboard listener:', err)
    fallback()
    return () => {}
  }
}
