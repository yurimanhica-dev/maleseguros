"use client";

import Button from "@/app/components/Button";
import { motion } from "framer-motion";
import { HeartPulse, Plane, Ship, Umbrella } from "lucide-react";
import Image from "next/image";

const personalInsurance = [
  {
    id: "particularvida",
    name: "Seguro Vida",
    type: "Vida",
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    description:
      "Apresentamos as melhores opções de seguros para proteger você e sua família contra acidentes, doenças e imprevistos relacionados  à sua integridade física e bem-estar, garantindo tranquilidade financeira.",
    features: [
      "Acidentes Pessoais",
      "Acidentes Pessoais – Seguro Escolar",
      "Acidentes Pessoais – Seguro Familiar",
      "Acidentes Pessoais – Seguro Desporto, Cultura e Recreio",
    ],
    image: "/bg/liability.jpg",
  },
  {
    id: "particularnaovida",
    name: "Seguro Não Vida",
    type: "Não Vida",
    icon: <Plane className="w-8 h-8 text-primary" />,
    description:
      "Oferecemos soluções completas para proteger seus bens pessoais, como imóvel, veículo e responsabilidade civil, garantindo coberturas que preservam seu patrimônio contra diversos riscos.",
    features: [
      "Viagens",
      "Multi Riscos – Habitação e Crédito à Habitação",
      "Automóvel",
      "Responsabilidade Civil – Familiar e Caçador",
    ],
    image: "/bg/trav.jpg",
  },
];

const businessInsurance = [
  {
    id: "empresarialvida",
    name: "Seguro Vida",
    type: "Vida",
    icon: <Umbrella className="w-8 h-8 text-primary" />,
    description:
      "Oferecemos opções de seguros para proteger a vida e o bem-estar dos colaboradores, garantindo suporte em casos de acidentes, doenças e outras eventualidades, promovendo segurança e tranquilidade no ambiente de trabalho.",
    features: [
      "Acidentes de Trabalho",
      "Seguro Saúde – Grupo",
      "Defesa jurídica",
      "Seguros para Trabalhador Conta Própria",
    ],
    image: "/bg/danos.jpg",
  },
  {
    id: "empresarialnaovida",
    name: "Seguro Não Vida",
    type: "Não Vida",
    icon: <Ship className="w-8 h-8 text-primary" />,
    description:
      "Disponibilizamos soluções completas para proteger seus bens pessoais, como imóveis, veículos e responsabilidade civil, oferecendo coberturas que preservam seu patrimônio contra diversos riscos do dia a dia.",
    features: [
      "Transporte nacional",
      "Incêndio e Elementos da Natureza",
      "Avarias de Máquinas, Obras e Montagens",
      "Multi Riscos - Comerciantes e All Risks",
      "Transportes Marítimos, Aéreos e Terrestres",
      "Responsabilidade Civil – Geral, Exploração, Pescadores, Produtos e Profissional",
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* tipo de seguro por cada card */}
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative h-full rounded-xl overflow-hidden shadow-lg w-full"
          >
            <h4 className="text-center text-xl uppercase font-semibold mb-6">
              {product.type}
            </h4>

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
