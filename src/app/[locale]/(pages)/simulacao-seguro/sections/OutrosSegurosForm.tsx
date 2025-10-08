"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

const OutrosSegurosForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tipoSeguro: "",
    observacoes: "",
    consentimento: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Manipular mudanças nos campos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "phone") {
      // Aceita apenas números para telefone
      const onlyNumbers = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: onlyNumbers }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Manipular mudanças no select
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, tipoSeguro: value }));
  };

  // Fechar mensagem de status
  const closeStatusMessage = () => {
    setSubmitStatus("idle");
  };

  // Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/insurance-simulation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Limpar formulário
        setFormData({
          name: "",
          email: "",
          phone: "",
          tipoSeguro: "",
          observacoes: "",
          consentimento: false,
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
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.tipoSeguro &&
    formData.consentimento;

  return (
    <section className="bg-background" id="pedido-cotacao">
      <div className="max-w-5xl mx-auto c-space">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-foreground/70 max-w-2xl mx-auto mb-12 text-center"
        >
          Preencha o formulário com os seus dados e escolha o tipo de seguro que
          deseja cotar. Nossa equipa entrará em contacto em breve.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-background/40 shadow-xl p-6 md:p-10 max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Dados Pessoais */}
            <h4 className="text-lg font-semibold text-primary">
              Dados Pessoais
            </h4>

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

            {/* Telemóvel */}
            <div className="flex w-full items-center gap-2">
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

            {/* Tipo de Seguro */}
            <h4 className="text-lg font-semibold text-primary mt-10">
              Escolha o tipo de Seguro
            </h4>
            <Select
              value={formData.tipoSeguro}
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent text-foreground">
                <SelectValue placeholder="Selecione o tipo de seguro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vida">Seguro de Vida</SelectItem>
                <SelectItem value="saude">Seguro de Saúde</SelectItem>
                <SelectItem value="habitacao">Seguro Habitação</SelectItem>
                <SelectItem value="empresarial">Seguro Empresarial</SelectItem>
                <SelectItem value="viagem">Seguro de Viagem</SelectItem>
                <SelectItem value="automovel">Seguro Automóvel</SelectItem>
              </SelectContent>
            </Select>

            {/* Observações */}
            <div>
              <textarea
                name="observacoes"
                placeholder="Observações adicionais (ex.: valores, coberturas desejadas)"
                value={formData.observacoes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              ></textarea>
            </div>

            {/* Consentimento */}
            <div className="flex items-center gap-2 mt-6">
              <Checkbox
                name="consentimento"
                checked={formData.consentimento}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    consentimento: checked as boolean,
                  }))
                }
                required
              />
              <label className="text-sm font-medium text-foreground">
                Aceito ser contactado pela equipa da MALEseguros
              </label>
              <span className="text-primary">*</span>
            </div>

            {/* Mensagens de status */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-100 flex items justify-between text-green-700 rounded-md relative"
              >
                <div>
                  Pedido de cotação enviado com sucesso! Entraremos em contacto
                  em breve.
                </div>
                <button
                  type="button"
                  onClick={closeStatusMessage}
                  className="absolute top-3 right-3 text-green-700 hover:text-green-800 transition-colors cursor-pointer"
                  aria-label="Fechar mensagem"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-100 flex items  justify-between text-red-700 rounded-md relative"
              >
                <div>
                  Ocorreu um erro ao enviar o pedido de cotação. Por favor,
                  tente novamente.
                </div>
                <button
                  type="button"
                  onClick={closeStatusMessage}
                  className="absolute top-3 right-3 text-red-700 hover:text-red-800 transition-colors cursor-pointer"
                  aria-label="Fechar mensagem"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* Botão */}
            <motion.button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              whileHover={{ scale: isSubmitting || !isFormValid ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting || !isFormValid ? 1 : 0.98 }}
              className={`w-full py-3 rounded-full font-medium mt-10 shadow-md transition ${
                isSubmitting || !isFormValid
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-primary text-white hover:shadow-lg cursor-pointer"
              }`}
            >
              {isSubmitting ? "Enviando..." : "Solicitar Cotação"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default OutrosSegurosForm;
