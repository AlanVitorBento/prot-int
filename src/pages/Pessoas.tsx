import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Mail, MessageSquare, X, MapPin, Building2 } from 'lucide-react'
import { FadeIn, StaggerItem } from '../components/AnimatedCard'
import { pessoas } from '../data/mock'

export default function Pessoas() {
  const [busca, setBusca] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const filtered = pessoas.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.cargo.toLowerCase().includes(busca.toLowerCase()) ||
    p.area.toLowerCase().includes(busca.toLowerCase()) ||
    p.unidade.toLowerCase().includes(busca.toLowerCase())
  )

  const selected = pessoas.find(p => p.id === selectedId)

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col overflow-hidden">
      <FadeIn>
        <h1 className="text-2xl font-bold text-text mb-1">Pessoas</h1>
        <p className="text-text-secondary text-sm mb-6">Encontre colegas e conecte-se com a equipe</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="relative max-w-lg mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar por nome, cargo, área ou unidade..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/80 rounded-xl border border-border/50 text-sm
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:bg-white transition-all duration-300"
          />
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-1 overflow-y-auto pr-1 content-start">
        {filtered.map((pessoa, i) => (
          <StaggerItem key={pessoa.id} delay={0.05 + i * 0.04} onClick={() => setSelectedId(pessoa.id)}>
            <div className="bg-white rounded-xl border border-border/50 p-5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-lg font-semibold mb-3 shadow-md shadow-primary/20 group-hover:shadow-lg group-hover:shadow-primary/30 transition-shadow">
                  {pessoa.avatar}
                </div>
                <h3 className="font-semibold text-text">{pessoa.nome}</h3>
                <p className="text-sm text-primary font-medium mt-0.5">{pessoa.cargo}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-text-secondary">
                  <Building2 className="w-3 h-3" />
                  {pessoa.area}
                  <span className="mx-0.5">·</span>
                  <MapPin className="w-3 h-3" />
                  {pessoa.unidade}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={e => e.stopPropagation()}
                    className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={e => e.stopPropagation()}
                    className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-48 glass rounded-xl grain"
        >
          <Search className="w-8 h-8 text-primary/30 mb-2" />
          <p className="text-text-secondary text-sm">Nenhuma pessoa encontrada</p>
        </motion.div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setSelectedId(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-gray-100 text-text-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-2xl font-semibold mb-4 shadow-lg shadow-primary/20"
                >
                  {selected.avatar}
                </motion.div>
                <h2 className="text-xl font-bold text-text">{selected.nome}</h2>
                <p className="text-primary font-medium mt-1">{selected.cargo}</p>
                <div className="w-full mt-4 space-y-2 text-left">
                  {[
                    ['Área', selected.area],
                    ['Unidade', selected.unidade],
                    ['Gestor', selected.gestor],
                    ['E-mail', selected.email],
                  ].map(([label, value], i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                      className="flex justify-between py-2.5 border-b border-border/50"
                    >
                      <span className="text-sm text-text-secondary">{label}</span>
                      <span className="text-sm font-medium text-text">{value}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-3 mt-5">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl text-sm font-medium shadow-md shadow-primary/20"
                  >
                    <Mail className="w-4 h-4" /> E-mail
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-medium"
                  >
                    <MessageSquare className="w-4 h-4" /> Teams
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
