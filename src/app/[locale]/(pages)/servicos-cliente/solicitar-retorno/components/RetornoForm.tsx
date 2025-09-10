"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const RetornoForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Manipular mudanças nos campos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Aceita apenas números para telefone
      const onlyNumbers = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: onlyNumbers }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/request-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Verificar se o formulário é válido
  const isFormValid =
    formData.name && formData.email && formData.phone && formData.subject;

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
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Nome completo */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="name"
                placeholder="Nome completo"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              />
              <span className="text-primary">*</span>
            </div>

            {/* E-mail */}
            <div className="flex items-center gap-2">
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              />
              <span className="text-primary">*</span>
            </div>

            {/* Telefone */}
            <div className="flex items-center gap-2">
              <input
                type="tel"
                name="phone"
                placeholder="Telefone / Telemóvel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              />
              <span className="text-primary">*</span>
            </div>

            {/* Motivo */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="subject"
                placeholder="Motivo do contacto"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              />
              <span className="text-primary">*</span>
            </div>

            {/* Mensagem */}
            <div>
              <textarea
                name="message"
                placeholder="Deixe a sua mensagem"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              ></textarea>
              <p className="mt-2 text-sm text-foreground/60">
                <span className="text-primary">*</span> Campos Obrigatórios
              </p>
            </div>

            {/* Mensagens de status */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-100 text-green-700 rounded-md text-center"
              >
                Mensagem enviada com sucesso! Entraremos em contacto em breve.
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-100 text-red-700 rounded-md text-center"
              >
                Ocorreu um erro ao enviar a mensagem. Por favor, tente
                novamente.
              </motion.div>
            )}

            {/* Botão */}
            <motion.button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              whileHover={{ scale: isSubmitting || !isFormValid ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting || !isFormValid ? 1 : 0.98 }}
              className={`w-full py-3 rounded-full font-medium mt-6 shadow-md transition ${
                isSubmitting || !isFormValid
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-primary text-white hover:shadow-lg cursor-pointer"
              }`}
            >
              {isSubmitting ? "Enviando..." : "Solicitar Retorno"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default RetornoForm;
