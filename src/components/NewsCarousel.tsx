import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Newspaper, Megaphone, CalendarCheck, Wheat } from 'lucide-react'

const slides = [
  {
    id: 1,
    type: 'noticia',
    typeLabel: 'Notícia',
    typeIcon: Newspaper,
    title: 'C.Vale bate recorde na safra 2025/2026',
    subtitle: 'Cooperativa registrou aumento de 18% na produção de soja em relação à safra anterior, consolidando sua posição como maior cooperativa do Paraná.',
    gradient: 'from-sidebar via-primary-dark to-primary',
    accent: 'bg-accent/20 text-accent-light',
  },
  {
    id: 2,
    type: 'comunicado',
    typeLabel: 'Comunicado',
    typeIcon: Megaphone,
    title: 'Nova política de home office aprovada',
    subtitle: 'A partir de junho, colaboradores administrativos poderão trabalhar remotamente até 3 dias por semana. Confira os detalhes e regras no portal RH.',
    gradient: 'from-primary-dark via-primary to-primary-light',
    accent: 'bg-white/20 text-white',
  },
  {
    id: 3,
    type: 'evento',
    typeLabel: 'Evento',
    typeIcon: CalendarCheck,
    title: 'Workshop de Inovação 2026 — Inscrições abertas',
    subtitle: '3 dias de imersão com palestrantes nacionais e internacionais. Vagas limitadas para colaboradores de todas as unidades. Inscreva-se até 25/05.',
    gradient: 'from-[#0E2A4A] via-primary-dark to-primary',
    accent: 'bg-emerald-400/20 text-emerald-300',
  },
  {
    id: 4,
    type: 'noticia',
    typeLabel: 'Notícia',
    typeIcon: Newspaper,
    title: 'Expansão: nova unidade em Mato Grosso do Sul',
    subtitle: 'C.Vale anuncia a construção de uma nova unidade de recebimento de grãos em Maracaju/MS, com previsão de inauguração para o segundo semestre de 2027.',
    gradient: 'from-sidebar via-[#1A3060] to-primary',
    accent: 'bg-amber-400/20 text-amber-300',
  },
]

export default function NewsCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent(prev => (prev + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(prev => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]
  const TypeIcon = slide.typeIcon

  return (
    <div className="relative overflow-hidden rounded-[16px] mb-6 group">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -80 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`bg-gradient-to-br ${slide.gradient} p-6 lg:p-8 text-white grain relative min-h-[220px] flex flex-col justify-center`}
        >
          {/* Blobs */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-accent/10 rounded-full blur-3xl animate-blob-delay" />
          <div className="absolute bottom-5 right-10 opacity-[0.04]">
            <Wheat className="w-32 h-32" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-3"
            >
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${slide.accent}`}>
                <TypeIcon className="w-3.5 h-3.5" />
                {slide.typeLabel}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-2xl font-bold mb-2 max-w-2xl leading-snug tracking-tight"
            >
              {slide.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/70 text-sm lg:text-base max-w-xl leading-relaxed"
            >
              {slide.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to={`/noticia/${slide.id}`}
                className="inline-block mt-4 px-5 py-2 bg-white/15 backdrop-blur-sm rounded-[12px] text-sm font-medium hover:bg-white/25 transition-colors duration-[250ms] border border-white/10"
              >
                Ler mais
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] hover:bg-black/40"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] hover:bg-black/40"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-2 rounded-full transition-all duration-[250ms] overflow-hidden"
            style={{ width: i === current ? 24 : 8 }}
          >
            <div className={`absolute inset-0 rounded-full transition-colors duration-[250ms] ${i === current ? 'bg-white' : 'bg-white/40 hover:bg-white/60'}`} />
            {i === current && (
              <motion.div
                className="absolute inset-0 bg-white/60 rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 6, ease: 'linear' }}
                key={`progress-${current}`}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
