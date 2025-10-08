"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ContactForm from "../../(pages)/servicos-cliente/contactos/components/ContactForm";
import { contactOptions } from "../../config/contactCTA";

export const ContactCTA = () => {
  const t = useTranslations("HomePage");

  return (
    <div className="relative w-full bg-gradient-to-t from-background via-accent to-background py-24 overflow-hidden z-20">
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
            {t("ContactCTA.ds")}
          </span>
          <span className="hidden md:block whitespace-nowrap">
            {t("ContactCTA.sd")}
          </span>
        </div>
      </motion.div>
      <div className="max-w-6xl mx-auto c-space">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("ContactCTA.Title")}
            <span className=" text-primary"></span>
          </motion.h2>
          <motion.p
            className="text-foreground/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t("ContactCTA.Subtitle")}
          </motion.p>
        </div>

        {/* Cards de Contato */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-transparent p-8 transition-all"
              >
                <div className="text-primary mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl text-foreground font-medium mb-2">
                  {t(option.title)}
                </h3>
                <p className="text-foreground/70 mb-6">
                  {t(option.description)}
                </p>
                <motion.a
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary cursor-pointer hover:underline font-medium"
                >
                  {t(option.action)}
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
                </motion.a>
              </motion.div>
            );
          })}
        </div>

        {/* Formulário Minimalista */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-8">
            {t("ContactCTA.SendMessageTitle")}
          </h3>
          {/*
          <div className="space-y-6">
            <input
              type="text"
              placeholder={t("ContactCTA.Form.NamePlaceholder")}
              className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
            />
            <input
              type="email"
              placeholder={t("ContactCTA.Form.EmailPlaceholder")}
              className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
            />
            <div className="flex items-center gap-2">
              <Select
                value={formData.subject}
                onValueChange={handleSelectChange}
                disabled={isSubmitting}
              >
                <SelectTrigger className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent text-foreground">
                  <SelectValue placeholder="Assunto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pedido de Seguros">Seguros</SelectItem>
                  <SelectItem value="Proposta de Investimentos">
                    Investimentos
                  </SelectItem>
                  <SelectItem value="Reclamação">Reclamação</SelectItem>
                  <SelectItem value="Contacto Geral">Contacto Geral</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-primary">*</span>
            </div>
            <textarea
              placeholder={t("ContactCTA.Form.MessagePlaceholder")}
              rows={4}
              className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white py-4 rounded-lg font-medium"
            >
              {t("ContactCTA.Form.SendButton")}
            </motion.button>
          </div> 
          */}
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
};
