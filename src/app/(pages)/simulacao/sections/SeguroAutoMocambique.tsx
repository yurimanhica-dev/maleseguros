"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Bike,
  CalendarDays,
  Car,
  Check,
  ChevronRight,
  Clock,
  DollarSign,
  Shield,
  ShieldCheck,
  Smartphone,
  User,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Dados específicos para Moçambique
const MOZAMBIQUE_PROVINCES = [
  "Maputo Cidade",
  "Maputo Província",
  "Gaza",
  "Inhambane",
  "Sofala",
  "Manica",
  "Tete",
  "Zambézia",
  "Nampula",
  "Cabo Delgado",
  "Niassa",
];

const VEHICLE_TYPES = [
  { id: "passenger", name: "Veículo de Passageiros", icon: <Car size={20} /> },
  { id: "motorcycle", name: "Motociclo", icon: <Bike size={20} /> },
  { id: "pickup", name: "Caminhonete", icon: <Car size={20} /> },
  { id: "truck", name: "Camião", icon: <Car size={20} /> },
];

export const SeguroAutoMocambique = () => {
  const [step, setStep] = useState(1);
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleValue, setVehicleValue] = useState<number | null>(null);
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleUse, setVehicleUse] = useState("private");
  const [driverAge, setDriverAge] = useState<number | null>(null);
  const [province, setProvince] = useState("");
  const [coverageType, setCoverageType] = useState("thirdParty");
  const [extras, setExtras] = useState<string[]>([]);
  const [paymentFrequency, setPaymentFrequency] = useState("annual");

  // Cálculo completo adaptado para Moçambique
  const calculatePremium = () => {
    if (!vehicleType || !vehicleValue || !driverAge) return 0;

    // 1. Prémio base conforme regulamento ISSM
    let basePremium = 0;

    // Valores de referência em MT (exemplos)
    if (vehicleType === "motorcycle") {
      basePremium = 5000; // MT
    } else if (vehicleType === "passenger") {
      basePremium = 15000; // MT
    } else if (vehicleType === "pickup") {
      basePremium = 20000; // MT
    } else {
      basePremium = 30000; // MT para camiões
    }

    // 2. Ajuste por valor do veículo (5% do valor para cobertura total)
    if (coverageType === "comprehensive") {
      basePremium = vehicleValue * 0.05;
    }

    // 3. Fator de idade do condutor
    if (driverAge < 25) basePremium *= 1.5; // Jovens pagam mais
    if (driverAge > 60) basePremium *= 1.3; // Idosos pagam mais

    // 4. Fator de uso do veículo
    if (vehicleUse === "taxi") basePremium *= 1.8;
    if (vehicleUse === "transport") basePremium *= 2.0;

    // 5. Fator de localização (Maputo tem mais roubos)
    if (province.includes("Maputo")) basePremium *= 1.4;
    if (province === "Cabo Delgado") basePremium *= 1.6; // Conflitos

    // 6. Coberturas extras
    extras.forEach((extra) => {
      if (extra === "assistance") basePremium += 2000;
      if (extra === "glass") basePremium += 1500;
      if (extra === "natural") basePremium += 3000; // Fenómenos naturais
    });

    // 7. Imposto sobre seguros (2%)
    const tax = basePremium * 0.02;

    // 8. Taxa de emissão de apólice (fixa)
    const issueFee = 500; // MT

    // Total antes de frequência de pagamento
    let total = basePremium + tax + issueFee;

    // Ajuste para pagamento mensal (5% de acréscimo)
    if (paymentFrequency === "monthly") {
      total *= 1.05;
    }

    // Arredondar para múltiplos de 100
    return Math.round(total / 100) * 100;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
    }).format(value);
  };

  const handleExtraToggle = (extra: string) => {
    setExtras((prev) =>
      prev.includes(extra)
        ? prev.filter((item) => item !== extra)
        : [...prev, extra]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(5); // Mostrar resultados
  };

  return (
    <div className="max-w-2xl mx-auto bg-background rounded-lg shadow-md overflow-hidden">
      {/* Cabeçalho estilo seguradora local */}
      <div className="bg-primary p-5 text-white">
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/icons/shielda.png"
              alt="Icone"
              width={40}
              height={40}
            />
            <div>
              <h1 className="text-2xl font-bold">Simulador de Seguro Auto</h1>
              <p className="text-sm opacity-90">
                Cálculo conforme regulamento ISSM
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
            <Smartphone className="w-5 h-5" />
            <span className="text-xs">100% digital</span>
          </div>
        </div>
      </div>

      {/* Indicador de progresso */}
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {[1, 2, 3, 4, 5].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step >= stepNumber
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 5 && (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Conteúdo principal */}
      <form onSubmit={handleSubmit} className="p-5">
        <AnimatePresence mode="wait">
          {/* Passo 1 - Dados do Veículo */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                {/* <Car className="text-primary" /> */}
                Dados do Veículo
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tipo de Veículo
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {VEHICLE_TYPES.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setVehicleType(type.id)}
                        className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                          vehicleType === type.id
                            ? "border-primary bg-secondary/50 text-foreground"
                            : "border-foreground hover:border-primary"
                        }`}
                      >
                        <span
                          className={`${
                            vehicleType === type.id
                              ? "text-primary"
                              : "text-gray-600"
                          }`}
                        >
                          {type.icon}
                        </span>
                        <span className="text-sm font-medium">{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ano de Fabricação
                  </label>
                  <select
                    value={vehicleYear}
                    onChange={(e) => setVehicleYear(e.target.value)}
                    className="w-full text-gray-500 p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option className="text-gray-400" value="">
                      Selecione o ano
                    </option>
                    {Array.from(
                      { length: 30 },
                      (_, i) => new Date().getFullYear() - i
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Valor de Mercado do Veículo (MT)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={vehicleValue || ""}
                      onChange={(e) => setVehicleValue(Number(e.target.value))}
                      placeholder="500000"
                      className="w-full p-3 rounded-lg pl-10 border border-gray-300 focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                    <span className="text-sm text-gray-500 absolute left-3 top-4">
                      MT
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Uso Principal do Veículo
                  </label>
                  <select
                    value={vehicleUse}
                    onChange={(e) => setVehicleUse(e.target.value)}
                    className="w-full text-gray-500  p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="private">Uso Particular</option>
                    <option value="taxi">Táxi</option>
                    <option value="transport">Transporte de Mercadorias</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!vehicleType || !vehicleYear || !vehicleValue}
                  className="w-full bg-primary hover:bg-primary/80"
                >
                  Continuar <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Passo 2 - Dados do Condutor */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <User className="text-blue-600" />
                Dados do Condutor Principal
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Idade do Condutor
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={driverAge || ""}
                      onChange={(e) => setDriverAge(Number(e.target.value))}
                      placeholder="Ex: 30"
                      min="18"
                      max="80"
                      className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <CalendarDays className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Província de Circulação Principal
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Selecione a província</option>
                    {MOZAMBIQUE_PROVINCES.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-yellow-800">Importante</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Condutores com menos de 25 anos podem ter acréscimos no
                        prémio conforme regulamento ISSM.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-gray-300"
                >
                  Voltar
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!driverAge || !province}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Continuar <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Passo 3 - Tipo de Cobertura */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Shield className="text-blue-600" />
                Escolha a Cobertura
              </h2>

              <div className="space-y-4">
                <div
                  className="p-4 border rounded-lg cursor-pointer transition-all"
                  onClick={() => setCoverageType("thirdParty")}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${
                        coverageType === "thirdParty"
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-400"
                      }`}
                    >
                      {coverageType === "thirdParty" && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold">Danos a Terceiros</h3>
                        <span className="text-sm font-medium text-blue-600">
                          Obrigatório por lei
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Cobre danos causados a outros veículos e propriedades.
                        Mínimo exigido pelo ISSM.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 border border-blue-300 rounded-lg cursor-pointer transition-all bg-blue-50"
                  onClick={() => setCoverageType("comprehensive")}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${
                        coverageType === "comprehensive"
                          ? "border-blue-500 bg-blue-500"
                          : "border-blue-300"
                      }`}
                    >
                      {coverageType === "comprehensive" && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold">Cobertura Completa</h3>
                        <span className="text-sm font-medium text-blue-600">
                          Mais escolhido
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Proteção para seu veículo e terceiros. Inclui colisão,
                        roubo e incêndio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-md font-medium text-gray-800 mb-3">
                  Coberturas Adicionais
                </h3>
                <div className="space-y-3">
                  <div
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      extras.includes("assistance")
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleExtraToggle("assistance")}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${
                          extras.includes("assistance")
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-400"
                        }`}
                      >
                        {extras.includes("assistance") && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">Assistência 24h</h4>
                        <p className="text-sm text-gray-600">
                          Reboque, pane seca, chave perdida em todo Moçambique
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      extras.includes("glass")
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleExtraToggle("glass")}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${
                          extras.includes("glass")
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-400"
                        }`}
                      >
                        {extras.includes("glass") && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">Quebra de Vidros</h4>
                        <p className="text-sm text-gray-600">
                          Cobre danos a parabrisas e janelas
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      extras.includes("natural")
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleExtraToggle("natural")}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${
                          extras.includes("natural")
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-400"
                        }`}
                      >
                        {extras.includes("natural") && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">Fenómenos Naturais</h4>
                        <p className="text-sm text-gray-600">
                          Proteção contra cheias, ciclones e outros eventos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1 border-gray-300"
                >
                  Voltar
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Continuar <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Passo 4 - Pagamento */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <DollarSign className="text-blue-600" />
                Opções de Pagamento
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequência de Pagamento
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentFrequency("annual")}
                      className={`p-4 border rounded-lg flex flex-col items-center transition-all ${
                        paymentFrequency === "annual"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-blue-300"
                      }`}
                    >
                      <span
                        className={`font-medium ${
                          paymentFrequency === "annual"
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        Anual
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        (Desconto de 5%)
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentFrequency("monthly")}
                      className={`p-4 border rounded-lg flex flex-col items-center transition-all ${
                        paymentFrequency === "monthly"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-blue-300"
                      }`}
                    >
                      <span
                        className={`font-medium ${
                          paymentFrequency === "monthly"
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        Mensal
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        (12 parcelas)
                      </span>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-2">
                    Resumo Provisório
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-500">Tipo de Veículo</div>
                      <div className="font-medium">
                        {VEHICLE_TYPES.find((v) => v.id === vehicleType)
                          ?.name || "-"}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Ano</div>
                      <div className="font-medium">{vehicleYear || "-"}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Cobertura</div>
                      <div className="font-medium">
                        {coverageType === "thirdParty"
                          ? "Danos a Terceiros"
                          : "Cobertura Completa"}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Extras</div>
                      <div className="font-medium">
                        {extras.length > 0 ? extras.length : "Nenhum"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  variant="outline"
                  className="flex-1 border-gray-300"
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Ver Cotação Completa
                </Button>
              </div>
            </motion.div>
          )}

          {/* Passo 5 - Resultado Final */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-5 rounded-lg text-white">
                <h2 className="text-2xl font-bold">Sua cotação está pronta!</h2>
                <p className="text-sm opacity-90">
                  Seguro auto adaptado às suas necessidades
                </p>
              </div>

              <div className="text-center py-4">
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {formatCurrency(calculatePremium())}
                </div>
                <div className="text-gray-600">
                  {paymentFrequency === "annual"
                    ? "por ano"
                    : "em 12 parcelas mensais"}
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3">
                    Detalhes da Cobertura
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">O que está incluído:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                          {coverageType === "thirdParty" ? (
                            <>
                              <li>Danos a terceiros (obrigatório)</li>
                              <li>Responsabilidade civil</li>
                            </>
                          ) : (
                            <>
                              <li>Danos a terceiros</li>
                              <li>Colisão e capotagem</li>
                              <li>Roubo e furto qualificado</li>
                              <li>Incêndio e explosão</li>
                            </>
                          )}
                          {extras.includes("assistance") && (
                            <li>Assistência 24h em Moçambique</li>
                          )}
                          {extras.includes("glass") && (
                            <li>Quebra de vidros</li>
                          )}
                          {extras.includes("natural") && (
                            <li>Fenómenos naturais</li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">O que não cobre:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                          <li>Danos por má condução deliberada</li>
                          <li>Uso não autorizado do veículo</li>
                          <li>Danos mecânicos sem colisão</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2">
                    Próximos Passos
                  </h3>
                  <ol className="list-decimal list-inside text-sm text-blue-700 space-y-2">
                    <li>Validação dos documentos</li>
                    <li>Vistoria do veículo (se necessário)</li>
                    <li>Pagamento da primeira prestação</li>
                    <li>Emissão da apólice digital</li>
                  </ol>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 py-4">
                  Contratar Agora
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="w-full border-gray-300 py-4"
                >
                  Fazer Nova Simulação
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-blue-600 py-4"
                >
                  Enviar Cotação por WhatsApp
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Rodapé */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-600">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Regulado pelo ISSM</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Simulação válida por 15 dias</span>
          </div>
        </div>
      </div>
    </div>
  );
};
