import { motion } from 'motion/react'
import { Trophy, Megaphone } from 'lucide-react'
import { comunicados } from '../data/mock'

const iconMap: Record<string, React.ElementType> = { Trophy, Megaphone }

const badgeStyles: Record<string, string> = {
  conquista: 'bg-amber-100 text-amber-700',
  comunicado: 'bg-blue-100 text-blue-700',
}

export default function ComunicadosBanner() {
  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 border border-accent/20 p-4 mb-5">
      <div className="flex flex-col sm:flex-row gap-4">
        {comunicados.map((item, i) => {
          const Icon = iconMap[item.icon]
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 flex items-start gap-3 bg-white/70 rounded-lg p-3.5 backdrop-blur-sm"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                item.tipo === 'conquista'
                  ? 'bg-gradient-to-br from-amber-400 to-amber-500'
                  : 'bg-gradient-to-br from-primary to-primary-light'
              }`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeStyles[item.tipo]}`}>
                    {item.tipo === 'conquista' ? 'Conquista' : 'Comunicado'}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-text">{item.titulo}</h4>
                <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{item.descricao}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
