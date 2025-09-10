import { SeguroAutoFormData } from "./seguro-auto";

// services/premiumCalculator.ts
export interface PremiumCalculator {
  calculatePremium: (formData: SeguroAutoFormData) => number;
}

export class MozambiquePremiumCalculator implements PremiumCalculator {
  calculatePremium(formData: SeguroAutoFormData): number {
    // Implementação do cálculo específico para Moçambique
    if (!formData.vehicleType || !formData.vehicleValue || !formData.driverAge)
      return 0;

    const basePremium = 0;
    // ... lógica de cálculo
    return Math.round(basePremium / 100) * 100;
  }
}
