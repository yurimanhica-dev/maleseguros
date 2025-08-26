"use client";

import { DocumentUpload } from "@/app/components/DocumentUpload";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useState } from "react";

const SinistroForm = () => {
  const [phone, setPhone] = useState("");
  const [tipoSinistro, setTipoSinistro] = useState<string>("");

  // Aceita apenas números
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setPhone(onlyNumbers);
  };

  return (
    <section className="py-20 bg-background" id="comunicar-sinistro">
      <div className="max-w-5xl mx-auto md:c-space">
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
          <div className="space-y-6 text-left">
            {/* Dados do Segurado */}
            <h4 className="text-lg font-semibold text-primary">
              Dados do Segurado
            </h4>

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

            {/* Telemóvel */}
            <div className="flex flex-col w-full md:items-center sm:flex-row gap-2">
              {/* <Select
                value={prefix}
                onValueChange={(value) => setPrefix(value as CountryCode)}
              >
                <SelectTrigger className="sm:w-fit w-full py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent text-foreground">
                  <SelectValue placeholder="Prefixo" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_CODES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.code} {c.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}

              <div className="flex w-full items-center flex-row">
                <input
                  type="tel"
                  placeholder="Telefone / Telemóvel"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
                />
                <span className="text-primary">*</span>
              </div>
            </div>

            {/* Número da Apólice */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Número da Apólice"
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              />
              <span className="text-primary">*</span>
            </div>

            {/* Detalhes do Sinistro */}
            <h4 className="text-lg font-semibold text-primary mt-10">
              Detalhes do Sinistro
            </h4>
            <Select value={tipoSinistro} onValueChange={setTipoSinistro}>
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

            <input
              type="date"
              placeholder="Data do Sinistro"
              className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
            />

            {/* Local e Checkbox */}
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Local do Sinistro"
                  className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
                />
                <span className="text-red-500">*</span>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <Checkbox />
                <label className="text-sm font-medium text-foreground">
                  Houve terceiros envolvidos?
                </label>
              </div>
            </div>

            {/* Ocorrido */}
            <div>
              <textarea
                placeholder="Descreva o ocorrido"
                rows={4}
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
              ></textarea>
              <p>
                <span className="text-primary">*</span> Campos Obrigatórios
              </p>
            </div>

            {/* Upload */}
            <DocumentUpload />

            {/* Botão */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white py-4 rounded-lg font-medium mt-10 shadow-md hover:shadow-lg transition"
            >
              Enviar Comunicação
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SinistroForm;
