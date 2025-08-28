"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ChevronRight,
  Download,
  FileText,
  Minus,
  Phone,
  Plus,
  Shield,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const accidentSteps = [
  {
    icon: <Image src="/icons/calm.png" alt="calm" width={50} height={50} />,
    title: "Mantenha a calma",
    description: "Avalie a situação e garanta sua segurança.",
    details: [
      "Verifique se há feridos e chame ajuda imediatamente.",
      "Afaste-se de áreas de risco, se possível.",
      "Ligue para os serviços de emergência se necessário.",
    ],
  },
  {
    icon: (
      <Image src="/icons/contact.png" alt="contact" width={50} height={50} />
    ),
    title: "Contato imediato",
    description: "Informe a seguradora e acione assistência.",
    details: [
      "Ligue para o número de emergência do seu seguro.",
      "Informe dados do acidente: local, hora e envolvidos.",
      "Mantenha registro de todas as informações e fotos do acidente.",
    ],
  },
  {
    icon: (
      <Image
        src="/icons/documentacao.png"
        alt="documentacao"
        width={50}
        height={50}
      />
    ),
    title: "Documentação no local",
    description: "Recolha evidências importantes para o sinistro.",
    details: [
      "Tire fotos do local, danos e placas dos veículos.",
      "Anote testemunhas e seus contatos.",
      "Evite admitir culpa ou assinar documentos sem orientação.",
    ],
  },
  {
    icon: (
      <Image
        src="/icons/documentacao.png"
        alt="documentacao"
        width={50}
        height={50}
      />
    ),
    title: "Abertura de sinistro",
    description: "Registre oficialmente o sinistro para cobertura.",
    details: [
      "Acesse o portal ou aplicativo da seguradora.",
      "Preencha os campos com precisão.",
      "Anexe fotos, documentos e relatórios, se houver.",
    ],
  },
];

export default function AccidentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={ref}
      className="py-24 bg-background relative overflow-hidden"
      id="acidentes"
    >
      {/* Elementos decorativos de fundo
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-primary/70 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-primary/50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div> */}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Cabeçalho com destaque */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Em caso de <span className="text-primary">acidente</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Siga estes passos importantes para garantir sua segurança e agilizar
            o processo de sinistro.
          </p>
        </motion.div>

        {/* Grid de passos com design premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {accidentSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="absolute -inset-0.5 bg-primary/30 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-card rounded-xl shadow-lg border border-border overflow-hidden transition-all duration-300 group-hover:shadow-xl">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex justify-between items-center p-6 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 w-14 h-14 rounded-full bg-primary/10 transition-colors ${
                        hoveredIndex === idx ? "bg-primary/20" : ""
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {openIndex === idx ? (
                      <Minus className="w-6 h-6 text-primary" />
                    ) : (
                      <Plus className="w-6 h-6 text-primary" />
                    )}
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-border">
                        <ul className="space-y-3 text-foreground">
                          {step.details.map((detail, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                              <span>{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recursos adicionais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-primary/5 border border-border rounded-2xl p-8 mb-12"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Recursos importantes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors">
              <FileText className="w-10 h-10 text-primary mb-3" />
              <h4 className="font-medium text-foreground mb-2">
                Formulário de sinistro
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Preencha online e agilize seu processo
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="w-4 h-4 mr-2" /> Baixar
              </Button>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors">
              <Users className="w-10 h-10 text-primary mb-3" />
              <h4 className="font-medium text-foreground mb-2">
                Assistência 24h
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Nossa equipe está sempre disponível
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Phone className="w-4 h-4 mr-2" /> Ligar agora
              </Button>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors">
              <Shield className="w-10 h-10 text-primary mb-3" />
              <h4 className="font-medium text-foreground mb-2">Coberturas</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Conheça todos os benefícios do seu seguro
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <ChevronRight className="w-4 h-4 mr-2" /> Ver mais
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Call-to-action premium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 shadow-lg mb-6">
            <h3 className="text-2xl font-bold text-primary-foreground mb-4">
              Precisa de ajuda imediata?
            </h3>
            <p className="text-primary-foreground/90 mb-6">
              Nossa equipe de emergência está disponível 24 horas por dia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 shadow-md"
              >
                <Phone className="w-5 h-5 mr-2" /> Ligar para emergência
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Abrir sinistro online
              </Button>
            </div>
          </div>

          <p className="text-muted-foreground text-sm">
            Telefone de emergência:{" "}
            <span className="font-semibold text-foreground">
              +258 84 123 4567
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
