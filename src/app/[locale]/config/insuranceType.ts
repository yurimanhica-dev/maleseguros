export interface InsuranceType {
  id: string;
  name: string; // chave de tradução
  description: string; // chave de tradução
  icon: string; // caminho da imagem
}

export const insuranceTypes: InsuranceType[] = [
  {
    id: "personal",
    name: "Insurance.Personal.Name",
    description: "Insurance.Personal.Description",
    icon: "/icons/personal-datar.png",
  },
  {
    id: "business",
    name: "Insurance.Business.Name",
    description: "Insurance.Business.Description",
    icon: "/icons/insurancer.png",
  },
];
