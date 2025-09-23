/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { corretores } from "../utils/types";

const TeamSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visible, setVisible] = useState(1);
  const [totalSlides, setTotalSlides] = useState(0);

  // Função para atualizar o número de corretores visíveis
  const updateVisible = useCallback(() => {
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    if (width >= 1280) return setVisible(4);
    if (width >= 1024) return setVisible(3);
    if (width >= 768) return setVisible(3);
    return setVisible(1);
  }, []);

  // Calcular total de slides
  useEffect(() => {
    setTotalSlides(Math.ceil(corretores.length / visible));
  }, [visible, corretores.length]);

  useEffect(() => {
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, [updateVisible]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev >= corretores.length - visible ? 0 : prev + 1
    );
    setIsAutoPlaying(false);
  }, [corretores.length, visible]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? corretores.length - visible : prev - 1
    );
    setIsAutoPlaying(false);
  }, [corretores.length, visible]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  }, []);

  // Auto-play melhorado
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= corretores.length - visible ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, corretores.length, visible]);

  // Calcular deslocamento correto para o carrossel
  const carouselOffset = `-${currentIndex * (100 / visible)}%`;

  return (
    <section
      id="encontre-corretor"
      className="py-16 md:py-24 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl uppercase font-bold text-foreground mb-4">
            Encontre um <span className="text-primary">Corretor</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/70 max-w-3xl mx-auto">
            Descubra o plano ideal para sua situação. A nossa equipe
            multidisciplinar combina experiência técnica com criatividade para
            entregar soluções inovadoras e personalizadas.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden py-6">
          <motion.div
            className="flex gap-4 md:gap-6"
            animate={{ x: carouselOffset }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {corretores.map((corretor, index) => (
              <motion.div
                key={corretor.id}
                className="flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[calc(50vw-2rem)] md:w-[calc(40vw-2rem)] lg:w-[calc(33.333vw-2rem)] xl:w-[calc(25vw-2rem)] px-2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-card rounded-xl md:rounded-2xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 group h-full">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <div className="w-full h-64 md:h-72 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <Image
                        src={corretor.imagem}
                        alt={corretor.nome}
                        fill
                        className="w-full h-full object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-primary-foreground p-4">
                        <p className="text-sm mb-4">{corretor.especialidade}</p>
                        <div className="flex justify-center space-x-3">
                          <a
                            href={`tel:${corretor.telefone.replace(/\s/g, "")}`}
                            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                            aria-label="Telefone"
                          >
                            <Phone className="w-4 h-4 md:w-5 md:h-5" />
                          </a>
                          <a
                            href={`mailto:${corretor.email}`}
                            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                            aria-label="Email"
                          >
                            <Mail className="w-4 h-4 md:w-5 md:h-5" />
                          </a>
                          <a
                            href={corretor.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                            aria-label="LinkedIn"
                          >
                            <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Container */}
                  <div className="p-4 md:p-5">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {corretor.nome}
                    </h3>
                    <p className="text-primary font-medium mb-2 md:mb-3 text-sm md:text-base">
                      {corretor.cargo}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">
                      {corretor.especialidade}
                    </p>

                    <div className="space-y-1 md:space-y-2">
                      <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                        <Phone className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                        <a
                          href={`tel:${corretor.telefone.replace(/\s/g, "")}`}
                          className="hover:text-primary transition-colors truncate"
                        >
                          {corretor.telefone}
                        </a>
                      </div>
                      <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                        <Mail className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                        <a
                          href={`mailto:${corretor.email}`}
                          className="hover:text-primary transition-colors truncate"
                        >
                          {corretor.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex space-x-2 md:space-x-3 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border">
                      <a
                        href={`tel:${corretor.telefone.replace(/\s/g, "")}`}
                        className="flex-1 bg-primary text-primary-foreground py-2 px-3 md:px-4 rounded-lg text-center text-xs md:text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        Ligar
                      </a>
                      <a
                        href={corretor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-3 h-3 md:w-4 md:h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-2 md:p-3 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i * visible)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex >= i * visible &&
                    currentIndex < (i + 1) * visible
                      ? "bg-primary scale-125"
                      : "bg-border"
                  }`}
                  aria-label={`Ir para slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentIndex >= (totalSlides - 1) * visible}
              className="p-2 md:p-3 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
