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
    title: "Seguros",
    subItems: [
      {
        title: "Seguros Pessoais",
        items: [
          { name: "Automóvel", path: "/seguros/automovel" },
          { name: "Vida", path: "/seguros/vida" },
          { name: "Saúde", path: "/seguros/saude" },
          { name: "Habitação", path: "/seguros/habitacao" },
        ],
      },
      {
        title: "Seguros Empresariais",
        items: [
          { name: "Patrimonial", path: "/seguros/patrimonial" },
          {
            name: "Responsabilidade Civil",
            path: "/seguros/responsabilidade",
          },
          { name: "Riscos Especiais", path: "/seguros/riscos-especiais" },
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
    title: "Academia de Seguros",
    path: "/education",
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
