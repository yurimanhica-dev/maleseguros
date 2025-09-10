import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, phone: onlyNumbers });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subject: formData.subject || "Contacto Geral",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Mensagem enviada com sucesso! Entraremos em contacto em breve.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          subject: "",
        });

        setTimeout(() => setSubmitStatus({ type: null, message: "" }), 10000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Erro ao enviar mensagem. Tente novamente.",
        });

        setTimeout(() => setSubmitStatus({ type: null, message: "" }), 10000);
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: `Erro de conexão. Verifique sua internet e tente novamente. "${error}"`,
      });

      setTimeout(() => setSubmitStatus({ type: null, message: "" }), 10000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Verificar se o formulário é válido
  const isFormValid =
    formData.name && formData.email && formData.phone && formData.subject;

  return (
    <div className="max-w-4xl mx-auto md:p-10 p-4">
      {/* Mensagem de status */}
      {submitStatus.type && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            submitStatus.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome completo"
              className="w-full px-4 py-3 border-b border-border focus:border-primary outline-none bg-transparent"
              disabled={isSubmitting}
            />
            <span className="text-primary">*</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 border-b border-border focus:border-primary outline-none bg-transparent"
              disabled={isSubmitting}
            />
            <span className="text-primary">*</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="Telefone"
            className="w-full px-4 py-3 border-b border-border focus:border-primary outline-none bg-transparent"
            disabled={isSubmitting}
          />
          <span className="text-primary">*</span>
        </div>
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
        <div>
          <textarea
            name="message"
            value={formData.message}
            placeholder="Mensagem"
            rows={4}
            onChange={handleChange}
            className="w-full px-4 py-3 border-b border-border focus:border-primary outline-none bg-transparent"
            disabled={isSubmitting}
          ></textarea>
          <p className="text-sm mt-1">
            <span className="text-primary">*</span> Campos Obrigatórios
          </p>
        </div>
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
    </div>
  );
};

export default ContactForm;
