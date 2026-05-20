import { motion } from 'motion/react'
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'

const cotacoes = [
  { nome: 'Soja (sc 60kg)', valor: 'R$ 128,50', variacao: '+1.2%', positivo: true },
  { nome: 'Milho (sc 60kg)', valor: 'R$ 58,30', variacao: '-0.8%', positivo: false },
  { nome: 'Trigo (sc 60kg)', valor: 'R$ 82,10', variacao: '+0.5%', positivo: true },
  { nome: 'Dólar', valor: 'R$ 5,12', variacao: '-0.3%', positivo: false },
]

export default function CotacoesWidget() {
  return (
    <div className="bg-white rounded-[16px] border border-border/50 overflow-hidden">
      <div className="px-4 py-3 bg-gradient-to-r from-primary to-primary-dark flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white tracking-tight">Cotações do Dia</h3>
        <span className="text-[10px] text-white/60">19/05/2026</span>
      </div>
      <div className="divide-y divide-border/30">
        {cotacoes.map((item, i) => (
          <motion.div
            key={item.nome}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="flex items-center justify-between px-4 py-2.5 hover:bg-bg/50 transition-colors duration-[250ms]"
          >
            <div>
              <p className="text-sm font-medium text-text">{item.nome}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-text">{item.valor}</span>
              <span className={`flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                item.positivo
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-red-50 text-red-500'
              }`}>
                {item.positivo ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {item.variacao}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="px-4 py-2.5 border-t border-border/30">
        <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors duration-[250ms]">
          Ver todos os indicadores
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
