import { useParams, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Wheat,
  CalendarDays,
  Clock,
} from 'lucide-react'
import { FadeIn, ScrollReveal } from '../components/AnimatedCard'

const noticias: Record<string, {
  typeLabel: string
  title: string
  subtitle: string
  author: string
  authorRole: string
  authorAvatar: string
  date: string
  readTime: string
  content: string[]
  likes: number
  comments: number
}> = {
  '1': {
    typeLabel: 'Notícia',
    title: 'C.Vale bate recorde na safra 2025/2026',
    subtitle: 'Cooperativa registrou aumento de 18% na produção de soja em relação à safra anterior',
    author: 'Comunicação C.Vale',
    authorRole: 'Assessoria de Comunicação',
    authorAvatar: 'CV',
    date: '18 de maio de 2026',
    readTime: '4 min de leitura',
    content: [
      'A C.Vale Cooperativa Agroindustrial encerrou a safra 2025/2026 com números recordes, registrando um aumento de 18% na produção de soja em relação ao ciclo anterior. O resultado consolida a cooperativa como a maior do Paraná e uma das maiores do Brasil no segmento agroindustrial.',
      'O recorde foi possível graças à combinação de fatores climáticos favoráveis, investimentos em tecnologia de precisão e o trabalho dedicado dos cooperados em todas as 42 unidades da cooperativa.',
      'Segundo o diretor-presidente, "Esse resultado é fruto do compromisso de todos os nossos cooperados e colaboradores. A C.Vale vem investindo fortemente em inovação e tecnologia para garantir que nossos produtores tenham as melhores condições possíveis."',
      'Os investimentos em agricultura de precisão, incluindo o uso de drones para monitoramento de lavouras e sistemas de irrigação inteligente, foram fundamentais para o aumento da produtividade por hectare.',
      'Para a próxima safra, a cooperativa já anuncia novos investimentos em ampliação da capacidade de armazenamento e modernização das unidades de recebimento, garantindo infraestrutura adequada para acompanhar o crescimento da produção.',
    ],
    likes: 234,
    comments: 45,
  },
  '2': {
    typeLabel: 'Comunicado',
    title: 'Nova política de home office aprovada',
    subtitle: 'Colaboradores administrativos poderão trabalhar remotamente até 3 dias por semana',
    author: 'Maria Silva',
    authorRole: 'Diretora de RH',
    authorAvatar: 'MS',
    date: '17 de maio de 2026',
    readTime: '3 min de leitura',
    content: [
      'A diretoria da C.Vale aprovou a nova política de trabalho remoto que entrará em vigor a partir de junho de 2026. A iniciativa permite que colaboradores administrativos trabalhem remotamente até 3 dias por semana.',
      'A decisão foi tomada após um período de testes que demonstrou aumento na produtividade e satisfação dos colaboradores. A política se aplica aos cargos administrativos de todas as unidades da cooperativa.',
      'Para participar do programa, os colaboradores devem alinhar com seus gestores os dias de trabalho remoto, garantindo que a equipe mantenha presença mínima no escritório para reuniões e atividades presenciais.',
      'A cooperativa disponibilizará auxílio home office mensal para ajudar com custos de internet e energia, além de suporte técnico para garantir que todos tenham as ferramentas necessárias para trabalhar de casa.',
    ],
    likes: 156,
    comments: 32,
  },
  '3': {
    typeLabel: 'Evento',
    title: 'Workshop de Inovação 2026 — Inscrições abertas',
    subtitle: '3 dias de imersão com palestrantes nacionais e internacionais',
    author: 'Ana Costa',
    authorRole: 'Gerente de Inovação',
    authorAvatar: 'AC',
    date: '16 de maio de 2026',
    readTime: '3 min de leitura',
    content: [
      'Estão abertas as inscrições para o Workshop de Inovação C.Vale 2026! O evento acontecerá nos dias 22, 23 e 24 de maio no Centro de Eventos da cooperativa em Palotina.',
      'Nesta edição, o workshop contará com palestrantes renomados do Brasil e exterior, abordando temas como inteligência artificial aplicada ao agronegócio, agricultura regenerativa e novas tendências em cooperativismo.',
      'O evento é aberto a todos os colaboradores da C.Vale e as vagas são limitadas a 200 participantes. As inscrições podem ser realizadas através da plataforma até o dia 20 de maio.',
      'Confira a programação completa no calendário de eventos da plataforma. Não perca essa oportunidade de atualização e networking com profissionais de todo o Brasil!',
    ],
    likes: 89,
    comments: 18,
  },
  '4': {
    typeLabel: 'Notícia',
    title: 'Expansão: nova unidade em Mato Grosso do Sul',
    subtitle: 'Nova unidade de recebimento de grãos será construída em Maracaju/MS',
    author: 'Comunicação C.Vale',
    authorRole: 'Assessoria de Comunicação',
    authorAvatar: 'CV',
    date: '15 de maio de 2026',
    readTime: '5 min de leitura',
    content: [
      'A C.Vale Cooperativa Agroindustrial anuncia a construção de uma nova unidade de recebimento de grãos em Maracaju, Mato Grosso do Sul. O investimento de R$ 45 milhões está previsto para ser concluído no segundo semestre de 2027.',
      'A nova unidade terá capacidade de armazenamento de 120 mil toneladas e contará com tecnologia de ponta para classificação e secagem de grãos. O projeto inclui também um laboratório de análise de qualidade.',
      'A expansão faz parte do plano estratégico de crescimento da cooperativa para os próximos cinco anos, que prevê investimentos de mais de R$ 200 milhões em infraestrutura e tecnologia.',
      'A escolha de Maracaju se deu pela localização estratégica na região produtora de soja e milho do MS, além do crescente interesse de produtores locais em se associar à cooperativa.',
      'Com esta nova unidade, a C.Vale passará a contar com 43 unidades em operação em quatro estados brasileiros, reforçando sua presença no cenário agroindustrial nacional.',
    ],
    likes: 178,
    comments: 27,
  },
}

export default function Noticia() {
  const { id } = useParams()
  const noticia = noticias[id || '1']

  if (!noticia) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-text-secondary">Notícia não encontrada</p>
        <Link to="/" className="text-primary font-medium mt-2 inline-block hover:underline">Voltar ao início</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <FadeIn>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>
      </FadeIn>

      {/* Header image */}
      <FadeIn delay={0.1}>
        <div className="w-full h-56 lg:h-72 bg-gradient-to-br from-primary/10 via-bg to-accent/10 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden grain">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-blob-delay" />
          <Wheat className="w-16 h-16 text-primary/15 relative z-10" />
        </div>
      </FadeIn>

      {/* Badge + Title */}
      <FadeIn delay={0.15}>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
          {noticia.typeLabel}
        </span>
        <h1 className="text-2xl lg:text-3xl font-bold text-text mb-2 leading-snug">
          {noticia.title}
        </h1>
        <p className="text-lg text-text-secondary mb-4">{noticia.subtitle}</p>
      </FadeIn>

      {/* Author + Meta */}
      <FadeIn delay={0.2}>
        <div className="flex items-center gap-4 pb-5 mb-6 border-b border-border/50">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-semibold shadow-md shadow-primary/20">
            {noticia.authorAvatar}
          </div>
          <div className="flex-1">
            <p className="font-medium text-text">{noticia.author}</p>
            <p className="text-xs text-text-secondary">{noticia.authorRole}</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-text-secondary">
            <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {noticia.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {noticia.readTime}</span>
          </div>
        </div>
      </FadeIn>

      {/* Content */}
      <div className="space-y-5 mb-8">
        {noticia.content.map((paragraph, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <p className="text-text leading-relaxed">{paragraph}</p>
            {i === 1 && (
              <div className="w-full h-48 bg-gradient-to-br from-accent/5 via-bg to-primary/5 rounded-xl my-6 flex items-center justify-center">
                <Wheat className="w-12 h-12 text-accent/15" />
              </div>
            )}
          </ScrollReveal>
        ))}
      </div>

      {/* Actions */}
      <FadeIn delay={0.3}>
        <div className="flex items-center gap-3 py-4 border-t border-border/50">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-text-secondary hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Heart className="w-4 h-4" />
            {noticia.likes}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {noticia.comments} comentários
          </motion.button>
          <div className="flex-1" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-xl text-text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-xl text-text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>
      </FadeIn>

      {/* Comments section */}
      <ScrollReveal delay={0.1}>
        <div className="mt-6 bg-white rounded-xl border border-border/50 p-5">
          <h3 className="font-semibold text-text mb-4">Comentários ({noticia.comments})</h3>
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
              AB
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Escreva um comentário..."
                className="w-full px-4 py-2.5 bg-bg rounded-xl border border-border/50 text-sm
                  focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>
          </div>
          {[
            { avatar: 'MS', name: 'Maria Silva', role: 'Diretora de RH', text: 'Excelente resultado! Parabéns a todos os cooperados.', time: '2h atrás' },
            { avatar: 'CS', name: 'Carlos Souza', role: 'Coordenador de TI', text: 'A tecnologia de precisão fez toda a diferença nesta safra.', time: '3h atrás' },
            { avatar: 'AC', name: 'Ana Costa', role: 'Gerente de Inovação', text: 'Já estamos planejando novas soluções para a próxima safra!', time: '5h atrás' },
          ].map((comment, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-3 py-3 border-t border-border/30"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary/80 to-primary-dark rounded-full flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">
                {comment.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-text">{comment.name}</span>
                  <span className="text-xs text-text-secondary">{comment.time}</span>
                </div>
                <p className="text-sm text-text-secondary mt-0.5">{comment.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  )
}
