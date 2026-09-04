import { useState, useEffect } from 'react'
import Frame from '../components/Frame'
import Logo from '../components/Logo'
import { INNOVATOR_STARTUPS } from '../data/startups'
import { getAggregates, subscribeLeaderboard, fetchAllRatings, ratingsToCsv } from '../services/dataService'

export default function Admin() {
  const [aggregates, setAggregates] = useState(() => getAggregates())
  const [exporting, setExporting] = useState(false)
  const [exportNote, setExportNote] = useState('')

  const handleExport = async () => {
    setExporting(true)
    setExportNote('')
    try {
      const rows = await fetchAllRatings()
      if (rows.length === 0) {
        setExportNote('No ratings to export yet.')
        return
      }
      const csv = ratingsToCsv(rows)
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `gif-ratings-${new Date().toISOString().slice(0, 10)}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setExportNote(`Exported ${rows.length} rating${rows.length === 1 ? '' : 's'}.`)
    } catch (err) {
      console.warn('Ratings export failed:', err)
      setExportNote('Export failed. Check the console.')
    } finally {
      setExporting(false)
    }
  }

  useEffect(() => {
    const unsubscribe = subscribeLeaderboard((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setAggregates(data)
      }
    })
    return () => unsubscribe()
  }, [])

  const rows = [...aggregates].sort((a, b) => b.avgScore - a.avgScore)
  const totalRaters = rows.length > 0 ? Math.max(...rows.map((r) => r.raterCount)) : 0

  return (
    <Frame wide>
      <div className="px-10 py-8 border-b border-ink/8" style={{ background: 'rgba(255,255,255,0.82)' }}>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] font-semibold text-ink/35 uppercase mb-2.5" style={{ letterSpacing: '0.18em' }}>
              Global Impact Forum II
            </p>
            <h1 className="font-display text-[32px] font-bold text-ink leading-none" style={{ letterSpacing: '-0.02em' }}>
              Live Leaderboard
            </h1>
            <p className="text-[13px] text-ink/40 mt-2">State of the room.</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="font-display text-[28px] font-bold text-orange">{totalRaters}</p>
            <p className="text-xs text-ink/35" style={{ letterSpacing: '0.06em' }}>RATERS</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="text-[11px] font-semibold uppercase text-white bg-ink px-4 py-2 disabled:opacity-40"
            style={{ letterSpacing: '0.1em' }}
          >
            {exporting ? 'Exporting…' : 'Export ratings CSV'}
          </button>
          {exportNote && <p className="text-xs text-ink/45">{exportNote}</p>}
        </div>
      </div>
      <div className="px-10 pt-3 pb-14">
        {rows.map((r, i) => {
          const s = INNOVATOR_STARTUPS.find((x) => x.id === r.id)
          return (
            <div key={r.id} className="flex items-center gap-[18px] py-4 border-b border-ink/7">
              <span className="font-display text-[13px] font-bold text-ink/20 w-[22px] text-right shrink-0">{i + 1}</span>
              <div className="w-11 h-11 flex items-center justify-center shrink-0 overflow-hidden" style={{ background: s.monoBg }}>
                {s.logo ? (
                  <img src={s.logo} alt={s.name} className="w-full h-full object-contain p-0.5 bg-white" />
                ) : (
                  <span style={{ color: s.monoFg }}><Logo id={s.id} size={24} /></span>
                )}
              </div>
              <div className="min-w-0" style={{ flex: '0 0 160px' }}>
                <p className="text-[15px] font-semibold text-ink truncate">{r.name}</p>
                <p className="text-xs text-muted">{s.sector}</p>
              </div>
              <div className="flex-1">
                <div className="h-1.5 bg-ink/8">
                  <div className="h-full bg-orange transition-all duration-700" style={{ width: `${(r.avgScore / 10) * 100}%` }} />
                </div>
              </div>
              <div className="text-right shrink-0 min-w-[90px]">
                <p className="font-display text-[22px] font-bold text-ink leading-none" style={{ letterSpacing: '-0.02em' }}>
                  {r.avgScore.toFixed(1)}
                </p>
                <p className="text-[11px] text-muted mt-0.5">{r.raterCount} raters</p>
              </div>
            </div>
          )
        })}
      </div>
    </Frame>
  )
}
