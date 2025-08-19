"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bike,
  CalendarDays,
  Car,
  Check,
  ChevronRight,
  Clock,
  HelpCircle,
  Percent,
  Shield,
  Smartphone,
  User,
} from "lucide-react";
import { useState } from "react";

export const SeguroAutoMZ = () => {
  const [step, setStep] = useState(1);
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [driverAge, setDriverAge] = useState("");
  const [coverage, setCoverage] = useState("completa");
  const [province, setProvince] = useState("");

  const calculateQuote = () => {
    let base = 8000;
    if (vehicleType === "carro") base *= 1;
    if (vehicleType === "moto") base *= 0.6;
    if (vehicleType === "caminhonete") base *= 1.3;

    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - parseInt(vehicleYear);
    if (vehicleAge > 10) base *= 1.4;
    if (vehicleAge <= 5) base *= 0.9;

    if (parseInt(driverAge) < 25) base *= 1.5;
    if (parseInt(driverAge) >= 25 && parseInt(driverAge) < 40) base *= 1;
    if (parseInt(driverAge) >= 60) base *= 1.3;

    if (coverage === "terceiros") base *= 0.65;
    if (coverage === "completa") base *= 1;
    if (coverage === "premium") base *= 1.4;

    if (province === "maputo") base *= 1.2;
    if (province === "nampula") base *= 1.1;

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
    <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden border border-border font-sans">
      {/* Header usando cores primárias do tema */}
      <div className="bg-gradient-to-r from-primary to-primary/90 p-5 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Seguro Auto MZ</h1>
              <p className="text-sm opacity-90">
                Digital • Rápido • 100% online
              </p>
            </div>
          </div>
          <Smartphone className="w-6 h-6" />
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="px-5 py-3 bg-muted border-b border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className={`font-medium ${step >= 1 ? "text-primary" : ""}`}>
            1. Veículo
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className={`font-medium ${step >= 2 ? "text-primary" : ""}`}>
            2. Condutor
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className={`font-medium ${step >= 3 ? "text-primary" : ""}`}>
            3. Cobertura
          </span>
        </div>
      </div>

      {/* Conteúdo principal */}
      <form onSubmit={handleSubmit} className="p-5 bg-background">
        <AnimatePresence mode="wait">
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
                <Car className="text-primary" />
                Sobre seu veículo
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Tipo de veículo
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "carro", icon: <Car size={20} />, label: "Carro" },
                      { id: "moto", icon: <Bike size={20} />, label: "Moto" },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setVehicleType(type.id)}
                        className={`p-4 border rounded-lg flex items-center gap-3 transition-all ${
                          vehicleType === type.id
                            ? "border-primary bg-primary/10"
                            : "border-input hover:border-primary/50"
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
                        <span className="font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Ano de fabricação
                  </label>
                  <select
                    value={vehicleYear}
                    onChange={(e) => setVehicleYear(e.target.value)}
                    className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-primary"
                  >
                    <option value="">Selecione o ano</option>
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
              </div>

              <div className="pt-4">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!vehicleType || !vehicleYear}
                  className="w-full"
                >
                  Continuar <ChevronRight className="w-4 h-4" />
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
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <User className="text-primary" />
                Sobre o condutor
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Idade do condutor principal
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={driverAge}
                      onChange={(e) => setDriverAge(e.target.value)}
                      placeholder="Ex: 30"
                      className="w-full p-3 border border-input rounded-lg pl-10 focus:ring-2 focus:ring-ring focus:border-primary"
                    />
                    <CalendarDays className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Província de circulação
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-primary"
                  >
                    <option value="">Selecione a província</option>
                    <option value="maputo">Maputo</option>
                    <option value="gaza">Gaza</option>
                    <option value="inhambane">Inhambane</option>
                    <option value="sofala">Sofala</option>
                    <option value="manica">Manica</option>
                    <option value="tete">Tete</option>
                    <option value="zambezia">Zambézia</option>
                    <option value="nampula">Nampula</option>
                    <option value="cabo_delgado">Cabo Delgado</option>
                    <option value="niassa">Niassa</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!driverAge}
                  className="flex-1"
                >
                  Continuar <ChevronRight className="w-4 h-4" />
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
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Shield className="text-primary" />
                Escolha sua cobertura
              </h2>

              <div className="space-y-3">
                {[
                  {
                    id: "terceiros",
                    name: "Danos a Terceiros",
                    description: "Cobertura básica exigida por lei",
                    price: "Mais econômico",
                    recommended: false,
                  },
                  {
                    id: "completa",
                    name: "Cobertura Completa",
                    description: "Proteção para seu veículo e terceiros",
                    price: "Mais escolhido",
                    recommended: true,
                  },
                  {
                    id: "premium",
                    name: "Cobertura Premium",
                    description: "Assistência 24h em todo Moçambique + extras",
                    price: "Proteção total",
                    recommended: false,
                  },
                ].map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setCoverage(option.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all relative ${
                      coverage === option.id
                        ? "border-primary bg-primary/10 ring-1 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {option.recommended && (
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        RECOMENDADO
                      </div>
                    )}
                    <div className="flex items-start gap-3">
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
                        <div className="flex justify-between">
                          <h3 className="font-bold">{option.name}</h3>
                          <span className="text-sm font-medium text-primary">
                            {option.price}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button type="submit" className="flex-1">
                  Ver oferta <Percent className="w-4 h-4" />
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
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-primary to-primary/90 p-5 rounded-xl text-primary-foreground">
                <h2 className="text-2xl font-bold">Sua cotação pronta!</h2>
                <p className="text-sm opacity-90">
                  Seguro auto adaptado para você
                </p>
              </div>

              <div className="text-center py-6">
                <div className="text-4xl font-bold text-foreground mb-1">
                  {formatCurrency(calculateQuote())}
                </div>
                <div className="text-muted-foreground">
                  por ano • Pagamento mensal disponível
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg border border-border">
                  <h3 className="font-bold text-foreground mb-2">
                    Resumo da sua cotação
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-muted-foreground">
                        Tipo de veículo
                      </div>
                      <div className="font-medium">
                        {vehicleType === "carro" && "Carro"}
                        {vehicleType === "moto" && "Moto"}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Ano</div>
                      <div className="font-medium">{vehicleYear}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">
                        Idade condutor
                      </div>
                      <div className="font-medium">{driverAge} anos</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Província</div>
                      <div className="font-medium capitalize">{province}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-muted-foreground">Cobertura</div>
                      <div className="font-medium">
                        {coverage === "terceiros" && "Danos a Terceiros"}
                        {coverage === "completa" && "Cobertura Completa"}
                        {coverage === "premium" && "Cobertura Premium"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-accent rounded-lg border border-accent text-sm">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-accent-foreground mt-0.5" />
                    <div>
                      <h4 className="font-bold text-accent-foreground">
                        Por que contratar?
                      </h4>
                      <ul className="list-disc list-inside text-accent-foreground/90 mt-1 space-y-1">
                        <li>Proteção contra roubo e acidentes</li>
                        <li>Assistência 24h em todo Moçambique</li>
                        <li>Processo 100% digital e sem burocracia</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button className="w-full py-4">Contratar agora</Button>
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="w-full py-4"
                >
                  Fazer nova simulação
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Rodapé */}
      <div className="px-5 py-4 bg-muted border-t border-border text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>Simulação rápida</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Segurança garantida</span>
          </div>
        </div>
      </div>
    </div>
  );
};
