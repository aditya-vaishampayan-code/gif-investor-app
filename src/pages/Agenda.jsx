import { useState } from 'react'
import Frame from '../components/Frame'
import BottomNav from '../components/BottomNav'
import ProfileSheet from '../components/ProfileSheet'
import SessionCard from '../components/SessionCard'
import { AGENDA_DAYS } from '../data/agenda'
import { getUser } from '../services/dataService'

import VenueMapModal from '../components/VenueMapModal'

function BreakRow({ session }) {
  const [mapOpen, setMapOpen] = useState(false)
  return (
    <>
      <div className="text-center py-1 flex flex-col items-center">
        <p className="text-[13px] font-bold text-orange mb-0.5">{session.time}</p>
        <p className="font-display text-[14px] font-bold text-ink uppercase mb-0.5" style={{ letterSpacing: '0.04em' }}>
          {session.title}
        </p>
        {session.location && (
          <div className="flex items-center gap-1.5 justify-center flex-wrap">
            <span className="text-[11px] text-ink/40">{session.location}</span>
            <button
              type="button"
              onClick={() => setMapOpen(true)}
              className="inline-flex items-center gap-0.5 text-[9px] font-bold text-orange bg-orange/10 hover:bg-orange/20 px-1.5 py-0.5 rounded-full border-none cursor-pointer"
            >
              📍 Map
            </button>
          </div>
        )}
      </div>
      <VenueMapModal
        isOpen={mapOpen}
        onClose={() => setMapOpen(false)}
        location={session.location}
        roomKey={session.roomKey}
      />
    </>
  )
}

export default function Agenda() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [, setTick] = useState(0)
  const [dayId, setDayId] = useState(AGENDA_DAYS[0].id)
  const user = getUser()
  const initial = user?.name ? user.name[0].toUpperCase() : '?'
  const day = AGENDA_DAYS.find((d) => d.id === dayId) ?? AGENDA_DAYS[0]

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
          <button
            onClick={() => setProfileOpen(true)}
            aria-label="Profile"
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/70 shrink-0 bg-orange text-white font-display text-sm font-bold flex items-center justify-center"
          >
            {initial}
          </button>
        </div>

        {/* Heading */}
        <div className="px-6 pt-5 pb-6 text-center">
          <p className="text-[11px] font-semibold text-white/80 uppercase mb-2" style={{ letterSpacing: '0.14em' }}>
            Global Impact Forum – Edition II
          </p>
          <h1 className="font-display text-[20px] font-medium text-white mb-2" style={{ lineHeight: 1.15 }}>
            The Forum in Conversation
          </h1>
          <p className="text-[12px] text-white/85" style={{ lineHeight: 1.5 }}>
            Explore two days of thoughtfully curated programme of conversations around business, policy and global collaboration.
          </p>
        </div>

        {/* Agenda card */}
        <div className="flex-1 px-5 pb-6">
        <div className="rounded-[20px] px-5 pt-6 pb-8" style={{ background: '#EAF9FF' }}>
          {/* Day tabs */}
          <div className="flex gap-3 mb-6">
            {AGENDA_DAYS.map((d) => {
              const active = d.id === dayId
              return (
                <button
                  key={d.id}
                  onClick={() => setDayId(d.id)}
                  className="flex-1 py-3 rounded-2xl border-none font-display text-[14px] font-bold cursor-pointer transition-colors"
                  style={{ background: active ? '#EF4E3D' : '#E4E7E9', color: active ? '#FFFFFF' : '#1B1714' }}
                >
                  {d.label.toUpperCase()}
                </button>
              )
            })}
          </div>

          {/* Timeline */}
          <div className="relative pl-5">
            <div className="absolute top-2 bottom-2 w-0.5 bg-orange/70" style={{ left: 3 }} />
            <div className="flex flex-col gap-5">
              {day.sessions.map((session) => (
                <div key={session.id} className="relative">
                  {session.showDot !== false && (
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-orange border-2 border-white shadow" style={{ left: -21, top: 6 }} />
                  )}
                  {session.type === 'break' ? <BreakRow session={session} /> : <SessionCard session={session} />}
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>

      <BottomNav active="agenda" />

      {profileOpen && (
        <ProfileSheet user={user} onClose={() => setProfileOpen(false)} onSaved={() => setTick((t) => t + 1)} />
      )}
    </Frame>
  )
}
