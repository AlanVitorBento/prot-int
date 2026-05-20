import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowLeft,
  Heart,
  Share2,
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  Tag,
  Eye,
  ShoppingBag,
  CheckCircle2,
  Flag,
  Package,
  User,
  Building2,
  ChevronRight,
} from 'lucide-react'
import { FadeIn } from '../components/AnimatedCard'
import { marketplace } from '../data/mock'

const catColors: Record<string, string> = {
  vendas: 'bg-blue-100 text-blue-700',
  aluguel: 'bg-emerald-100 text-emerald-700',
  veiculos: 'bg-purple-100 text-purple-700',
  servicos: 'bg-amber-100 text-amber-700',
  eventos: 'bg-pink-100 text-pink-700',
}

const catLabels: Record<string, string> = {
  vendas: 'Venda',
  aluguel: 'Aluguel',
  veiculos: 'Veículo',
  servicos: 'Serviço',
  eventos: 'Evento',
}

const catGradients: Record<string, string> = {
  vendas: 'from-blue-50 via-sky-50 to-blue-100',
  aluguel: 'from-emerald-50 via-green-50 to-emerald-100',
  veiculos: 'from-purple-50 via-violet-50 to-purple-100',
  servicos: 'from-amber-50 via-yellow-50 to-amber-100',
  eventos: 'from-pink-50 via-rose-50 to-pink-100',
}

const catIconColors: Record<string, string> = {
  vendas: 'text-blue-300',
  aluguel: 'text-emerald-300',
  veiculos: 'text-purple-300',
  servicos: 'text-amber-300',
  eventos: 'text-pink-300',
}

const CURRENT_USER = 'Lucas Martins'

export default function MarketplaceDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = marketplace.find(m => m.id === Number(id))

  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(item?.likes ?? 0)
  const [vendido, setVendido] = useState(item?.vendido ?? false)
  const [showVendidoModal, setShowVendidoModal] = useState(false)
  const [showShareToast, setShowShareToast] = useState(false)

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-[16px] bg-primary/5 flex items-center justify-center mb-4">
              <ShoppingBag className="w-7 h-7 text-primary/25" />
            </div>
            <h2 className="text-lg font-bold text-text mb-1 tracking-tight">Anúncio não encontrado</h2>
            <p className="text-sm text-text-secondary mb-4">Este anúncio pode ter sido removido ou o link é inválido.</p>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary/10 text-primary rounded-[12px] text-sm font-semibold hover:bg-primary/15 transition-colors duration-[250ms]"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Marketplace
            </Link>
          </div>
        </FadeIn>
      </div>
    )
  }

  const isOwner = item.usuario === CURRENT_USER

  const handleLike = () => {
    setLiked(prev => !prev)
    setLikesCount(prev => liked ? prev - 1 : prev + 1)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowShareToast(true)
    setTimeout(() => setShowShareToast(false), 2500)
  }

  const handleMarcarVendido = () => {
    setVendido(true)
    setShowVendidoModal(false)
  }

  const relacionados = marketplace
    .filter(m => m.id !== item.id && m.categoria === item.categoria)
    .slice(0, 3)

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <FadeIn>
        <div className="flex items-center gap-2 mb-5 text-sm">
          <button
            onClick={() => navigate('/marketplace')}
            className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors duration-[250ms] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Marketplace
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-text-secondary/40" />
          <span className="text-text font-medium truncate max-w-[200px]">{item.titulo}</span>
        </div>
      </FadeIn>

      {/* Sold overlay banner */}
      {vendido && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200/60 rounded-[16px]"
        >
          <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-800">Este anúncio foi marcado como vendido</p>
            <p className="text-xs text-amber-600">O item não está mais disponível para negociação.</p>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left - Image + Description */}
        <div className="flex-1 space-y-4">
          {/* Image */}
          <FadeIn>
            <div className={`relative w-full aspect-[16/10] bg-gradient-to-br ${catGradients[item.categoria] || 'from-gray-50 to-gray-100'} rounded-[16px] overflow-hidden flex items-center justify-center ${vendido ? 'opacity-60' : ''}`}>
              <ShoppingBag className={`w-20 h-20 ${catIconColors[item.categoria] || 'text-gray-200'}`} />

              {vendido && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/60 backdrop-blur-sm text-white px-6 py-3 rounded-[12px] flex items-center gap-2 font-bold text-lg tracking-tight">
                    <CheckCircle2 className="w-6 h-6" />
                    VENDIDO
                  </div>
                </div>
              )}

              {/* Category badge on image */}
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${catColors[item.categoria]} shadow-sm`}>
                  <Tag className="w-3 h-3" />
                  {catLabels[item.categoria] || item.categoria}
                </span>
              </div>

              {/* Action buttons on image */}
              <div className="absolute top-4 right-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                  className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors duration-[250ms] shadow-sm ${
                    liked
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-text-secondary hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-text-secondary hover:text-primary transition-colors duration-[250ms] shadow-sm"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Likes counter on image */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-text shadow-sm">
                  <Heart className="w-3.5 h-3.5 text-red-500" />
                  {likesCount}
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-text shadow-sm">
                  <Eye className="w-3.5 h-3.5 text-text-secondary" />
                  {item.visualizacoes}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-[16px] border border-border/50 p-5">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Descrição</h3>
              <div className="text-sm text-text leading-relaxed whitespace-pre-line">
                {item.descricaoCompleta}
              </div>
            </div>
          </FadeIn>

          {/* Report */}
          <FadeIn delay={0.15}>
            <button className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-red-500 transition-colors duration-[250ms] px-1">
              <Flag className="w-3.5 h-3.5" />
              Denunciar anúncio
            </button>
          </FadeIn>
        </div>

        {/* Right - Info sidebar */}
        <div className="w-full lg:w-[340px] space-y-4">
          {/* Price & Title card */}
          <FadeIn delay={0.05}>
            <div className="bg-white rounded-[16px] border border-border/50 p-5">
              <h1 className="text-xl font-bold text-text tracking-tight leading-snug mb-2">{item.titulo}</h1>
              <p className={`text-2xl font-bold tracking-tight ${vendido ? 'text-text-secondary line-through' : 'text-primary'}`}>
                {item.preco}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs text-text-secondary">
                {item.condicao !== 'N/A' && (
                  <div className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5" />
                    {item.condicao}
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {item.localizacao}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {item.data}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Seller card */}
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-[16px] border border-border/50 p-5">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Anunciante</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-sm font-bold shadow-[var(--shadow-primary)]">
                  {item.usuarioAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text">{item.usuario}</p>
                  <p className="text-xs text-text-secondary truncate">{item.usuarioArea}</p>
                </div>
                {isOwner && (
                  <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Você</span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2.5 text-xs text-text-secondary">
                  <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{item.usuarioUnidade}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-text-secondary">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{item.usuarioEmail}</span>
                </div>
              </div>

              {/* Contact buttons */}
              {!isOwner && !vendido && (
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white rounded-[12px] text-sm font-semibold shadow-[var(--shadow-primary)]"
                  >
                    <Mail className="w-4 h-4" />
                    E-mail
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary/10 text-primary rounded-[12px] text-sm font-semibold"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Teams
                  </motion.button>
                </div>
              )}

              {!isOwner && vendido && (
                <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-[12px] text-sm text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-text-secondary/60" />
                  Item indisponível
                </div>
              )}
            </div>
          </FadeIn>

          {/* Owner actions */}
          {isOwner && (
            <FadeIn delay={0.15}>
              <div className="bg-white rounded-[16px] border border-border/50 p-5">
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Gerenciar Anúncio</h3>

                <div className="flex items-center gap-3 px-3 py-2.5 bg-bg/80 rounded-[12px] mb-3 text-xs text-text-secondary">
                  <Eye className="w-4 h-4" />
                  <span><strong className="text-text">{item.visualizacoes}</strong> visualizações</span>
                  <span className="mx-1">·</span>
                  <Heart className="w-4 h-4 text-red-400" />
                  <span><strong className="text-text">{likesCount}</strong> curtidas</span>
                </div>

                {!vendido ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowVendidoModal(true)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-accent to-accent-light text-white rounded-[12px] text-sm font-semibold shadow-[var(--shadow-accent)]"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Marcar como vendido
                  </motion.button>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-accent/10 rounded-[12px] text-sm font-medium text-accent-dark">
                    <CheckCircle2 className="w-4 h-4" />
                    Marcado como vendido
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          {/* Additional info */}
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-[16px] border border-border/50 p-5">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Informações</h3>
              <div className="space-y-0 divide-y divide-border/30">
                <div className="flex items-center justify-between py-2.5 first:pt-0">
                  <span className="text-xs text-text-secondary">Categoria</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${catColors[item.categoria]}`}>
                    <Tag className="w-2.5 h-2.5" />
                    {catLabels[item.categoria] || item.categoria}
                  </span>
                </div>
                {item.condicao !== 'N/A' && (
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-xs text-text-secondary">Condição</span>
                    <span className="text-xs font-medium text-text">{item.condicao}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-xs text-text-secondary">Localização</span>
                  <span className="text-xs font-medium text-text">{item.localizacao}</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-xs text-text-secondary">Publicado em</span>
                  <span className="text-xs font-medium text-text">{item.data}</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-xs text-text-secondary">Status</span>
                  {vendido ? (
                    <span className="text-xs font-semibold text-amber-600">Vendido</span>
                  ) : (
                    <span className="text-xs font-semibold text-accent">Disponível</span>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Related items */}
      {relacionados.length > 0 && (
        <FadeIn delay={0.25}>
          <div className="mt-8">
            <h2 className="text-lg font-bold text-text tracking-tight mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-primary to-primary-light rounded-full" />
              Anúncios similares
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relacionados.map((rel, i) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <Link to={`/marketplace/${rel.id}`}>
                    <div className="bg-white rounded-[16px] border border-border/50 overflow-hidden cursor-pointer group hover:shadow-[var(--shadow-lg)] transition-all duration-[250ms]">
                      {rel.imagem && (
                        <div className={`w-full h-32 bg-gradient-to-br ${catGradients[rel.categoria] || 'from-gray-50 to-gray-100'} flex items-center justify-center`}>
                          <ShoppingBag className={`w-8 h-8 ${catIconColors[rel.categoria] || 'text-gray-200'}`} />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-sm text-text group-hover:text-primary transition-colors duration-[250ms]">{rel.titulo}</h3>
                        <p className="text-base font-bold text-primary mt-1">{rel.preco}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {rel.usuario}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {rel.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {/* Confirm sold modal */}
      <AnimatePresence>
        {showVendidoModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowVendidoModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-[20px] shadow-[var(--shadow-xl)] w-full max-w-sm overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-accent" />
                </div>
                <h2 className="text-lg font-bold text-text tracking-tight mb-1">Marcar como vendido?</h2>
                <p className="text-sm text-text-secondary">
                  O anúncio "<strong>{item.titulo}</strong>" será marcado como vendido e não receberá mais contatos.
                </p>
              </div>
              <div className="flex gap-3 px-6 pb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowVendidoModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-text-secondary rounded-[12px] text-sm font-semibold hover:bg-gray-200 transition-colors duration-[250ms]"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMarcarVendido}
                  className="flex-1 py-2.5 bg-gradient-to-r from-accent to-accent-light text-white rounded-[12px] text-sm font-semibold shadow-[var(--shadow-accent)]"
                >
                  Confirmar
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Share toast */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 bg-sidebar text-white rounded-[12px] shadow-[var(--shadow-xl)] text-sm font-medium"
          >
            <CheckCircle2 className="w-4 h-4 text-accent-light" />
            Link copiado!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
