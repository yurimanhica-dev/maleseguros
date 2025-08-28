"use client";

import Button from "@/app/components/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiPhoneCall } from "react-icons/fi";

const RetornoHeader = () => {
  return (
    <section className="pt-18 pb-4">
      <motion.h2
        initial={{ opacity: 0, y: -5 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl text-center c-space uppercase font-bold text-foreground mb-10"
      >
        Solicitar Retorno
      </motion.h2>
      <div className="container mx-auto c-space flex flex-col md:flex-row items-center gap-4">
        {/* Coluna do texto */}
        <div className="flex-1 space-y-2 text-lg">
          <div className="flex flex-col items-start gap-2">
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex uppercase mb-4 items-center font-semibold px-4 py-2 bg-secondary/90 text-primary rounded-full"
            >
              <span className="font-medium text-sm">
                Estamos Sempre Aqui Para Ajudar
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-foreground/70 max-w-md"
            >
              Tem alguma dúvida ou gostaria de obter mais informações? Solicite
              um retorno e a nossa equipa entrará em contacto para esclarecer
              todas as suas questões.
            </motion.p>
            <Button
              variant="primary"
              icon={<FiPhoneCall className="w-6 h-6" />}
              iconPosition="left"
              className="mt-4"
              rounded="full"
            >
              <a href="tel:+258 214 184 39">Solicitar Retorno</a>
            </Button>
          </div>
        </div>

        {/* Coluna da imagem */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 3 }}
          className="flex-1 relative w-full h-96"
        >
          <Image
            src="/images/servicos-cliente/duvida.jpg"
            alt="Comunicação de Sinistro"
            fill
            className="w-full h-auto shadow-lg object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default RetornoHeader;
