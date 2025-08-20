"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroProps {
  title: string;
  imageUrl: string;
  breadcrumb: { path: string; name: string }[];
  subtitle?: string;
}

export const Hero = ({ title, imageUrl, breadcrumb, subtitle }: HeroProps) => {
  return (
    <motion.section className="relative w-full overflow-hidden min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
      {/* Imagem de fundo com parallax */}
      <motion.div
        className="z-0 w-full h-full absolute inset-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src={imageUrl}
          alt="Background"
          fill
          priority
          className="h-full w-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10" />
      </motion.div>

      {/* Conteúdo principal */}
      <motion.div
        className="absolute w-full top-1/2 left-1/2 px-4  z-20 transform -translate-x-1/2 spcae-x-4 -translate-y-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.h1
          className="text-4xl lg:text-6xl xl:text-8xl font-bold text-white pb-6 truncate"
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
          className="flex  items-center justify-center text-xl text-white"
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 hover:text-white/90 transition-colors"
          >
            Home
          </motion.a>
          {breadcrumb.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 * (index + 1) }}
            >
              <span className="mx-2 text-white">/</span>
              <motion.a
                href={item.path}
                whileHover={{ scale: 1.05 }}
                className={`font-semibold transition-colors truncate ${
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

      {/* Elemento decorativo na parte inferior */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent z-10" />
    </motion.section>
  );
};
