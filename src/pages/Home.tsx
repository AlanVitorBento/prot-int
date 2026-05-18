import { Link } from 'react-router-dom'
import {
  FileText,
  Clock,
  Database,
  GraduationCap,
  MessageSquare,
  BarChart3,
  Newspaper,
  ChevronRight,
  Wheat,
} from 'lucide-react'
import { FadeIn, ScrollReveal, StaggerItem } from '../components/AnimatedCard'
import NewsCarousel from '../components/NewsCarousel'
import EventCalendar from '../components/EventCalendar'
import { atalhos } from '../data/mock'

const iconMap: Record<string, React.ElementType> = {
  FileText, Clock, Database, GraduationCap, MessageSquare, BarChart3,
}

const noticias = [
  { id: 1, titulo: 'C.Vale bate recorde na safra 2025/2026', resumo: 'Cooperativa registrou aumento de 18% na produção de soja em relação à safra anterior.', data: '18 Mai 2026', categoria: 'Institucional' },
  { id: 2, titulo: 'Nova política de home office aprovada', resumo: 'Colaboradores administrativos poderão trabalhar remotamente até 3 dias por semana.', data: '17 Mai 2026', categoria: 'RH' },
  { id: 3, titulo: 'Workshop de Inovação 2026 — Inscrições abertas', resumo: '3 dias de imersão com palestrantes nacionais e internacionais.', data: '16 Mai 2026', categoria: 'Eventos' },
  { id: 4, titulo: 'Expansão: nova unidade em Mato Grosso do Sul', resumo: 'Nova unidade de recebimento de grãos será construída em Maracaju/MS.', data: '15 Mai 2026', categoria: 'Institucional' },
]

const catColors: Record<string, string> = {
  Institucional: 'bg-blue-100 text-blue-700',
  RH: 'bg-emerald-100 text-emerald-700',
  Eventos: 'bg-amber-100 text-amber-700',
}

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* News Carousel */}
      <NewsCarousel />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar esquerda - Atalhos */}
        <div className="w-full lg:w-56 space-y-2 order-2 lg:order-1">
          <FadeIn delay={0.1}>
            <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3 px-1">
              Acesso Rápido
            </h2>
          </FadeIn>
          {atalhos.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <StaggerItem key={item.nome} delay={0.1 + i * 0.05}>
                <div className="flex items-center gap-3 px-3 py-2.5 bg-white rounded-xl border border-border/50 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 cursor-pointer group">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center group-hover:from-primary/15 group-hover:to-primary/10 transition-all duration-300 flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-text-secondary group-hover:text-text transition-colors">{item.nome}</span>
                </div>
              </StaggerItem>
            )
          })}
        </div>

        {/* Centro - Notícias */}
        <div className="flex-1 space-y-4 order-1 lg:order-2">
          <FadeIn delay={0.2}>
            <h2 className="text-lg font-semibold text-text flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-primary to-primary-light rounded-full" />
              Notícias
            </h2>
          </FadeIn>

          {noticias.map((noticia, i) => (
            <ScrollReveal key={noticia.id} delay={i * 0.08}>
              <Link to={`/noticia/${noticia.id}`} className="block">
                <div className="bg-white rounded-xl border border-border/50 p-5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/5 via-bg to-accent/5 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Wheat className="w-6 h-6 text-primary/15" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${catColors[noticia.categoria] || 'bg-gray-100 text-text-secondary'}`}>
                          {noticia.categoria}
                        </span>
                        <span className="text-xs text-text-secondary">{noticia.data}</span>
                      </div>
                      <h3 className="font-semibold text-text group-hover:text-primary transition-colors leading-snug">{noticia.titulo}</h3>
                      <p className="text-sm text-text-secondary mt-1 line-clamp-2">{noticia.resumo}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-secondary opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 mt-2" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}

          <FadeIn delay={0.5}>
            <div className="text-center pt-2">
              <Link
                to="/feed"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                <Newspaper className="w-4 h-4" />
                Ver todas as publicações no Feed
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Sidebar direita - Eventos */}
        <div className="w-full lg:w-80 space-y-4 order-3">
          <ScrollReveal delay={0.1}>
            <EventCalendar />
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
