// components/ui/insurance/ProgressSteps.tsx
"use client";

import { ChevronRight } from "lucide-react";

export const ProgressSteps = ({
  steps,
  currentStep,
}: {
  steps: { id: string; label: string }[];
  currentStep: number;
}) => (
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    {steps.map((step, index) => (
      <div key={step.id} className="flex items-center gap-2">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            currentStep >= index + 1
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {index + 1}
        </div>
        {index < steps.length - 1 && (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
    ))}
  </div>
);
