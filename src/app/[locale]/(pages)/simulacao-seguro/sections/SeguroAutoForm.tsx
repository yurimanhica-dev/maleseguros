"use client";

import { formatCurrency } from "@/app/[locale]/utils/formatCurrency";
import { MOZAMBIQUE_PROVINCES } from "@/app/[locale]/utils/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Shield,
  ShieldCheck,
  Smartphone,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ThemedImage } from "../components/ThemedImage";

export const SeguroAutoForm = () => {
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
  const [driverName, setDriverName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [consentimento, setConsentimento] = useState(false);

  const VEHICLE_TYPES = [
    {
      id: "passenger",
      name: "Veículo de Ligeiros",
      icon: (
        <ThemedImage
          lightSrc="/icons/car.png"
          darkSrc="/icons/car_light.png"
          alt="Carro"
          width={24}
          height={24}
        />
      ),
    },
    {
      id: "motorcycle",
      name: "Motociclo",
      icon: (
        <ThemedImage
          lightSrc="/icons/motorcycle.png"
          darkSrc="/icons/motorcycle_light.png"
          width={24}
          height={24}
          alt="Motorcycle"
        />
      ),
    },
    {
      id: "pickup",
      name: "Veículos pesados de mercadorias",
      icon: (
        <ThemedImage
          lightSrc="/icons/truck.png"
          darkSrc="/icons/truck_light.png"
          width={24}
          height={24}
          alt="Camionete"
        />
      ),
    },
    {
      id: "truck",
      name: "Veículos pesados de passageiros",
      icon: (
        <ThemedImage
          lightSrc="/icons/bus.png"
          darkSrc="/icons/bus_light.png"
          width={24}
          height={24}
          alt="Machimbombo"
        />
      ),
    },
  ];

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "idle" | "success" | "error" | null;
    message: string;
  }>({ type: "idle", message: "" });

  const closeStatusMessage = () => {
    setSubmitStatus({ type: "idle", message: "" });
  };

  const enviarSimulacaoPorEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/simulacao-auto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: driverName,
          email: driverEmail,
          phone: driverPhone,
          vehicleType: VEHICLE_TYPES.find((v) => v.id === vehicleType)?.name,
          vehicleYear,
          vehicleValue,
          vehicleUse,
          driverAge,
          province,
          coverageType,
          extras,
          paymentFrequency,
          premium: calculatePremium(),
          consentimento,
        }),
      });

      if (response.ok) {
        // Mostrar mensagem de sucesso
        setSubmitStatus({
          type: "success",
          message: "Cotação enviada por email com sucesso!",
        });
      } else {
        // Mostrar mensagem de erro
        setSubmitStatus({
          type: "error",
          message: "Erro ao enviar mensagem. Tente novamente.",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar simulação:", error);
      setSubmitStatus({
        type: "error",
        message: "Erro ao enviar mensagem. Tente novamente.",
      });
    }
  };

  const isFormValid =
    driverName &&
    driverEmail &&
    driverPhone &&
    vehicleType &&
    vehicleYear &&
    vehicleValue &&
    vehicleUse &&
    driverAge &&
    province &&
    coverageType &&
    paymentFrequency &&
    consentimento;

  return (
    <section className="py-16">
      <div className="max-w-2xl mx-auto bg-background rounded-lg shadow-md overflow-hidden ">
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
        <div className="px-5 py-3  border-b border-gray-200">
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
                          className={`p-3 border-b outline-none bg-transparent border-gray-200 flex flex-col items-center gap-2 transition-all ${
                            vehicleType === type.id
                              ? "border-primary text-primary"
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
                          <span className="text-sm font-medium">
                            {type.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Ano de Fabricação
                    </label>
                    <Select value={vehicleYear} onValueChange={setVehicleYear}>
                      <SelectTrigger className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent text-foreground">
                        <SelectValue placeholder="Selecione o ano" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          { length: 30 },
                          (_, i) => new Date().getFullYear() - i
                        ).map((year) => (
                          <SelectItem key={year} value={String(year)}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Valor de Mercado do Veículo (MT)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={vehicleValue || ""}
                        onChange={(e) =>
                          setVehicleValue(Number(e.target.value))
                        }
                        placeholder="Ex: 500000"
                        className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Uso Principal do Veículo
                    </label>
                    <Select value={vehicleUse} onValueChange={setVehicleUse}>
                      <SelectTrigger className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent text-foreground">
                        <SelectValue placeholder="Uso do Veículo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Uso Particular</SelectItem>
                        <SelectItem value="taxi">Táxi</SelectItem>
                        <SelectItem value="transport">
                          Transporte de Mercadorias
                        </SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!vehicleType || !vehicleYear || !vehicleValue}
                    className="w-full bg-primary hover:bg-primary/80 cursor-pointer"
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
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <User className="text-primary" />
                  Dados do Condutor Principal
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-50 mb-2">
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
                        className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent pl-10"
                      />
                      <CalendarDays className="absolute left-3 top-4 w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-50 mb-2">
                      Província de Circulação Principal
                    </label>
                    <Select value={province} onValueChange={setProvince}>
                      <SelectTrigger className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent text-foreground">
                        <SelectValue placeholder="Selecione a província" />
                      </SelectTrigger>
                      <SelectContent>
                        {MOZAMBIQUE_PROVINCES.map((prov) => (
                          <SelectItem key={prov} value={prov}>
                            {prov}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 bg-primary/20 rounded-lg border border-primary">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-bold ">Importante</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Condutores com menos de 25 anos podem ter acréscimos
                          no prémio conforme regulamento ISSM.
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
                    onClick={() => setStep(2.5)}
                    disabled={!driverAge || !province}
                    className="flex-1 bg-primary hover:bg-primary/80 cursor-pointer"
                  >
                    Continuar <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2.5 && (
              <motion.div
                key="step2.5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <User className="text-primary" />
                  Dados Pessoais do Condutor
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nome Completo <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      placeholder="Seu nome completo"
                      className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      value={driverEmail}
                      onChange={(e) => setDriverEmail(e.target.value)}
                      placeholder="seu.email@exemplo.com"
                      className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Número de Telemóvel{" "}
                      <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={driverPhone}
                        onChange={(e) => {
                          const onlyNumbers = e.target.value.replace(/\D/g, "");
                          setDriverPhone(onlyNumbers);
                        }}
                        placeholder="84 123 4567"
                        className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent pl-16"
                      />
                      <div className="absolute left-3 top-1/2 space-x-2 transform -translate-y-1/2 flex items-center">
                        <span className="text-foreground/70 text-sm">+258</span>
                        <div className="w-px h-4 bg-foreground/70 mx-1"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-6">
                    <Checkbox
                      checked={consentimento}
                      onCheckedChange={(checked) =>
                        setConsentimento(checked as boolean)
                      }
                      id="consentimento"
                    />
                    <label
                      htmlFor="consentimento"
                      className="text-sm font-medium text-foreground cursor-pointer"
                    >
                      Aceito ser contactado pela equipa da MALEseguros para
                      tratar desta cotação
                    </label>
                  </div>

                  <div className="p-4 bg-primary/20 rounded-lg border border-primary">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-bold">Proteção de Dados</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Seus dados estão seguros conosco. Utilizamos
                          informações apenas para processar sua cotação e não
                          compartilhamos com terceiros.
                        </p>
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
                    onClick={() => setStep(3)}
                    disabled={
                      !driverName ||
                      !driverEmail ||
                      !driverPhone ||
                      !consentimento
                    }
                    className="flex-1 bg-primary hover:bg-primary/80 cursor-pointer"
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
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Shield className="text-primary" />
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
                            ? "border-primary bg-primary"
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
                          <span className="text-sm font-medium text-primary">
                            Obrigatório por lei
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Cobre danos causados a outros veículos e propriedades.
                          Mínimo exigido pelo ISSM.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="p-4 border border-primary/30 rounded-lg cursor-pointer transition-all bg-primary/10"
                    onClick={() => setCoverageType("comprehensive")}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${
                          coverageType === "comprehensive"
                            ? "border-primary bg-primary"
                            : "border-primary/30"
                        }`}
                      >
                        {coverageType === "comprehensive" && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-bold">Cobertura Completa</h3>
                          <span className="text-sm font-medium text-primary">
                            Mais escolhido
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Proteção para seu veículo e terceiros. Inclui colisão,
                          roubo e incêndio.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-md font-medium text-foreground mb-3">
                    Coberturas Adicionais
                  </h3>
                  <div className="space-y-3">
                    <div
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        extras.includes("assistance")
                          ? "border-primary bg-primary/10 ring-1 ring-primary/20"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleExtraToggle("assistance")}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center ${
                            extras.includes("assistance")
                              ? "border-primary bg-primary"
                              : "border-gray-400"
                          }`}
                        >
                          {extras.includes("assistance") && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">Assistência 24h</h4>
                          <p className="text-sm text-muted-foreground">
                            Reboque, pane seca, chave perdida em todo Moçambique
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        extras.includes("glass")
                          ? "border-primary bg-primary/10 ring-1 ring-primary/20"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleExtraToggle("glass")}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center ${
                            extras.includes("glass")
                              ? "border-primary bg-primary"
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
                          ? "border-primary bg-primary/10 ring-1 ring-primary/20"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleExtraToggle("natural")}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center ${
                            extras.includes("natural")
                              ? "border-primary bg-primary"
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
                    className="flex-1 bg-primary hover:bg-primary cursor-pointer"
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
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Image
                    src="/icons/money.png"
                    width={24}
                    height={24}
                    alt="Credit Card"
                  />
                  Opções de Pagamento
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Frequência de Pagamento
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentFrequency("annual")}
                        className={`p-4 border rounded-lg flex flex-col items-center transition-all ${
                          paymentFrequency === "annual"
                            ? "border-primary bg-primary/10"
                            : "border-primary/30 hover:border-primary/30"
                        }`}
                      >
                        <span
                          className={`font-medium ${
                            paymentFrequency === "annual"
                              ? "text-foreground"
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
                            ? "border-primary bg-primary/10"
                            : "border-primary/30 hover:border-primary/30"
                        }`}
                      >
                        <span
                          className={`font-medium ${
                            paymentFrequency === "monthly"
                              ? "text-foreground"
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

                  <div className="p-4 bg-background/10 text-foreground">
                    <h3 className="font-bold  mb-2">Resumo Provisório</h3>
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
                    className="flex-1 bg-primary hover:bg-primary/80 cursor-pointer"
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
                <div className="bg-gradient-to-r from-primary to-primary/90 p-5 rounded-lg text-white">
                  <h2 className="text-2xl font-bold">
                    Sua cotação está pronta!
                  </h2>
                  <p className="text-sm opacity-90">
                    Seguro Auto adaptado às suas necessidades
                  </p>
                </div>

                <div className="text-center py-4">
                  <div className="text-4xl font-bold text-foreground mb-1">
                    {formatCurrency(calculatePremium())}
                  </div>
                  <div className="text-muted-foreground">
                    {paymentFrequency === "annual"
                      ? "por ano"
                      : "em 12 parcelas mensais"}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-primary rounded-lg border border-primary/20">
                    <h3 className="font-bold text-foreground mb-3">
                      Detalhes da Cobertura
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 s mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">O que está incluído:</h4>
                          <ul className="list-disc list-inside text-sm mt-1 space-y-1">
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
                        <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">O que não cobre:</h4>
                          <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                            <li>Danos por má condução deliberada</li>
                            <li>Uso não autorizado do veículo</li>
                            <li>Danos mecânicos sem colisão</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg ">
                    <h3 className="font-bold text-primary mb-2">
                      Próximos Passos
                    </h3>
                    <ol className="list-decimal list-inside text-sm text-primary/80 space-y-2">
                      <li>Validação dos documentos</li>
                      <li>Vistoria do veículo (se necessário)</li>
                      <li>Pagamento da primeira prestação</li>
                      <li>Emissão da apólice digital</li>
                    </ol>
                  </div>
                </div>

                {submitStatus.type !== "idle" && (
                  <div
                    className={`mb-6 p-3 rounded-lg items-center flex justify-between relative ${
                      submitStatus.type === "success"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    <div>{submitStatus.message}</div>
                    <button
                      type="button"
                      onClick={closeStatusMessage}
                      className={`absolute top-3 right-3 transition-colors cursor-pointer${
                        submitStatus.type === "success"
                          ? "text-red-700 hover:text-red-800 "
                          : "text-green-700 hover:text-green-800  "
                      }`}
                      aria-label="Fechar mensagem"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <div className="space-y-3 pt-4">
                  <motion.button
                    type="submit"
                    onClick={enviarSimulacaoPorEmail}
                    disabled={isSubmitting || !isFormValid}
                    whileHover={{
                      scale: isSubmitting || !isFormValid ? 1 : 1.02,
                    }}
                    whileTap={{
                      scale: isSubmitting || !isFormValid ? 1 : 0.98,
                    }}
                    className={`w-full py-3 rounded-full font-medium mt-10 shadow-md transition ${
                      isSubmitting || !isFormValid
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-primary text-white hover:shadow-lg cursor-pointer"
                    }`}
                  >
                    {isSubmitting ? "Enviando..." : "Solicitar Cotação"}
                  </motion.button>

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
                    className="w-full text-primary py-4 cursor-pointer"
                  >
                    Enviar Cotação por WhatsApp
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Rodapé */}
        <div className="px-5 py-4 bg-background border-t border-gray-200 text-center text-sm text-foreground/70">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Regulado pelo ISSM</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Simulação válida por 15 dias</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
