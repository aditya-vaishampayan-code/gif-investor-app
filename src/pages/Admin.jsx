import { useState, useEffect } from 'react'
import Frame from '../components/Frame'
import { fetchAllRatings, ratingsToCsv, fetchAllAccounts, accountsToCsv } from '../services/dataService'

function downloadCsv(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default function Admin() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [exportNote, setExportNote] = useState('')

  useEffect(() => {
    let active = true
    fetchAllRatings()
      .then((data) => {
        if (active) setRows(data)
      })
      .catch((err) => {
        console.warn('Failed to load ratings:', err)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const today = () => new Date().toISOString().slice(0, 10)

  const handleExport = async () => {
    setExporting(true)
    setExportNote('')
    try {
      const data = await fetchAllRatings()
      if (data.length === 0) {
        setExportNote('No ratings to export yet.')
        return
      }
      downloadCsv(ratingsToCsv(data), `gif-ratings-${today()}.csv`)
      setExportNote(`Exported ${data.length} rating${data.length === 1 ? '' : 's'}.`)
    } catch (err) {
      console.warn('Ratings export failed:', err)
      setExportNote('Export failed. Check the console.')
    } finally {
      setExporting(false)
    }
  }

  const handleExportAccounts = async () => {
    setExporting(true)
    setExportNote('')
    try {
      const data = await fetchAllAccounts()
      if (data.length === 0) {
        setExportNote('No accounts to export yet.')
        return
      }
      downloadCsv(accountsToCsv(data), `gif-accounts-${today()}.csv`)
      setExportNote(`Exported ${data.length} account${data.length === 1 ? '' : 's'}.`)
    } catch (err) {
      console.warn('Accounts export failed:', err)
      setExportNote('Export failed. Check the console.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <Frame wide>
      <div className="px-10 py-8 border-b border-ink/8" style={{ background: 'rgba(255,255,255,0.82)' }}>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] font-semibold text-ink/35 uppercase mb-2.5" style={{ letterSpacing: '0.18em' }}>
              Global Impact Forum II
            </p>
            <h1 className="font-display text-[32px] font-bold text-ink leading-none" style={{ letterSpacing: '-0.02em' }}>
              Ratings
            </h1>
            <p className="text-[13px] text-ink/40 mt-2">Every rating, one row each.</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="font-display text-[28px] font-bold text-orange">{rows.length}</p>
            <p className="text-xs text-ink/35" style={{ letterSpacing: '0.06em' }}>RATINGS</p>
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
          <button
            type="button"
            onClick={handleExportAccounts}
            disabled={exporting}
            className="text-[11px] font-semibold uppercase text-ink border border-ink/25 px-4 py-2 disabled:opacity-40"
            style={{ letterSpacing: '0.1em' }}
          >
            {exporting ? 'Exporting…' : 'Export accounts CSV'}
          </button>
          {exportNote && <p className="text-xs text-ink/45">{exportNote}</p>}
        </div>
      </div>
      <div className="px-10 pt-3 pb-14">
        {loading ? (
          <p className="text-[13px] text-ink/40 py-6">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-[13px] text-ink/40 py-6">No ratings yet.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-semibold text-ink/35 uppercase" style={{ letterSpacing: '0.12em' }}>
                <th className="py-3 pr-4 border-b border-ink/10">Rater</th>
                <th className="py-3 pr-4 border-b border-ink/10">Company</th>
                <th className="py-3 pr-4 border-b border-ink/10">Innovator</th>
                <th className="py-3 pr-4 border-b border-ink/10 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`${r.userId}-${r.startupId}-${i}`} className="align-top">
                  <td className="py-3 pr-4 border-b border-ink/7 text-[14px] text-ink">{r.userName || '—'}</td>
                  <td className="py-3 pr-4 border-b border-ink/7 text-[13px] text-muted">{r.userCompany || '—'}</td>
                  <td className="py-3 pr-4 border-b border-ink/7 text-[14px] text-ink">{r.startupName}</td>
                  <td className="py-3 pr-4 border-b border-ink/7 text-right font-display text-[16px] font-bold text-ink">
                    {r.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Frame>
  )
}
