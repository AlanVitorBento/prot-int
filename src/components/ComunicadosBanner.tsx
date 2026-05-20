import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  Trophy,
  Megaphone,
  HeartPulse,
  Smile,
  ShoppingCart,
  UtensilsCrossed,
  TrendingUp,
  GraduationCap,
  Shield,
  Landmark,
  Gift,
} from 'lucide-react'
import { comunicados, beneficios } from '../data/mock'

const iconMap: Record<string, React.ElementType> = {
  Trophy, Megaphone, HeartPulse, Smile, ShoppingCart,
  UtensilsCrossed, TrendingUp, GraduationCap, Shield, Landmark,
}

const badgeStyles: Record<string, string> = {
  conquista: 'bg-amber-100 text-amber-700',
  comunicado: 'bg-blue-100 text-blue-700',
  beneficio: 'bg-rose-100 text-rose-700',
}

const badgeLabels: Record<string, string> = {
  conquista: 'Conquista',
  comunicado: 'Comunicado',
  beneficio: 'Benefício',
}

const iconGradients: Record<string, string> = {
  conquista: 'bg-gradient-to-br from-amber-400 to-amber-500',
  comunicado: 'bg-gradient-to-br from-primary to-primary-light',
  beneficio: 'bg-gradient-to-br from-rose-500 to-red-500',
}

const destaques = comunicados.filter(c => c.tipo !== 'beneficio')

export default function ComunicadosBanner() {
  const navigate = useNavigate()
  const [currentBeneficio, setCurrentBeneficio] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBeneficio(prev => (prev + 1) % beneficios.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const beneficio = beneficios[currentBeneficio]
  const BeneficioIcon = iconMap[beneficio.icon] || HeartPulse

  return (
    <div className="w-full rounded-[16px] bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 border border-accent/20 p-4 mb-5">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Left - Fixed destaque */}
        {destaques.slice(0, 1).map((item, i) => {
          const Icon = iconMap[item.icon]
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 flex items-start gap-3 bg-white/70 rounded-[12px] p-3.5 backdrop-blur-sm"
            >
              <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 ${iconGradients[item.tipo]}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeStyles[item.tipo]}`}>
                    {badgeLabels[item.tipo]}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-text">{item.titulo}</h4>
                <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{item.descricao}</p>
              </div>
            </motion.div>
          )
        })}

        {/* Right - Rotating benefits */}
        <div className="flex-1 relative min-h-[76px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBeneficio}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              onClick={() => navigate('/areas/rh?tab=beneficios')}
              className="flex items-start gap-3 bg-white/70 rounded-[12px] p-3.5 backdrop-blur-sm h-full cursor-pointer hover:bg-white/90 transition-colors duration-[250ms]"
            >
              <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${beneficio.cor}`}>
                <BeneficioIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeStyles.beneficio}`}>
                    <Gift className="w-2.5 h-2.5 inline mr-0.5 -mt-px" />
                    Benefício
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-text">{beneficio.nome}</h4>
                <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">{beneficio.detalhe} — {beneficio.descricao}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex justify-center gap-1 mt-2">
            {beneficios.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBeneficio(i)}
                className={`h-1 rounded-full transition-all duration-[250ms] ${
                  i === currentBeneficio ? 'w-4 bg-primary/60' : 'w-1.5 bg-primary/15'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
