"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaHeadset, FaMoneyBillWave, FaSmile, FaUsers } from "react-icons/fa";

const stats = [
  { value: "+2000", label: "Clientes protegidos", icon: FaUsers },
  { value: "98%", label: "Satisfação", icon: FaSmile },
  { value: "+ 5m MZN", label: "Em indenizações", icon: FaMoneyBillWave },
  { value: "24/7", label: "Atendimento", icon: FaHeadset },
];

const AboutUs = () => {
  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto c-space">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Image Section */}
          <div className="relative h-[500px] group">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute top-145 left-0 lg:top-25 lg:left-125 w-[40rem] h-[15rem] bg-primary -translate-x-1/2 -translate-y-1/2  z-0 
            "
            />
            <div className="absolute inset-0 bg-black opacity-10 transition-opacity duration-500 z-10" />
            <Image
              src="/people.jpg"
              alt="Nossa equipe"
              fill
              className="object-cover object-center"
              quality={100}
              priority
            />
          </div>

          {/* Content Section */}
          <motion.div className="space-y-8 z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-[var(--background)] text-[var(--foreground)] w-fit px-4 py-2 rounded-full shadow-lg"
            >
              <span className="font-semibold">Desde 2014</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-nowrap"
            >
              Nossa História<span className="text-primary">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-[var(--foreground)] leading-relaxed"
            >
              Em resposta ao crescente número de reclamações sobre o atendimento
              das seguradoras, a <strong>MALEholding</strong> criou a{" "}
              <strong>MALEseguros</strong>, uma equipe de profissionais
              moçambicanos comprometidos em estreitar a relação entre clientes e
              seguradoras, oferecendo transparência, proximidade e excelência em
              cada atendimento.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-28 bg-[var(--card)] p-8 sm:p-12 border border-[var(--border)] shadow-sm"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center flex flex-col items-center gap-2"
                >
                  <div className="text-4xl font-bold text-[var(--primary)]">
                    {stat.value}
                  </div>
                  <div className="text-sm uppercase tracking-wider text-[var(--muted-foreground)]">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
