import { HeartPulse, Plane, Ship, Umbrella } from "lucide-react";

export interface InsuranceProduct {
  id: string;
  name: string; // chave de tradução
  type: string; // chave de tradução do tipo
  icon: React.ElementType; // componente do ícone
  description: string; // chave de tradução
  features: string[]; // chaves de tradução
  image: string;
}

export const personalInsurance: InsuranceProduct[] = [
  {
    id: "particularvida",
    name: "InsuranceTypes.Personal.Life.Name",
    type: "InsuranceTypes.Personal.Life.Type",
    icon: HeartPulse,
    description: "InsuranceTypes.Personal.Life.Description",
    features: [
      "InsuranceTypes.Personal.Life.Feature1",
      "InsuranceTypes.Personal.Life.Feature2",
      "InsuranceTypes.Personal.Life.Feature3",
      "InsuranceTypes.Personal.Life.Feature4",
    ],
    image: "/bg/liability.jpg",
  },
  {
    id: "particularnaovida",
    name: "InsuranceTypes.Personal.NonLife.Name",
    type: "InsuranceTypes.Personal.NonLife.Type",
    icon: Plane,
    description: "InsuranceTypes.Personal.NonLife.Description",
    features: [
      "InsuranceTypes.Personal.NonLife.Feature1",
      "InsuranceTypes.Personal.NonLife.Feature2",
      "InsuranceTypes.Personal.NonLife.Feature3",
      "InsuranceTypes.Personal.NonLife.Feature4",
    ],
    image: "/bg/trav.jpg",
  },
];

export const businessInsurance: InsuranceProduct[] = [
  {
    id: "empresarialvida",
    name: "InsuranceTypes.Business.Life.Name",
    type: "InsuranceTypes.Business.Life.Type",
    icon: Umbrella,
    description: "InsuranceTypes.Business.Life.Description",
    features: [
      "InsuranceTypes.Business.Life.Feature1",
      "InsuranceTypes.Business.Life.Feature2",
      "InsuranceTypes.Business.Life.Feature3",
      "InsuranceTypes.Business.Life.Feature4",
    ],
    image: "/bg/danos.jpg",
  },
  {
    id: "empresarialnaovida",
    name: "InsuranceTypes.Business.NonLife.Name",
    type: "InsuranceTypes.Business.NonLife.Type",
    icon: Ship,
    description: "InsuranceTypes.Business.NonLife.Description",
    features: [
      "InsuranceTypes.Business.NonLife.Feature1",
      "InsuranceTypes.Business.NonLife.Feature2",
      "InsuranceTypes.Business.NonLife.Feature3",
      "InsuranceTypes.Business.NonLife.Feature4",
      "InsuranceTypes.Business.NonLife.Feature5",
      "InsuranceTypes.Business.NonLife.Feature6",
    ],
    image: "/bg/cargas.jpg",
  },
];
