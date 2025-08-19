"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const InsuranceCard = ({
  title,
  description,
  selected = false,
  recommended = false,
  className,
  onClick,
  icon,
}: {
  title: string;
  description?: string;
  selected?: boolean;
  recommended?: boolean;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}) => (
  <div
    onClick={onClick}
    className={cn(
      "p-4 border rounded-lg cursor-pointer transition-all relative",
      selected
        ? "border-primary bg-primary/10 ring-1 ring-primary/20"
        : "border-border hover:border-primary/50",
      className
    )}
  >
    {recommended && (
      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
        RECOMENDADO
      </div>
    )}
    <div className="flex items-start gap-3">
      <div
        className={cn(
          "mt-1 w-5 h-5 rounded-full border flex items-center justify-center",
          selected ? "border-primary bg-primary" : "border-muted-foreground"
        )}
      >
        {selected && <Check className="w-3 h-3 text-primary-foreground" />}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-bold">{title}</h3>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  </div>
);
