"use client";

import { motion } from "framer-motion";
import { HeartPulse, Plane, Ship, Umbrella } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "../../components/Button";
import {
  businessInsurance,
  InsuranceProduct,
  personalInsurance,
} from "../../config/insuranceProducts";

const iconMap = { HeartPulse, Plane, Ship, Umbrella };

export const InsuranceProductsGrid = ({ type }: { type: string }) => {
  const t = useTranslations("HomePage");
  const products = type === "personal" ? personalInsurance : businessInsurance;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-12"
    >
      <h3 className="text-2xl font-bold text-center uppercase mb-8">
        {type === "personal"
          ? t("InsuranceTypes.Personal.Name")
          : t("InsuranceTypes.Business.Name")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product: InsuranceProduct, index: number) => {
          const Icon = iconMap[product.icon as keyof typeof iconMap];
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative h-full rounded-xl overflow-hidden shadow-lg w-full"
            >
              <h4 className="text-center text-xl uppercase font-semibold mb-6">
                {t(product.type)}
              </h4>

              <div className="h-64 w-full relative">
                <Image
                  src={product.image}
                  alt={t(product.name)}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />
              </div>

              <div className="inset-0 p-6 bg-background z-30">
                <div className="flex items-center justify-center w-16 h-16 bg-background rounded-lg mb-4 -mt-12 mx-auto relative z-10">
                  {Icon && <Icon className="w-8 h-8 text-primary" />}
                </div>
                <p className="text-muted-foreground mb-4">
                  {t(product.description)}
                </p>

                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      <span className="text-sm">{t(feature)}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant="primary"
                  rounded="md"
                  size="sm"
                >
                  {t("InsuranceTypes.RequestQuote")}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
