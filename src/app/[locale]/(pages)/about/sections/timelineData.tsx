"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const timelineData = [
  {
    year: 2014,
    text: "Nasce a MALEseguros, com a missão de oferecer soluções inovadoras e seguras em seguros de veículos e de vida.",
    image: "/timeline/1763.jpg",
  },
  {
    year: 2017,
    text: "Superamos 1000 apólices ativas, um marco que fortaleceu nossa reputação e nos desafiou a assumir responsabilidades acrescidas.",
    image: "/timeline/53301.jpg",
  },
  {
    year: 2020,
    text: "Iniciamos uma nova fase de transformação digital, modernizando processos e digitalizando o atendimento e suporte ao cliente. ",
    image: "/timeline/2150690165.jpg",
  },
  {
    year: 2021,
    text: "Chegamos ao marco de 1000 clientes, consolidando nossa presença no mercado e reafirmando a confiança depositada em nós como uma das corretoras de referência em Moçambique.",
    image: "/timeline/54689.jpg",
  },
  {
    year: 2024,
    text: "Completamos a nossa primeira década como corretora de seguros, reafirmando a nossa posição de destaque no mercado e continuando a oferecer soluções inovadoras e seguras aos nossos clientes.",
    image: "/timeline/2150690108.jpg",
  },
  {
    year: 2025,
    text: "Iniciamos uma nova fase de transformação digital, modernizando processos e digitalizando o atendimento e suporte ao cliente. ",
    image: "/timeline/2150690165.jpg",
  },
  {
    year: 2029,
    text: "Chegamos ao marco de 1000 clientes, consolidando nossa presença no mercado e reafirmando a confiança depositada em nós como uma das corretoras de referência em Moçambique.",
    image: "/timeline/54689.jpg",
  },
  {
    year: 2027,
    text: "Completamos a nossa primeira década como corretora de seguros, reafirmando a nossa posição de destaque no mercado e continuando a oferecer soluções inovadoras e seguras aos nossos clientes.",
    image: "/timeline/2150690108.jpg",
  },
];

export default function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const active = timelineData[activeIndex];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === timelineData.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev === 0 ? timelineData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev === timelineData.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  // Animation variants
  const imageVariants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.5 } },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  return (
    <section className="bg-background py-12 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-8xl mx-auto c-space">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl uppercase font-bold text-foreground"
          >
            Nossa Trajetória
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Descubra os marcos importantes que moldaram nossa história e nos
            tornaram quem somos hoje
          </p>
        </div>

        {/* Mobile Version */}
        <div className="lg:hidden">
          <div className="bg-card/50  p-6 border border-border backdrop-blur-sm">
            {/* Year Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 text-primary hover:scale-110"
                aria-label="Ano anterior"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>

              <motion.span
                key={active.year}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-primary font-bold text-2xl md:text-3xl px-6 py-2"
              >
                {active.year}
              </motion.span>

              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 text-primary hover:scale-110"
                aria-label="Próximo ano"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative aspect-video w-full h-auto max-h-[300px] md:max-h-[400px] overflow-hidden mb-6 border border-border"
              >
                <Image
                  src={active.image}
                  alt={`Timeline ${active.year}`}
                  fill
                  className="object-cover object-top"
                  priority={activeIndex < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-card p-6 border border-border"
              >
                <blockquote className="text-foreground font-medium leading-relaxed border-l-4 border-primary pl-4 md:pl-6">
                  &ldquo;{active.text}&rdquo;
                </blockquote>
              </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-3">
              {timelineData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Ir para ${timelineData[index].year}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Version */}
        <div className="hidden lg:block overflow-hidden">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 ">
            {/* Main Content */}
            <div className="xl:col-span-2 ">
              <div className="bg-card/50 p-8 border border-border backdrop-blur-sm ">
                {/* Year and Navigation */}
                <div className="flex items-center justify-between mb-8">
                  <motion.span
                    key={active.year}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-bold text-5xl text-primary px-8 py-3"
                  >
                    {active.year}
                  </motion.span>

                  <div className="flex space-x-4">
                    <button
                      onClick={handlePrev}
                      className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 text-primary hover:scale-110 border border-primary/20"
                      aria-label="Ano anterior"
                    >
                      <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 text-primary hover:scale-110 border border-primary/20"
                      aria-label="Próximo ano"
                    >
                      <ChevronRightIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Image and Text */}
                <div className="grid grid-cols-1 gap-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      variants={imageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="relative aspect-video h-[400px] xl:h-[500px] overflow-hidden border border-border"
                    >
                      <Image
                        src={active.image}
                        alt={`Timeline ${active.year}`}
                        fill
                        quality={100}
                        className="object-cover object-center"
                        priority
                        sizes="(max-width: 1200px) 50vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      variants={textVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="bg-card p-8 border border-border"
                    >
                      <blockquote className="text-foreground text-lg font-medium leading-relaxed border-l-4 border-primary pl-6">
                        &ldquo;{active.text}&rdquo;
                      </blockquote>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Timeline Sidebar */}
            <div className="xl:col-span-1 overflow-hidden">
              <div className="sticky top-8 bg-card/50 p-8 border border-border backdrop-blur-sm ">
                <h3 className="text-foreground text-xl font-bold mb-6">
                  Marcos Históricos
                </h3>

                <div className="space-y-4 px-4 overflow-y-auto [&::-webkit-scrollbar]:hidden max-h-[730px]">
                  {timelineData.map((item, index) => (
                    <motion.button
                      key={item.year}
                      onClick={() => goToSlide(index)}
                      className={`w-full text-left p-4 transition-all duration-300 border ${
                        index === activeIndex
                          ? "bg-primary/10 border-primary shadow-lg "
                          : "bg-background/50 border-border hover:bg-accent/50"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            index === activeIndex
                              ? "bg-primary "
                              : "bg-muted-foreground/40"
                          }`}
                        />
                        <span
                          className={`text-lg font-semibold ${
                            index === activeIndex
                              ? "text-primary"
                              : "text-foreground"
                          }`}
                        >
                          {item.year}
                        </span>
                      </div>
                      <p className="text-foreground text-sm mt-2 line-clamp-2">
                        {item.text}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 l blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 l blur-3xl" />
      </div>
    </section>
  );
}
