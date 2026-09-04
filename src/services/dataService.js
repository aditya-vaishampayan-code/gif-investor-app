import { INNOVATOR_STARTUPS } from '../data/startups'
import { MEETINGS_DATA } from '../data/meetings'
import { overlaps } from '../data/availability'
import { auth, db, isFirebaseConfigured } from './firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { doc, setDoc, getDoc, collection, onSnapshot } from 'firebase/firestore'

const USER_KEY = 'gif_user'
const RATINGS_KEY = 'gif_ratings'
const REQUESTS_KEY = 'gif_meeting_requests'

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
  return INNOVATOR_STARTUPS.map(({ id, name, seed }) => {
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
          INNOVATOR_STARTUPS.map(({ id, name, seed }) => {
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

/* ------------------------------------------------------------------ *
 * Meeting requests — attendees request a 1-on-1 with one of the five
 * Meetings-page startups' founders; the VC team approves at /approvals.
 * ------------------------------------------------------------------ */

const makeId = () =>
  globalThis.crypto?.randomUUID?.() ?? `req-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

export const getMeetingRequests = () =>
  read(REQUESTS_KEY, []).filter((r) => r.status !== 'withdrawn')

export function getMyMeetingRequests(user = getUser()) {
  if (!user) return []
  const email = user.email?.toLowerCase()
  const name = user.name?.toLowerCase()
  return getMeetingRequests().filter((r) => {
    const rEmail = r.attendeeEmail?.toLowerCase()
    const rName = r.attendeeName?.toLowerCase()
    return (email && rEmail === email) || (name && rName === name)
  })
}

// Intervals that consume a founder's time: the fixed schedule + approved requests.
function bookingsForFounder(founderName) {
  const scheduled = MEETINGS_DATA
    .filter((m) => m.partnerName === founderName)
    .map((m) => ({ startsAt: m.startsAt, endsAt: m.endsAt }))
  const approved = getMeetingRequests()
    .filter((r) => r.founderName === founderName && r.status === 'approved')
    .map((r) => ({ startsAt: r.startsAt, endsAt: r.endsAt }))
  return [...scheduled, ...approved]
}

export function isSlotFree(founderName, startsAt, endsAt) {
  return !bookingsForFounder(founderName).some((b) =>
    overlaps(startsAt, endsAt, b.startsAt, b.endsAt)
  )
}

function persistRequests(requests) {
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests))
}

async function mirrorRequest(request) {
  if (!isFirebaseConfigured || !db) return
  try {
    await setDoc(
      doc(db, 'meetingRequests', request.id),
      { ...request, updatedAt: new Date().toISOString() },
      { merge: true }
    )
  } catch (err) {
    console.warn('Firestore meeting-request save failed, local copy retained:', err)
  }
}

export async function createMeetingRequest(input) {
  const user = getUser()
  if (!user) throw new Error('You must be logged in to request a meeting.')

  const {
    startupId, startupName, founderName, founderRole,
    dayId, dayLabel, startsAt, endsAt, timeLabel, note = '',
  } = input

  if (!startupId || !founderName || !startsAt || !endsAt) {
    throw new Error('Pick a startup, a founder and a time slot.')
  }
  if (!isSlotFree(founderName, startsAt, endsAt)) {
    throw new Error('That slot was just booked — pick another.')
  }

  const requests = read(REQUESTS_KEY, [])
  const dupe = requests.some(
    (r) =>
      r.founderName === founderName &&
      r.startsAt === startsAt &&
      r.attendeeEmail === (user.email || '') &&
      (r.status === 'pending' || r.status === 'approved')
  )
  if (dupe) throw new Error('You already have a request for that slot.')

  const request = {
    id: makeId(),
    startupId,
    startupName,
    founderName,
    founderRole: founderRole || 'Founder',
    dayId,
    dayLabel,
    startsAt,
    endsAt,
    timeLabel,
    attendeeName: user.name,
    attendeeEmail: user.email || '',
    attendeeCompany: user.company || '',
    note: note.trim(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    decidedAt: null,
    decidedBy: null,
  }

  requests.push(request)
  persistRequests(requests)
  await mirrorRequest(request)
  return request
}

export async function decideMeetingRequest(id, decision) {
  if (decision !== 'approved' && decision !== 'declined') {
    throw new Error('Decision must be "approved" or "declined".')
  }
  const requests = read(REQUESTS_KEY, [])
  const req = requests.find((r) => r.id === id)
  if (!req) throw new Error('Request not found.')
  if (req.status !== 'pending') throw new Error('This request has already been decided.')
  if (decision === 'approved' && !isSlotFree(req.founderName, req.startsAt, req.endsAt)) {
    throw new Error(`${req.founderName} is no longer free at that time.`)
  }

  req.status = decision
  req.decidedAt = new Date().toISOString()
  req.decidedBy = 'VC Team'
  persistRequests(requests)
  await mirrorRequest(req)
  return req
}

export async function withdrawMeetingRequest(id) {
  const requests = read(REQUESTS_KEY, [])
  const req = requests.find((r) => r.id === id)
  if (!req) throw new Error('Request not found.')
  if (req.status !== 'pending') throw new Error('Only pending requests can be withdrawn.')
  req.status = 'withdrawn'
  req.decidedAt = new Date().toISOString()
  persistRequests(requests)
  await mirrorRequest(req)
  return req
}

// Approved requests, shaped like MEETINGS_DATA rows so they drop straight into
// the attendee's confirmed schedule and the notification bell.
export function approvedRequestsAsMeetings(user = getUser()) {
  return getMyMeetingRequests(user)
    .filter((r) => r.status === 'approved')
    .map((r) => ({
      id: r.id,
      userEmail: r.attendeeEmail,
      userName: r.attendeeName,
      title: `1-on-1 with ${r.startupName}`,
      partnerName: r.founderName,
      partnerRole: `${r.founderRole}, ${r.startupName}`,
      partnerCompany: r.startupName,
      time: r.timeLabel,
      dayLabel: r.dayLabel,
      startsAt: r.startsAt,
      endsAt: r.endsAt,
      location: 'VIP Deal Making — Gateway Room',
      status: 'Confirmed',
      notes: r.note,
    }))
}

export function subscribeMeetingRequests(onUpdate) {
  const fallback = () => onUpdate(getMeetingRequests())

  if (!isFirebaseConfigured || !db) {
    fallback()
    return () => {}
  }

  try {
    return onSnapshot(
      collection(db, 'meetingRequests'),
      (snapshot) => {
        const remote = []
        snapshot.forEach((docSnap) => remote.push(docSnap.data()))
        localStorage.setItem(REQUESTS_KEY, JSON.stringify(remote))
        onUpdate(remote.filter((r) => r.status !== 'withdrawn'))
      },
      (error) => {
        console.warn('Meeting-request subscription error, falling back to local:', error)
        fallback()
      }
    )
  } catch (err) {
    console.warn('Failed to setup meeting-request listener:', err)
    fallback()
    return () => {}
  }
}
