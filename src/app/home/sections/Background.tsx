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
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
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
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="animate-bounce flex flex-col items-center">
            <span className="text-foreground text-md mb-2">Scroll</span>
            <svg
              className="w-6 h-6 text-foreground"
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
      </div>
    </section>
  );
}
