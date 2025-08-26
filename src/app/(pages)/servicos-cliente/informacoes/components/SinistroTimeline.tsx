"use client";

import Image from "next/image";

const steps = [
  {
    img: "/images/sinistros/acident.jpg",
    step: "Etapa 1: ",
    title: "Acidente",
    description: "Mantenha a calma e verifique se há feridos.",
  },
  {
    img: "/images/sinistros/emergencia.jpg",
    step: "Etapa 2: ",
    title: "Contacto",
    description: "Ligue imediatamente para os serviços de emergência.",
  },
  {
    img: "/images/sinistros/documentacao.jpg",
    step: "Etapa 3: ",
    title: "Documentação",
    description: "Recolha fotos, boletim e informações do local.",
  },
  {
    img: "/images/sinistros/emergencia.jpg",
    step: "Etapa 4: ",
    title: "Abertura de Sinistro",
    description: "Envie os documentos ou abra online em até 48h.",
  },
  {
    img: "/images/sinistros/resolucao.jpg",
    step: "Etapa 5: ",
    title: "Resolução",
    description: "Acompanhe o processo até a indenização.",
  },
];

export default function SinistroTimeline() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Guia Rápido de Sinistros</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 relative">
          {/* linha de conexão */}
          <div className="hidden md:block absolute top-20 left-1/2 w-[2px] h-[2px] bg-gray-300"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex-1 flex flex-col items-center"
            >
              <div className=" relative shadow-xl p-4 z-10 w-full h-50 flex items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-full ">
                  <Image
                    src={step.img}
                    alt={step.title}
                    fill
                    className="object-cover object-top h-full w-full rounded-t-2xl"
                  />
                </div>
              </div>
              <h4 className="mt-3 text-lg font-semibold">{step.step}</h4>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-[200px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
