"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const RetornoForm = () => {
  const [phone, setPhone] = useState("");

  // Aceita apenas números
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setPhone(onlyNumbers);
  };

  return (
    <section className="py-20 bg-background" id="solicitar-retorno">
      <div className="max-w-4xl mx-auto md:c-space">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl text-center uppercase font-bold text-foreground mb-6"
        >
          Ou Preencha os seus dados
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-foreground/70 c-space max-w-2xl mx-auto mb-12 text-center"
        >
          e a nossa equipa entrará em contacto consigo no menor tempo possível.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-background/40 shadow-xl p-6 md:p-10 max-w-2xl mx-auto rounded-xl"
        >
          <div className="space-y-6 text-left">
            {/* Nome completo */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Nome completo"
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              />
              <span className="text-primary">*</span>
            </div>

            {/* E-mail */}
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="E-mail"
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              />
              <span className="text-primary">*</span>
            </div>

            {/* Telefone */}
            <div className="flex items-center gap-2">
              <input
                type="tel"
                placeholder="Telefone / Telemóvel"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              />
              <span className="text-primary">*</span>
            </div>

            {/* Motivo */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Motivo do contacto"
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              />
            </div>

            {/* Mensagem */}
            <div>
              <textarea
                placeholder="Deixe a sua mensagem"
                rows={4}
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              ></textarea>
              <p className="mt-2 text-sm text-foreground/60">
                <span className="text-primary">*</span> Campos Obrigatórios
              </p>
            </div>

            {/* Botão */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white py-4 rounded-lg font-medium mt-6 shadow-md hover:shadow-lg transition"
            >
              Solicitar Retorno
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RetornoForm;
