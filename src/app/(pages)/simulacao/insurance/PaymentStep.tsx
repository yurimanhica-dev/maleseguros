/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DollarSign } from "lucide-react";
import { InsuranceCard } from "./InsuranceCard";

export const PaymentStep = ({ formData, updateFormData }: any) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
        <DollarSign className="text-primary" />
        Opções de Pagamento
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Frequência de Pagamento
          </label>
          <div className="grid grid-cols-2 gap-3">
            <InsuranceCard
              title="Anual"
              description="(Desconto de 5%)"
              selected={formData.paymentFrequency === "annual"}
              onClick={() => updateFormData("paymentFrequency", "annual")}
              className="p-4"
            />
            <InsuranceCard
              title="Mensal"
              description="(12 parcelas)"
              selected={formData.paymentFrequency === "monthly"}
              onClick={() => updateFormData("paymentFrequency", "monthly")}
              className="p-4"
            />
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg border border-border">
          <h3 className="font-bold text-foreground mb-2">Resumo Provisório</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-muted-foreground">Tipo de Veículo</div>
              <div className="font-medium">
                {formData.vehicleType === "passenger" &&
                  "Veículo de Passageiros"}
                {formData.vehicleType === "motorcycle" && "Motociclo"}
                {formData.vehicleType === "pickup" && "Caminhonete"}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Ano</div>
              <div className="font-medium">{formData.vehicleYear}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Cobertura</div>
              <div className="font-medium">
                {formData.coverageType === "thirdParty"
                  ? "Danos a Terceiros"
                  : "Cobertura Completa"}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Extras</div>
              <div className="font-medium">
                {formData.extras.length > 0 ? formData.extras.length : "Nenhum"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
