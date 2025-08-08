"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const features = [
  {
    title: "Preços Transparentes",
    description:
      "Acreditamos na clareza. Sem taxas ocultas, sem surpresas — apenas preços diretos e confiáveis.",
  },
  {
    title: "Atendimento ao Cliente 24/7",
    description:
      "Nossa equipe de suporte dedicada está disponível 24 horas por dia, 7 dias por semana, sempre que você precisar.",
  },
  {
    title: "Processo de Sinistro Sem Complicações",
    description:
      "Registrar um sinistro não deve ser estressante. Nosso processo simples garante que você esteja coberto sem complicações.",
  },
];

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-24 lg:pb-44 bg-background text-foreground relative overflow-hidden">
      {/* Decorative rotated overlays */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-[20rem] h-[20rem] bg-primary -translate-x-1/2 -translate-y-1/2 rotate-45 z-0"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-0 right-0 w-[20rem] h-[20rem] bg-primary translate-x-1/2 translate-y-1/2 rotate-45 z-0"
      />

      <div className="max-w-7xl c-space mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Textual Content */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="inline-flex text-sm uppercase items-center font-semibold px-4 py-2 bg-primary/10 text-primary rounded-full">
              Por que Escolher-nos
            </h2>
            <h3 className="text-5xl uppercase font-bold">
              Excelência em <span className="text-primary">Cada Apólice</span>
            </h3>
          </motion.div>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <motion.button
                  onClick={() =>
                    setActiveIndex(index === activeIndex ? null : index)
                  }
                  className="w-full text-left group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h4>

                  <AnimatePresence>
                    {index === activeIndex && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                          paddingTop: 0,
                          paddingBottom: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          paddingTop: "0.5rem",
                          paddingBottom: "0.5rem",
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          paddingTop: 0,
                          paddingBottom: 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-lg text-muted-foreground"
                        >
                          {feature.description}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Image with enhanced styling */}
        <motion.div
          className="relative w-full h-[360px] md:h-[440px]"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/bg/mee.jpg"
            alt="Meeting with insurance agent"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 right-0 w-[15rem] h-[15rem] bg-background translate-x-1/2 translate-y-1/2 rotate-45 z-0" />
        </motion.div>
      </div>
    </section>
  );
}
