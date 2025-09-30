export interface NavItem {
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

export const navItemsPT: NavItem[] = [
  {
    title: "Explorar",
    subItems: [
      {
        title: "Acesso Rápido",
        items: [
          { name: "Simulação de Seguro", path: "/simulacao-seguro" },
          { name: "Renovar Apólice", path: "/seguros/renovar" },
          { name: "Nossa Equipe", path: "/nossa-equipe" },
        ],
      },
      {
        title: "Gestão de Sinistros",
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
  { title: "Serviços", path: "/services" },
  { title: "Sobre Nós", path: "/about" },
  { title: "Seguro Digital", path: "/seguro-digital" },
];
