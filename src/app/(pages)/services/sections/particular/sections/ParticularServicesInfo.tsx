import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const ParticularServicesInfo = () => {
  const [activeTab, setActiveTab] = useState<"vida" | "nao-vida">("vida");

  const insuranceTypes = {
    vida: [
      {
        title: "Seguro de Vida",
        desc: "proteção financeira para sua família em caso de imprevistos;",
      },
      {
        title: "Seguro de Saúde",
        desc: "acesso rápido a atendimento médico de qualidade;",
      },
      {
        title: "Seguro de Acidentes Pessoais",
        desc: "cobertura para incapacidades temporárias ou permanentes;",
      },
      {
        title: "Seguro de Doenças Graves",
        desc: "proteção financeira em caso de diagnóstico de doenças críticas;",
      },
    ],
    "nao-vida": [
      {
        title: "Seguro Automóvel",
        desc: "cobertura contra acidentes, roubo, incêndio e danos a terceiros;",
      },
      {
        title: "Seguro Residencial",
        desc: "proteção contra furtos, incêndios, danos elétricos e desastres naturais;",
      },
      {
        title: "Seguro de Viagem",
        desc: "assistência médica e suporte durante suas viagens;",
      },
      {
        title: "Seguro de Responsabilidade Civil",
        desc: "proteção contra danos involuntários causados a terceiros;",
      },
    ],
  };

  return (
    <section className="relative bg-[var(--background)] text-[var(--foreground)] overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Container principal com flex */}
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Conteúdo textual - flex item */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 max-w-2xl lg:max-w-none"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-[var(--primary)] mb-4 rounded-full"
          />

          <h1 className="text-4xl md:text-5xl font-bold mb-6 ">
            <span className="text-[var(--primary)]">Nossas Opções</span> de
            Seguro para Particulares
          </h1>

          {/* Tabs Interativas */}
          <div className="flex mb-6 border-b border-[var(--border)]">
            <button
              onClick={() => setActiveTab("vida")}
              className={`px-4 py-2 font-medium text-sm md:text-base relative ${
                activeTab === "vida"
                  ? "text-[var(--primary)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              Vida
              {activeTab === "vida" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
            <span className="mt-2 text-[var(--muted-foreground)]">|</span>
            <button
              onClick={() => setActiveTab("nao-vida")}
              className={`px-4 py-2 font-medium text-sm md:text-base relative ${
                activeTab === "nao-vida"
                  ? "text-[var(--primary)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              Não Vida
              {activeTab === "nao-vida" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8 text-lg text-foreground/90"
          >
            <ul className="space-y-1">
              {insuranceTypes[activeTab].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="text-[var(--primary)] mr-2 mt-1">•</span>
                  <div>
                    <strong>{item.title}</strong> - {item.desc}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Imagem com efeito - flex item */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:flex-1 w-full h-80 md:h-96 lg:h-[500px] overflow-hidden relative"
        >
          <Image
            src={activeTab === "vida" ? "/bg/liability.jpg" : "/bg/trav.jpg"}
            alt={activeTab === "vida" ? "Seguros de vida" : "Seguros não vida"}
            fill
            className="object-cover object-center"
            quality={100}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute top-0 left-0 w-[15rem] h-[15rem] bg-background -translate-x-1/2 -translate-y-1/2 rotate-45 z-0" />
        </motion.div>
      </div>

      {/* Elementos decorativos */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-10 w-16 h-16 bg-[var(--primary)]/10 rounded-full blur-md"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-20 w-24 h-24 border-4 border-[var(--primary)]/30 rounded-full"
      />
    </section>
  );
};

export default ParticularServicesInfo;
