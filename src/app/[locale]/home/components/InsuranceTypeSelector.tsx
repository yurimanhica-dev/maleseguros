"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { InsuranceType, insuranceTypes } from "../../config/insuranceType";

export const InsuranceTypeSelector = ({
  onSelect,
}: {
  onSelect: (type: string) => void;
}) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const t = useTranslations("HomePage");

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
        <div className="inline-flex uppercase font-semibold px-4 py-2 bg-primary/10 text-primary rounded-full mb-8">
          <ShieldCheck className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">
            {t("Insurance.YearsOfExcellence")}
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold uppercase text-foreground mb-4">
          {t("Insurance.SectionTitle")}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t("Insurance.SectionDescription")}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insuranceTypes.map((type: InsuranceType) => (
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
                className={`p-3 rounded-lg ${
                  selectedType === type.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-foreground"
                }`}
              >
                <Image
                  src={type.icon}
                  alt={t(type.name)}
                  width={32}
                  height={32}
                />
              </div>
              <div className="flex-1">
                <div>
                  <h3 className="text-xl font-semibold">{t(type.name)}</h3>
                  <p className="text-muted-foreground mt-1 ">
                    {t(type.description)}
                  </p>
                </div>
                <div className="flex flex-row items-center text-sm justify-end text-primary underline">
                  {t("Insurance.MoreInfo")}
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
