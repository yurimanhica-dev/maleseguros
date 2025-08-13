import Button from "@/app/components/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

const EnterpriseServicesHero = () => {
  return (
    <section className="relative h-screen max-h-[700px] overflow-hidden">
      {/* Imagem de fundo com overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg/empresass.jpg"
          alt="Seguros particulares"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        {/* <div className="absolute inset-0 bg-black/20 mix-blend-multiply" /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Conteúdo sobreposto */}
      <div className="relative mt-14 z-10 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-start px-6 lg:px-12 lg:text-left"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-[var(--primary)] mb-2  lg:mx-0 rounded-full"
          />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            <span className="text-[var(--primary)]">Proteção Completa</span>
            <br />
            Para Sua Empresa e Colaboradores
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-white/90 max-w-3xl mb-8"
          >
            Oferecemos soluções completas para garantir a segurança, a
            continuidade e o crescimento do seu negócio. Nossos seguros
            empresariais são pensados para proteger seu patrimônio, operações,
            funcionários e responsabilidades, com planos flexíveis que se
            adaptam às necessidades da sua empresa e ao seu orçamento.
          </motion.p>

          <Button
            variant="primary"
            icon={<FiArrowRight />}
            iconPosition="right"
            size="md"
            rounded="full"
          >
            Encontar um Corrector
          </Button>
        </motion.div>
      </div>

      {/* Elementos decorativos animados */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-10 w-16 h-16 bg-[var(--primary)]/20 rounded-full blur-sm"
      />

      <motion.div
        animate={{
          x: [0, 30, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-20 w-24 h-24 border-2 border-[var(--primary)]/30 rounded-full"
      />
    </section>
  );
};

export default EnterpriseServicesHero;
