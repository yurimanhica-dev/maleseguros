"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";

const differentials = [
  {
    title: "Empresa 100% Moçambicana",
    description:
      "Temos orgulho em ser locais, com padrões de serviço ao nível internacional.",
  },
  {
    title: "Experiência Garantida",
    description:
      "Colaboradores com longa experiência que asseguram seguros adequados ao seu risco.",
  },
  {
    title: "Acompanhamento Contínuo",
    description:
      "Estamos sempre em contacto, apoiando em sinistros e nas suas necessidades diárias.",
  },
  {
    title: "Defesa dos Seus Interesses",
    description:
      "A sua confiança é a nossa prioridade, protegendo o seu Male/Dinheiro/Riqueza.",
  },
];

export default function DifferentialSection2() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="relative md:h-[70vh] h-[800px] w-full overflow-hidden"
    >
      {/* Background Video - mantido exatamente como estava */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/help.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto c-space">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Coluna esquerda - Texto e CTA */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex-1 space-y-8"
            >
              <h2 className="text-4xl uppercase md:text-5xl font-bold text-white">
                Porquê escolher a{" "}
                <span className="text-primary ">MALEseguros</span>?
              </h2>

              <p className="text-lg text-gray-400 leading-relaxed">
                Somos uma empresa com serviço personalizado e colaboradores
                experientes que garantem seguros adequados ao risco. Estaremos
                sempre ao seu lado, defendendo os seus interesses, que para nós
                significam proteger o seu Male, Dinheiro e Riqueza.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-primary/30 transition-shadow"
                >
                  Simular um Seguro
                  <FaArrowRight />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 border border-border bg-card text-card-foreground px-6 py-3 rounded-full font-semibold shadow-md"
                >
                  Falar com Especialista
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="animate-bounce flex flex-col items-center">
          <span className="text-white font-bold mb-2">Scroll</span>
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
