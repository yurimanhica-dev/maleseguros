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
  { title: "Nav.Home", path: "Routes.Home" },
  {
    title: "Nav.Explorar",
    subItems: [
      {
        title: "Nav.AcessoRapido",
        items: [
          { name: "Nav.SimulacaoSeguro", path: "Routes.SimulateInsurance" },
          { name: "Nav.RenovarApolice", path: "Routes.RenewPolicy" },
          { name: "Nav.NossaEquipe", path: "Routes.OurTeam" },
        ],
      },
      {
        title: "Nav.Sinistros",
        items: [
          { name: "Nav.ComunicarSinistro", path: "Routes.ReportClaim" },
          { name: "Nav.Documentos", path: "Routes.Documents" },
          {
            name: "Nav.OficinasReboques",
            path: "Routes.WorkshopsTows",
          },
        ],
      },
      {
        title: "Nav.ServicosCliente",
        items: [
          {
            name: "Nav.InformacoesUteis",
            path: "Routes.UsefulInformation",
          },
          {
            name: "Nav.SolicitarRetorno",
            path: "Routes.RequestCallback",
          },
          { name: "Nav.Contactos", path: "Routes.Contact" },
        ],
      },
    ],
  },
  { title: "Nav.Servicos", path: "Routes.Services" },
  { title: "Nav.SobreNos", path: "Routes.About" },
  // { title: "Nav.SeguroDigital", path: "Routes.DigitalInsurance" },
];
