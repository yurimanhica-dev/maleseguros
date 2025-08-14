"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { InsuranceTypeSelector } from "../components/InsuranceTypeSelector";
import { InsuranceProductsGrid } from "../components/ProductsGrid";
export const Solutions = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden py-16 md:py-24 min-h-[60vh] w-full flex items-center bg-background z-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-0 -right-15 w-[20rem] h-[20rem] bg-primary translate-x-1/2 translate-y-1/2 rotate-180 z-0"
      />
      <div className="container px-4 mx-auto">
        {!selectedType ? (
          <InsuranceTypeSelector onSelect={setSelectedType} />
        ) : (
          <>
            <button
              onClick={() => setSelectedType(null)}
              className="flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Voltar para tipos de seguro
            </button>
            <InsuranceProductsGrid type={selectedType} />
          </>
        )}
      </div>
    </section>
  );
};
