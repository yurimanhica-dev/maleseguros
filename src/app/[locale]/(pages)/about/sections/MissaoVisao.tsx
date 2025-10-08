"use client";

import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function MissaoVisao() {
  return (
    <section className="relative py-24 bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
        >
          {/* Missão */}
          <motion.div variants={item} className="space-y-5">
            <div className="inline-flex items-center px-4 py-2 bg-[var(--primary)] text-white text-sm uppercase font-medium">
              Missão
            </div>

            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Garantir Soluções que Geram Confiança
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  A nossa missão é oferecer soluções inovadoras e acessíveis que
                  contribuam para a segurança, eficiência e crescimento
                  sustentável dos nossos Clientes, com base em ética, tecnologia
                  e compromisso humano.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Visão */}
          <motion.div variants={item} className="space-y-5">
            <div className="inline-flex items-center px-4 py-2 bg-[var(--primary)] text-white text-sm uppercase font-medium">
              Visão
            </div>

            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Ser Referência em Inovação e Confiança
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  Pretendemos ser reconhecidos como um grupo que transforma
                  desafios em oportunidades, promovendo impacto positivo nas
                  comunidades e excelência nas soluções que entregamos.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
