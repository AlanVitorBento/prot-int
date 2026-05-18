import { motion } from 'motion/react'
import {
  Heart,
  MessageCircle,
  Megaphone,
  Newspaper,
  CalendarCheck,
  Hash,
  Wheat,
  PenSquare,
  Image,
  Paperclip,
} from 'lucide-react'
import { FadeIn, ScrollReveal, HoverCard } from '../components/AnimatedCard'
import { feedPosts } from '../data/mock'

const typeConfig = {
  noticia: { label: 'Notícia', icon: Newspaper, color: 'bg-blue-100 text-blue-700' },
  comunicado: { label: 'Comunicado', icon: Megaphone, color: 'bg-amber-100 text-amber-700' },
  evento: { label: 'Evento', icon: CalendarCheck, color: 'bg-emerald-100 text-emerald-700' },
  canal: { label: 'Canal', icon: Hash, color: 'bg-purple-100 text-purple-700' },
}

const filters = ['Todos', 'Notícias', 'Comunicados', 'Eventos', 'Canais']

export default function Feed() {
  return (
    <div className="max-w-3xl mx-auto h-full overflow-y-auto pr-1">
      <FadeIn>
        <h1 className="text-2xl font-bold text-text mb-1">Feed</h1>
        <p className="text-text-secondary text-sm mb-6">Acompanhe tudo que acontece na C.Vale</p>
      </FadeIn>

      {/* Composer */}
      <FadeIn delay={0.1}>
        <div className="bg-white rounded-xl border border-border/50 p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm">
              AB
            </div>
            <div className="flex-1 bg-bg rounded-xl px-4 py-2.5 text-sm text-text-secondary cursor-pointer hover:bg-border/30 transition-colors">
              Compartilhe algo com a equipe...
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-border/30">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:bg-primary/5 hover:text-primary transition-colors">
              <Image className="w-4 h-4" /> Foto
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:bg-primary/5 hover:text-primary transition-colors">
              <Paperclip className="w-4 h-4" /> Arquivo
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:bg-primary/5 hover:text-primary transition-colors">
              <PenSquare className="w-4 h-4" /> Artigo
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Filters */}
      <FadeIn delay={0.15}>
        <div className="flex gap-2 mb-5 flex-wrap">
          {filters.map((f, i) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                ${i === 0
                  ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-md shadow-primary/20'
                  : 'bg-white border border-border/50 text-text-secondary hover:bg-gray-50'
                }`}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </FadeIn>

      {/* Posts */}
      <div className="space-y-4">
        {[...feedPosts, ...feedPosts].map((post, i) => {
          const config = typeConfig[post.type]
          const TypeIcon = config.icon
          return (
            <ScrollReveal key={`${post.id}-${i}`} delay={i * 0.08}>
              <HoverCard>
                <article className="bg-white rounded-xl border border-border/50 p-5 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm">
                      {post.authorAvatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-text">{post.author}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                          <TypeIcon className="w-3 h-3" />
                          {config.label}
                        </span>
                      </div>
                      <span className="text-xs text-text-secondary">{post.authorRole} · {post.date}</span>
                    </div>
                  </div>

                  {post.image && (
                    <div className="w-full h-48 bg-gradient-to-br from-primary/5 via-bg to-accent/5 rounded-lg mb-3 flex items-center justify-center">
                      <Wheat className="w-10 h-10 text-primary/10" />
                    </div>
                  )}

                  <h3 className="font-semibold text-text mb-1">{post.title}</h3>
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed">{post.description}</p>

                  <div className="flex items-center gap-4 pt-3 border-t border-border/50">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-1.5 text-text-secondary hover:text-red-500 text-sm transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-1.5 text-text-secondary hover:text-primary text-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </motion.button>
                  </div>
                </article>
              </HoverCard>
            </ScrollReveal>
          )
        })}
      </div>
    </div>
  )
}
