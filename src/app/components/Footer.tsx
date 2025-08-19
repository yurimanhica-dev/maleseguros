"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Logo from "../home/components/Logo";

const Footer = () => {
  const explore = [
    { name: "Sobre nós", href: "#" },
    { name: "Serviços", href: "#" },
    { name: "Encontre um Corrector", href: "#" },
    { name: "Academia MALEseguros", href: "#" },
  ];

  const contact = [
    {
      icon: <FiMapPin className="mr-2 text-[var(--primary)]" />,
      text: "Av. Vladimir Lenine, 2815 - Maputo",
      href: "https://maps.app.goo.gl/K9ZgTB1qbCjpz13Y6",
    },
    {
      icon: <FiPhone className="mr-2 text-[var(--primary)]" />,
      text: "(+258) 214 184 39",
      href: "tel:+258 214 184 39",
    },
    {
      icon: <FiMail className="mr-2 text-[var(--primary)]" />,
      text: "maleseguros@info.co.mz",
      href: "mailto:maleseguros@info.co.mz",
    },
  ];

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border)] relative overflow-hidden z-20">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-10" />
        <Image
          src="/bg/glob.jpg"
          alt="Background"
          fill
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="container mx-auto px-6 pt-16 relative z-10">
        {/* Grid de 4 colunas */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          {/* Coluna 1: Logo + descrição + redes sociais */}
          <motion.div variants={itemVariants} custom={0}>
            <Logo />
            <p className="text-[var(--foreground)]/80 mb-6">
              Protegendo sonhos e construindo confiança desde 2014, estamos ao
              lado dos nossos clientes em todo o processo.
            </p>
            <div className="flex space-x-4">
              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter].map(
                (Icon, idx) => (
                  <div
                    key={idx}
                    className="bg-black/90 hover:bg-[var(--primary)] p-3 rounded-full cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Coluna 2: Explore */}
          <motion.div variants={itemVariants} custom={1}>
            <h3 className="text-lg uppercase font-semibold mb-6">Explore</h3>
            <ul className="space-y-3">
              {explore.map((item, index) => (
                <motion.li
                  key={item.name}
                  variants={itemVariants}
                  custom={index + 1}
                  whileHover={{ x: 8, color: "var(--primary)" }}
                >
                  <Link
                    href={item.href}
                    className="nav-link hover:text-primary text-foreground/80 transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Coluna 3: Contact */}
          <motion.div variants={itemVariants} custom={2}>
            <h3 className="text-lg uppercase font-semibold mb-6">Contactos</h3>
            <ul className="space-y-4 ">
              {contact.map((c, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  custom={index + 1}
                  className="relative items-start"
                >
                  <Link
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    {c.icon}
                    <span className="whitespace-pre-line text-foreground/80">
                      {c.text}
                    </span>
                    <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Coluna 4: Newsletter */}
          <motion.div variants={itemVariants} custom={3}>
            <h3 className="text-lg uppercase font-semibold mb-6">Newsletter</h3>
            <div className="flex items-center bg-[var(--card)] border border-[var(--border)] rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-transparent focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-1 focus:ring-offset-[var(--card)] px-4 py-2 text-sm outline-none text-[var(--foreground)]"
              />
              <button className="bg-[var(--primary)] p-3 flex items-center justify-center">
                <FiMail className="text-[var(--primary-foreground)]" />
              </button>
            </div>
            <p className="text-sm text-[var(--foreground)]/80 mt-4">
              Inscreva-se para receber nossas notícias e atualizações.
            </p>
          </motion.div>
        </motion.div>
        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent my-8 w-full"
        />
        {/* Rodapé inferior */}
        <div className="flex flex-col md:flex-row justify-between mb-8 items-center">
          {" "}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm text-[var(--muted-foreground)]/80  text-center md:text-left"
          >
            {" "}
            © {new Date().getFullYear()} MALEholding. Todos os direitos
            reservados.{" "}
          </motion.p>{" "}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex items-center space-x-6"
          >
            {" "}
            <Link
              href="#"
              className="group relative block text-sm hover:text-[var(--primary)] transition-colors"
            >
              {" "}
              Termos de Serviço{" "}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />{" "}
            </Link>{" "}
            <Link
              href="#"
              className="group relative block text-sm hover:text-[var(--primary)] transition-colors"
            >
              {" "}
              Política de Privacidade{" "}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />{" "}
            </Link>{" "}
            <Link
              href="#"
              className="group relative block text-sm hover:text-[var(--primary)] transition-colors"
            >
              {" "}
              Cookies{" "}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />{" "}
            </Link>{" "}
          </motion.div>{" "}
        </div>{" "}
      </div>
    </footer>
  );
};

export default Footer;
