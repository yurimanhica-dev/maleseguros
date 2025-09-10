/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DocumentUpload } from "@/app/[locale]/components/DocumentUpload";
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
import { useRef, useState } from "react";

const SinistroForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    policyNumber: "",
    sinistroType: "",
    sinistroDate: "",
    sinistroLocation: "",
    terceirosEnvolvidos: false,
    description: "",
  });

  const [documents, setDocuments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const documentUploadRef = useRef<any>(null);

  // Fechar mensagem de status
  const closeStatusMessage = () => {
    setSubmitStatus("idle");
  };

  // Manipular mudanças nos campos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: onlyNumbers }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Manipular mudanças no select
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, sinistroType: value }));
  };

  // Manipular upload de documentos
  const handleDocumentsChange = (files: File[]) => {
    setDocuments(files);
  };

  // Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Criar FormData para enviar arquivos
      const formDataToSend = new FormData();

      // Adicionar dados do formulário
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });

      // Adicionar documentos
      documents.forEach((file) => {
        formDataToSend.append(`documents`, file);
      });

      const response = await fetch("/api/report", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Limpar formulário
        setFormData({
          name: "",
          email: "",
          phone: "",
          policyNumber: "",
          sinistroType: "",
          sinistroDate: "",
          sinistroLocation: "",
          terceirosEnvolvidos: false,
          description: "",
        });
        // Limpar documentos
        setDocuments([]);
        if (documentUploadRef.current) {
          documentUploadRef.current.clearFiles();
        }
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
    formData.policyNumber &&
    formData.sinistroType &&
    formData.sinistroDate &&
    formData.sinistroLocation;

  return (
    <section className="py-20 bg-background" id="comunicar-sinistro">
      <div className="max-w-5xl mx-auto c-space">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl text-center uppercase font-bold text-foreground mb-6"
        >
          OU Preencha o formulário abaixo
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-foreground/70 max-w-2xl mx-auto mb-12 text-center"
        >
          com as informações necessárias e a nossa equipa entrará em contacto
          consigo no menor tempo possível.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-background/40 shadow-xl p-6 md:p-10 max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Dados do Segurado */}
            <h4 className="text-lg font-semibold text-primary">
              Dados do Segurado
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
            <div className="flex flex-col w-full md:items-center sm:flex-row gap-2">
              <div className="flex w-full items-center flex-row">
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
            </div>

            {/* Número da Apólice */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="policyNumber"
                placeholder="Número da Apólice"
                value={formData.policyNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              />
              <span className="text-primary">*</span>
            </div>

            {/* Detalhes do Sinistro */}
            <h4 className="text-lg font-semibold text-primary mt-10">
              Detalhes do Sinistro
            </h4>

            {/* Tipo de Sinistro */}
            <div className="flex items-center gap-2">
              <Select
                value={formData.sinistroType}
                onValueChange={handleSelectChange}
                required
              >
                <SelectTrigger className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent text-foreground">
                  <SelectValue placeholder="Tipo de Sinistro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automovel">Acidente Automóvel</SelectItem>
                  <SelectItem value="incendio">Incêndio</SelectItem>
                  <SelectItem value="roubo">Roubo</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-primary">*</span>
            </div>

            {/* Data do Sinistro */}
            <div className="flex items-center gap-2">
              <input
                type="date"
                name="sinistroDate"
                placeholder="Data do Sinistro"
                value={formData.sinistroDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              />
              <span className="text-primary">*</span>
            </div>

            {/* Local e Checkbox */}
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="sinistroLocation"
                  placeholder="Local do Sinistro"
                  value={formData.sinistroLocation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
                />
                <span className="text-primary">*</span>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <Checkbox
                  name="terceirosEnvolvidos"
                  checked={formData.terceirosEnvolvidos}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      terceirosEnvolvidos: checked as boolean,
                    }))
                  }
                />
                <label className="text-sm font-medium text-foreground">
                  Houve terceiros envolvidos?
                </label>
              </div>
            </div>

            {/* Ocorrido */}
            <div>
              <textarea
                name="description"
                placeholder="Descreva o ocorrido"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              ></textarea>
              <p>
                <span className="text-primary">*</span> Campos Obrigatórios
              </p>
            </div>

            {/* Upload */}
            <DocumentUpload
              ref={documentUploadRef}
              onDocumentsChange={handleDocumentsChange}
            />

            {/* Mensagens de status */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-100 flex items-center justify-between text-green-700 rounded-md relative"
              >
                <div>
                  Sinistro comunicado com sucesso! Entraremos em contacto em
                  breve.
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
                className="p-3 bg-red-100 flex items-center justify-between text-red-700 rounded-md relative"
              >
                <div>
                  Ocorreu um erro ao comunicar o sinistro. Por favor, tente
                  novamente.
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
              {isSubmitting ? "Enviando..." : "Enviar Comunicação"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default SinistroForm;
