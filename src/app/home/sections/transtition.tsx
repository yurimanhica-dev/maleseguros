"use client";

import { motion } from "framer-motion";

const Transtition = () => {
  return (
    <section className="relative h-fit w-full py-30 bg-gradient-to-br from-background via-accent/30 to-accent/10 overflow-hidden">
      {/* Elementos decorativos */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="md:text-[14vw] text-[20vw] font-bold tracking-tighter lg:py-24 whitespace-nowrap opacity-50">
          SEGURO DIGITAL
        </div>
      </motion.div>
    </section>
  );
};

export default Transtition;
