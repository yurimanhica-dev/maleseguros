"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BadgePercent,
  BikeIcon,
  CalendarDays,
  Car,
  CarFront,
  CarTaxiFront,
  Check,
  ChevronRight,
  Clock,
  MapPin,
  Percent,
  Shield,
  User,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const AutoInsuranceSimulator = () => {
  const [step, setStep] = useState(1);
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleValue, setVehicleValue] = useState("");
  const [driverAge, setDriverAge] = useState("");
  const [coverage, setCoverage] = useState("comprehensive");
  const [postalCode, setPostalCode] = useState("");

  // Cálculos ajustados para a realidade de Moçambique em Meticais (MT)
  const calculateQuote = () => {
    // Base em MT (valores de exemplo - ajustar conforme dados reais)
    let base = 15000; // Prêmio base em MT

    // Ajuste por tipo de veículo
    if (vehicleType === "Carro Ligeiro") base *= 1; // Carro padrão
    if (vehicleType === "Moto") base *= 0.6; // Motos são mais baratas
    if (vehicleType === "Carro Pesados") base *= 1.4; // SUVs são mais caros

    // Ajuste por idade do condutor (valores exemplificativos)
    if (parseInt(driverAge) < 25) base *= 1.6; // Condutores jovens pagam mais
    if (parseInt(driverAge) >= 25 && parseInt(driverAge) < 40) base *= 1.1;
    if (parseInt(driverAge) >= 60) base *= 1.3; // Sénior paga um pouco mais

    // Ajuste por tipo de cobertura
    if (coverage === "Basica") base *= 0.65; // Só danos a terceiros
    if (coverage === "Completa") base *= 1.45; // Cobertura completa + extras

    // Arredondar para múltiplos de 100 MT
    return Math.round(base / 100) * 100;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      minimumFractionDigits: 2,
    }).format(value);
  };
  
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStep(4);
  };

  return (
    <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 p-6 text-primary-foreground">
        <div className="flex items-center gap-4">
          <Image src="/icons/shielda.png" alt="Icone" width={40} height={40} />
          <div>
            <h2 className="text-2xl font-bold">Simulador de Seguro Auto</h2>
            <p className="text-primary-foreground/80">
              Proteja seu veículo em Meticais
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex justify-between relative">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= i
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i}
              </div>
              <span className="text-xs mt-2 text-muted-foreground">
                {i === 1 && "Veículo"}
                {i === 2 && "Condutor"}
                {i === 3 && "Cobertura"}
                {i === 4 && "Resultado"}
              </span>
            </div>
          ))}
          <div className="absolute h-1 bg-muted top-5 left-10 right-10 -z-1">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${((step - 1) / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold flex items-center gap-3 text-foreground">
                <Car className="text-primary" /> Informações do Veículo
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Tipo de Veículo
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        id: "car",
                        icon: <CarFront className="w-5 h-5" />,
                        label: "Carro Ligeiro",
                      },
                      {
                        id: "pesado",
                        icon: <CarTaxiFront className="w-5 h-5" />,
                        label: "Carro Pesado",
                      },
                      {
                        id: "motorcycle",
                        icon: <BikeIcon className="w-5 h-5" />,
                        label: "Moto",
                      },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setVehicleType(type.id)}
                        className={`p-4 border rounded-lg flex flex-col items-center transition-all ${
                          vehicleType === type.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span
                          className={`${
                            vehicleType === type.id
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {type.icon}
                        </span>
                        <span className="mt-2 text-sm font-medium">
                          {type.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Valor do Veículo (MT)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={vehicleValue}
                      onChange={(e) =>
                        setVehicleValue(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="500.000"
                      className="w-full p-3 border border-input rounded-lg pl-10 focus:ring-2 focus:ring-ring focus:border-primary"
                    />
                    <span className="absolute left-3 top-3.5 text-muted-foreground">
                      MT
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!vehicleType || !vehicleValue}
                  className="gap-2"
                >
                  Próximo <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold flex items-center gap-3 text-foreground">
                <User className="text-primary" /> Informações do Condutor
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Idade do Condutor Principal
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={driverAge}
                      onChange={(e) => setDriverAge(e.target.value)}
                      placeholder="30"
                      className="w-full p-3 border border-input rounded-lg pl-10 focus:ring-2 focus:ring-ring focus:border-primary"
                    />
                    <CalendarDays className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    CEP (Opcional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="0000"
                      className="w-full p-3 border border-input rounded-lg pl-10 focus:ring-2 focus:ring-ring focus:border-primary"
                    />
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!driverAge}
                  className="gap-2"
                >
                  Próximo <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold flex items-center gap-3 text-foreground">
                <Shield className="text-primary" /> Tipo de Cobertura
              </h3>

              <div className="space-y-4">
                {[
                  {
                    id: "basic",
                    name: "Básica",
                    description: "Danos a terceiros (obrigatório por lei)",
                    price: "Económico",
                    icon: <Shield className="w-5 h-5" />,
                  },
                  {
                    id: "comprehensive",
                    name: "Completa",
                    description: "Cobre seu veículo e terceiros",
                    price: "Recomendado",
                    icon: <Shield className="w-5 h-5" />,
                  },
                  {
                    id: "premium",
                    name: "Premium",
                    description:
                      "Cobertura completa + assistência 24h em Moçambique",
                    price: "Mais completo",
                    icon: <Shield className="w-5 h-5 text-primary" />,
                  },
                ].map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setCoverage(option.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      coverage === option.id
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${
                          coverage === option.id
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {coverage === option.id && (
                          <Check className="w-3 h-3 text-primary-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            {option.icon}
                            <h4 className="font-medium">{option.name}</h4>
                          </div>
                          <span className="text-sm text-primary">
                            {option.price}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 ml-8">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar
                </Button>
                <Button type="submit" className="gap-2">
                  Calcular <BadgePercent className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold flex items-center gap-3 text-foreground">
                <Percent className="text-primary" /> Sua Cotação
              </h3>

              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {formatCurrency(calculateQuote())}
                  </div>
                  <div className="text-muted-foreground">por ano</div>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="bg-background p-4 rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground">
                      Tipo de Veículo
                    </div>
                    <div className="font-medium capitalize mt-1">
                      {vehicleType === "car" && "Carro Ligeiro"}
                      {vehicleType === "pesado" && "Carro Pesado"}
                      {vehicleType === "motorcycle" && "Moto"}
                    </div>
                  </div>
                  <div className="bg-background p-4 rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground">
                      Valor do Veículo
                    </div>
                    <div className="font-medium mt-1">
                      {vehicleValue
                        ? formatCurrency(parseInt(vehicleValue))
                        : "Não informado"}
                    </div>
                  </div>
                  <div className="bg-background p-4 rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground">
                      Idade do Condutor
                    </div>
                    <div className="font-medium mt-1">{driverAge} anos</div>
                  </div>
                  <div className="bg-background p-4 rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground">
                      Tipo de Cobertura
                    </div>
                    <div className="font-medium capitalize mt-1">
                      {coverage === "basic" && "Básica"}
                      {coverage === "comprehensive" && "Completa"}
                      {coverage === "premium" && "Premium"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 py-6 gap-3">
                  <Shield className="w-5 h-5" /> Contratar Agora
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 py-6 gap-3"
                >
                  <Car className="w-5 h-5" /> Nova Simulação
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Footer */}
      <div className="bg-muted/50 px-6 py-4 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Proteção 24h em todo Moçambique</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>Simulação em menos de 2 minutos</span>
          </div>
        </div>
      </div>
    </div>
  );
};
