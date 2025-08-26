"use client";

import { motion, useInView } from "framer-motion";
import { Clock, Download, FileText, Info } from "lucide-react";
import { useRef } from "react";

const usefulInfoItems = [
  {
    icon: <FileText className="w-6 h-6 text-primary" />,
    title: "Formulários e Documentos",
    description: "Baixe formulários de sinistro, declarações e contratos.",
    link: "/informacoes/documentos",
  },
  {
    icon: <Info className="w-6 h-6 text-primary" />,
    title: "Perguntas Frequentes",
    description: "Respostas às dúvidas mais comuns sobre apólices e sinistros.",
    link: "/informacoes/faq",
  },
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Dicas de Prevenção",
    description: "Orientações para evitar sinistros e reduzir riscos.",
    link: "/informacoes/prevenção",
  },
  {
    icon: <Download className="w-6 h-6 text-primary" />,
    title: "Simuladores e Calculadoras",
    description:
      "Ferramentas para estimar prêmios e escolher a melhor cobertura.",
    link: "/informacoes/ferramentas",
  },
];

export default function UsefulInfoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="pt-24 pb-16 bg-background"
      ref={ref}
      id="informacoes-uteis"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Informações <span className="text-primary">Úteis</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Aqui você encontra guias, formulários, dicas e ferramentas para
            tomar decisões mais seguras e informadas.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usefulInfoItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative flex flex-col p-6 bg-card rounded-2xl border border-border shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-foreground/70 mb-4">{item.description}</p>
              <span className="text-primary font-medium mt-auto inline-flex items-center gap-1 group-hover:underline">
                Acessar
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
