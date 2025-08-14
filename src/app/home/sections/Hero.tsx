// components/InsuranceHero.tsx
"use client";

import Button from "@/app/components/Button";
import { slides } from "@/app/utils/types";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const fadeVariants: Variants = {
    enter: { opacity: 0 },
    center: {
      opacity: 1,
      transition: { duration: 1.5, ease: [0.33, 1, 0.68, 1] }, // de 1 → 0.5
    },
    exit: {
      opacity: 0,
      transition: { duration: 1.3, ease: [0.33, 1, 0.68, 1] }, // de 0.5 → 0.3
    },
  };

  return (
    <section className="relative bg-black h-screen max-h-[800px] w-full overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={slides[currentSlide].id}
            initial={{ opacity: 0 }}
            animate="center"
            exit="exit"
            className="absolute inset-0 w-[100%] h-full overflow-hidden z-10"
            variants={fadeVariants}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              key={`bg-${slides[currentSlide].id}`}
              src={slides[currentSlide].image}
              alt="Imagem de fundo"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 15, ease: "easeInOut" }}
              className="object-cover w-full h-full parallax-bg"
            />
            {/* Gradient overlay - shadow effect from left to center */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60  to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto c-space">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[currentSlide].id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-5xl text-white"
            >
              <motion.p
                className="text-xl max-w-2xl p-2 font-semibold text-primary mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <h1 className="uppercase max-w-3xl text-5xl lg:text-7xl font-extrabold leading-tight mb-4">
                {slides[currentSlide].title}
              </h1>
              <motion.p
                className="text-xl mb-8 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  variant="outline"
                  icon={<FiArrowRight />}
                  iconPosition="right"
                  rounded="full"
                >
                  {slides[currentSlide].cta}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-2 ">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`relative h-16 w-16 rounded-md overflow-hidden border-2 transition-all ${
                currentSlide === index
                  ? "border-primary scale-110"
                  : "border-transparent"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <Image src={slide.image} alt="" fill className="object-cover" />
              <div
                className={`absolute inset-0 bg-black/30 transition-opacity ${
                  currentSlide === index ? "opacity-0" : "opacity-100"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
