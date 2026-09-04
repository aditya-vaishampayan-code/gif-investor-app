import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Frame from '../components/Frame'
import { decideMeetingRequest, getMeetingRequests, subscribeMeetingRequests } from '../services/dataService'

const STATUS_ORDER = { pending: 0, approved: 1, declined: 2 }

function fmtWhen(r) {
  return `${r.dayLabel} · ${r.timeLabel}`
}

function StatusBadge({ status }) {
  const map = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    declined: 'bg-red-50 text-red-600 border-red-200',
  }
  return (
    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${map[status]}`} style={{ letterSpacing: '0.04em' }}>
      {status}
    </span>
  )
}

export default function Approvals() {
  const [requests, setRequests] = useState(() => getMeetingRequests())
  const [busyId, setBusyId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const unsubscribe = subscribeMeetingRequests((data) => {
      if (Array.isArray(data)) setRequests(data)
    })
    return () => unsubscribe()
  }, [])

  const rows = useMemo(
    () =>
      [...requests].sort(
        (a, b) =>
          (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9) ||
          a.startsAt.localeCompare(b.startsAt)
      ),
    [requests]
  )
  const pendingCount = requests.filter((r) => r.status === 'pending').length

  const decide = async (id, decision) => {
    setBusyId(id)
    setError('')
    try {
      const updated = await decideMeetingRequest(id, decision)
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)))
    } catch (err) {
      setError(err.message || 'Could not update the request.')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <Frame wide>
      <div className="px-10 py-8 border-b border-ink/8" style={{ background: 'rgba(255,255,255,0.82)' }}>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] font-semibold text-ink/35 uppercase mb-2.5" style={{ letterSpacing: '0.18em' }}>
              Global Impact Forum II · VC Team
            </p>
            <h1 className="font-display text-[32px] font-bold text-ink leading-none" style={{ letterSpacing: '-0.02em' }}>
              Meeting Requests
            </h1>
            <p className="text-[13px] text-ink/40 mt-2">
              Approve or decline attendee requests for 1-on-1s with the five deal-making startups.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="font-display text-[28px] font-bold text-orange">{pendingCount}</p>
            <p className="text-xs text-ink/35" style={{ letterSpacing: '0.06em' }}>PENDING</p>
            <Link to="/admin" className="text-[11px] font-semibold text-orange mt-1">← Leaderboard</Link>
          </div>
        </div>
      </div>

      {error && (
        <div className="mx-10 mt-4 text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
      )}

      <div className="px-10 pt-3 pb-14">
        {rows.length === 0 && (
          <p className="text-[13px] text-ink/40 py-10 text-center">No meeting requests yet.</p>
        )}

        {rows.map((r) => (
          <div key={r.id} className="flex items-start gap-5 py-4 border-b border-ink/7">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <p className="text-[15px] font-semibold text-ink">{r.attendeeName || 'Attendee'}</p>
                {r.attendeeCompany && <span className="text-[12px] text-ink/45">· {r.attendeeCompany}</span>}
                <StatusBadge status={r.status} />
              </div>
              <p className="text-[13px] text-ink/70">
                wants <span className="font-semibold text-ink">{r.founderName}</span> ({r.startupName})
              </p>
              <p className="text-[12px] text-ink/45 mt-0.5">{fmtWhen(r)}</p>
              {r.note && <p className="text-[12px] text-ink/55 italic mt-1.5">“{r.note}”</p>}
              {r.attendeeEmail && <p className="text-[11px] text-ink/35 mt-1">{r.attendeeEmail}</p>}
            </div>

            {r.status === 'pending' && (
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => decide(r.id, 'approved')}
                  disabled={busyId === r.id}
                  className="text-[12px] font-bold text-white bg-emerald-600 px-4 py-1.5 rounded-full border-none cursor-pointer disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  onClick={() => decide(r.id, 'declined')}
                  disabled={busyId === r.id}
                  className="text-[12px] font-bold text-red-600 bg-red-50 border border-red-200 px-4 py-1.5 rounded-full cursor-pointer disabled:opacity-50"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Frame>
  )
}
