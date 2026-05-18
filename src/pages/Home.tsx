import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
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
  Settings2,
  X,
  Star,
  Headphones,
  PieChart,
  FolderOpen,
  ClipboardList,
  BookOpen,
  Users,
  Mail,
  Shield,
  Globe,
  Printer,
  Calculator,
  Briefcase,
  Phone,
} from 'lucide-react'
import { FadeIn, ScrollReveal, StaggerItem } from '../components/AnimatedCard'
import NewsCarousel from '../components/NewsCarousel'
import EventCalendar from '../components/EventCalendar'
import { WeatherCard } from '../components/WeatherWidget'
import CotacoesWidget from '../components/CotacoesWidget'
import PrecoDiaWidget from '../components/PrecoDiaWidget'
import PodcastWidget from '../components/PodcastWidget'
import RevistaWidget from '../components/RevistaWidget'
import SearchBar from '../components/SearchBar'

const allApps = [
  { id: 'holerite', nome: 'Holerite', icon: 'FileText', categoria: 'RH' },
  { id: 'ponto', nome: 'Ponto', icon: 'Clock', categoria: 'RH' },
  { id: 'sap', nome: 'SAP', icon: 'Database', categoria: 'ERP' },
  { id: 'successfactors', nome: 'SuccessFactors', icon: 'GraduationCap', categoria: 'RH' },
  { id: 'teams', nome: 'Teams', icon: 'MessageSquare', categoria: 'Comunicação' },
  { id: 'powerbi', nome: 'Power BI', icon: 'BarChart3', categoria: 'Analytics' },
  { id: 'chamados', nome: 'Chamados', icon: 'Headphones', categoria: 'Suporte' },
  { id: 'email', nome: 'E-mail', icon: 'Mail', categoria: 'Comunicação' },
  { id: 'sharepoint', nome: 'SharePoint', icon: 'FolderOpen', categoria: 'Documentos' },
  { id: 'jira', nome: 'Jira', icon: 'ClipboardList', categoria: 'Projetos' },
  { id: 'confluence', nome: 'Confluence', icon: 'BookOpen', categoria: 'Documentos' },
  { id: 'portalrh', nome: 'Portal RH', icon: 'Users', categoria: 'RH' },
  { id: 'vpn', nome: 'VPN', icon: 'Shield', categoria: 'Infraestrutura' },
  { id: 'intranet', nome: 'Intranet Antiga', icon: 'Globe', categoria: 'Outros' },
  { id: 'impressao', nome: 'Impressão', icon: 'Printer', categoria: 'Outros' },
  { id: 'calc', nome: 'Calculadora Agro', icon: 'Calculator', categoria: 'Ferramentas' },
  { id: 'contratos', nome: 'Contratos', icon: 'Briefcase', categoria: 'Jurídico' },
  { id: 'ramais', nome: 'Ramais', icon: 'Phone', categoria: 'Comunicação' },
  { id: 'birh', nome: 'BI RH', icon: 'PieChart', categoria: 'Analytics' },
]

const iconMap: Record<string, React.ElementType> = {
  FileText, Clock, Database, GraduationCap, MessageSquare, BarChart3,
  Headphones, Mail, FolderOpen, ClipboardList, BookOpen, Users,
  Shield, Globe, Printer, Calculator, Briefcase, Phone, PieChart,
}

const defaultFavorites = ['holerite', 'ponto', 'sap', 'successfactors', 'teams', 'powerbi']

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
  const [favorites, setFavorites] = useState<Set<string>>(new Set(defaultFavorites))
  const [showModal, setShowModal] = useState(false)
  const [searchApps, setSearchApps] = useState('')

  const favApps = allApps.filter(a => favorites.has(a.id))

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filteredApps = allApps.filter(a =>
    a.nome.toLowerCase().includes(searchApps.toLowerCase()) ||
    a.categoria.toLowerCase().includes(searchApps.toLowerCase())
  )

  const categorias = [...new Set(allApps.map(a => a.categoria))]

  return (
    <div className="relative max-w-[1400px] mx-auto h-full flex flex-col overflow-hidden">
      {/* Subtle background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-16 w-56 h-56 bg-accent/[0.03] rounded-full blur-3xl" />
        <div className="absolute -bottom-16 left-1/4 w-64 h-64 bg-primary/[0.02] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(33,64,154,0.015)_0%,transparent_70%)]" />
      </div>

      <div className="relative flex-shrink-0">
        <NewsCarousel />
      </div>

      <FadeIn delay={0.15}>
        <SearchBar />
      </FadeIn>

      <div className="relative flex flex-col lg:flex-row gap-5 flex-1 min-h-0">
        {/* Left sidebar - Quick access + Podcast + Revista */}
        <div className="w-full lg:w-64 space-y-3 order-2 lg:order-1 overflow-y-auto pr-1">
          <FadeIn delay={0.1}>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
                Acesso Rápido
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowModal(true)}
                className="p-1.5 rounded-lg hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors"
                title="Personalizar atalhos"
              >
                <Settings2 className="w-4 h-4" />
              </motion.button>
            </div>
          </FadeIn>
          {favApps.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <StaggerItem key={item.id} delay={0.1 + i * 0.04}>
                <div className="flex items-center gap-3 px-3 py-2.5 bg-white rounded-xl border border-border/50 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 cursor-pointer group">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center group-hover:from-primary/15 group-hover:to-primary/10 transition-all duration-300 flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-text-secondary group-hover:text-text transition-colors">{item.nome}</span>
                </div>
              </StaggerItem>
            )
          })}

          <ScrollReveal delay={0.3}>
            <div className="pt-2">
              <PodcastWidget />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <RevistaWidget />
          </ScrollReveal>
        </div>

        {/* Center - News */}
        <div className="flex-1 space-y-4 order-1 lg:order-2 overflow-y-auto pr-1">
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

        {/* Right sidebar - Cotações + Events + Weather */}
        <div className="w-full lg:w-80 space-y-3 order-3 overflow-y-auto pr-1">
          <ScrollReveal delay={0.05}>
            <PrecoDiaWidget />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <CotacoesWidget />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <EventCalendar />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <WeatherCard />
          </ScrollReveal>
        </div>
      </div>

      {/* Modal de personalização */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-[10%] left-1/2 -translate-x-1/2 z-50 bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
                <div>
                  <h2 className="font-bold text-text text-lg">Personalizar Acesso Rápido</h2>
                  <p className="text-xs text-text-secondary mt-0.5">Escolha os sistemas que deseja ver na sua Home</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 text-text-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="px-5 py-3">
                <input
                  type="text"
                  value={searchApps}
                  onChange={e => setSearchApps(e.target.value)}
                  placeholder="Buscar sistemas..."
                  className="w-full px-4 py-2.5 bg-bg rounded-xl border border-border/50 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                />
              </div>

              {/* Apps list */}
              <div className="flex-1 overflow-y-auto px-5 pb-5">
                {categorias.map(cat => {
                  const apps = filteredApps.filter(a => a.categoria === cat)
                  if (apps.length === 0) return null
                  return (
                    <div key={cat} className="mb-4">
                      <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">{cat}</h3>
                      <div className="space-y-1">
                        {apps.map(app => {
                          const Icon = iconMap[app.icon]
                          const isFav = favorites.has(app.id)
                          return (
                            <motion.button
                              key={app.id}
                              whileHover={{ x: 2 }}
                              onClick={() => toggleFav(app.id)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200
                                ${isFav ? 'bg-primary/5 border border-primary/20' : 'hover:bg-gray-50 border border-transparent'}
                              `}
                            >
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                                ${isFav ? 'bg-primary/10' : 'bg-gray-100'}
                              `}>
                                <Icon className={`w-4 h-4 ${isFav ? 'text-primary' : 'text-text-secondary'}`} />
                              </div>
                              <span className={`text-sm font-medium flex-1 ${isFav ? 'text-text' : 'text-text-secondary'}`}>
                                {app.nome}
                              </span>
                              <Star className={`w-4 h-4 transition-colors ${isFav ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-border/50 bg-bg/50 rounded-b-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{favorites.size} sistemas selecionados</span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl text-sm font-medium shadow-md shadow-primary/20"
                  >
                    Salvar
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
