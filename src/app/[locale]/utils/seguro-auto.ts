// types/seguro-auto.ts
export interface StepComponentProps {
  formData: SeguroAutoFormData;
  onUpdate: (updates: Partial<SeguroAutoFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}

export interface SeguroAutoFormData {
  vehicleType: string;
  vehicleYear: string;
  vehicleValue: number | null;
  vehicleUse: string;
  driverAge: number | null;
  province: string;
  coverageType: string;
  extras: string[];
  paymentFrequency: string;
  driverName: string;
  driverEmail: string;
  driverPhone: string;
  consentimento: boolean;
}
