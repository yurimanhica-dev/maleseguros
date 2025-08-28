"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { corretores } from "../utils/types";

const TeamSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === corretores.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? corretores.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === corretores.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, corretores.length]);

  const visibleCorretores = () => {
    if (window.innerWidth >= 1280) return 4; // xl screens
    if (window.innerWidth >= 1024) return 3; // lg screens
    if (window.innerWidth >= 768) return 2; // md screens
    return 1; // mobile
  };

  return (
    <section
      id="encontre-corretor"
      className="py-24 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto c-space">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Encontre um <span className="text-primary">Corretor</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra o plano ideal para sua situação. A nossa equipe
            multidisciplinar combina experiência técnica com criatividade para
            entregar soluções inovadoras e personalizadas.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 text-primary-foreground p-3 rounded-full shadow-lg hover:bg-black/80 transition-colors -translate-x-1/2"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 text-primary-foreground p-3 rounded-full shadow-lg hover:bg-black/80 transition-colors translate-x-1/2"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: -currentIndex * (100 / visibleCorretores()) + "%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {corretores.map((corretor, index) => (
                <motion.div
                  key={corretor.id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 group">
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <div className="w-full h-80 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <Image
                          src={corretor.imagem}
                          alt={corretor.nome}
                          fill
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center text-primary-foreground p-4">
                          <p className="text-sm mb-4">
                            {corretor.especialidade}
                          </p>
                          <div className="flex justify-center space-x-3">
                            <a
                              href={`tel:${corretor.telefone.replace(
                                /\s/g,
                                ""
                              )}`}
                              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                              aria-label="Telefone"
                            >
                              <Phone className="w-5 h-5" />
                            </a>
                            <a
                              href={`mailto:${corretor.email}`}
                              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                              aria-label="Email"
                            >
                              <Mail className="w-5 h-5" />
                            </a>
                            <a
                              href={corretor.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                              aria-label="LinkedIn"
                            >
                              <Linkedin className="w-5 h-5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Info Container */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {corretor.nome}
                      </h3>
                      <p className="text-primary font-medium mb-3">
                        {corretor.cargo}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {corretor.especialidade}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="w-4 h-4 mr-2" />
                          <a
                            href={`tel:${corretor.telefone.replace(/\s/g, "")}`}
                            className="hover:text-primary transition-colors"
                          >
                            {corretor.telefone}
                          </a>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="w-4 h-4 mr-2" />
                          <a
                            href={`mailto:${corretor.email}`}
                            className="hover:text-primary transition-colors truncate"
                          >
                            {corretor.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex space-x-3 mt-4 pt-4 border-t border-border">
                        <a
                          href={`tel:${corretor.telefone.replace(/\s/g, "")}`}
                          className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg text-center text-sm font-medium hover:bg-primary/90 transition-colors"
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
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({
            length: Math.ceil(corretores.length / visibleCorretores()),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index * visibleCorretores())}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex >= index * visibleCorretores() &&
                currentIndex < (index + 1) * visibleCorretores()
                  ? "bg-primary"
                  : "bg-border"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
