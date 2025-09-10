import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pt", "ts"],

  // // Paths por locale
  pathnames: {
    "/": { en: "/", pt: "/" },
    "/simulacao-seguro": {
      en: "/insurance-simulation",
      pt: "/simulacao-seguro",
    },
    "/seguros/renovar": { en: "/insurance/renew", pt: "/seguros/renovar" },
    "/nossa-equipe": { en: "/our-team", pt: "/nossa-equipe" },
    "/sinistros/comunicar": {
      en: "/claims/report",
      pt: "/sinistros/comunicar",
    },
    "/sinistros/documentos": {
      en: "/claims/documents",
      pt: "/sinistros/documentos",
    },
    "/sinistros/oficinas-reboques": {
      en: "/claims/workshops-towing",
      pt: "/sinistros/oficinas-reboques",
    },
    "/servicos-cliente/informacoes": {
      en: "/customer-service/infomation",
      pt: "/servicos-cliente/informacoes",
    },
    "/servicos-cliente/solicitar-retorno": {
      en: "/customer-service/request-call",
      pt: "/servicos-cliente/solicitar-retorno",
    },
    "/servicos-cliente/contactos": {
      en: "/customer-service/contacts",
      pt: "/servicos-cliente/contactos",
    },
    "/services": { en: "/services", pt: "/servicos" },
    "/about": { en: "/about-us", pt: "/sobre-nos" },
    "/seguro-digital": { en: "/digital-insurance", pt: "/seguro-digital" },
  },

  defaultLocale: "pt",
});
