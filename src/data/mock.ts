export const feedPosts = [
  {
    id: 1,
    type: 'noticia' as const,
    title: 'Nova política de home office aprovada',
    description: 'A partir de junho, colaboradores poderão trabalhar remotamente até 3 dias por semana. Confira os detalhes da nova política.',
    author: 'Maria Silva',
    authorRole: 'Diretora de RH',
    authorAvatar: 'MS',
    date: '2h atrás',
    likes: 45,
    comments: 12,
    image: true,
  },
  {
    id: 2,
    type: 'comunicado' as const,
    title: 'Manutenção programada nos sistemas',
    description: 'No próximo sábado, das 22h às 06h, os sistemas SAP e SuccessFactors ficarão indisponíveis para manutenção preventiva.',
    author: 'Carlos Souza',
    authorRole: 'Coordenador de TI',
    authorAvatar: 'CS',
    date: '5h atrás',
    likes: 8,
    comments: 3,
    image: false,
  },
  {
    id: 3,
    type: 'evento' as const,
    title: 'Workshop de Inovação 2026',
    description: 'Inscrições abertas para o Workshop de Inovação! Serão 3 dias de imersão com palestrantes nacionais e internacionais.',
    author: 'Ana Costa',
    authorRole: 'Gerente de Inovação',
    authorAvatar: 'AC',
    date: '1 dia atrás',
    likes: 67,
    comments: 24,
    image: true,
  },
  {
    id: 4,
    type: 'canal' as const,
    title: 'Novo canal: Sustentabilidade',
    description: 'Criamos um canal dedicado a iniciativas de sustentabilidade. Participe das discussões e compartilhe suas ideias!',
    author: 'Roberto Lima',
    authorRole: 'Analista Ambiental',
    authorAvatar: 'RL',
    date: '2 dias atrás',
    likes: 32,
    comments: 9,
    image: false,
  },
]

export const aniversariantes = [
  { nome: 'João Pedro', area: 'Comercial', dia: 'Hoje' },
  { nome: 'Fernanda Alves', area: 'RH', dia: 'Hoje' },
  { nome: 'Lucas Martins', area: 'TI', dia: 'Amanhã' },
]

export const eventosProximos = [
  { titulo: 'Workshop Inovação', data: '22 Mai', local: 'Auditório' },
  { titulo: 'Town Hall Q2', data: '28 Mai', local: 'Online' },
  { titulo: 'Happy Hour', data: '30 Mai', local: 'Terraço' },
]

export const atalhos = [
  { nome: 'Holerite', icon: 'FileText' as const },
  { nome: 'Ponto', icon: 'Clock' as const },
  { nome: 'SAP', icon: 'Database' as const },
  { nome: 'SuccessFactors', icon: 'GraduationCap' as const },
  { nome: 'Teams', icon: 'MessageSquare' as const },
  { nome: 'Power BI', icon: 'BarChart3' as const },
]

export const canais = [
  { id: 1, nome: 'RH', descricao: 'Recursos Humanos, benefícios e desenvolvimento', membros: 234, icon: 'Users', cor: '#2563EB' },
  { id: 2, nome: 'TI', descricao: 'Tecnologia, sistemas e suporte técnico', membros: 189, icon: 'Monitor', cor: '#7C3AED' },
  { id: 3, nome: 'Comercial', descricao: 'Vendas, metas e resultados comerciais', membros: 156, icon: 'TrendingUp', cor: '#059669' },
  { id: 4, nome: 'Desenvolvimento', descricao: 'Desenvolvimento de software e projetos', membros: 98, icon: 'Code', cor: '#EA580C' },
  { id: 5, nome: 'Inovação', descricao: 'Ideias, projetos inovadores e tendências', membros: 145, icon: 'Lightbulb', cor: '#D97706' },
  { id: 6, nome: 'Eventos', descricao: 'Eventos internos, workshops e treinamentos', membros: 312, icon: 'Calendar', cor: '#DC2626' },
]

export const pessoas = [
  { id: 1, matricula: '10245', nome: 'Maria Silva', cargo: 'Diretora de RH', area: 'Recursos Humanos', unidade: 'Palotina - Matriz', gestor: 'Pedro Santos', email: 'maria.silva@cvale.com.br', ramal: '2001', avatar: 'MS' },
  { id: 2, matricula: '10312', nome: 'Carlos Souza', cargo: 'Coordenador de TI', area: 'Tecnologia da Informação', unidade: 'Palotina - Matriz', gestor: 'Ana Costa', email: 'carlos.souza@cvale.com.br', ramal: '2045', avatar: 'CS' },
  { id: 3, matricula: '10089', nome: 'Ana Costa', cargo: 'Gerente de Inovação', area: 'Inovação e Tecnologia', unidade: 'Palotina - Matriz', gestor: 'Pedro Santos', email: 'ana.costa@cvale.com.br', ramal: '2010', avatar: 'AC' },
  { id: 4, matricula: '10567', nome: 'Roberto Lima', cargo: 'Analista Ambiental', area: 'Sustentabilidade', unidade: 'Assis Chateaubriand', gestor: 'Maria Silva', email: 'roberto.lima@cvale.com.br', ramal: '3012', avatar: 'RL' },
  { id: 5, matricula: '10678', nome: 'Fernanda Alves', cargo: 'Analista de RH', area: 'Recursos Humanos', unidade: 'Palotina - Matriz', gestor: 'Maria Silva', email: 'fernanda.alves@cvale.com.br', ramal: '2003', avatar: 'FA' },
  { id: 6, matricula: '10890', nome: 'Lucas Martins', cargo: 'Desenvolvedor Full Stack', area: 'Tecnologia da Informação', unidade: 'Palotina - Matriz', gestor: 'Carlos Souza', email: 'lucas.martins@cvale.com.br', ramal: '2048', avatar: 'LM' },
  { id: 7, matricula: '10134', nome: 'Juliana Pereira', cargo: 'Gerente Comercial', area: 'Comercial', unidade: 'Cascavel', gestor: 'Pedro Santos', email: 'juliana.pereira@cvale.com.br', ramal: '4001', avatar: 'JP' },
  { id: 8, matricula: '10445', nome: 'Marcos Oliveira', cargo: 'Analista de BI', area: 'Tecnologia da Informação', unidade: 'Palotina - Matriz', gestor: 'Carlos Souza', email: 'marcos.oliveira@cvale.com.br', ramal: '2050', avatar: 'MO' },
  { id: 9, matricula: '10923', nome: 'Patrícia Mendes', cargo: 'Analista de RH', area: 'Recursos Humanos', unidade: 'Cascavel', gestor: 'Maria Silva', email: 'patricia.mendes@cvale.com.br', ramal: '4015', avatar: 'PM' },
  { id: 10, matricula: '10111', nome: 'Pedro Santos', cargo: 'Diretor Presidente', area: 'Diretoria', unidade: 'Palotina - Matriz', gestor: '-', email: 'pedro.santos@cvale.com.br', ramal: '2000', avatar: 'PS' },
  { id: 11, matricula: '11045', nome: 'Renata Campos', cargo: 'Coordenadora Comercial', area: 'Comercial', unidade: 'Marechal Cândido Rondon', gestor: 'Juliana Pereira', email: 'renata.campos@cvale.com.br', ramal: '5001', avatar: 'RC' },
  { id: 12, matricula: '11200', nome: 'Felipe Araújo', cargo: 'Desenvolvedor Full Stack', area: 'Tecnologia da Informação', unidade: 'Palotina - Matriz', gestor: 'Carlos Souza', email: 'felipe.araujo@cvale.com.br', ramal: '2049', avatar: 'FA' },
]

export const sistemas = [
  { id: 1, nome: 'SAP', categoria: 'ERP', icon: 'Database', favorito: true },
  { id: 2, nome: 'SuccessFactors', categoria: 'RH', icon: 'GraduationCap', favorito: true },
  { id: 3, nome: 'BI RH', categoria: 'Analytics', icon: 'BarChart3', favorito: false },
  { id: 4, nome: 'Chamados', categoria: 'Suporte', icon: 'Headphones', favorito: true },
  { id: 5, nome: 'Teams', categoria: 'Comunicação', icon: 'MessageSquare', favorito: true },
  { id: 6, nome: 'Power BI', categoria: 'Analytics', icon: 'PieChart', favorito: false },
  { id: 7, nome: 'SharePoint', categoria: 'Documentos', icon: 'FolderOpen', favorito: false },
  { id: 8, nome: 'Jira', categoria: 'Projetos', icon: 'ClipboardList', favorito: false },
  { id: 9, nome: 'Confluence', categoria: 'Documentos', icon: 'BookOpen', favorito: false },
  { id: 10, nome: 'Portal RH', categoria: 'RH', icon: 'Users', favorito: true },
  { id: 11, nome: 'E-mail', categoria: 'Comunicação', icon: 'Mail', favorito: true },
  { id: 12, nome: 'VPN', categoria: 'Infraestrutura', icon: 'Shield', favorito: false },
]

export const areasDeNegocio = [
  { id: 'rh', nome: 'Recursos Humanos', sigla: 'RH', descricao: 'Benefícios, treinamentos, desenvolvimento de pessoas', icon: 'Users', cor: '#2563EB', gradient: 'from-blue-500 to-blue-700' },
  { id: 'ti', nome: 'Tecnologia da Informação', sigla: 'TI', descricao: 'Sistemas, segurança, tutoriais e suporte', icon: 'Monitor', cor: '#7C3AED', gradient: 'from-violet-500 to-violet-700' },
  { id: 'comercial', nome: 'Comercial', sigla: 'Comercial', descricao: 'Metas, resultados, clientes e estratégias', icon: 'TrendingUp', cor: '#059669', gradient: 'from-emerald-500 to-emerald-700' },
  { id: 'agricola', nome: 'Agrícola', sigla: 'Agrícola', descricao: 'Safra, técnicas de cultivo, cotações agrícolas', icon: 'Wheat', cor: '#D97706', gradient: 'from-amber-500 to-amber-700' },
]

export const artigosAreas = [
  { id: 1, areaId: 'rh', titulo: 'Novo plano de saúde: o que muda para você', resumo: 'Confira as principais mudanças no plano de saúde corporativo, incluindo cobertura ampliada e novos conveniados em todas as unidades.', autor: 'Maria Silva', data: '15 Mai 2026', categoria: 'Benefícios', leitura: '3 min' },
  { id: 2, areaId: 'rh', titulo: 'Calendário de treinamentos do 2º semestre', resumo: 'Programação completa de capacitações para o segundo semestre, incluindo trilhas de liderança e cursos técnicos.', autor: 'Fernanda Alves', data: '12 Mai 2026', categoria: 'Treinamentos', leitura: '5 min' },
  { id: 3, areaId: 'rh', titulo: 'Como solicitar férias pelo portal', resumo: 'Passo a passo atualizado para solicitar suas férias pelo SuccessFactors, incluindo prazos e regras.', autor: 'Patrícia Mendes', data: '10 Mai 2026', categoria: 'Férias', leitura: '2 min' },
  { id: 4, areaId: 'ti', titulo: 'Dicas de segurança: proteja sua conta', resumo: 'Boas práticas para manter suas credenciais seguras e evitar ataques de phishing no ambiente corporativo.', autor: 'Carlos Souza', data: '14 Mai 2026', categoria: 'Segurança', leitura: '4 min' },
  { id: 5, areaId: 'ti', titulo: 'Tutorial: novo módulo do SAP', resumo: 'Guia completo para utilizar o novo módulo de compras do SAP, com capturas de tela e dicas práticas.', autor: 'Lucas Martins', data: '11 Mai 2026', categoria: 'Tutoriais', leitura: '6 min' },
  { id: 6, areaId: 'ti', titulo: 'Atualização dos sistemas corporativos', resumo: 'Resumo das atualizações realizadas em maio nos sistemas SAP, SuccessFactors e Power BI.', autor: 'Felipe Araújo', data: '8 Mai 2026', categoria: 'Sistemas', leitura: '3 min' },
  { id: 7, areaId: 'comercial', titulo: 'Resultados do Q1 2026: superamos a meta!', resumo: 'O primeiro trimestre fechou com 112% da meta de vendas. Confira os destaques por região.', autor: 'Juliana Pereira', data: '13 Mai 2026', categoria: 'Resultados', leitura: '4 min' },
  { id: 8, areaId: 'comercial', titulo: 'Novos clientes na região Sul', resumo: 'Três novas cooperativas parceiras foram fechadas no Rio Grande do Sul, ampliando nossa presença.', autor: 'Renata Campos', data: '9 Mai 2026', categoria: 'Clientes', leitura: '3 min' },
  { id: 9, areaId: 'agricola', titulo: 'Safra 2026/27: perspectivas e planejamento', resumo: 'Análise das condições climáticas e projeções de produtividade para a próxima safra de soja e milho.', autor: 'Roberto Lima', data: '16 Mai 2026', categoria: 'Safra', leitura: '5 min' },
  { id: 10, areaId: 'agricola', titulo: 'Técnicas de manejo para milho safrinha', resumo: 'Orientações técnicas para maximizar a produtividade do milho safrinha, com foco em adubação e controle de pragas.', autor: 'Roberto Lima', data: '7 Mai 2026', categoria: 'Técnicas', leitura: '7 min' },
]

export const documentosAreas = [
  { id: 1, areaId: 'rh', nome: 'Manual de Benefícios 2026.pdf', tipo: 'pdf', tamanho: '2.4 MB', modificado: '10 Mai 2026', autor: 'Maria Silva' },
  { id: 2, areaId: 'rh', nome: 'Calendário de Treinamentos.xlsx', tipo: 'xlsx', tamanho: '156 KB', modificado: '12 Mai 2026', autor: 'Fernanda Alves' },
  { id: 3, areaId: 'rh', nome: 'Política de Férias.pdf', tipo: 'pdf', tamanho: '890 KB', modificado: '5 Mai 2026', autor: 'Patrícia Mendes' },
  { id: 4, areaId: 'ti', nome: 'Guia de Segurança da Informação.pdf', tipo: 'pdf', tamanho: '3.1 MB', modificado: '14 Mai 2026', autor: 'Carlos Souza' },
  { id: 5, areaId: 'ti', nome: 'Procedimento de Abertura de Chamado.docx', tipo: 'docx', tamanho: '420 KB', modificado: '8 Mai 2026', autor: 'Lucas Martins' },
  { id: 6, areaId: 'ti', nome: 'Inventário de Equipamentos.xlsx', tipo: 'xlsx', tamanho: '1.2 MB', modificado: '6 Mai 2026', autor: 'Felipe Araújo' },
  { id: 7, areaId: 'comercial', nome: 'Relatório Q1 2026.pptx', tipo: 'pptx', tamanho: '5.8 MB', modificado: '13 Mai 2026', autor: 'Juliana Pereira' },
  { id: 8, areaId: 'comercial', nome: 'Tabela de Preços Atualizada.xlsx', tipo: 'xlsx', tamanho: '210 KB', modificado: '9 Mai 2026', autor: 'Renata Campos' },
  { id: 9, areaId: 'agricola', nome: 'Planejamento Safra 2026-27.pdf', tipo: 'pdf', tamanho: '4.2 MB', modificado: '16 Mai 2026', autor: 'Roberto Lima' },
  { id: 10, areaId: 'agricola', nome: 'Manual de Manejo - Milho Safrinha.pdf', tipo: 'pdf', tamanho: '6.1 MB', modificado: '7 Mai 2026', autor: 'Roberto Lima' },
  { id: 11, areaId: 'agricola', nome: 'Análise de Solo - Resultados.xlsx', tipo: 'xlsx', tamanho: '340 KB', modificado: '3 Mai 2026', autor: 'Roberto Lima' },
]

export const comunicados = [
  { id: 1, tipo: 'conquista' as const, titulo: 'Meta de produção atingida!', descricao: 'Superamos a meta de recebimento de grãos do 1º trimestre em 18%. Parabéns a todos os cooperados!', icon: 'Trophy' },
  { id: 2, tipo: 'comunicado' as const, titulo: 'Novo plano de saúde disponível', descricao: 'A partir de junho, o novo plano com cobertura ampliada estará disponível para adesão de todos os colaboradores.', icon: 'Megaphone' },
]

export const marketplace = [
  { id: 1, titulo: 'Apartamento 2 quartos', categoria: 'aluguel', descricao: 'Apartamento mobiliado, 2 quartos, próximo ao escritório central. Condomínio incluso.', preco: 'R$ 1.800/mês', usuario: 'João Pedro', data: '2 dias atrás', imagem: true },
  { id: 2, titulo: 'Honda Civic 2024', categoria: 'veiculos', descricao: 'Honda Civic EXL, 15.000km, único dono, todas as revisões na concessionária.', preco: 'R$ 142.000', usuario: 'Fernanda Alves', data: '3 dias atrás', imagem: true },
  { id: 3, titulo: 'Notebook Dell Inspiron', categoria: 'vendas', descricao: 'Dell Inspiron 15, i7, 16GB RAM, 512GB SSD. Estado de novo, pouco uso.', preco: 'R$ 3.200', usuario: 'Lucas Martins', data: '5 dias atrás', imagem: true },
  { id: 4, titulo: 'Aulas de Inglês', categoria: 'servicos', descricao: 'Professor certificado Cambridge, aulas individuais ou em grupo. Horários flexíveis.', preco: 'R$ 80/hora', usuario: 'Ana Costa', data: '1 semana atrás', imagem: false },
  { id: 5, titulo: 'Churrasco Beneficente', categoria: 'eventos', descricao: 'Churrasco beneficente para arrecadar fundos para o projeto social da empresa.', preco: 'R$ 50', usuario: 'Roberto Lima', data: '1 semana atrás', imagem: true },
  { id: 6, titulo: 'Bicicleta Speed', categoria: 'vendas', descricao: 'Bicicleta speed Caloi Strada, quadro alumínio, 21 marchas. Perfeita para pedal.', preco: 'R$ 1.500', usuario: 'Marcos Oliveira', data: '2 semanas atrás', imagem: true },
]
