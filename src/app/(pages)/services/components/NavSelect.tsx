"use client";

import { useState } from "react";

type TabType = "particular" | "empresarial";

interface NavSelectProps {
  onChange?: (tab: TabType) => void;
}

const tabs: { label: string; value: TabType }[] = [
  { label: "Particular", value: "particular" },
  { label: "Empresarial", value: "empresarial" },
];

export default function NavSelect({ onChange }: NavSelectProps) {
  const [activeTab, setActiveTab] = useState<TabType>("particular");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    onChange?.(tab);
  };

  return (
    <div className="sticky top-0 left-0 w-full z-30 bg-background py-4  border-b border-border/10 shadow-sm">
      <div className="flex items-center justify-center space-x-4 text-xl font-semibold">
        {tabs.map(({ label, value }, index) => (
          <div key={value} className="flex items-center space-x-4">
            <button
              onClick={() => handleTabChange(value)}
              className={`transition-all duration-300 border-b-2 ${
                activeTab === value
                  ? "text-primary border-primary"
                  : "text-foreground border-transparent hover:border-gray-400"
              }`}
            >
              {label}
            </button>

            {/* Barra apenas entre os botões */}
            {index < tabs.length - 1 && (
              <span className="text-foreground select-none">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
