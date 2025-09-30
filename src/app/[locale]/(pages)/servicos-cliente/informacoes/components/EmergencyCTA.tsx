"use client";

import Button from "@/app/[locale]/components/Button";
import { motion } from "framer-motion";
import Link from "next/link";

export interface EmergencyContacts {
  title: string;
  description: string;
  btn1Text: string;
  btn1Link: string;
  btn2Text: string;
  btn2Link: string;
  icon?: React.ReactNode;
}

interface EmergencyCTAProps {
  emergencyContacts: EmergencyContacts;
}

const EmergencyCTA = ({ emergencyContacts }: EmergencyCTAProps) => {
  const { title, description, btn1Text, btn1Link } = emergencyContacts;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 bg-gradient-to-r from-primary to-primary/90 px-4 py-24 text-center text-white shadow-xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4">
          {title}
        </h2>
        <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
          {description}
        </p>
        <Link
          href={btn1Link}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            variant="ghost"
            size="md"
            rounded="full"
            className="font-semibold"
          >
            {btn1Text}
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default EmergencyCTA;
