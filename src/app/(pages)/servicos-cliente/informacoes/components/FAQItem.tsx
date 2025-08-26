"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useRef, useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "O que é uma apólice de seguro?",
    answer:
      "A apólice de seguro é o contrato entre o segurado e a seguradora que detalha coberturas, limites e condições do seguro contratado.",
  },
  {
    question: "Como posso registrar um sinistro?",
    answer:
      "Para registrar um sinistro, entre em contato com nosso atendimento via telefone, email ou formulário online, fornecendo todas as informações necessárias sobre o incidente.",
  },
  {
    question: "Quais documentos são necessários para abrir um sinistro?",
    answer:
      "Os documentos variam conforme o tipo de seguro, mas normalmente incluem a apólice, documentos pessoais, fotos do dano e relatórios policiais ou de ocorrência quando aplicável.",
  },
  {
    question: "Quanto tempo leva para processar um sinistro?",
    answer:
      "O tempo de processamento depende da complexidade do sinistro e da documentação enviada, mas nosso objetivo é concluir todos os casos dentro de 7 a 15 dias úteis.",
  },
  {
    question: "Posso alterar minha apólice após contratá-la?",
    answer:
      "Sim, você pode solicitar alterações na sua apólice, como atualização de valores, beneficiários ou cobertura, entrando em contato com nosso atendimento.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="pt-24 pb-16 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Perguntas <span className="text-primary">Frequentes</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Aqui respondemos às dúvidas mais comuns sobre apólices e sinistros.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-t-2xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-foreground">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="transition-transform duration-200 ease-in-out"
                >
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-primary" />
                  ) : (
                    <Plus className="w-6 h-6 text-primary" />
                  )}
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-6 pb-6 text-foreground/70"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
