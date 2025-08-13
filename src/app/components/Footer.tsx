"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { FaChartLine } from "react-icons/fa";
import {
  FiAlertTriangle,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiUsers,
} from "react-icons/fi";
import Logo from "../home/components/Logo";

const Footer = () => {
  const quickActions = [
    {
      name: "Simular Seguro",
      href: "#",
      icon: <FaChartLine className="text-[var(--primary)]" />,
    },
    {
      name: "Reportar Sinistro",
      href: "#",
      icon: <FiAlertTriangle className="text-[var(--primary)]" />,
    },
    {
      name: "Encontrar Corretor",
      href: "#",
      icon: <FiUsers className="text-[var(--primary)]" />,
    },
    {
      name: "Contato Rápido",
      href: "#",
      icon: <FiMail className="text-[var(--primary)]" />,
    },
  ];

  const products = [
    { name: "Seguro Auto", href: "#" },
    { name: "Seguro Residencial", href: "#" },
    { name: "Seguro Vida", href: "#" },
    { name: "Seguro Empresarial", href: "#" },
  ];

  const resources = [
    { name: "Blog", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Termos", href: "#" },
    { name: "Privacidade", href: "#" },
  ];

  const company = [
    { name: "Sobre Nós", href: "#" },
    { name: "Carreiras", href: "#" },
    { name: "Parceiros", href: "#" },
    { name: "Sustentabilidade", href: "#" },
  ];

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
    hover: { x: 16, color: "var(--primary)", transition: { duration: 0.4 } },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border)] relative overflow-hidden">
      {/* Background blur element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.03 }}
          transition={{ duration: 1 }}
          className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[var(--primary)] filter blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Footer content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16"
        >
          {/* Coluna 1: Logo + Descrição + Recursos */}
          <motion.div variants={itemVariants} custom={0}>
            <Logo />
            <motion.p
              variants={itemVariants}
              custom={1}
              className="text-[var(--muted-foreground)] mb-6"
            >
              Protegendo sonhos e construindo confiança desde 1987. Nossa missão
              vai além de seguros - criamos relações duradouras.
            </motion.p>

            <ul className="space-y-3 w-fit text-muted-foreground">
              {resources.map((resource, index) => (
                <motion.li key={resource.name} variants={itemVariants}>
                  <Link
                    href={resource.href}
                    className="hover:text-[var(--primary)] group relative block transition-colors"
                  >
                    {resource.name}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Coluna 2: Ações rápidas + Nossos produtos */}
          <motion.div variants={itemVariants} custom={1}>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-8 md:gap-12 lg:gap-8 justify-between col-span-1 md:col-span-2 lg:col-span-1">
              <div>
                <motion.h3
                  variants={itemVariants}
                  custom={0}
                  className="text-lg uppercase  font-semibold mb-6 flex items-center"
                >
                  Ações Rápidas
                </motion.h3>
                <ul className="space-y-3 text-muted-foreground mb-8">
                  {quickActions.map((action, index) => (
                    <motion.li
                      key={action.name}
                      variants={itemVariants}
                      whileHover="hover"
                      custom={index + 1}
                      className="flex items-center"
                    >
                      <Link
                        href={action.href}
                        className="hover:text-[var(--primary)] nav-link  transition-colors"
                      >
                        {action.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <motion.h3
                  variants={itemVariants}
                  custom={quickActions.length + 1}
                  className="text-lg uppercase font-semibold mb-6 flex items-center"
                >
                  Nossos Produtos
                </motion.h3>
                <ul className="space-y-3 text-muted-foreground">
                  {products.map((product, index) => (
                    <motion.li
                      key={product.name}
                      variants={itemVariants}
                      custom={quickActions.length + index + 2}
                      whileHover="hover"
                    >
                      <Link
                        href={product.href}
                        className="hover:text-[var(--primary)]  nav-link transition-colors"
                      >
                        {product.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Coluna 3: Empresa + Contato */}
          <motion.div
            variants={itemVariants}
            custom={2}
            className="flex flex-col sm:flex-row lg:flex-col justify-between col-span-1 md:col-span-2 lg:col-span-1"
          >
            <div>
              <motion.h3
                variants={itemVariants}
                custom={0}
                className="text-lg uppercase font-semibold mb-6 flex items-center"
              >
                Empresa
              </motion.h3>
              <ul className="space-y-3 mb-8 text-muted-foreground">
                {company.map((item, index) => (
                  <motion.li
                    key={item.name}
                    variants={itemVariants}
                    custom={index + 1}
                    whileHover="hover"
                  >
                    <Link
                      href={item.href}
                      className="hover:text-[var(--primary)] nav-link transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div
              variants={itemVariants}
              custom={company.length + 1}
              className="bg-[var(--card)] p-4 rounded-lg justify-center flex flex-col  border border-[var(--border)]"
            >
              <h4 className="font-medium mb-3 flex items-center">
                <FiPhone className="mr-2 text-[var(--primary)]" /> Precisa de
                ajuda?
              </h4>
              <p className="text-sm text-[var(--muted-foreground)] mb-3">
                Nossa equipe está disponível 24/7 para atendê-lo.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-2 px-4 rounded-md flex items-center justify-center"
              >
                <FiMessageSquare className="mr-2" /> Chat Online
              </motion.button>
            </motion.div>
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
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm text-[var(--muted-foreground)] mb-4 md:mb-0 text-center md:text-left"
          >
            © {new Date().getFullYear()} MALEholding. Todos os direitos
            reservados.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex items-center space-x-6"
          >
            <Link
              href="#"
              className="group relative block text-sm hover:text-[var(--primary)] transition-colors"
            >
              Termos de Serviço{" "}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
            <Link
              href="#"
              className="group relative block text-sm hover:text-[var(--primary)] transition-colors"
            >
              Política de Privacidade{" "}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
            <Link
              href="#"
              className="group relative block text-sm hover:text-[var(--primary)] transition-colors"
            >
              Cookies{" "}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Botão flutuante */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[var(--primary)] text-[var(--primary-foreground)] p-4 rounded-full shadow-xl flex items-center justify-center"
        >
          <FiPhone className="text-xl" />
        </motion.button>
      </motion.div>
    </footer>
  );
};

export default Footer;
