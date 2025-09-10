"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Differentiators = () => {
  const features = [
    {
      title: "Equipe 100% moçambicana",
      description:
        "Profissionais locais que entendem suas necessidades e estão próximos para atendê-lo em qualquer momento.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      image: "/bg/bg-dif.png",
    },
    {
      title: "Atendimento ágil e personalizado",
      description:
        "Soluções sob medida com respostas rápidas e eficientes para sua tranquilidade.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      image: "/bg/r.png",
    },
    {
      title: "Transparência total",
      description:
        "Processos de indenização claros e sem surpresas, com acompanhamento em tempo real.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      image: "/bg/travel.jpg",
    },
    {
      title: "Tecnologia avançada",
      description:
        "Plataforma digital intuitiva para gerenciar seus seguros com facilidade e segurança.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
      image: "/bg/umb.jpg",
    },
  ];

  return (
    <section className="relative bg-[var(--background)] overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-0 -right-15 w-[20rem] h-[20rem] bg-primary translate-x-1/2 translate-y-1/2 rotate-180 z-0"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-15 right-0 w-[20rem] h-[20rem] bg-primary translate-x-1/2 translate-y-1/2 rotate-180 z-0"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-30 right-15 w-[20rem] h-[20rem] bg-primary translate-x-1/2 translate-y-1/2 rotate-180 z-0"
      />
      <div className="max-w-7xl mx-auto c-space py-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-24 relative z-10"
        >
          {/* Decorative underline */}
          <div className="absolute bottom-0 left-1/2 w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-transparent -translate-x-1/2 rounded-full" />

          <h2 className="text-4xl md:text-6xl font-extrabold text-[var(--foreground)] mb-6 leading-tight">
            <span className="text-[var(--primary)] block">
              Por que escolher
            </span>
            <span className="block">a MALEseguros?</span>
          </h2>

          <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed">
            Conheça o que nos diferencia: uma equipe moçambicana dedicada,
            atendimento ágil e soluções inteligentes que garantem proteção,
            confiança e tranquilidade para você e sua família.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <div className="flex flex-col md:flex-row gap-8 h-full">
                {/* Image */}
                <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden shadow-xl">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)/30] to-transparent" />
                </div>

                {/* Content */}
                <div className="md:w-3/5 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--muted-foreground)] mb-4">
                    {feature.description}
                  </p>
                  <div className="mt-auto">
                    <button className="text-[var(--primary)] font-medium flex items-center gap-2 group-hover:underline">
                      Saiba mais
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
