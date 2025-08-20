"use client";

import { companyValues } from "@/app/utils/types";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Minus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
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
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.5 } },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};
export default function QuemSomos() {
  const [activeValue, setActiveValue] = useState(companyValues[0].id);

  const selectedValue = companyValues.find((value) => value.id === activeValue);

  return (
    <section className="relative py-24 bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Coluna de conteúdo */}
          <div className="space-y-8">
            <motion.div variants={item} className="space-y-4">
              <div className="inline-flex  items-center uppercase px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium">
                <span>Nossos Valores Fundamentais</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                <span className="block">Mais de 8 Anos de</span>
                <span className="block text-[var(--primary)]">
                  Excelência e Inovação
                </span>
              </h2>

              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                Nossa corretora é guiada por valores sólidos que garantem
                segurança e confiança a cada cliente atendido.
              </p>

              {/* Botões dos valores */}
              <motion.div
                variants={item}
                className="flex flex-wrap justify-between items-center gap-3 mt-6"
              >
                {companyValues.map((value) => (
                  <button
                    key={value.id}
                    onClick={() => setActiveValue(value.id)}
                    className={`flex uppercase items-center gap-2 px-4 py-2  text-sm font-medium transition-all ${
                      activeValue === value.id
                        ? "underline text-[var(--primary)]"
                        : "text-[var(--secondary-foreground)]"
                    }`}
                  >
                    {value.title}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Coluna visual - Conteúdo dinâmico baseado no valor selecionado */}
          <motion.div
            variants={item}
            className="relative h-[500px]  overflow-hidden shadow-2xl"
          >
            <AnimatePresence>
              <motion.div
                key={activeValue}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative h-full w-full"
              >
                <Image
                  src={selectedValue?.image || "/default-image.jpg"}
                  alt={selectedValue?.content.title || "Imagem"}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-black/60" />

                {/* Conteúdo textual */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeValue + "-content"}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute bottom-0 left-0 right-0 md:p-8 p-4 text-white"
                  >
                    <motion.h3 className="text-2xl uppercase md:text-3xl font-extrabold mb-3">
                      {selectedValue?.content.title}
                    </motion.h3>

                    <motion.p className="mb-6 text-lg opacity-90 leading-relaxed">
                      {selectedValue?.content.description}
                    </motion.p>

                    <motion.ul className="space-y-3">
                      {selectedValue?.content.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.4 }}
                          className="flex items-start"
                        >
                          <Minus className="w-6 h-6 text-[var(--primary)] mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-base">{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
