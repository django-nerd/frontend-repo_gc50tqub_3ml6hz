import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function EntryForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState(3)
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        title,
        content,
        mood: Number(mood),
        tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
      }
      const res = await fetch(`${API_BASE}/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Error al crear entrada')
      setTitle('')
      setContent('')
      setMood(3)
      setTags('')
      onCreated?.()
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} className="mt-1 w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Hoy me siento..." required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contenido</label>
        <textarea value={content} onChange={e=>setContent(e.target.value)} rows={4} className="mt-1 w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Describe tus actividades, pensamientos y sentimientos" required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Ánimo (1-5)</label>
          <input type="number" min={1} max={5} value={mood} onChange={e=>setMood(e.target.value)} className="mt-1 w-full rounded-md border border-gray-200 p-2" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Etiquetas</label>
          <input value={tags} onChange={e=>setTags(e.target.value)} className="mt-1 w-full rounded-md border border-gray-200 p-2" placeholder="ej. trabajo, salud, familia" />
        </div>
      </div>
      <button disabled={loading} className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60">
        {loading ? 'Guardando...' : 'Guardar entrada'}
      </button>
    </form>
  )
}
