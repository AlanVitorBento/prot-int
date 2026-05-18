import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Search,
  Star,
  Database,
  GraduationCap,
  BarChart3,
  Headphones,
  MessageSquare,
  PieChart,
  FolderOpen,
  ClipboardList,
  BookOpen,
  Users,
  Mail,
  Shield,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import { FadeIn, ScrollReveal, StaggerItem, HoverCard } from '../components/AnimatedCard'
import { sistemas } from '../data/mock'

const iconMap: Record<string, React.ElementType> = {
  Database, GraduationCap, BarChart3, Headphones, MessageSquare,
  PieChart, FolderOpen, ClipboardList, BookOpen, Users, Mail, Shield,
}

const categorias = ['Todos', ...new Set(sistemas.map(s => s.categoria))]

export default function Sistemas() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todos')
  const [favoritos, setFavoritos] = useState<Set<number>>(
    new Set(sistemas.filter(s => s.favorito).map(s => s.id))
  )

  const filtered = sistemas.filter(s => {
    const matchBusca = s.nome.toLowerCase().includes(busca.toLowerCase())
    const matchCat = categoria === 'Todos' || s.categoria === categoria
    return matchBusca && matchCat
  })

  const toggleFav = (id: number) => {
    setFavoritos(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <FadeIn>
        <h1 className="text-2xl font-bold text-text mb-1">Sistemas</h1>
        <p className="text-text-secondary text-sm mb-6">Acesse todas as ferramentas da cooperativa em um só lugar</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar sistemas..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/80 rounded-xl border border-border/50 text-sm
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:bg-white transition-all duration-300"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categorias.map(cat => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategoria(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                  ${categoria === cat
                    ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-md shadow-primary/20'
                    : 'bg-white border border-border/50 text-text-secondary hover:bg-gray-50'
                  }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Favoritos */}
      {categoria === 'Todos' && (
        <div className="mb-8">
          <FadeIn delay={0.15}>
            <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Acesso rápido
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {sistemas.filter(s => favoritos.has(s.id)).map((sistema, i) => {
              const Icon = iconMap[sistema.icon]
              return (
                <StaggerItem key={sistema.id} delay={0.15 + i * 0.04}>
                  <div className="bg-white rounded-xl border border-border/50 p-4 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-text">{sistema.nome}</p>
                    <p className="text-xs text-text-secondary">{sistema.categoria}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </div>
        </div>
      )}

      {/* All Systems */}
      <ScrollReveal>
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
          {categoria === 'Todos' ? 'Todos os sistemas' : categoria}
        </h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((sistema, i) => {
          const Icon = iconMap[sistema.icon]
          return (
            <ScrollReveal key={sistema.id} delay={i * 0.04}>
              <HoverCard>
                <div className="bg-white rounded-xl border border-border/50 p-5 cursor-pointer group transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-1">
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={(e) => { e.stopPropagation(); toggleFav(sistema.id) }}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Star className={`w-4 h-4 transition-colors ${favoritos.has(sistema.id) ? 'fill-amber-400 text-amber-400' : 'text-text-secondary'}`} />
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-text-secondary opacity-0 group-hover:opacity-100"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-text mt-3 group-hover:text-primary transition-colors">{sistema.nome}</h3>
                  <span className="text-xs text-text-secondary bg-bg/80 px-2 py-0.5 rounded-full mt-1 inline-block">{sistema.categoria}</span>
                </div>
              </HoverCard>
            </ScrollReveal>
          )
        })}
      </div>
    </div>
  )
}
