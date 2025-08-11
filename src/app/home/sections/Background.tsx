"use client";

import Button from "@/app/components/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function BackgroundFill() {
  return (
    <section className="relative w-full h-[700px] md:h-[500px]  text-white z-40">
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
      <div className="relative z-20 flex flex-col lg:flex-row mx-auto h-full items-center justify-center gap-10 px-6 md:px-16 lg:px-32 ">
        {/* Texto Principal */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:w-1/2 space-y-6 text-start lg:text-left c-space"
        >
          <h2 className="text-background/90 uppercase text-5xl font-extrabold leading-14">
            Já se impressionou!
          </h2>
          <p className="mt-2 text-lg text-white/90">
            Hmm... chegou a hora de descobrir o verdadeiro sentido de proteção
            com a{" "}
            <span className="text-black/80 font-bold uppercase text-xl">
              MALEseguros
            </span>
            {""}. Aqui, a segurança não é apenas um serviço, é um compromisso
            com o que há de mais precioso na sua vida.
          </p>
          <Button
            onClick={() => {
              redirect("/sinistro");
            }}
            variant="secondary"
            rounded="full"
            size="md"
            className="font-semibold"
          >
            Participar um Sinistro
          </Button>
        </motion.div>

        {/* Placeholder para Logo ou Destaque */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="lg:w-1/2 flex items-center justify-center z-30"
        ></motion.div>

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
            <span className="text-lg text-white font-medium mb-2 text-nowrap">
              Deslize, nós temos mais.....
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
