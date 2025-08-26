"use client";

import Button from "@/app/components/Button";
import { motion } from "framer-motion";
import { FileText, Phone } from "lucide-react";
import { redirect } from "next/navigation";

const EmergencyCTA = () => {
  return (
    <div>
      {/* Emergency CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 bg-gradient-to-r from-primary to-primary/90 px-4 py-24 text-center text-white shadow-xl"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          Precisa de ajuda imediata?
        </h2>
        <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
          Nossa equipe de emergência está disponível 24 horas por dia, 7 dias
          por semana para auxiliá-lo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="tel:+258841234567"
            className="flex items-center justify-center px-4 py-3 bg-white text-primary rounded-full font-bold hover:bg-gray-100 transition-colors animate-pulse-glow"
          >
            <Phone className="w-5 h-5 mr-2" />
            Ligar para Emergência
          </a>
          <Button
            onClick={() => {
              redirect("/sinistro/comunicar");
            }}
            variant="secondary"
            icon={<FileText />}
            iconPosition="right"
            size="md"
            rounded="full"
            className="font-semibold"
          >
            Participar um Sinistro
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmergencyCTA;
