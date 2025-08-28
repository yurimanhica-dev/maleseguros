"use client";

import { motion, useInView } from "framer-motion";
import { Minus } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const preventionTips = [
  {
    icon: (
      <Image
        src="/icons/car_red.png"
        alt="car"
        width={50}
        height={50}
        className="text-primary"
      />
    ),
    title: "Segurança do Veiculo",
    description:
      "Reduza acidentes e sinistros mantendo seu veículo seguro e revisado.",
    details: [
      "Faça manutenção periódica.",
      "Use sempre cinto de segurança.",
      "Respeite limites de velocidade e sinalizações.",
      "Evite dirigir sob efeito de álcool ou substâncias.",
    ],
  },
  {
    icon: (
      <Image
        src="/icons/home_red.png"
        alt="home"
        width={50}
        height={50}
        className="text-primary"
      />
    ),
    title: "Proteção Residencial",
    description: "Minimize riscos e proteja sua residência.",
    details: [
      "Instale alarmes e câmeras de segurança.",
      "Tranque portas e janelas sempre.",
      "Evite deixar objetos de valor à vista.",
      "Tenha seguro residencial atualizado.",
    ],
  },
  {
    icon: (
      <Image
        src="/icons/shield_red.png"
        alt="shield"
        width={50}
        height={50}
        className="text-primary"
      />
    ),
    title: "Seguro Atualizado",
    description:
      "Mantenha suas apólices sempre alinhadas às suas necessidades.",
    details: [
      "Revise sua apólice regularmente.",
      "Atualize valores segurados de acordo com patrimônio.",
      "Informe mudanças de endereço ou veículos.",
      "Consulte seu corretor sobre coberturas adicionais.",
    ],
  },
  {
    icon: (
      <Image
        src="/icons/warning-triangle_red.png"
        alt="warning triangle"
        width={50}
        height={50}
        className="text-primary"
      />
    ),
    title: "Prevenção de Riscos",
    description:
      "Adote hábitos preventivos para reduzir exposição a sinistros.",
    details: [
      "Evite atividades de risco sem proteção adequada.",
      "Siga orientações de segurança no trabalho e trânsito.",
      "Tenha kit de primeiros socorros disponível.",
      "Mantenha documentos e contatos de emergência organizados.",
    ],
  },
];

const PreventionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="pt-24 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Dicas de <span className="text-primary">Prevenção</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Orientações detalhadas para evitar sinistros e reduzir riscos no seu
            dia a dia.
          </p>
        </motion.div>

        {/* Cards Grandes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {preventionTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 mb-4  shadow-xl border border-border/50 bg-card hover:shadow-2xl transition relative"
            >
              {/* Ícone colorido */}
              <div
                className={
                  "w-14 h-14 flex items-center justify-center mb-6  text-primary "
                }
              >
                {tip.icon}
              </div>

              {/* Título e descrição */}
              <h4 className="text-2xl font-bold text-foreground mb-3">
                {tip.title}
              </h4>
              <p className="text-foreground/70 mb-4">{tip.description}</p>

              {/* Lista de detalhes */}
              <ul className="space-y-1 text-foreground/60">
                {tip.details.map((detail, i) => (
                  <li key={i}>
                    <Minus className="w-4 h-4 inline-block mr-2 text-primary" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreventionSection;
