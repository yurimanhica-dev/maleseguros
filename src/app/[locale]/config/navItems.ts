export interface NavItem {
  title: string; // chave de tradução
  path?: string;
  subItems?: {
    title?: string; // chave de tradução
    items: {
      name: string; // chave de tradução
      path: string;
    }[];
  }[];
}

export const navItems: NavItem[] = [
  {
    title: "Nav.Explorar",
    subItems: [
      {
        title: "Nav.AcessoRapido",
        items: [
          { name: "Nav.SimulacaoSeguro", path: "/simulacao-seguro" },
          { name: "Nav.RenovarApolice", path: "/seguros/renovar" },
          { name: "Nav.NossaEquipe", path: "/nossa-equipe" },
        ],
      },
      {
        title: "Nav.Sinistros",
        items: [
          { name: "Nav.ComunicarSinistro", path: "/sinistros/comunicar" },
          { name: "Nav.Documentos", path: "/sinistros/documentos" },
          {
            name: "Nav.OficinasReboques",
            path: "/sinistros/oficinas-reboques",
          },
        ],
      },
      {
        title: "Nav.ServicosCliente",
        items: [
          {
            name: "Nav.InformacoesUteis",
            path: "/servicos-cliente/informacoes",
          },
          {
            name: "Nav.SolicitarRetorno",
            path: "/servicos-cliente/solicitar-retorno",
          },
          { name: "Nav.Contactos", path: "/servicos-cliente/contactos" },
        ],
      },
    ],
  },
  { title: "Nav.Servicos", path: "/services" },
  { title: "Nav.SobreNos", path: "/about" },
  { title: "Nav.SeguroDigital", path: "/seguro-digital" },
];
