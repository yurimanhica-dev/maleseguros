/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Check, Shield } from "lucide-react";
import { InsuranceCard } from "./InsuranceCard";

const COVERAGE_OPTIONS = [
  {
    id: "thirdParty",
    name: "Danos a Terceiros",
    description: "Cobertura básica exigida por lei",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: "comprehensive",
    name: "Cobertura Completa",
    description: "Proteção para seu veículo e terceiros",
    recommended: true,
    icon: <Shield className="w-5 h-5" />,
  },
];

const EXTRA_COVERAGES = [
  {
    id: "assistance",
    name: "Assistência 24h",
    description: "Reboque, pane seca, chave perdida em todo Moçambique",
  },
  {
    id: "glass",
    name: "Quebra de Vidros",
    description: "Cobre danos a parabrisas e janelas",
  },
  {
    id: "natural",
    name: "Fenómenos Naturais",
    description: "Proteção contra cheias, ciclones e outros eventos",
  },
];

export const CoverageStep = ({ formData, updateFormData }: any) => {
  const toggleExtra = (extraId: string) => {
    const newExtras = formData.extras.includes(extraId)
      ? formData.extras.filter((id: string) => id !== extraId)
      : [...formData.extras, extraId];
    updateFormData("extras", newExtras);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
        <Shield className="text-primary" />
        Escolha a Cobertura
      </h2>

      <div className="space-y-4">
        {COVERAGE_OPTIONS.map((coverage) => (
          <InsuranceCard
            key={coverage.id}
            title={coverage.name}
            description={coverage.description}
            icon={coverage.icon}
            selected={formData.coverageType === coverage.id}
            recommended={coverage.recommended}
            onClick={() => updateFormData("coverageType", coverage.id)}
          />
        ))}
      </div>

      <div>
        <h3 className="text-md font-medium text-foreground mb-3">
          Coberturas Adicionais
        </h3>
        <div className="space-y-3">
          {EXTRA_COVERAGES.map((extra) => (
            <div
              key={extra.id}
              onClick={() => toggleExtra(extra.id)}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                formData.extras.includes(extra.id)
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center ${
                    formData.extras.includes(extra.id)
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {formData.extras.includes(extra.id) && (
                    <Check className="w-3 h-3 text-primary-foreground" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{extra.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {extra.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
