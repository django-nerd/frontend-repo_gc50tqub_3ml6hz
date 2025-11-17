import { useState } from 'react'
import EntryForm from './components/EntryForm'
import EntryList from './components/EntryList'
import SummaryCard from './components/SummaryCard'

function App() {
  const [refresh, setRefresh] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Mi Diario</h1>
          <span className="text-sm text-gray-500">Tu espacio para reflexionar y crecer</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Nueva entrada</h2>
            <EntryForm onCreated={() => setRefresh(r => r + 1)} />
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">Tus entradas</h2>
            <EntryList refreshFlag={refresh} />
          </div>
        </section>
        <aside className="space-y-6">
          <SummaryCard />
          <div className="rounded-xl bg-white p-4 border border-gray-100">
            <p className="text-sm text-gray-600">Consejo: escribe aunque sea 3-5 líneas. La constancia permite que el resumen aprenda de ti.</p>
          </div>
        </aside>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500">Hecho con cariño para ayudarte a crecer día a día.</footer>
    </div>
  )
}

export default App
