"use client";

import { motion } from "framer-motion";
import { MapPin, MessageCircle, Phone } from "lucide-react";

export const ContactCTA = () => {
  const contactOptions = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Chat Online",
      description: "Converse com um especialista",
      action: "Iniciar conversa",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Ligação Rápida",
      description: "Seg á Sex, das 9h às 18h",
      action: "Ligar agora",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Agendamento",
      description: " Visite-nos em Maputo, Moçambique",
      action: "Agendar visita",
    },
  ];

  return (
    <div className="relative w-full bg-gradient-to-t from-background to-accent/30 py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="text-[20vw] md:text-[14vw] font-bold tracking-tighter lg:py-24 opacity-50">
          <span
            className="block md:hidden"
            style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
          >
            DIGITAL SEGURO
          </span>
          <span className="hidden md:block whitespace-nowrap">
            SEGURO DIGITAL
          </span>
        </div>
      </motion.div>
      <div className="max-w-6xl mx-auto c-space">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-5xl font-bold uppercase tracking-tight text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Fale con{""}
            <span className=" text-primary">nosco</span>
          </motion.h2>
          <motion.p
            className="text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Nosso time está pronto para oferecer a melhor experiência em seguros
          </motion.p>
        </div>

        {/* Cards de Contato */}
        <div className="flex items-start justify-center flex-col md:flex-row  gap-8">
          {contactOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-transparent p-8 transition-all"
            >
              <div className="text-primary mb-4">{option.icon}</div>
              <h3 className="text-xl text-foreground font-medium mb-2">
                {option.title}
              </h3>
              <p className="text-gray-500 mb-6">{option.description}</p>
              <motion.button className="flex items-center gap-2 text-primary hover:underline font-medium">
                {option.action}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Formulário Minimalista */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 max-w-2xl mx-auto"
        >
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
            />
            <input
              type="email"
              placeholder="Seu email"
              className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
            />
            <textarea
              placeholder="Sua mensagem"
              rows={4}
              className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white py-4 rounded-lg font-medium"
            >
              Enviar mensagem
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
