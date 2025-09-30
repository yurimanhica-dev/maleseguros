"use client";

import { motion } from "framer-motion";
import { Clock, Mail, Wrench } from "lucide-react";
import Image from "next/image";

const InsuranceLogin = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/60 rounded-full mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/40 rounded-full mix-blend-multiply animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-primary/80 rounded-full mix-blend-multiply animate-pulse delay-2000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-20 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-xs rounded-2xl shadow-2xl p-8 md:p-12 "
        >
          {/* Icon */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative inline-flex">
              <div className="w-24 h-24 bg-gradient-to-r from-primary/60 to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                <Wrench className="w-12 h-12 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 border-4 border-primary border-t-transparent rounded-full"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-6 uppercase"
          >
            Em Desenvolvimento
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl text-foreground-700 mb-8 max-w-md mx-auto"
          >
            Estamos trabalhando duro para trazer uma nova experiência incrível
            para você. Volte em breve!
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            <div className="flex items-center justify-center space-x-3 p-4 bg-foreground/70 rounded-md">
              <Clock className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-background">
                Disponível em Breve
              </span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 bg-foreground/70 rounded-md">
              <Mail className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-background">
                info@maleseguros.com
              </span>
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ delay: 0.6, duration: 2, ease: "easeOut" }}
            className="h-2 bg-gradient-to-r from-primary/40 to-primary/80 rounded-full mx-auto mb-2"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-sm text-foreground/70"
          >
            Progresso: 60%
          </motion.p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-foreground/70 text-sm">
            © {new Date().getFullYear()} MALEseguros. Todos os direitos
            reservados.
          </p>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-10 opacity-20"
      >
        <Image
          src="/icons/shield.png"
          alt="Shield"
          width={100}
          height={100}
          className="w-16 h-16 md:w-24 md:h-24"
        />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-10 right-1/4 opacity-15"
      >
        <Image
          src="/icons/insurance.png"
          alt="Insurance"
          width={80}
          height={80}
          className="w-12 h-12 md:w-16 md:h-16"
        />
      </motion.div>
    </section>
  );
};

export default InsuranceLogin;
