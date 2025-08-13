"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BackgroundFill() {
  return (
    <section className="relative w-full h-[600px] md:h-[500px]  text-white z-40">
      {/* Background full section */}
      <Image
        src="/bg/r.png"
        alt="Cliente MALEseguros feliz com sua casa protegida"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-top object-x-center z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex c-space flex-col h-full items-start justify-center gap-10">
        {/* Texto Principal */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6 container mx-auto c-space"
        >
          <h2 className="text-foreground/90 max-w-xl uppercase text-5xl font-extrabold leading-12">
            Consultoria Sem Custos Adicionais!
          </h2>
          <p className="mt-2 text-lg text-white/90 max-w-xl">
            Pague connosco, só pelo valor do seguro e nossa equipe de
            especialistas estará sempre ao dispor e prontos para ajudar em sua
            jornada completa de seguros, e por isso{" "}
            <span className="text-neutral-950 font-bold text-xl uppercase">
              não cobramos nada!
            </span>
          </p>
        </motion.div>

        {/* Placeholder para Logo ou Destaque */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-black z-50"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-lg text-white uppercase font-medium mb-2 text-nowrap">
              Deslize, nós temos mais
            </span>
            <div className="w-5 h-8 border-2 border-primary rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-1 h-2 bg-primary rounded-full mt-1"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
