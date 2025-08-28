export const testimonials = [
  {
    id: 1,
    name: "Carlos Mendes",
    role: "Seguro Viagem",
    content:
      "Poder garantir a tranquilidade dos meus bens e familiares foi uma das melhores decisões que tomei.",
    avatar: "/Testimonials/test1.jpg",
  },
  {
    id: 2,
    name: "Ana Silva",
    role: "Seguro Patrimonial",
    content:
      "Em 15 minutos tinha uma proposta que outras seguradoras levavam dias para oferecer. Impressionante!",
    avatar: "/Testimonials/test2.jpg",
  },
  {
    id: 3,
    name: "João Pereira",
    role: "Seguro Saúde",
    content:
      "O atendimento humano fez toda diferença. Explicaram cada detalhe com paciência e clareza.",
    avatar: "/Testimonials/test3.jpg",
  },
];

export const slides = [
  {
    id: 1,
    title: "Quem é Protegido Vive Diferente",
    subtitle: "A diferença entre temer o futuro e estar pronto para ele",
    description:
      "Nossos clientes não vivem com medo do amanhã — eles vivem com a certeza de estarem preparados.",
    image: "/bg/umbre.jpg",
    cta: "Quero Viver Diferente",
  },
  {
    id: 2,
    title: "Seguro de Veículos Automóveis",
    subtitle: "Proteção total para seu veículo",
    description: "Coberturas completas com assistência 24 horas em todo o país",
    image: "/bg/bg_keys.jpg",
    cta: "Conhecer Planos",
  },
  {
    id: 3,
    title: "A Sombra que Protege Seu Patrimônio",
    subtitle: "Deixe o que é valioso sob a nossa sombra",
    description:
      "Com nossa cobertura personalizada, seu patrimônio fica resguardado para enfrentar imprevistos e crescer com segurança.",
    image: "/bg/bg-umbrela.webp",
    cta: "Falar com Especialista",
  },
];

interface NavItem {
  title: string;
  path?: string;
  subItems?: {
    title?: string;
    items: {
      name: string;
      path: string;
    }[];
  }[];
}

export const navItems: NavItem[] = [
  {
    title: "Explorar",
    subItems: [
      {
        title: "Acesso Rápido",
        items: [
          { name: "Simular um Seguro", path: "/seguros/simular" },
          { name: "Renovar Apólice", path: "/seguros/renovar" },
          { name: "Encontrar um Consultor", path: "/consultores" },
        ],
      },
      {
        title: "Sinistros",
        items: [
          { name: "Comunicar Sinistro", path: "/sinistros/comunicar" },
          { name: "Documentos", path: "/sinistros/documentos" },
          { name: "Oficinas e Reboques", path: "/sinistros/oficinas-reboques" },
        ],
      },
      {
        title: "Serviços ao Cliente",
        items: [
          { name: "Informações Úteis", path: "/servicos-cliente/informacoes" },
          {
            name: "Solicitar Retorno",
            path: "/servicos-cliente/solicitar-retorno",
          },
          { name: "Contactos", path: "/servicos-cliente/contactos" },
        ],
      },
    ],
  },
  {
    title: "Serviços",
    path: "/services",
  },
  {
    title: "Sobre Nós",
    path: "/about",
  },
  {
    title: "Seguro Digital",
    path: "/seguro-digital",
  },
];

export interface QuizQuestion {
  question: string;
  answers: string[];
  correct: number;
}
export const quizzes = [
  {
    question:
      "O que significa o princípio do mutualismo no contexto dos seguros?",
    answers: [
      "Garantia de retorno financeiro ao segurado",
      "Divisão coletiva dos riscos entre os participantes",
      "A seguradora compartilha lucros com todos os clientes",
    ],
    correct: 1,
  },
  {
    question: "Qual é o papel do resseguro no mercado de seguros?",
    answers: [
      "Cobrir riscos muito pequenos não assumidos pela seguradora",
      "Permitir que uma seguradora transfira parte de seus riscos para outra",
      "Emitir apólices diretamente aos segurados",
    ],
    correct: 1,
  },
  {
    question: "O que é um prêmio puro em uma apólice de seguro?",
    answers: [
      "Valor do imposto incluído na apólice",
      "Valor pago mensalmente pelo segurado sem cobertura",
      "Custo teórico do risco, sem despesas administrativas ou margem de lucro",
    ],
    correct: 2,
  },
  {
    question: "Na subscrição de seguros, o que o atuário avalia?",
    answers: [
      "A viabilidade jurídica da apólice",
      "A probabilidade de ocorrência e impacto do risco",
      "A identidade do corretor responsável",
    ],
    correct: 1,
  },
  {
    question: "Como a Lei dos Grandes Números beneficia o setor segurador?",
    answers: [
      "Permite lucro sem riscos",
      "Garante que todas as apólices sejam pagas",
      "Ajuda a prever riscos com mais precisão quanto maior o grupo segurado",
    ],
    correct: 2,
  },
  {
    question: "O que é sinistro moral (risco moral) no contexto do seguro?",
    answers: [
      "Roubo cometido pelo segurado",
      "Tendência de um segurado agir de forma imprudente por estar protegido",
      "Negação de sinistro pela seguradora",
    ],
    correct: 1,
  },
  {
    question: "Qual a função da SUSEP no mercado de seguros brasileiro?",
    answers: [
      "Vender apólices de seguros obrigatórios",
      "Supervisionar, regulamentar e fiscalizar o setor de seguros",
      "Emitir pareceres sobre sinistros em litígio",
    ],
    correct: 1,
  },
  {
    question:
      "Em qual situação a seguradora pode recusar o pagamento do sinistro?",
    answers: [
      "Quando o segurado atrasa o pagamento do prêmio",
      "Quando o evento não está previsto na apólice ou há dolo (fraude)",
      "Quando o valor segurado é alto",
    ],
    correct: 1,
  },
  {
    question: "O que é a cláusula de 'perda parcial' em seguros patrimoniais?",
    answers: [
      "A seguradora cobre apenas 50% dos danos",
      "Cobre somente os bens móveis",
      "Indica que o bem segurado sofreu danos, mas não foi destruído totalmente",
    ],
    correct: 2,
  },
  {
    question:
      "Como o índice de sinistralidade afeta as estratégias de uma seguradora?",
    answers: [
      "Afeta apenas os corretores de seguros",
      "É usado para definir reajustes e revisar políticas de aceitação de risco",
      "Define quais clientes receberão bônus",
    ],
    correct: 1,
  },
];

export const seguroConfig = {
  taxasLegais: [
    { nome: "ISSM", percentual: 2 }, // Imposto Moçambique
    { nome: "Taxa de Emissão", percentual: 0.5 },
  ],

  tipos: {
    auto: {
      taxaBase: 5, // % do valor do bem
      ajusteUso: {
        particular: 1,
        comercial: 1.25, // +25% para uso comercial
      },
      ajusteSinistros: 10, // +10% por sinistro
    },
    vida: {
      faixas: [
        { maxIdade: 30, percentual: 0.2 }, // 0.2% do valor da cobertura
        { maxIdade: 50, percentual: 0.35 },
        { maxIdade: Infinity, percentual: 0.5 },
      ],
    },
    saude: {
      taxaBase: 4, // % da cobertura anual
    },
    empresarial: {
      taxaBase: 3, // % do valor do património
    },
  },
};

// Dados dos valores da empresa
export const companyValues = [
  {
    id: "confianca",
    title: "Confiança",

    description:
      "Construímos relações baseadas na transparência e honestidade.",
    image: "/values/125041.jpg",
    content: {
      title: "Confiança que Constrói Futuros",
      description:
        "Há mais de 8 anos, temos sido o pilar de confiança para milhares de clientes, garantindo segurança e tranquilidade em cada contrato estabelecido.",
      features: [
        "Transparência total em todas as transações",
        "Honestidade como princípio fundamental",
        "Relações de longo prazo baseadas na confiança mútua",
      ],
    },
  },
  {
    id: "excelencia",
    title: "Excelência",
    description: "Buscamos sempre a máxima qualidade em nossos serviços.",
    image: "/values/120121.jpg",
    content: {
      title: "Excelência em Cada Detalhe",
      description:
        "Nossos padrões de qualidade são reconhecidos no mercado, com processos rigorosos que garantem serviços de alto nível para nossos clientes.",
      features: [
        "Processos rigorosos de controle de qualidade",
        "Equipe especializada e em constante capacitação",
        "Melhores práticas do mercado aplicadas",
      ],
    },
  },
  {
    id: "inovacao",
    title: "Inovação",
    description: "Adotamos as melhores tecnologias para servir melhor.",
    image: "/values/119174.jpg",
    content: {
      title: "Inovação que Transforma",
      description:
        "Estamos sempre na vanguarda das tendências do setor, implementando soluções tecnológicas que simplificam e tornam mais eficientes os serviços de corretagem.",
      features: [
        "Tecnologia de ponta em todas as operações",
        "Soluções personalizadas para cada cliente",
        "Adaptação contínua às mudanças do mercado",
      ],
    },
  },
  {
    id: "proximidade",
    title: "Proximidade",

    description: "Estamos sempre perto, oferecendo suporte personalizado.",
    image: "/values/126146.jpg",
    content: {
      title: "Proximidade que Faz a Diferença",
      description:
        "Valorizamos o contato direto e personalizado com cada cliente, entendendo suas necessidades específicas para oferecer as melhores soluções.",
      features: [
        "Atendimento personalizado e humanizado",
        "Canais de comunicação diretos e acessíveis",
        "Soluções adaptadas às reais necessidades",
      ],
    },
  },
];

export const COUNTRY_CODES = [
  { code: "+1", country: "USA/Canada" },
  { code: "+44", country: "UK" },
  { code: "+33", country: "França" },
  { code: "+49", country: "Alemanha" },
  { code: "+55", country: "Brasil" },
  { code: "+258", country: "Moçambique" },
  { code: "+34", country: "Espanha" },
  { code: "+27", country: "África do Sul" },
  { code: "+39", country: "Itália" },
  { code: "+7", country: "Rússia" },
  { code: "+81", country: "Japão" },
  { code: "+91", country: "Índia" },
] as const;

export type CountryCode = (typeof COUNTRY_CODES)[number]["code"];

export const steps = [
  {
    img: "/images/sinistros/acident.jpg",
    step: "Etapa 1: ",
    title: "Acidente",
    description: "Mantenha a calma e verifique se há feridos.",
  },
  {
    img: "/images/sinistros/emergencia.jpg",
    step: "Etapa 2: ",
    title: "Contacto",
    description: "Ligue imediatamente para os serviços de emergência.",
  },
  {
    img: "/images/sinistros/documentacao.jpg",
    step: "Etapa 3: ",
    title: "Documentação",
    description: "Recolha fotos, boletim e informações do local.",
  },
  {
    img: "/images/sinistros/abertura_sinistro.png",
    step: "Etapa 4: ",
    title: "Abertura de Sinistro",
    description: "Envie os documentos ou abra online em até 48h.",
  },
  {
    img: "/images/sinistros/resolucao.jpg",
    step: "Etapa 5: ",
    title: "Resolução",
    description: "Acompanhe o processo até a indenização.",
  },
];

export const oficinas = [
  {
    id: 1,
    img: "/images/Oficinas/oficina.jpg",
    nome: "Oficina Central Maputo",
    imagem: "/api/placeholder/400/300",
    telefone: "+258 84 123 4567",
    endereco: "Av. 25 de Setembro, nº 123, Maputo",
    rating: 4.8,
    especialidade: "Mecânica Geral e Elétrica",
    horario: "Seg-Sex: 7h30-18h | Sáb: 8h-13h",
  },
  {
    id: 2,
    img: "/images/Oficinas/autoservices.jpg",
    nome: "AutoServiço Matola",
    imagem: "/api/placeholder/400/300",
    telefone: "+258 86 765 4321",
    endereco: "Rua da Indústria, Matola",
    rating: 4.5,
    especialidade: "Chapa e Pintura",
    horario: "Seg-Sex: 8h-17h | Sáb: 8h-12h",
  },
  {
    id: 3,
    img: "/images/Oficinas/officina3.jpg",
    nome: "Mecânica Express",
    imagem: "/api/placeholder/400/300",
    telefone: "+258 87 654 3210",
    endereco: "Av. Julius Nyerere, Maputo",
    rating: 4.7,
    especialidade: "Manutenção Rápida",
    horario: "Seg-Sáb: 7h-19h",
  },
];

export const reboques = [
  {
    id: 1,
    nome: "Reboque 24h - Maputo",
    telefone: "+258 84 111 2222",
    disponibilidade: "24 horas",
  },
  {
    id: 2,
    nome: "Assistência Rápida",
    telefone: "+258 86 333 4444",
    disponibilidade: "24 horas",
  },
  {
    id: 4,
    nome: "Emergência Vial",
    telefone: "+258 82 777 8888",
    disponibilidade: "24 horas",
  },
];

export const documentos = {
  automovel: [
    {
      id: 1,
      nome: "Condições Gerais - Seguro Automóvel",
      descricao: "Documento com todas as condições do seguro automóvel",
      tamanho: "2.4 MB",
      formato: "PDF",
      data: "2024-03-15",
      categoria: "automovel",
      link: "/docs/condicoes-gerais-automovel.pdf",
      destacado: true,
    },
    {
      id: 2,
      nome: "Formulário de Sinistro Automóvel",
      descricao: "Formulário para comunicação de sinistro automóvel",
      tamanho: "1.1 MB",
      formato: "PDF",
      data: "2024-02-10",
      categoria: "automovel",
      link: "/docs/formulario-sinistro-automovel.pdf",
      destacado: false,
    },
    {
      id: 3,
      nome: "Guia de Assistência em Viagem",
      descricao: "Informações sobre assistência em viagem",
      tamanho: "3.2 MB",
      formato: "PDF",
      data: "2024-01-05",
      categoria: "automovel",
      link: "/docs/guia-assistencia-viagem.pdf",
      destacado: true,
    },
  ],
  habitacao: [
    {
      id: 4,
      nome: "Condições Gerais - Seguro Habitação",
      descricao: "Documento com todas as condições do seguro habitação",
      tamanho: "2.8 MB",
      formato: "PDF",
      data: "2024-03-20",
      categoria: "habitacao",
      link: "/docs/condicoes-gerais-habitacao.pdf",
      destacado: true,
    },
    {
      id: 5,
      nome: "Formulário de Sinistro Habitação",
      descricao: "Formulário para comunicação de sinistro habitação",
      tamanho: "1.3 MB",
      formato: "PDF",
      data: "2024-02-15",
      categoria: "habitacao",
      link: "/docs/formulario-sinistro-habitacao.pdf",
      destacado: false,
    },
  ],
  vida: [
    {
      id: 6,
      nome: "Condições Gerais - Seguro Vida",
      descricao: "Documento com todas as condições do seguro vida",
      tamanho: "3.1 MB",
      formato: "PDF",
      data: "2024-03-25",
      categoria: "vida",
      link: "/docs/condicoes-gerais-vida.pdf",
      destacado: true,
    },
    {
      id: 7,
      nome: "Questionário Médico",
      descricao: "Formulário de questionário médico para seguro vida",
      tamanho: "1.5 MB",
      formato: "PDF",
      data: "2024-02-20",
      categoria: "vida",
      link: "/docs/questionario-medico.pdf",
      destacado: false,
    },
  ],
  saude: [
    {
      id: 8,
      nome: "Condições Gerais - Seguro Saúde",
      descricao: "Documento com todas as condições do seguro saúde",
      tamanho: "2.9 MB",
      formato: "PDF",
      data: "2024-03-30",
      categoria: "saude",
      link: "/docs/condicoes-gerais-saude.pdf",
      destacado: true,
    },
    {
      id: 9,
      nome: "Rede de Prestadores",
      descricao: "Lista de hospitais e clínicas conveniadas",
      tamanho: "4.2 MB",
      formato: "PDF",
      data: "2024-02-25",
      categoria: "saude",
      link: "/docs/rede-prestadores.pdf",
      destacado: false,
    },
  ],
  empresarial: [
    {
      id: 10,
      nome: "Condições Gerais - Seguro Empresarial",
      descricao: "Documento com todas as condições do seguro empresarial",
      tamanho: "3.5 MB",
      formato: "PDF",
      data: "2024-04-05",
      categoria: "empresarial",
      link: "/docs/condicoes-gerais-empresarial.pdf",
      destacado: true,
    },
    {
      id: 11,
      nome: "Formulário de Sinistro Empresarial",
      descricao: "Formulário para comunicação de sinistro empresarial",
      tamanho: "1.7 MB",
      formato: "PDF",
      data: "2024-03-01",
      categoria: "empresarial",
      link: "/docs/formulario-sinistro-empresarial.pdf",
      destacado: false,
    },
    {
      id: 12,
      nome: "Formulário de Sinistro Empresarial",
      descricao: "Formulário para comunicação de sinistro empresarial",
      tamanho: "1.7 MB",
      formato: "PDF",
      data: "2024-03-01",
      categoria: "empresarial",
      link: "/docs/formulario-sinistro-empresarial.pdf",
      destacado: false,
    },
  ],
};

export const corretores = [
  {
    id: 1,
    nome: "Maria Santos",
    cargo: "Corretora Sénior",
    imagem: "/avatars/viria.jpg",
    telefone: "+258 84 123 4567",
    email: "maria.santos@male.com",
    linkedin: "https://linkedin.com/in/maria-santos",
    especialidade: "Seguros de Vida e Saúde",
  },
  {
    id: 2,
    nome: "João Maputo",
    cargo: "Corretor de Automóveis",
    imagem: "/avatars/2.jpg",
    telefone: "+258 86 765 4321",
    email: "joao.maputo@male.com",
    linkedin: "https://linkedin.com/in/joao-maputo",
    especialidade: "Seguros Automóvel e Responsabilidade Civil",
  },
  {
    id: 3,
    nome: "Ana Matola",
    cargo: "Especialista em Empresas",
    imagem: "/avatars/4.jpg",
    telefone: "+258 87 654 3210",
    email: "ana.matola@male.com",
    linkedin: "https://linkedin.com/in/ana-matola",
    especialidade: "Seguros Empresariais e Riscos de Engenharia",
  },
  {
    id: 4,
    nome: "Carlos Beira",
    cargo: "Consultor de Habitação",
    imagem: "/avatars/3.jpg",
    telefone: "+258 82 111 2222",
    email: "carlos.beira@male.com",
    linkedin: "https://linkedin.com/in/carlos-beira",
    especialidade: "Seguros Habitação e Multirriscos",
  },
  {
    id: 5,
    nome: "Sofia Pemba",
    cargo: "Gestora de Contas",
    imagem: "/avatars/viria.jpg",
    telefone: "+258 83 333 4444",
    email: "sofia.pemba@male.com",
    linkedin: "https://linkedin.com/in/sofia-pemba",
    especialidade: "Planos de Previdência e Investimentos",
  },
  {
    id: 6,
    nome: "Miguel Nampula",
    cargo: "Especialista em Riscos",
    imagem: "/avatars/1.jpg",
    telefone: "+258 85 555 6666",
    email: "miguel.nampula@male.com",
    linkedin: "https://linkedin.com/in/miguel-nampula",
    especialidade: "Análise de Riscos e Consultoria Especializada",
  },
];
