"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Car,
  Clock,
  Download,
  FileText,
  MapPin,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";

const AccidentSection = () => {
  const [activeStep, setActiveStep] = useState(0);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionRef = useRef(null);

  const accidentSteps = [
    {
      icon: <Car className="w-6 h-6 " />,
      title: "Mantenha a calma",
      description: "Avalie a situação e garanta sua segurança.",
      details: [
        "Verifique se há feridos e chame ajuda imediatamente.",
        "Afaste-se de áreas de risco, se possível.",
        "Ligue para os serviços de emergência se necessário.",
      ],

      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Contato imediato",
      description: "Informe a seguradora e acione assistência.",
      details: [
        "Ligue para o número de emergência do seu seguro.",
        "Informe dados do acidente: local, hora e envolvidos.",
        "Mantenha registro de todas as informações e fotos do acidente.",
      ],

      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Documentação no local",
      description: "Recolha evidências importantes para o sinistro.",
      details: [
        "Tire fotos do local, danos e placas dos veículos.",
        "Anote testemunhas e seus contatos.",
        "Evite admitir culpa ou assinar documentos sem orientação.",
      ],

      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Abertura de sinistro",
      description: "Registre oficialmente o sinistro para cobertura.",
      details: [
        "Acesse o portal ou aplicativo da seguradora.",
        "Preencha os campos com precisão.",
        "Anexe fotos, documentos e relatórios, se houver.",
      ],

      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const emergencyContacts = [
    { name: "Emergência", number: "+258 84 123 4567", available: "24/7" },
    { name: "Assistência", number: "+258 214 184 39", available: "24/7" },
    {
      name: "Sinistros",
      number: "+258 86 654 3210",
      available: "Seg-Sex: 8h-18h",
    },
  ];

  return (
    <section className="min-h-screen bg-background py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full -translate-x-40 translate-y-40"></div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        ref={sectionRef}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Em caso de <span className="text-primary">acidente</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Siga estes passos importantes para garantir sua segurança e agilizar
            o processo de sinistro.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card shadow-lg p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Procedimentos
              </h2>
              <div className="space-y-3">
                {accidentSteps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-full flex items-center p-4 transition-all duration-300 ${
                      activeStep === index
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary hover:bg-accent"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${
                        activeStep === index ? "bg-white/20" : ""
                      }`}
                    >
                      {step.icon}
                    </div>
                    <span className="font-medium text-left">{step.title}</span>
                  </button>
                ))}
              </div>

              {/* Emergency contacts */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Contatos de Emergência
                </h3>
                <div className="space-y-3">
                  {emergencyContacts.map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {contact.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {contact.available}
                        </p>
                      </div>
                      <a
                        href={`tel:${contact.number.replace(/\s/g, "")}`}
                        className="text-primary hover:text-primary/80 font-medium"
                      >
                        {contact.number}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step content */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8"
                >
                  <div className="flex items-start mb-6">
                    <div
                      className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-foreground text-white mr-5`}
                    >
                      {accidentSteps[activeStep].icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {accidentSteps[activeStep].title}
                      </h2>
                      <p className="text-muted-foreground">
                        {accidentSteps[activeStep].description}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl mb-8">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center">
                      <AlertTriangle className="w-5 h-5 text-primary mr-2" />O
                      que fazer:
                    </h3>
                    <ul className="space-y-2">
                      {accidentSteps[activeStep].details.map(
                        (detail, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-3 flex-shrink-0"></div>
                            <span className="text-foreground">{detail}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">
                        Documentos necessários
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Carta de condução</li>
                        <li>• Documento do veículo</li>
                        <li>• Apólice do seguro</li>
                      </ul>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">
                        Prazo para reportar
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        O sinistro deve ser reportado no prazo máximo de 48
                        horas após o acidente.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <button className="flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                      <FileText className="w-5 h-5 mr-2" />
                      Abrir Sinistro Online
                    </button>
                    <button className="flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors">
                      <Download className="w-5 h-5 mr-2" />
                      Download do Formulário
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Additional resources */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Assistência 24h
                </h3>
                <p className="text-sm text-muted-foreground">
                  Nossa equipe está disponível a qualquer momento para ajudar.
                </p>
              </div>

              <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-amber-100 dark:bg-amber-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Processo Rápido
                </h3>
                <p className="text-sm text-muted-foreground">
                  Resolução de sinistros em até 72 horas após documentação
                  completa.
                </p>
              </div>

              <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Cobertura Total
                </h3>
                <p className="text-sm text-muted-foreground">
                  Proteção completa para você e seu veículo em qualquer
                  situação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccidentSection;
