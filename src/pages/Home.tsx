import { motion } from 'motion/react'
import {
  Heart,
  MessageCircle,
  FileText,
  Clock,
  Database,
  GraduationCap,
  MessageSquare,
  BarChart3,
  Megaphone,
  Newspaper,
  CalendarCheck,
  Hash,
  Wheat,
} from 'lucide-react'
import { FadeIn, ScrollReveal, StaggerItem, HoverCard } from '../components/AnimatedCard'
import NewsCarousel from '../components/NewsCarousel'
import EventCalendar from '../components/EventCalendar'
import { feedPosts, atalhos } from '../data/mock'

const iconMap: Record<string, React.ElementType> = {
  FileText, Clock, Database, GraduationCap, MessageSquare, BarChart3,
}

const typeConfig = {
  noticia: { label: 'Notícia', icon: Newspaper, color: 'bg-blue-100 text-blue-700' },
  comunicado: { label: 'Comunicado', icon: Megaphone, color: 'bg-amber-100 text-amber-700' },
  evento: { label: 'Evento', icon: CalendarCheck, color: 'bg-emerald-100 text-emerald-700' },
  canal: { label: 'Canal', icon: Hash, color: 'bg-purple-100 text-purple-700' },
}

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* News Carousel */}
      <NewsCarousel />

      {/* Quick Links */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
        {atalhos.map((item, i) => {
          const Icon = iconMap[item.icon]
          return (
            <StaggerItem key={item.nome} delay={0.15 + i * 0.05}>
              <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary/15 group-hover:to-primary/10 transition-all duration-300">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-text-secondary group-hover:text-text transition-colors">{item.nome}</span>
              </div>
            </StaggerItem>
          )
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Feed */}
        <div className="flex-1 space-y-4">
          <FadeIn delay={0.2}>
            <h2 className="text-lg font-semibold text-text flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-primary to-primary-light rounded-full" />
              Feed Corporativo
            </h2>
          </FadeIn>

          {feedPosts.map((post, i) => {
            const config = typeConfig[post.type]
            const TypeIcon = config.icon
            return (
              <ScrollReveal key={post.id} delay={i * 0.1}>
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
                      <div className="w-full h-40 bg-gradient-to-br from-primary/5 via-bg to-accent/5 rounded-lg mb-3 flex items-center justify-center">
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

        {/* Widgets */}
        <div className="w-full lg:w-80 space-y-4">
          {/* Eventos com calendário */}
          <ScrollReveal delay={0.1}>
            <EventCalendar />
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
