import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function SummaryCard() {
  const [period, setPeriod] = useState('weekly')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = async (p) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/summary?period=${p}`)
      const json = await res.json()
      setData(json)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load(period) }, [])

  return (
    <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Resumen con IA</h3>
        <select value={period} onChange={(e)=>{setPeriod(e.target.value); load(e.target.value)}} className="text-gray-900 rounded-md px-2 py-1">
          <option value="weekly">Semanal</option>
          <option value="monthly">Mensual</option>
          <option value="yearly">Anual</option>
        </select>
      </div>
      {loading && <p className="mt-3 opacity-90">Generando resumen...</p>}
      {data && !loading && (
        <div className="mt-3 space-y-2">
          <p className="text-sm opacity-90">Periodo: {new Date(data.start).toLocaleDateString()} - {new Date(data.end).toLocaleDateString()}</p>
          <p className="text-2xl font-bold">{data.total_entries} entradas</p>
          {data.avg_mood != null && <p className="opacity-90">Ánimo medio: {data.avg_mood}/5</p>}
          <p className="mt-2 leading-relaxed">{data.summary}</p>
        </div>
      )}
    </div>
  )
}
