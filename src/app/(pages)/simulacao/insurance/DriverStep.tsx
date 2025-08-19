/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AlertTriangle, CalendarDays, User } from "lucide-react";

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

export const DriverStep = ({ formData, updateFormData }: any) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
        <User className="text-primary" />
        Dados do Condutor
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Idade do Condutor
          </label>
          <div className="relative">
            <input
              type="number"
              value={formData.driverAge || ""}
              onChange={(e) =>
                updateFormData("driverAge", Number(e.target.value))
              }
              placeholder="Ex: 30"
              min="18"
              max="80"
              className="w-full p-3 border border-input rounded-lg pl-10 focus:ring-2 focus:ring-ring focus:border-primary"
            />
            <CalendarDays className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Província de Circulação Principal
          </label>
          <select
            value={formData.province}
            onChange={(e) => updateFormData("province", e.target.value)}
            className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-primary"
          >
            <option value="">Selecione a província</option>
            {MOZAMBIQUE_PROVINCES.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>

        <div className="p-4 bg-accent rounded-lg border border-accent">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-accent-foreground mt-0.5" />
            <div>
              <h4 className="font-bold text-accent-foreground">Importante</h4>
              <p className="text-sm text-accent-foreground/90 mt-1">
                Condutores com menos de 25 anos podem ter acréscimos no prémio
                conforme regulamento ISSM.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
