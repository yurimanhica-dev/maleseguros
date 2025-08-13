import Button from "@/app/components/Button";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  ChevronRight,
  ClipboardList,
  Handshake,
  Smartphone,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Solicite sua simulação",
      description: "Preencha o formulário com seus dados e necessidades",
      highlight: "Mais de 1.000 simulações recebidas mensalmente",
    },
    {
      icon: <ClipboardList className="w-5 h-5" />,
      title: "Análise Personalizada",
      description: "Receba uma proposta adaptada ao seu perfil",
      highlight: "Mais de 50.000 apólices analisadas anualmente",
    },
    {
      icon: <Handshake className="w-5 h-5" />,
      title: "Escolha e contrate",
      description: "Selecione o plano ideal e finalize a contratação",
      highlight: "Suporte completo durante todo o processo",
    },
  ];

  return (
    <section className="relative bg-[var(--background)] pt-20 pb-5 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-0 right-0 w-[20rem] h-[20rem] bg-primary translate-x-1/2 -translate-y-1/2 rotate-45 z-0"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-primary -translate-x-1/2 translate-y-1/2 rotate-45 z-0"
      />
      <div className="max-w-6xl mx-auto">
        {/* Header with experience badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 bg-[var(--primary)]/10 rounded-full text-sm font-medium text-[var(--primary)] mb-4">
            <CalendarCheck className="w-4 h-4 mr-2" />
            EXPERIÊNCIA DESDE 2014
          </div>
          <h2 className="text-3xl md:text-4xl font-bold uppercase text-[var(--foreground)] mb-4">
            <span className="text-[var(--primary)]">Como funciona</span> com
            <br /> nosso processo
          </h2>
          <p className="text-lg text-[var(--muted-foreground)] max-w-3xl mx-auto">
            Simples, rápido e totalmente adaptado às suas necessidades
          </p>
        </motion.div>

        {/* Enhanced flow with timeline */}
        <div className="relative">
          {/* Timeline */}
          <div className="hidden md:block absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="h-full bg-[var(--card)] p-6 rounded-lg border border-[var(--border)] shadow-xs hover:shadow-sm transition-all">
                  <div className="flex flex-col h-full">
                    {/* Step indicator */}
                    <div className="flex items-center mb-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] mr-4">
                        {step.icon}
                      </div>
                      <div className="text-sm font-medium text-[var(--primary)]">
                        PASSO 0{index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[var(--muted-foreground)] mb-4 flex-grow">
                      {step.description}
                    </p>

                    {/* Experience highlight */}
                    <div className="mt-auto pt-4 border-t border-[var(--border)]">
                      <p className="text-xs font-medium text-[var(--primary)]">
                        {step.highlight}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA with experience */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="mb-6 text-sm text-[var(--muted-foreground)]">
            JUNTE-SE A MAIS DE 50.000 APOLICES SEGURADAS
          </div>
          <Button
            variant="primary"
            icon={<ChevronRight />}
            iconPosition="right"
            size="md"
            rounded="full"
          >
            Simular meu seguro
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
