"use client";

import Button from "@/app/components/Button";
import { motion, useAnimation, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useInView } from "react-intersection-observer";

export const AboutUs = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-10 md:py-16 min-h-[60vh] bg-gradient-to-b from-background 
      via-accent/70 to-background overflow-hidden w-full"
    >
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
      <motion.div
        animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-1/6 lg:top-1/4 right-1/2 lg:right-1/4 w-4 h-4 rounded-full bg-foreground opacity-30"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/3 right-1/4  w-3 h-3 rounded-full bg-primary opacity-50"
      />
      {/* Elementos decorativos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute  bottom-1/3 right-1/4 inset-0 -z-10 flex items-center justify-center"
      >
        <div className="text-[20vw] font-bold tracking-tighter text-primary opacity-30 whitespace-nowrap">
          DESDE 2014
        </div>
      </motion.div>

      <div className="container mx-auto c-space">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Imagem com efeito parallax sutil */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative h-80 md:h-96 overflow-hidden shadow-2xl"
          >
            <Image
              src="/bg/tecnologia.jpg"
              alt="Nossa equipe"
              fill
              className="object-cover"
              quality={100}
              priority
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute z-20 inset-0 bg-gradient-to-t from-black/90 to-transparent"
            />
          </motion.div>

          {/* Conteúdo de texto */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="inline-flex uppercase items-center font-semibold px-4 py-2 bg-primary/10 text-primary rounded-full"
            >
              <span className="font-medium text-sm">DESDE 2014</span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-5xl uppercase font-bold "
            >
              Protegemos <span className="text-primary">Inovando</span> com{" "}
              <br />
              <motion.span
                className="inline-block"
                animate={
                  inView
                    ? {
                        x: [0, 5, -5, 0],
                        transition: {
                          delay: 1.2,
                          duration: 0.8,
                          repeat: Infinity,
                          repeatType: "reverse",
                        },
                      }
                    : {}
                }
              >
                Tecnologia
              </motion.span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground"
            >
              Fundada em 2014, nossa seguradora combina agilidade digital com
              expertise para oferecer as melhores soluções em proteção.
            </motion.p>

            <Button
              variant="primary"
              icon={<FiArrowRight />}
              iconPosition="right"
              size="md"
              rounded="full"
            >
              Conheça nossa história
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
