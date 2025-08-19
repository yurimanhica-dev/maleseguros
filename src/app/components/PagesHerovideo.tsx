"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface HeroProps {
  title: string;
  mediaUrl: string;
  breadcrumb: { path: string; name: string }[];
  isVideo?: boolean;
}

export const HeroVideo = ({
  title,
  mediaUrl,
  breadcrumb,
  isVideo = false,
}: HeroProps) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollY, [0, 300], [0, -100]); // Efeito parallax

  return (
    <motion.section
      className="relative h-[200px] lg:h-[350px] w-full overflow-hidden"
      ref={containerRef}
    >
      {/* Background media (video ou imagem) */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-covet object-bottom"
          >
            <source src={mediaUrl} type="video/mp4" />
            {/* Fallback para navegadores que não suportam vídeo */}
            Seu navegador não suporta vídeos HTML5.
          </video>
        ) : (
          <Image
            src={mediaUrl}
            alt="Background"
            fill
            className="w-full h-full object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      </motion.div>

      {/* Conteúdo sobreposto */}
      <motion.div
        className="relative z-20 h-full flex flex-col items-center justify-center px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.h1
          className="lg:text-7xl text-4xl font-bold text-white mb-4 text-center"
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
          className="px-8 flex items-center text-xl text-white flex-wrap justify-center"
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
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 * (index + 1) }}
            >
              <span className="mx-6 text-white">/</span>
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
        <motion.p>
          <motion.a
            href="#"
            className="mt-4 max-w-3xl text-center font-light block text-lg text-white"
          >
            Simule abaixo e deixe o resto conosco. Apresentamos as melhores
            propostas de seguros adaptadas às suas necessidades.
          </motion.a>
        </motion.p>
      </motion.div>
    </motion.section>
  );
};
