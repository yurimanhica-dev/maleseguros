"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Car,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  FileText,
  Heart,
  Home,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";

const accidentTypes = [
  {
    id: "auto",
    title: "Acidente Automóvel",
    icon: <Car className="w-6 h-6" />,
    color: "bg-blue-500",
  },
  {
    id: "health",
    title: "Acidente Pessoal",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-red-500",
  },
  {
    id: "home",
    title: "Sinistro em Casa",
    icon: <Home className="w-6 h-6" />,
    color: "bg-green-500",
  },
  {
    id: "travel",
    title: "Problemas em Viagem",
    icon: <Users className="w-6 h-6" />,
    color: "bg-purple-500",
  },
];

const accidentTips = {
  auto: [
    {
      step: "1",
      title: "Mantenha a Calma",
      description:
        "Respire fundo e tente manter a serenidade para tomar as melhores decisões.",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      step: "2",
      title: "Proteja o Local",
      description:
        "Use o colete refletor e coloque o triângulo de sinalização a pelo menos 30 metros do veículo.",
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    {
      step: "3",
      title: "Verifique Feridos",
      description:
        "Cheque se há feridos e ligue imediatamente para o 112 em caso de emergência médica.",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      step: "4",
      title: "Sinalização",
      description:
        "Mantenha os piscas ligados e ilumine o local durante a noite.",
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    {
      step: "5",
      title: "Autoridades",
      description:
        "Chame as autoridades (PRM através do 112) para registar o ocorrido.",
      icon: <Phone className="w-5 h-5" />,
    },
    {
      step: "6",
      title: "Recolha Informações",
      description:
        "Anote dados dos intervenientes: nomes, contactos, documentos e informações dos veículos.",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      step: "7",
      title: "Testemunhas",
      description:
        "Identifique e recolha contactos de testemunhas do acidente.",
      icon: <Users className="w-5 h-5" />,
    },
    {
      step: "8",
      title: "Fotografias",
      description:
        "Tire fotos de todos os ângulos do acidente,包括 danos e posição dos veículos.",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      step: "9",
      title: "Comunicação",
      description:
        "Comunique o sinistro à Austral Seguros no prazo máximo de 8 dias.",
      icon: <Phone className="w-5 h-5" />,
    },
    {
      step: "10",
      title: "Reboque",
      description:
        "Se necessário, solicite serviço de reboque através da sua seguradora.",
      icon: <Car className="w-5 h-5" />,
    },
  ],
  health: [
    {
      step: "1",
      title: "Primeiros Socorros",
      description: "Prestar auxílio imediato dentro das suas capacidades.",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      step: "2",
      title: "Emergência Médica",
      description:
        "Ligar 112 e fornecer localização exata e detalhes da situação.",
      icon: <Phone className="w-5 h-5" />,
    },
    {
      step: "3",
      title: "Documentação",
      description: "Manter toda a documentação médica e recibos de despesas.",
      icon: <FileText className="w-5 h-5" />,
    },
  ],
  home: [
    {
      step: "1",
      title: "Segurança Primeiro",
      description: "Garantir que todas as pessoas estão em local seguro.",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      step: "2",
      title: "Minimizar Danos",
      description:
        "Tomar medidas para evitar maiores prejuízos (cortar água, eletricidade, etc.).",
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    {
      step: "3",
      title: "Registo Fotográfico",
      description:
        "Documentar todos os danos com fotografias antes de qualquer reparação.",
      icon: <FileText className="w-5 h-5" />,
    },
  ],
  travel: [
    {
      step: "1",
      title: "Contacto Imediato",
      description: "Contactar a assistência em viagem da seguradora.",
      icon: <Phone className="w-5 h-5" />,
    },
    {
      step: "2",
      title: "Documentação",
      description:
        "Manter todos os comprovativos e facturas de despesas adicionais.",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      step: "3",
      title: "Autoridades Locais",
      description:
        "Registar ocorrência nas autoridades locais quando aplicável.",
      icon: <Shield className="w-5 h-5" />,
    },
  ],
};

export const DicasUteisSection = () => {
  const [selectedAccident, setSelectedAccident] = useState("auto");
  const [expandedTips, setExpandedTips] = useState<number[]>([]);

  const toggleTip = (index: number) => {
    setExpandedTips((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-72 bg-primary/5 transform -skew-y-3 -translate-y-16"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Dicas de Emergência
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            O Que Fazer em Caso de{" "}
            <span className="text-primary">Sinistro</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A Austral Seguros, S.A. aconselha estas medidas importantes para
            proteger você e seus bens em situações de emergência.
          </p>
        </motion.div>

        {/* Seleção de tipo de acidente */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {accidentTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedAccident(type.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
                selectedAccident === type.id
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-gray-200 bg-white hover:border-primary/30"
              }`}
            >
              <div className={`p-3 rounded-full ${type.color} text-white mb-4`}>
                {type.icon}
              </div>
              <span className="font-semibold text-foreground text-sm">
                {type.title}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Lista de dicas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                {accidentTypes.find((t) => t.id === selectedAccident)?.icon}
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                {accidentTypes.find((t) => t.id === selectedAccident)?.title}
              </h3>
            </div>

            <div className="space-y-4">
              {accidentTips[selectedAccident as keyof typeof accidentTips].map(
                (tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleTip(index)}
                      className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-bold text-primary">
                            {tip.step}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {tip.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {expandedTips.includes(index)
                              ? tip.description
                              : tip.description.slice(0, 60) + "..."}
                          </p>
                        </div>
                      </div>
                      <div className="text-primary">
                        {expandedTips.includes(index) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedTips.includes(index) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6"
                        >
                          <div className="flex items-start gap-3 pt-4">
                            <div className="flex-shrink-0 mt-1 text-primary">
                              {tip.icon}
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              {tip.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Precisa de Ajuda Imediata?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nossa equipe de emergência está disponível 24/7 para assistência
              imediata em caso de sinistro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:112"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Phone className="w-5 h-5 mr-2" />
                Emergência: 112
              </motion.a>
              <motion.a
                href="tel:+258847777777"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Phone className="w-5 h-5 mr-2" />
                Austral Seguros: +258 84 777 7777
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
