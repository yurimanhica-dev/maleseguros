/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { formatCurrency } from "@/app/utils/formatCurrency";
import { AlertTriangle, Check } from "lucide-react";

export const ResultStep = ({ formData, premium }: any) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-primary/90 p-5 rounded-lg text-primary-foreground">
        <h2 className="text-2xl font-bold">Sua cotação está pronta!</h2>
        <p className="text-sm opacity-90">
          Seguro auto adaptado às suas necessidades
        </p>
      </div>

      <div className="text-center py-4">
        <div className="text-4xl font-bold text-foreground mb-1">
          {formatCurrency(premium)}
        </div>
        <div className="text-muted-foreground">
          {formData.paymentFrequency === "annual"
            ? "por ano"
            : "em 12 parcelas mensais de " + formatCurrency(premium / 12)}
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border border-border">
          <h3 className="font-bold text-foreground mb-3">
            Detalhes da Cobertura
          </h3>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">O que está incluído:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
                  {formData.coverageType === "thirdParty" ? (
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
                  {formData.extras.includes("assistance") && (
                    <li>Assistência 24h em Moçambique</li>
                  )}
                  {formData.extras.includes("glass") && (
                    <li>Quebra de vidros</li>
                  )}
                  {formData.extras.includes("natural") && (
                    <li>Fenómenos naturais</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">O que não cobre:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
                  <li>Danos por má condução deliberada</li>
                  <li>Uso não autorizado do veículo</li>
                  <li>Danos mecânicos sem colisão</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-accent rounded-lg border border-accent">
          <h3 className="font-bold text-accent-foreground mb-2">
            Próximos Passos
          </h3>
          <ol className="list-decimal list-inside text-sm text-accent-foreground space-y-2">
            <li>Validação dos documentos</li>
            <li>Vistoria do veículo (se necessário)</li>
            <li>Pagamento da primeira prestação</li>
            <li>Emissão da apólice digital</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
