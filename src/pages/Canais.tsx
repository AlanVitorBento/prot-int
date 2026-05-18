import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Users,
  Monitor,
  TrendingUp,
  Code,
  Lightbulb,
  Calendar,
  UserPlus,
  Heart,
  MessageCircle,
  Search,
  Check,
} from 'lucide-react'
import { FadeIn, ScrollReveal, HoverCard } from '../components/AnimatedCard'
import { canais, feedPosts } from '../data/mock'

const iconMap: Record<string, React.ElementType> = {
  Users, Monitor, TrendingUp, Code, Lightbulb, Calendar,
}

export default function Canais() {
  const [selected, setSelected] = useState<number | null>(null)
  const [following, setFollowing] = useState<Set<number>>(new Set([1, 2]))
  const [busca, setBusca] = useState('')

  const filtered = canais.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.descricao.toLowerCase().includes(busca.toLowerCase())
  )

  const toggleFollow = (id: number) => {
    setFollowing(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col overflow-hidden">
      <FadeIn>
        <h1 className="text-2xl font-bold text-text mb-1">Canais</h1>
        <p className="text-text-secondary text-sm mb-6">Participe das comunidades e fique por dentro das novidades</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar canais..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/80 rounded-xl border border-border/50 text-sm
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:bg-white transition-all duration-300"
          />
        </div>
      </FadeIn>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        <div className="w-full lg:w-96 space-y-3 overflow-y-auto pr-1">
          {filtered.map((canal, i) => {
            const Icon = iconMap[canal.icon]
            const isFollowing = following.has(canal.id)
            return (
              <ScrollReveal key={canal.id} delay={i * 0.05}>
                <HoverCard onClick={() => setSelected(canal.id)}>
                  <div className={`bg-white rounded-xl border p-4 cursor-pointer transition-all duration-300
                    ${selected === canal.id ? 'border-primary/40 shadow-lg shadow-primary/5' : 'border-border/50'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${canal.cor}20, ${canal.cor}10)`, color: canal.cor }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-text">{canal.nome}</h3>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => { e.stopPropagation(); toggleFollow(canal.id) }}
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
                              ${isFollowing
                                ? 'bg-primary/10 text-primary'
                                : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                              }`}
                          >
                            <AnimatePresence mode="wait">
                              {isFollowing ? (
                                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Seguindo
                                </motion.div>
                              ) : (
                                <motion.div key="follow" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1">
                                  <UserPlus className="w-3 h-3" /> Seguir
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        </div>
                        <p className="text-sm text-text-secondary mt-0.5 truncate">{canal.descricao}</p>
                        <span className="text-xs text-text-secondary mt-1 inline-block">{canal.membros} membros</span>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </ScrollReveal>
            )
          })}
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-text flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-primary to-primary-light rounded-full" />
                  Posts em #{canais.find(c => c.id === selected)?.nome}
                </h2>
                {feedPosts.slice(0, 3).map((post, i) => (
                  <ScrollReveal key={post.id} delay={i * 0.1}>
                    <HoverCard>
                      <article className="bg-white rounded-xl border border-border/50 p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm">
                            {post.authorAvatar}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-text">{post.author}</p>
                            <p className="text-xs text-text-secondary">{post.date}</p>
                          </div>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed mb-3">{post.description}</p>
                        <div className="flex items-center gap-4 pt-3 border-t border-border/50">
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex items-center gap-1.5 text-text-secondary hover:text-red-500 text-sm transition-colors">
                            <Heart className="w-4 h-4" /> {post.likes}
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex items-center gap-1.5 text-text-secondary hover:text-primary text-sm transition-colors">
                            <MessageCircle className="w-4 h-4" /> {post.comments}
                          </motion.button>
                        </div>
                      </article>
                    </HoverCard>
                  </ScrollReveal>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-64 glass rounded-xl grain"
              >
                <Users className="w-10 h-10 text-primary/30 mb-3" />
                <p className="text-text-secondary text-sm">Selecione um canal para ver os posts</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
