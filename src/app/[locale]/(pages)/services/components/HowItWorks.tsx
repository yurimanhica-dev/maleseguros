import Button from "@/app/[locale]/components/Button";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  ChevronRight,
  ClipboardList,
  Handshake,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import Image from "next/image";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Solicite sua simulação",
      description:
        "Preencha o formulário com seus dados e necessidades em nossa plataforma intuitiva",
      highlight: "Mais de 1.000 simulações recebidas mensalmente",
      image: "/images/simulation-proces.jpg",
      stats: "98% de satisfação ",
    },
    {
      icon: <ClipboardList className="w-6 h-6" />,
      title: "Análise Personalizada",
      description:
        "Nossos especialistas avaliam seu perfil e criam propostas customizadas",
      highlight: "Mais de 50.000 apólices analisadas anualmente",
      image: "/images/analysis-process.jpg",
      stats: "Análise 40% mais rápida",
    },
    {
      icon: <Handshake className="w-6 h-6" />,
      title: "Escolha e contrate",
      description:
        "Selecione o plano ideal com orientação especializada e finalize digitalmente",
      highlight: "Suporte completo durante todo o processo",
      image: "/images/contract-process.jpg",
      stats: "Contratação 100% digital",
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
            <span className="text-[var(--primary)]">Como funciona</span> nosso
            processo
          </h2>
          <p className="text-lg text-[var(--muted-foreground)] max-w-3xl mx-auto">
            Simples, rápido e totalmente adaptado às suas necessidades
          </p>
        </motion.div>

        {/* Enhanced flow with timeline */}
        <div className="relative">
          {/* Animated connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="hidden lg:block absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30 transform -translate-y-1/2 z-0"
            style={{ originX: 0 }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group"
              >
                <div className="h-full bg-gradient-to-b from-card to-card/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-border/50 hover:border-primary/30">
                  <div className="h-full bg-card/80 backdrop-blur-sm p-6 rounded-2xl">
                    {/* Step number and connector */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {step.icon}
                        </div>
                        <div className="ml-4 text-sm font-semibold text-primary">
                          PASSO 0{index + 1}
                        </div>
                      </div>

                      {/* Step indicator for mobile */}
                      <div className="lg:hidden text-2xl font-bold text-primary/20">
                        0{index + 1}
                      </div>
                    </div>

                    {/* Image container */}
                    <div className="relative mb-6 rounded-xl overflow-hidden group-hover:shadow-md transition-shadow">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center relative">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Overlay badge */}
                        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary">
                          {step.stats}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Experience highlight */}
                    <div className="mt-auto pt-4 border-t border-border/50">
                      <p className="text-sm font-medium text-primary flex items-center">
                        <ShieldCheck className="w-4 h-4 mr-2" />
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
            JUNTE-SE A MAIS DE 10.000 APÓLICES SEGURADAS
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
