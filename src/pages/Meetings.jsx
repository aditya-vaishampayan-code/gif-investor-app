import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Frame from '../components/Frame'
import BottomNav from '../components/BottomNav'
import ProfileSheet from '../components/ProfileSheet'
import VenueMapModal from '../components/VenueMapModal'
import NotificationBell from '../components/NotificationBell'
import Logo from '../components/Logo'
import RequestMeetingSheet from '../components/RequestMeetingSheet'
import {
  getUser,
  getMyMeetingRequests,
  approvedRequestsAsMeetings,
  withdrawMeetingRequest,
  subscribeMeetingRequests,
} from '../services/dataService'
import { getMeetingsForUser } from '../data/meetings'
import { STARTUPS } from '../data/startups'

const REQUEST_BADGE = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  declined: 'bg-red-50 text-red-600 border-red-200',
}

export default function Meetings() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [, setTick] = useState(0)
  const [mapLocation, setMapLocation] = useState(null)
  const [requestOpen, setRequestOpen] = useState(false)
  const [toast, setToast] = useState('')
  const nav = useNavigate()

  const user = getUser()
  const initial = user?.name ? user.name[0].toUpperCase() : '?'
  const refresh = () => setTick((t) => t + 1)

  // Keep in sync when the VC team approves/declines from another device.
  useEffect(() => {
    const unsubscribe = subscribeMeetingRequests(() => setTick((t) => t + 1))
    return () => unsubscribe()
  }, [])

  const meetings = [...getMeetingsForUser(user), ...approvedRequestsAsMeetings(user)]
    .sort((a, b) => String(a.startsAt).localeCompare(String(b.startsAt)))
  const openRequests = getMyMeetingRequests(user).filter(
    (r) => r.status === 'pending' || r.status === 'declined'
  )

  const onRequested = () => {
    setRequestOpen(false)
    setToast('Request sent — the VC team will review it.')
    refresh()
    setTimeout(() => setToast(''), 4000)
  }

  const withdraw = async (id) => {
    try {
      await withdrawMeetingRequest(id)
      refresh()
    } catch {
      /* stale request; refresh will drop it */
      refresh()
    }
  }

  return (
    <Frame className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, #EF4E3D 0%, #6591B0 55%, #4B546B 100%)',
        }}
      />

      <div className="flex-1 flex flex-col pb-[88px]">
        {/* Top bar */}
        <div className="px-5 pt-5 flex justify-between items-start">
          <img src="/logo-lockup-white.png" alt="Global Impact Forum" className="w-[187px] h-[57px]" />
          <div className="flex items-center gap-2">
            <NotificationBell meetings={meetings} />
            <button
              onClick={() => setProfileOpen(true)}
              aria-label="Profile"
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/70 shrink-0 bg-orange text-white font-display text-sm font-bold flex items-center justify-center cursor-pointer"
            >
              {initial}
            </button>
          </div>
        </div>

        {/* Heading */}
        <div className="px-6 pt-5 pb-6 text-center">
          <p className="text-[11px] font-semibold text-white/80 uppercase mb-2" style={{ letterSpacing: '0.14em' }}>
            Global Impact Forum – VIP Deal Making
          </p>
          <h1 className="font-display text-[22px] font-medium text-white mb-2" style={{ lineHeight: 1.15 }}>
            Your Scheduled Meetings
          </h1>
          <p className="text-[12px] text-white/85" style={{ lineHeight: 1.5 }}>
            View your scheduled 1-on-1 investor meetings and deal-making sessions.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex-1 px-5 pb-6">
          <div className="rounded-[20px] p-5" style={{ background: '#EAF9FF' }}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-ink/10">
              <span className="text-[11px] font-bold text-ink/60 uppercase tracking-wider">
                Confirmed Schedule ({meetings.length})
              </span>
              <span className="text-[11px] font-semibold text-orange bg-orange/15 px-2.5 py-0.5 rounded-full">
                {user?.name || 'Attendee'}
              </span>
            </div>

            {meetings.length > 0 ? (
              <div className="flex flex-col gap-4">
                {meetings.map((m) => (
                  <div key={m.id} className="bg-white rounded-2xl p-4 shadow-sm border border-ink/5">
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-orange uppercase tracking-wide">
                        {m.dayLabel} · {m.time}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        {m.status}
                      </span>
                    </div>

                    <h3 className="font-display text-[16px] font-bold text-ink mb-1">{m.title}</h3>

                    <div className="bg-slate-50 p-2.5 rounded-xl my-2.5 border border-ink/5">
                      <div className="text-[10px] font-bold text-ink/40 uppercase mb-0.5">Meeting Partner</div>
                      <div className="text-[13px] font-bold text-ink">{m.partnerName}</div>
                      <div className="text-[11px] text-ink/60">{m.partnerRole}</div>
                    </div>

                    <div className="flex items-center justify-between text-[12px] pt-1">
                      <div className="flex items-center gap-1.5 text-ink/60 truncate">
                        <span>📍 {m.location}</span>
                      </div>
                      <button
                        onClick={() => setMapLocation(m.location)}
                        className="text-[10px] font-bold text-orange bg-orange/10 hover:bg-orange/20 px-2.5 py-1 rounded-full border-none cursor-pointer shrink-0"
                      >
                        View Map
                      </button>
                    </div>

                    {m.notes && (
                      <div className="mt-3 pt-2.5 border-t border-ink/8 text-[11px] text-ink/50 italic">
                        "{m.notes}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Blank state as instructed */
              <div className="py-10 px-4 text-center">
                <div className="w-12 h-12 rounded-full bg-orange/10 text-orange mx-auto flex items-center justify-center text-xl mb-3">
                  📅
                </div>
                <h3 className="font-display text-[16px] font-bold text-ink mb-1">No Meetings Scheduled</h3>
                <p className="text-[12px] text-ink/60 max-w-[240px] mx-auto leading-relaxed">
                  There are currently no 1-on-1 meetings scheduled for <strong className="text-ink">{user?.name || 'your account'}</strong>.
                </p>
                <p className="text-[11px] text-ink/40 mt-4">
                  Visit the VIP Deal Making desk in the Gateway Room for assistance.
                </p>
              </div>
            )}

            <button
              onClick={() => setRequestOpen(true)}
              className="w-full mt-4 bg-orange text-white py-3 font-display font-bold text-[13px] rounded-xl border-none cursor-pointer"
              style={{ letterSpacing: '0.02em' }}
            >
              + Request a meeting
            </button>
          </div>

          {/* Your meeting requests (pending / declined) */}
          {openRequests.length > 0 && (
            <div className="rounded-[20px] p-5 mt-5" style={{ background: '#EAF9FF' }}>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-ink/10">
                <span className="text-[11px] font-bold text-ink/60 uppercase tracking-wider">
                  Your Requests ({openRequests.length})
                </span>
                <span className="text-[11px] font-semibold text-ink/40">Awaiting VC approval</span>
              </div>
              <div className="flex flex-col gap-3">
                {openRequests.map((r) => (
                  <div key={r.id} className="bg-white rounded-2xl p-4 shadow-sm border border-ink/5">
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-orange uppercase tracking-wide">
                        {r.dayLabel} · {r.timeLabel}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${REQUEST_BADGE[r.status]}`} style={{ letterSpacing: '0.04em' }}>
                        {r.status}
                      </span>
                    </div>
                    <h3 className="font-display text-[15px] font-bold text-ink mb-0.5">{r.founderName}</h3>
                    <p className="text-[12px] text-ink/55">{r.founderRole}, {r.startupName}</p>
                    {r.note && (
                      <p className="mt-2 pt-2 border-t border-ink/8 text-[11px] text-ink/50 italic">"{r.note}"</p>
                    )}
                    {r.status === 'pending' && (
                      <button
                        onClick={() => withdraw(r.id)}
                        className="mt-3 text-[11px] font-bold text-ink/50 bg-ink/5 px-3 py-1 rounded-full border-none cursor-pointer"
                      >
                        Withdraw
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Startups you're meeting */}
          <div className="rounded-[20px] p-5 mt-5" style={{ background: '#EAF9FF' }}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-ink/10">
              <span className="text-[11px] font-bold text-ink/60 uppercase tracking-wider">
                Startups ({STARTUPS.length})
              </span>
              <span className="text-[11px] font-semibold text-ink/40">Tap for details</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {STARTUPS.map((s) => (
                <button key={s.id} onClick={() => nav(`/startup/${s.id}`)}
                        className="text-left bg-white border border-ink/9 rounded-[10px] overflow-hidden relative active:scale-[0.98] transition-transform p-0 cursor-pointer shadow-sm">
                  <div className="h-16 flex items-center justify-center relative overflow-hidden" style={{ background: s.monoBg }}>
                    <div className="absolute inset-0 opacity-10" style={{ background: 'var(--stripe-gradient)' }} />
                    {s.logo ? (
                      <img src={s.logo} alt={s.name} className="absolute inset-0 w-full h-full object-contain p-2.5 bg-white" />
                    ) : (
                      <span className="relative" style={{ color: s.monoFg }}><Logo id={s.id} size={28} /></span>
                    )}
                  </div>
                  <div className="px-2.5 pt-2 pb-3">
                    <p className="text-[12px] font-semibold text-ink mb-0.5" style={{ lineHeight: 1.2 }}>{s.name}</p>
                    <p className="text-[10px] text-orange font-medium">{s.sector}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="meetings" />

      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-[104px] z-50 max-w-[340px] w-[calc(100%-32px)] bg-ink text-white text-[12px] font-semibold px-4 py-3 rounded-xl shadow-lg text-center">
          {toast}
        </div>
      )}

      {requestOpen && (
        <RequestMeetingSheet onClose={() => setRequestOpen(false)} onSubmitted={onRequested} />
      )}

      {profileOpen && (
        <ProfileSheet user={user} onClose={() => setProfileOpen(false)} onSaved={() => setTick((t) => t + 1)} />
      )}

      {mapLocation && (
        <VenueMapModal
          isOpen={true}
          onClose={() => setMapLocation(null)}
          location={mapLocation}
        />
      )}
    </Frame>
  )
}
