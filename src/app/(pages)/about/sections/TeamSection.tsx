"use client";

import { motion, Variants } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";

type MembroEquipe = {
  nome: string;
  cargo: string;
  foto: string;
  redes?: {
    linkedin?: string;
    email?: string;
  };
};
const membros: MembroEquipe[] = [
  {
    nome: "Jorge Mabota",
    cargo: "Gestor de Sinistros",
    foto: "/avatars/1.jpg",
    redes: {
      linkedin: "#",
      email: "mailto:joao@empresa.com",
    },
  },
  {
    nome: "Sania Pedro",
    cargo: "Gestora de Sinistros",
    foto: "/avatars/2.jpg",
    redes: {
      linkedin: "#",
      email: "mailto:ana@empresa.com",
    },
  },
  {
    nome: "Nilza Cuna",
    cargo: "Analista de Riscos",
    foto: "/avatars/3.jpg",
    redes: {
      linkedin: "#",
      email: "mailto:miguel@empresa.com",
    },
  },
  {
    nome: "Feliz Tchembene",
    cargo: "Gestor de Sinistros",
    foto: "/avatars/4.jpg",
    redes: {
      linkedin: "#",
      email: "mailto:sofia@empresa.com",
    },
  },
  {
    nome: "Viriato Mabota",
    cargo: "Corrector de Seguros",
    foto: "/avatars/viria.jpg",
    redes: {
      linkedin: "#",
      email: "mailto:pedro@empresa.com",
    },
  },
  {
    nome: "Mauro Paulo",
    cargo: "Gestor Comercial",
    foto: "/avatars/paulo.jpg",
    redes: {
      linkedin: "#",
      email: "mailto:pedro@empresa.com",
    },
  },
];

// const container: Variants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.08,
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -5,
    transition: { duration: 0.3 },
  },
};

export default function EquipePremium() {
  const duplicated = [...membros, ...membros];

  return (
    <section className="relative w-full py-24 bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      <div className="mx-auto max-w-7xl c-space">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Coluna esquerda: Título e descrição */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 space-y-4"
          >
            <div className="space-y-4">
              <div className="inline-flex  items-center uppercase px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium">
                <span className="font-semibold">Encontre um Corrector</span>
              </div>

              <h2 className="font-bold leading-tight">
                <span className="block uppercase text-4xl md:text-2xl">
                  Fale com um
                </span>
                <span className="block text-5xl text-[var(--primary)] uppercase">
                  Corrector
                </span>
                {/* <span className="block">
                  hoje e descubra o plano ideal para sua situacão.
                </span> */}
              </h2>
            </div>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-lg">
              Descubra o plano ideal para sua situacão. A Nossa equipe
              multidisciplinar combina experiência técnica com criatividade para
              entregar soluções inovadoras e personalizadas.
            </p>
            {/* <Button
              variant="primary"
              icon={<ArrowRight />}
              iconPosition="right"
              size="md"
              rounded="full"
              className="text-sm hover:bg-primary-dark"
            >
              Solicitar Retorno
            </Button>*/}
          </motion.aside>

          {/* Coluna direita: Cards da equipe */}
          <div className="lg:col-span-8 relative w-fit">
            <div className="relative overflow-hidden py-4">
              <motion.div
                className="flex gap-6 animate-slide overflow-x-scroll [&::-webkit-scrollbar]:hidden"
                onWheel={(e) => {
                  if (e.shiftKey) {
                    e.currentTarget.scrollLeft += e.deltaY; // scroll com Shift
                  }
                }}
              >
                {duplicated.map((membro, idx) => (
                  <div
                    key={idx}
                    className="relative min-w-[280px] flex-shrink-0 group"
                  >
                    <div className="relative overflow-hidden">
                      {/* Foto do membro */}
                      <div className="relative w-full h-80 overflow-hidden">
                        <Image
                          src={membro.foto}
                          alt={membro.nome}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-105"
                        />

                        {/* Overlay gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70  to-transparent opacity-80 transition-opacity duration-300" />

                        {/* Ícones sociais no hover */}
                        <div className="absolute bottom-4 right-2 flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {membro.redes?.linkedin && (
                            <a
                              href={membro.redes.linkedin}
                              className="p-2 rounded-full hover:cursor-pointer hover:bg-[var(--primary)]/90 transition-colors"
                              aria-label={`LinkedIn de ${membro.nome}`}
                            >
                              <Linkedin
                                size={18}
                                className="text-white hover:cursor-pointer hover:bg-[var(--primary)]/90"
                              />
                            </a>
                          )}
                          {membro.redes?.email && (
                            <a
                              href={membro.redes.email}
                              className="p-2 rounded-full cursor-pointer hover:bg-[var(--primary)]/90 transition-colors"
                              aria-label={`Email de ${membro.nome}`}
                            >
                              <Mail
                                size={18}
                                className="text-white cursor-pointer hover:bg-[var(--primary)]/90"
                              />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Informações do membro */}
                      <div className="absolute bottom-4 left-4 right-4 text-start">
                        <h3 className="font-bold uppercase text-xl text-white mb-1">
                          {membro.nome}
                        </h3>
                        <div className="w-12 h-0.5 bg-[var(--primary)] my-2"></div>
                        <p className="text-sm text-white/90">{membro.cargo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Sombra de desfoque nas bordas */}
              <div className="pointer-events-none absolute inset-y-0 left-0 border-r shadow-lg shadow-primary z-10"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
