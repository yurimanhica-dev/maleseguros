// hooks/useSeguroAutoSteps.ts
import { useState } from "react";

export const useSeguroAutoSteps = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleYear: "",
    vehicleValue: null as number | null,
    vehicleUse: "private",
    driverAge: null as number | null,
    province: "",
    coverageType: "thirdParty",
    extras: [] as string[],
    paymentFrequency: "annual",
    driverName: "",
    driverEmail: "",
    driverPhone: "",
    consentimento: false,
  });

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const goToStep = (stepNumber: number) => setStep(stepNumber);

  return {
    step,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
  };
};
