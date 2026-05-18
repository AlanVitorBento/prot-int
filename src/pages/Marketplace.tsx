import { useState } from 'react'
import { motion } from 'motion/react'
import { Search, Tag, MapPin, Clock, ShoppingBag } from 'lucide-react'
import { FadeIn, ScrollReveal, HoverCard } from '../components/AnimatedCard'
import { marketplace } from '../data/mock'

const categorias = [
  { value: 'todos', label: 'Todos' },
  { value: 'vendas', label: 'Vendas' },
  { value: 'aluguel', label: 'Aluguel' },
  { value: 'veiculos', label: 'Veículos' },
  { value: 'servicos', label: 'Serviços' },
  { value: 'eventos', label: 'Eventos' },
]

const catColors: Record<string, string> = {
  vendas: 'bg-blue-100 text-blue-700',
  aluguel: 'bg-emerald-100 text-emerald-700',
  veiculos: 'bg-purple-100 text-purple-700',
  servicos: 'bg-amber-100 text-amber-700',
  eventos: 'bg-pink-100 text-pink-700',
}

const catGradients: Record<string, string> = {
  vendas: 'from-blue-50 to-sky-50',
  aluguel: 'from-emerald-50 to-green-50',
  veiculos: 'from-purple-50 to-violet-50',
  servicos: 'from-amber-50 to-yellow-50',
  eventos: 'from-pink-50 to-rose-50',
}

export default function Marketplace() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('todos')

  const filtered = marketplace.filter(item => {
    const matchBusca = item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      item.descricao.toLowerCase().includes(busca.toLowerCase())
    const matchCat = categoria === 'todos' || item.categoria === categoria
    return matchBusca && matchCat
  })

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col overflow-hidden">
      <FadeIn>
        <h1 className="text-2xl font-bold text-text mb-1">Marketplace</h1>
        <p className="text-text-secondary text-sm mb-6">Compre, venda e ofereça serviços para colegas da cooperativa</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar anúncios..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/80 rounded-xl border border-border/50 text-sm
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:bg-white transition-all duration-300"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categorias.map(cat => (
              <motion.button
                key={cat.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategoria(cat.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                  ${categoria === cat.value
                    ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-md shadow-primary/20'
                    : 'bg-white border border-border/50 text-text-secondary hover:bg-gray-50'
                  }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto pr-1 content-start">
        {filtered.map((item, i) => (
          <ScrollReveal key={item.id} delay={i * 0.06}>
            <HoverCard>
              <div className="bg-white rounded-xl border border-border/50 overflow-hidden cursor-pointer group transition-all duration-300">
                {item.imagem && (
                  <div className={`w-full h-44 bg-gradient-to-br ${catGradients[item.categoria] || 'from-gray-50 to-gray-100'} flex items-center justify-center`}>
                    <ShoppingBag className="w-10 h-10 text-primary/15" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${catColors[item.categoria]}`}>
                      <Tag className="w-3 h-3" />
                      {categorias.find(c => c.value === item.categoria)?.label}
                    </span>
                  </div>
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors">{item.titulo}</h3>
                  <p className="text-sm text-text-secondary mt-1 line-clamp-2 leading-relaxed">{item.descricao}</p>
                  <p className="text-lg font-bold text-primary mt-2">{item.preco}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <div className="flex items-center gap-1.5 text-text-secondary text-xs">
                      <MapPin className="w-3 h-3" />
                      {item.usuario}
                    </div>
                    <div className="flex items-center gap-1.5 text-text-secondary text-xs">
                      <Clock className="w-3 h-3" />
                      {item.data}
                    </div>
                  </div>
                </div>
              </div>
            </HoverCard>
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-48 glass rounded-xl grain"
        >
          <ShoppingBag className="w-8 h-8 text-primary/30 mb-2" />
          <p className="text-text-secondary text-sm">Nenhum anúncio encontrado</p>
        </motion.div>
      )}
    </div>
  )
}
