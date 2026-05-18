import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  Users,
  Monitor,
  TrendingUp,
  Wheat,
  Search,
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  Download,
  Clock,
  User,
} from 'lucide-react'
import { FadeIn, ScrollReveal, HoverCard } from '../components/AnimatedCard'
import { areasDeNegocio, artigosAreas, documentosAreas } from '../data/mock'

const iconMap: Record<string, React.ElementType> = {
  Users, Monitor, TrendingUp, Wheat,
}

const fileIcons: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  pdf: { icon: FileText, color: 'text-red-600', bg: 'bg-red-50' },
  xlsx: { icon: FileSpreadsheet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  docx: { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
  pptx: { icon: FileImage, color: 'text-orange-600', bg: 'bg-orange-50' },
}

type Tab = 'artigos' | 'documentos'

export default function Areas() {
  const { areaId } = useParams<{ areaId?: string }>()
  const [selected, setSelected] = useState<string | null>(areaId || null)
  const [tab, setTab] = useState<Tab>('artigos')
  const [busca, setBusca] = useState('')

  const area = areasDeNegocio.find(a => a.id === selected)
  const artigos = artigosAreas.filter(a => a.areaId === selected)
  const documentos = documentosAreas.filter(d => d.areaId === selected)

  const filteredArtigos = artigos.filter(a =>
    a.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    a.categoria.toLowerCase().includes(busca.toLowerCase())
  )

  const filteredDocs = documentos.filter(d =>
    d.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto">
      <FadeIn>
        <h1 className="text-2xl font-bold text-text mb-1">Áreas de Negócio</h1>
        <p className="text-text-secondary text-sm mb-6">Informações, artigos e documentos de cada área da cooperativa</p>
      </FadeIn>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left - Area list */}
        <div className="w-full lg:w-80 space-y-3 flex-shrink-0">
          {areasDeNegocio.map((a, i) => {
            const Icon = iconMap[a.icon]
            const count = artigosAreas.filter(ar => ar.areaId === a.id).length
            const docCount = documentosAreas.filter(d => d.areaId === a.id).length
            return (
              <ScrollReveal key={a.id} delay={i * 0.05}>
                <HoverCard onClick={() => { setSelected(a.id); setTab('artigos'); setBusca('') }}>
                  <div className={`bg-white rounded-xl border p-4 cursor-pointer transition-all duration-300
                    ${selected === a.id ? 'border-primary/40 shadow-lg shadow-primary/5 ring-1 ring-primary/10' : 'border-border/50'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${a.gradient} shadow-sm`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-text">{a.nome}</h3>
                        <p className="text-sm text-text-secondary mt-0.5 line-clamp-1">{a.descricao}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
                          <span>{count} artigos</span>
                          <span>·</span>
                          <span>{docCount} documentos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Right - Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {area ? (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Area header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${area.gradient}`}>
                    {(() => { const Icon = iconMap[area.icon]; return <Icon className="w-5 h-5 text-white" /> })()}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text">{area.nome}</h2>
                    <p className="text-xs text-text-secondary">{area.descricao}</p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 mb-4 border-b border-border/50">
                  {(['artigos', 'documentos'] as Tab[]).map(t => (
                    <button
                      key={t}
                      onClick={() => { setTab(t); setBusca('') }}
                      className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
                        tab === t ? 'text-primary' : 'text-text-secondary hover:text-text'
                      }`}
                    >
                      {t === 'artigos' ? `Artigos (${artigos.length})` : `Documentos (${documentos.length})`}
                      {tab === t && (
                        <motion.div
                          layoutId="area-tab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative max-w-md mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input
                    type="text"
                    value={busca}
                    onChange={e => setBusca(e.target.value)}
                    placeholder={tab === 'artigos' ? 'Buscar artigos...' : 'Buscar documentos...'}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/80 rounded-xl border border-border/50 text-sm
                      focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:bg-white transition-all duration-300"
                  />
                </div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                  {tab === 'artigos' ? (
                    <motion.div
                      key="artigos"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      {filteredArtigos.map((artigo, i) => (
                        <ScrollReveal key={artigo.id} delay={i * 0.05}>
                          <div className="bg-white rounded-xl border border-border/50 p-5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group flex gap-4">
                            <div
                              className="w-1 rounded-full flex-shrink-0"
                              style={{ backgroundColor: area.cor }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span
                                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                  style={{ backgroundColor: `${area.cor}15`, color: area.cor }}
                                >
                                  {artigo.categoria}
                                </span>
                              </div>
                              <h3 className="font-semibold text-text group-hover:text-primary transition-colors leading-snug">
                                {artigo.titulo}
                              </h3>
                              <p className="text-sm text-text-secondary mt-1 line-clamp-2 leading-relaxed">
                                {artigo.resumo}
                              </p>
                              <div className="flex items-center gap-4 mt-3 text-xs text-text-secondary">
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {artigo.autor}
                                </span>
                                <span>{artigo.data}</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {artigo.leitura}
                                </span>
                              </div>
                            </div>
                          </div>
                        </ScrollReveal>
                      ))}
                      {filteredArtigos.length === 0 && (
                        <div className="flex flex-col items-center py-12 text-text-secondary">
                          <FileText className="w-8 h-8 text-primary/20 mb-2" />
                          <p className="text-sm">Nenhum artigo encontrado</p>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="documentos"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Document list - SharePoint style */}
                      <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
                        {/* Header */}
                        <div className="grid grid-cols-[1fr_120px_120px_80px_40px] gap-3 px-4 py-2.5 bg-bg/60 border-b border-border/30 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                          <span>Nome</span>
                          <span>Modificado</span>
                          <span>Autor</span>
                          <span>Tamanho</span>
                          <span></span>
                        </div>
                        {/* Rows */}
                        {filteredDocs.map((doc, i) => {
                          const ft = fileIcons[doc.tipo] || { icon: File, color: 'text-gray-500', bg: 'bg-gray-50' }
                          const FileIcon = ft.icon
                          return (
                            <motion.div
                              key={doc.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.04 }}
                              className="grid grid-cols-[1fr_120px_120px_80px_40px] gap-3 px-4 py-3 border-b border-border/20 last:border-0 hover:bg-primary/[0.02] transition-colors cursor-pointer group items-center"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${ft.bg}`}>
                                  <FileIcon className={`w-4 h-4 ${ft.color}`} />
                                </div>
                                <span className="text-sm font-medium text-text truncate group-hover:text-primary transition-colors">
                                  {doc.nome}
                                </span>
                              </div>
                              <span className="text-xs text-text-secondary">{doc.modificado}</span>
                              <span className="text-xs text-text-secondary truncate">{doc.autor}</span>
                              <span className="text-xs text-text-secondary">{doc.tamanho}</span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1.5 rounded-lg hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Download className="w-4 h-4" />
                              </motion.button>
                            </motion.div>
                          )
                        })}
                        {filteredDocs.length === 0 && (
                          <div className="flex flex-col items-center py-12 text-text-secondary">
                            <File className="w-8 h-8 text-primary/20 mb-2" />
                            <p className="text-sm">Nenhum documento encontrado</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-64 glass rounded-xl grain"
              >
                <Wheat className="w-10 h-10 text-primary/30 mb-3" />
                <p className="text-text-secondary text-sm">Selecione uma área para ver o conteúdo</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
