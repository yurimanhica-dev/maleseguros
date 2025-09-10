"use client";

import { motion, useInView } from "framer-motion";
import {
  Award,
  BarChart2,
  Building2,
  Globe,
  Shield,
  Users,
} from "lucide-react";
import { useRef } from "react";

export const AboutUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Dados dinâmicos
  const companyHistory = [
    { year: "1964", event: "Fundação da empresa em São Paulo" },
    { year: "1980", event: "Expansão para o mercado nacional" },
    { year: "2005", event: "Certificação ISO 9001" },
    { year: "2024", event: "Presença em 12 países" },
  ];

  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Integridade",
      description: "Agimos com ética e transparência",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Clientes em 1º lugar",
      description: "Soluções personalizadas",
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Inovação",
      description: "Pioneiros em tecnologia",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-background">
      {/* Background decorativo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-20" />
      </motion.div>

      <div className="container px-4 mx-auto">
        {/* Cabeçalho com animação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-6 py-2 mb-6">
            <Building2 className="w-5 h-5 mr-2" />
            <span className="font-medium">60 Anos de Excelência</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nossa <span className="text-primary">História</span> e Valores
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Desde 1964, construímos relações de confiança através de soluções
            inovadoras e atendimento excepcional.
          </p>
        </motion.div>

        {/* Linha do tempo interativa */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-28"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">
            Nossa Jornada
          </h3>
          <div className="relative">
            {/* Linha central */}
            <div className="absolute left-1/2 h-full w-0.5 bg-primary/20 -translate-x-1/2" />

            {companyHistory.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 + 0.5, duration: 0.7 }}
                className={`relative flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                } mb-12`}
              >
                <div
                  className={`w-full max-w-md p-6 rounded-xl border bg-background shadow-sm ${
                    index % 2 === 0 ? "ml-8" : "mr-8"
                  }`}
                >
                  <div
                    className={`absolute top-6 w-4 h-4 rounded-full bg-primary ${
                      index % 2 === 0 ? "-left-8" : "-right-8"
                    }`}
                  />
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <span className="font-bold">{item.year}</span>
                    </div>
                    <h4 className="text-lg font-semibold">{item.event}</h4>
                  </div>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Missão, Visão e Valores */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Missão */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Missão</h3>
              <p className="text-muted-foreground text-center">
                Proporcionar segurança e tranquilidade através de soluções
                inovadoras em seguros.
              </p>
            </motion.div>

            {/* Visão */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Visão</h3>
              <p className="text-muted-foreground text-center">
                Ser referência global em proteção financeira até 2030.
              </p>
            </motion.div>

            {/* Valores */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Valores</h3>
              <ul className="space-y-3">
                {values.map((value, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-primary mt-0.5">{value.icon}</span>
                    <div>
                      <h4 className="font-medium">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Destaque de números */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "60+", label: "Anos no mercado" },
              { number: "1M+", label: "Clientes ativos" },
              { number: "24/7", label: "Atendimento" },
              { number: "12", label: "Países atendidos" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <p className="text-4xl font-bold text-primary mb-2">
                  {item.number}
                </p>
                <p className="text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
