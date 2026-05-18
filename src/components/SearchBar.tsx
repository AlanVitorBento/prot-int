import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, X, Mail, MessageSquare, Phone, MapPin, Building2, Hash, ChevronRight, Users } from 'lucide-react'
import { pessoas } from '../data/mock'

type Pessoa = typeof pessoas[number]

type GroupedResults = {
  label: string
  field: string
  people: Pessoa[]
}

function groupResults(query: string): GroupedResults[] {
  const q = query.toLowerCase().trim()
  if (!q) return []

  const matched = pessoas.filter(p =>
    p.nome.toLowerCase().includes(q) ||
    p.cargo.toLowerCase().includes(q) ||
    p.area.toLowerCase().includes(q) ||
    p.unidade.toLowerCase().includes(q) ||
    p.matricula.includes(q) ||
    p.email.toLowerCase().includes(q) ||
    p.ramal.includes(q)
  )

  if (matched.length === 0) return []

  const byName = matched.filter(p => p.nome.toLowerCase().includes(q))
  const byCargo = matched.filter(p => p.cargo.toLowerCase().includes(q))
  const byArea = matched.filter(p => p.area.toLowerCase().includes(q))
  const byUnidade = matched.filter(p => p.unidade.toLowerCase().includes(q))
  const byMatricula = matched.filter(p => p.matricula.includes(q))
  const byRamal = matched.filter(p => p.ramal.includes(q))

  const groups: GroupedResults[] = []

  if (byName.length > 0) groups.push({ label: 'Pessoas', field: 'nome', people: byName })
  if (byCargo.length > 0) {
    groups.push({ label: `Cargo: "${query}"`, field: 'cargo', people: byCargo })
  }
  if (byArea.length > 0 && !groups.find(g => g.field === 'cargo')) {
    groups.push({ label: `Área: "${query}"`, field: 'area', people: byArea })
  } else if (byArea.length > 0) {
    const hasNew = byArea.some(p => !byCargo.some(bp => bp.id === p.id) && !byName.some(bn => bn.id === p.id))
    if (hasNew) groups.push({ label: `Área: "${query}"`, field: 'area', people: byArea })
  }
  if (byUnidade.length > 0) {
    const alreadyShown = new Set(groups.flatMap(g => g.people.map(p => p.id)))
    const unique = byUnidade.filter(p => !alreadyShown.has(p.id))
    if (unique.length > 0 || groups.length === 0) groups.push({ label: `Unidade: "${query}"`, field: 'unidade', people: byUnidade })
  }
  if (byMatricula.length > 0 && groups.length === 0) groups.push({ label: 'Matrícula', field: 'matricula', people: byMatricula })
  if (byRamal.length > 0 && groups.length === 0) groups.push({ label: 'Ramal', field: 'ramal', people: byRamal })

  if (groups.length === 0 && matched.length > 0) {
    groups.push({ label: 'Resultados', field: 'geral', people: matched })
  }

  return groups
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<Pessoa | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const results = groupResults(query)
  const hasResults = results.length > 0
  const showDropdown = focused && query.length > 0

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <>
      <div ref={containerRef} className="relative w-full mb-5">
        <div className={`relative flex items-center transition-all duration-300 ${
          focused ? 'ring-2 ring-primary/30 shadow-xl shadow-primary/10' : 'shadow-md shadow-black/5'
        } bg-white rounded-xl border border-border overflow-hidden`}>
          <Search className="absolute left-4 w-5 h-5 text-primary/50 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="Buscar pessoas, cargos, áreas, matrícula, ramais..."
            className="w-full pl-12 pr-10 py-3.5 text-sm bg-transparent focus:outline-none placeholder:text-text-secondary"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); inputRef.current?.focus() }}
              className="absolute right-3 p-1 rounded-lg hover:bg-gray-100 text-text-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-border/50 shadow-xl shadow-black/10 overflow-hidden z-40 max-h-[400px] overflow-y-auto"
            >
              {!hasResults ? (
                <div className="flex flex-col items-center py-8 text-text-secondary">
                  <Users className="w-8 h-8 text-primary/20 mb-2" />
                  <p className="text-sm">Nenhum resultado para "<span className="font-medium text-text">{query}</span>"</p>
                  <p className="text-xs mt-1">Tente buscar por nome, cargo, área ou matrícula</p>
                </div>
              ) : (
                results.map((group, gi) => (
                  <div key={gi}>
                    <div className="px-4 py-2 bg-bg/60 border-b border-border/30 flex items-center justify-between">
                      <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{group.label}</span>
                      <span className="text-[10px] text-text-secondary bg-white px-2 py-0.5 rounded-full">{group.people.length} {group.people.length === 1 ? 'pessoa' : 'pessoas'}</span>
                    </div>
                    {group.people.map((pessoa, i) => (
                      <motion.button
                        key={pessoa.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        onClick={() => { setSelectedPerson(pessoa); setFocused(false) }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors text-left border-b border-border/20 last:border-0"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-sm">
                          {pessoa.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text truncate">{pessoa.nome}</p>
                          <p className="text-xs text-text-secondary truncate">{pessoa.cargo} · {pessoa.area}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] text-text-secondary bg-bg px-2 py-0.5 rounded-full hidden sm:block">{pessoa.unidade}</span>
                          <ChevronRight className="w-4 h-4 text-text-secondary/40" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Person detail modal */}
      <AnimatePresence>
        {selectedPerson && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setSelectedPerson(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Header gradient */}
              <div className="h-20 bg-gradient-to-r from-primary via-primary-light to-primary relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-xl" />
                <button
                  onClick={() => setSelectedPerson(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-6 pb-6">
                {/* Avatar overlapping header */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="-mt-10 w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary/30 border-4 border-white mx-auto"
                >
                  {selectedPerson.avatar}
                </motion.div>

                <div className="text-center mt-3">
                  <h2 className="text-xl font-bold text-text">{selectedPerson.nome}</h2>
                  <p className="text-primary font-medium text-sm mt-0.5">{selectedPerson.cargo}</p>
                </div>

                {/* Info grid */}
                <div className="mt-5 space-y-0 bg-bg/50 rounded-xl overflow-hidden border border-border/30">
                  {[
                    { icon: Hash, label: 'Matrícula', value: selectedPerson.matricula },
                    { icon: Building2, label: 'Área', value: selectedPerson.area },
                    { icon: MapPin, label: 'Unidade', value: selectedPerson.unidade },
                    { icon: Users, label: 'Gestor', value: selectedPerson.gestor },
                    { icon: Mail, label: 'E-mail', value: selectedPerson.email },
                    { icon: Phone, label: 'Ramal', value: selectedPerson.ramal },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.04 }}
                      className="flex items-center gap-3 px-4 py-3 border-b border-border/20 last:border-0"
                    >
                      <item.icon className="w-4 h-4 text-primary/60 flex-shrink-0" />
                      <span className="text-xs text-text-secondary w-20 flex-shrink-0">{item.label}</span>
                      <span className="text-sm font-medium text-text truncate">{item.value}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl text-sm font-medium shadow-md shadow-primary/20"
                  >
                    <Mail className="w-4 h-4" /> E-mail
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-medium"
                  >
                    <MessageSquare className="w-4 h-4" /> Teams
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
