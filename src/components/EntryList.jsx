import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function EntryList({ refreshFlag }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/entries`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [refreshFlag])

  if (loading) return <div className="text-gray-500">Cargando entradas...</div>

  return (
    <div className="space-y-3">
      {items.length === 0 && <div className="text-gray-500">Aún no tienes entradas. ¡Crea la primera!</div>}
      {items.map((it) => (
        <div key={it.id} className="rounded-lg border border-gray-200 p-4 bg-white">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">{it.title}</h3>
            {it.mood != null && (
              <span className="text-xs rounded-full bg-indigo-50 text-indigo-700 px-2 py-1">Ánimo {it.mood}/5</span>
            )}
          </div>
          <p className="text-gray-600 mt-1 whitespace-pre-wrap">{it.content}</p>
          <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
            {it.tags?.map((t) => (
              <span key={t} className="rounded bg-gray-100 px-2 py-0.5">#{t}</span>
            ))}
            <span className="ml-auto">{new Date(it.date || it.created_at).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
