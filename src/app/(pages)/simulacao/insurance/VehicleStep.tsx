/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Bike, Car, DollarSign } from "lucide-react";
import { InsuranceCard } from "../components/InsuranceCard";

const VEHICLE_TYPES = [
  {
    id: "passenger",
    name: "Veículo de Passageiros",
    icon: <Car className="w-5 h-5" />,
  },
  { id: "motorcycle", name: "Motociclo", icon: <Bike className="w-5 h-5" /> },
  { id: "pickup", name: "Caminhonete", icon: <Car className="w-5 h-5" /> },
];

const VEHICLE_USES = [
  { id: "private", name: "Uso Particular" },
  { id: "taxi", name: "Táxi" },
  { id: "transport", name: "Transporte de Mercadorias" },
];

export const VehicleStep = ({ formData, updateFormData }: any) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
        <Car className="text-primary" />
        Dados do Veículo
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Tipo de Veículo
          </label>
          <div className="grid grid-cols-2 gap-3">
            {VEHICLE_TYPES.map((type) => (
              <InsuranceCard
                key={type.id}
                title={type.name}
                icon={type.icon}
                selected={formData.vehicleType === type.id}
                onClick={() => updateFormData("vehicleType", type.id)}
                className="p-3"
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Ano de Fabricação
          </label>
          <select
            value={formData.vehicleYear}
            onChange={(e) => updateFormData("vehicleYear", e.target.value)}
            className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-primary"
          >
            <option value="">Selecione o ano</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Valor de Mercado do Veículo (MT)
          </label>
          <div className="relative">
            <input
              type="number"
              value={formData.vehicleValue || ""}
              onChange={(e) =>
                updateFormData("vehicleValue", Number(e.target.value))
              }
              placeholder="Ex: 500000"
              className="w-full p-3 border border-input rounded-lg pl-10 focus:ring-2 focus:ring-ring focus:border-primary"
            />
            <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Uso Principal do Veículo
          </label>
          <select
            value={formData.vehicleUse}
            onChange={(e) => updateFormData("vehicleUse", e.target.value)}
            className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-primary"
          >
            {VEHICLE_USES.map((use) => (
              <option key={use.id} value={use.id}>
                {use.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
