import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
const Informative = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-16 space-y-6"
      >
        {[
          {
            title: "Como Consultar Sua Apólice",
            content:
              "Acesse sua apólice digital através do nosso portal do cliente ou aplicativo móvel.",
          },
          {
            title: "Documentos Necessários para Sinistro",
            content:
              "Para agilizar o processo de sinistro, tenha em mãos: documento de identificação, apólice e comprovativos do ocorrido.",
          },
          {
            title: "Prazos de Entrega",
            content:
              "Documentos solicitados são processados em até 48 horas úteis.",
          },
        ].map((section, index) => (
          <div
            key={index}
            className="bg-primary/5 rounded-2xl p-6 border border-border"
          >
            <button
              onClick={() => toggleSection(`section-${index}`)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {section.title}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-primary transition-transform duration-300 ${
                  openSections.includes(`section-${index}`) ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSections.includes(`section-${index}`) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-muted-foreground"
              >
                {section.content}
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Informative;
