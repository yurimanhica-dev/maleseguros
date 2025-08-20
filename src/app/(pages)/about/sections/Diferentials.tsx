"use client";

import Button from "@/app/components/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const differentials = [
  {
    title: "Equipe 100% moçambicana",
    description: "Profissionais locais que entendem suas necessidades.",
  },
  {
    title: "Atendimento ágil",
    description: "Soluções rápidas e eficientes para sua tranquilidade.",
  },
  {
    title: "Transparência total",
    description: "Processos claros com acompanhamento em tempo real.",
  },
  {
    title: "Tecnologia avançada",
    description: "Plataforma digital intuitiva para gestão de seguros.",
  },
];

export default function DifferentialSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="relative md:h-[500px] h-[800px] w-full overflow-hidden"
    >
      {/* Background Video */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/help.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto c-space">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <h2 className="text-md uppercase tracking-wider mb-2 font-semibold">
                Porque escolher-nos?
              </h2>
              <h3 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="text-primary">Diferenças</span> que fazem a
                diferença.
              </h3>

              <div className="mb-6">
                <Button
                  variant="primary"
                  size="md"
                  icon={<FaArrowRight />}
                  iconPosition="right"
                  rounded="full"
                  className="text-sm hover:bg-primary-dark"
                >
                  Simular um Seguro
                </Button>
              </div>
            </motion.div>

            {/* Right Column - Differential Cards */}
            <div className="grid grid-cols-2 gap-3">
              {differentials.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`p-3 backdrop-blur-sm border transition-all duration-200 cursor-pointer ${
                    activeIndex === index
                      ? "bg-white/10 border-primary shadow-md"
                      : "bg-black/20 border-transparent hover:bg-white/5"
                  }`}
                >
                  <h4 className="text-md font-bold text-white mb-1">
                    {item.title}
                  </h4>
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: activeIndex === index ? "auto" : 0,
                      opacity: activeIndex === index ? 1 : 0,
                    }}
                    className="text-xs text-white/80 overflow-hidden"
                  >
                    {item.description}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="animate-bounce flex flex-col items-center">
          <span className="text-white text-sm mb-2">Scroll</span>
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
