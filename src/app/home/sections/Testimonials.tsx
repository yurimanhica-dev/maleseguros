"use client";

import Button from "@/app/components/Button";
import { testimonials } from "@/app/utils/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="relative w-full py-24 lg:pt-44 bg-background overflow-hidden z-10">
      <div className="container mx-auto c-space">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Área de CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-5xl uppercase font-bold">
                <span className="text-primary">Simule agora</span> e garanta sua
                proteção em minutos
              </h2>
              <p className="text-lg text-muted-foreground">
                Tecnologia de ponta combinada com 60 anos de expertise em
                seguros para oferecer a melhor cobertura.
              </p>
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

            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: item * 0.1 }}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-background"
                  >
                    <Image
                      src={`/avatars/${item}.jpg`} // caminho das imagens
                      alt={`Cliente ${item}`}
                      width={40}
                      height={40}
                      quality={80}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold  text-primary">+5.000</span> Clientes
                Satisfeitos
              </p>
            </div>
          </motion.div>

          {/* Área de Testemunhos */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-full min-h-[300px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentTestimonial].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-background border border-border/60 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex flex-col h-full">
                  <Quote className="w-8 h-8 text-primary/80 mb-4" />
                  <p className="text-xl italic text-muted-foreground flex-grow">
                    &quot;{testimonials[currentTestimonial].content}&quot;
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                      <Image
                        src={testimonials[currentTestimonial].avatar}
                        alt={testimonials[currentTestimonial].name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[currentTestimonial].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentTestimonial === index
                      ? "bg-primary w-6"
                      : "bg-border"
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
