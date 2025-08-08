"use client";

import Button from "@/app/components/Button";
import { motion } from "framer-motion";
import { Car, HeartPulse, Plane, Ship, Store, Umbrella } from "lucide-react";
import Image from "next/image";

const personalInsurance = [
  {
    id: "auto",
    name: "Seguro Automóvel",
    icon: <Car className="w-8 h-8 text-primary" />,
    description: "Proteção completa para seu veículo",
    features: ["Cobertura total", "Assistência 24h", "Danos a terceiros"],
    image: "/bg/auto.jpg", // Adicione suas imagens aqui
  },
  {
    id: "health",
    name: "Seguro Saúde",
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    description: "Cuidados médicos quando você mais precisa",
    features: ["Consultas ilimitadas", "Internações", "Exames complementares"],
    image: "/bg/liability.jpg",
  },
  {
    id: "travel",
    name: "Seguro Viagem",
    icon: <Plane className="w-8 h-8 text-primary" />,
    description: "Tranquilidade em suas aventuras",
    features: ["Cobertura internacional", "Perda de bagagem", "Cancelamentos"],
    image: "/bg/trav.jpg",
  },
];

const businessInsurance = [
  {
    id: "property",
    name: "Seguro Patrimonial",
    icon: <Store className="w-8 h-8 text-primary" />,
    description: "Proteja seus bens empresariais",
    features: ["Incêndio", "Roubo", "Danos elétricos"],
    image: "/bg/incendio.jpg",
  },
  {
    id: "liability",
    name: "Seguro Responsabilidade",
    icon: <Umbrella className="w-8 h-8 text-primary" />,
    description: "Proteção contra reclamações de terceiros",
    features: ["Danos materiais", "Danos corporais", "Defesa jurídica"],
    image: "/bg/danos.jpg",
  },
  {
    id: "cargo",
    name: "Seguro de Carga",
    icon: <Ship className="w-8 h-8 text-primary" />,
    description: "Segurança para suas mercadorias",
    features: [
      "Transporte nacional",
      "Transporte internacional",
      "Roubo de carga",
    ],
    image: "/bg/cargas.jpg",
  },
];

export const InsuranceProductsGrid = ({ type }: { type: string }) => {
  const products = type === "personal" ? personalInsurance : businessInsurance;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-12"
    >
      <h3 className="text-2xl font-bold text-center uppercase mb-8">
        {type === "personal" ? "Seguros Particulares" : "Seguros Empresariais"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative h-full rounded-xl overflow-hidden shadow-lg"
          >
            {/* Imagem permanente no topo do card */}
            <div className="h-64 w-full relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />
            </div>

            {/* Conteúdo do card */}
            <div className="inset-0 p-6 bg-background z-30">
              <div className="flex items-center justify-center w-16 h-16 bg-background rounded-lg mb-4 -mt-12 mx-auto relative z-10">
                {product.icon}
              </div>

              <h4 className="text-xl font-semibold mb-4">{product.name}</h4>
              <p className="text-muted-foreground mb-4">
                {product.description}
              </p>

              <ul className="space-y-2 mb-6">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant="primary"
                rounded="md"
                size="sm"
              >
                Solicitação de cotação
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
