// components/AnimatedPhoneLink.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiPhone } from "react-icons/fi";

const AnimatedPhoneLink = () => {
  return (
    <Link href="tel:+258 85 212 9634">
      <div className="relative w-12 h-12 flex items-center justify-center group">
        {/* Aura spreading animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary opacity-30 blur-sm z-0"
          animate={{
            scale: [1, 1.4],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Ring border animation */}
        <motion.div
          className="absolute inset-0 border-2 border-primary rounded-full z-0"
          animate={{
            scale: [1, 1.3],
            opacity: [0.2, 0, 0.2],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "easeInOut",
          }}
        />

        {/* Phone icon itself */}
        <motion.div
          className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPhone size={20} />
        </motion.div>
      </div>
    </Link>
  );
};

export default AnimatedPhoneLink;
