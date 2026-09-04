import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('./firebase', () => ({
  auth: null,
  db: null,
  isFirebaseConfigured: false,
}))

import {
  register,
  createMeetingRequest,
  decideMeetingRequest,
  withdrawMeetingRequest,
  getMeetingRequests,
  getMyMeetingRequests,
  approvedRequestsAsMeetings,
  isSlotFree,
} from './dataService'

// A founder with no pre-existing MEETINGS_DATA booking → wide open.
const OPEN = {
  startupId: 'biddano',
  startupName: 'Biddano',
  founderName: 'Murali Ramanath',
  founderRole: 'Co-Founder, Tech & Product',
  dayId: 'day1',
  dayLabel: 'Day 1 (Sep 4)',
  startsAt: '2026-09-04T10:00:00',
  endsAt: '2026-09-04T10:30:00',
  timeLabel: '10:00 AM – 10:30 AM',
}

beforeEach(async () => {
  localStorage.clear()
  await register({ name: 'Dana', company: 'Northwind Capital', email: 'dana@nw.com', password: 'secret1' })
})

describe('meeting requests', () => {
  it('requires a logged-in user', async () => {
    localStorage.clear()
    await expect(createMeetingRequest(OPEN)).rejects.toThrow('logged in')
  })

  it('creates a pending request', async () => {
    const req = await createMeetingRequest(OPEN)
    expect(req.status).toBe('pending')
    expect(req.attendeeName).toBe('Dana')
    expect(getMeetingRequests()).toHaveLength(1)
    expect(getMyMeetingRequests()).toHaveLength(1)
  })

  it('blocks slots already taken by the fixed schedule', () => {
    // MEETINGS_DATA: Akash Gupta 2026-09-04T11:00–11:30
    expect(isSlotFree('Akash Gupta', '2026-09-04T11:00:00', '2026-09-04T11:30:00')).toBe(false)
    expect(isSlotFree('Akash Gupta', '2026-09-04T12:00:00', '2026-09-04T12:30:00')).toBe(true)
  })

  it('rejects a duplicate request for the same slot', async () => {
    await createMeetingRequest(OPEN)
    await expect(createMeetingRequest(OPEN)).rejects.toThrow('already have a request')
  })

  it('approval books the slot and blocks it for others', async () => {
    const req = await createMeetingRequest(OPEN)
    expect(isSlotFree(OPEN.founderName, OPEN.startsAt, OPEN.endsAt)).toBe(true)

    const approved = await decideMeetingRequest(req.id, 'approved')
    expect(approved.status).toBe('approved')
    expect(approved.decidedBy).toBe('VC Team')
    expect(isSlotFree(OPEN.founderName, OPEN.startsAt, OPEN.endsAt)).toBe(false)
  })

  it('will not decide the same request twice', async () => {
    const req = await createMeetingRequest(OPEN)
    await decideMeetingRequest(req.id, 'approved')
    await expect(decideMeetingRequest(req.id, 'declined')).rejects.toThrow('already been decided')
  })

  it('refuses to approve a request whose slot is now taken', async () => {
    const a = await createMeetingRequest(OPEN)
    await register({ name: 'Eli', company: 'Acme', email: 'eli@acme.com', password: 'secret1' })
    const b = await createMeetingRequest(OPEN)

    await decideMeetingRequest(a.id, 'approved')
    await expect(decideMeetingRequest(b.id, 'approved')).rejects.toThrow('no longer free')
  })

  it('withdrawn requests drop out of the list', async () => {
    const req = await createMeetingRequest(OPEN)
    await withdrawMeetingRequest(req.id)
    expect(getMeetingRequests()).toHaveLength(0)
  })

  it('exposes approved requests shaped like schedule rows', async () => {
    const req = await createMeetingRequest(OPEN)
    await decideMeetingRequest(req.id, 'approved')
    const [meeting] = approvedRequestsAsMeetings()
    expect(meeting.partnerName).toBe('Murali Ramanath')
    expect(meeting.startsAt).toBe(OPEN.startsAt)
    expect(meeting.status).toBe('Confirmed')
  })
})
