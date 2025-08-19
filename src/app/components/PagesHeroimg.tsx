"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface HeroProps {
  title: string;
  imageUrl: string;
  breadcrumb: { path: string; name: string }[];
}

export const Hero = ({ title, imageUrl, breadcrumb }: HeroProps) => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 300], [0, -100]); // Efeito parallax

  return (
    <motion.section className="relative h-[200px] lg:h-[300px] w-full overflow-hidden">
      {/* Imagem de fundo com parallax */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={imageUrl}
          alt="Background"
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      </motion.div>

      {/* Título principal (animação de entrada) */}
      <motion.div
        className="relative z-20 h-full flex flex-col items-center justify-center px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.h1
          className="lg:text-7xl text-4xl font-bold text-white mb-4"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="px-8 flex items-center text-xl text-white"
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 hover:text-white/90 transition-colors "
          >
            Home
          </motion.a>
          {breadcrumb.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 * (index + 1) }}
            >
              <span className="mx-6  text-white">/</span>
              <motion.a
                href={item.path}
                whileHover={{ scale: 1.05 }}
                className={`font-semibold transition-colors ${
                  index === breadcrumb.length - 1
                    ? "text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
