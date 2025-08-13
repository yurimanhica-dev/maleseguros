"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const insuranceTypes = [
  {
    id: "personal",
    name: "Seguros Particulares",
    icon: (
      <Image src="/icons/personal-datar.png" alt="a" width={32} height={32} />
    ),
    description: "Proteção personalizada para você e sua família",
  },
  {
    id: "business",
    name: "Seguros Empresariais",
    icon: <Image src="/icons/insurancer.png" alt="a" width={32} height={32} />,
    description: "Soluções completas para proteger seu negócio",
  },
];

export const InsuranceTypeSelector = ({
  onSelect,
}: {
  onSelect: (type: string) => void;
}) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (type: string) => {
    setSelectedType(type);
    onSelect(type);
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex uppercase  font-semibold px-4 py-2 bg-primary/10 text-primary rounded-full mb-8">
          <ShieldCheck className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">8 Anos de Excelência</span>
        </div>
        <h2 className="text-5xl font-bold uppercase text-foreground mb-4">
          Em Soluções de <span className="text-primary">Seguros</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          oferecendo proteção completa adaptada às necessidades de nossos
          clientes
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insuranceTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(type.id)}
            className={`p-6 rounded-xl border transition-all cursor-pointer ${
              selectedType === type.id
                ? "border-primary bg-primary/5 shadow-lg"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg bg-primary/70 ${
                  selectedType === type.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-foreground"
                }`}
              >
                <div className="text-primary">{type.icon}</div>
              </div>
              <div className="flex-1">
                <div>
                  <h3 className="text-xl font-semibold">{type.name}</h3>
                  <p className="text-muted-foreground mt-1 ">
                    {type.description}
                  </p>
                </div>
                <div className="flex flex-row items-center text-sm justify-end text-primary underline">
                  mais informações
                  <FiArrowRight className="inline-block ml-1" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
