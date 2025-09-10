import { PremiumCalculator } from "./calculatePremium";
import { SeguroAutoFormData } from "./seguro-auto";

export const usePremiumCalculation = (calculator: PremiumCalculator) => {
  const calculate = (formData: SeguroAutoFormData) => {
    return calculator.calculatePremium(formData);
  };

  return { calculate };
};
