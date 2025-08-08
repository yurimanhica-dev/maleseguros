/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { QuizSection } from "@/app/(pages)/education/components/QuizSession";
import { quizzes } from "@/app/utils/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Check,
  ChevronRight,
  HelpCircle,
  Shield,
} from "lucide-react";
import { useState } from "react";

export const EducationHub = () => {
  const [activeTab, setActiveTab] = useState<"guides" | "quizzes" | "rights">(
    "guides"
  );
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const educationalContent = {
    guides: [
      {
        icon: <Shield className="w-6 h-6 text-primary" />,
        title: "O que é um Seguro?",
        content:
          "Um contrato onde você paga um prêmio para transferir riscos específicos para a seguradora, que indeniza perdas cobertas.",
      },
      {
        icon: <Check className="w-6 h-6 text-primary" />,
        title: "Como Escolher seu Plano",
        content:
          "Analise suas necessidades reais, compare coberturas, verifique exclusões e avalie a reputação da seguradora.",
      },
      {
        icon: <Award className="w-6 h-6 text-primary" />,
        title: "5 Dicas Essenciais",
        content:
          "1) Não subsegure 2) Entenda as exclusões 3) Atualize periodicamente 4) Conheça o processo de sinistro 5) Reveja anualmente",
      },
    ],

    rights: [
      {
        icon: <BookOpen className="w-5 h-5" />,
        title: "Direito à Transparência",
        content:
          "Receber todas informações sobre coberturas, exclusões e condições em linguagem clara.",
      },
      {
        icon: <BookOpen className="w-5 h-5" />,
        title: "Direito ao Arrependimento",
        content:
          "Cancelar em até 30 dias sem penalidades se não houve sinistro.",
      },
    ],
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === quizzes[currentQuizQuestion].correct;
    setIsCorrect(correct);

    setTimeout(() => {
      if (currentQuizQuestion < quizzes.length - 1) {
        setCurrentQuizQuestion(currentQuizQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setCurrentQuizQuestion(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
      }
    }, 2000);
  };

  return (
    <section className="w-full py-20 bg-gradient-to-b from-background to-accent/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-2 bg-primary/10 text-primary rounded-full mb-6">
            <HelpCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">Conhecimento que Protege</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Centro Educacional <span className="text-primary">MALEseguros</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            60 anos de expertise transformados em conhecimento acessível para
            você
          </p>
        </motion.div>

        {/* Navegação por Abas */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex bg-background border border-border rounded-xl p-1">
            {[
              {
                id: "guides",
                label: "Guias Práticos",
                icon: <BookOpen className="w-5 h-5" />,
              },
              {
                id: "quizzes",
                label: "Quiz Interativo",
                icon: <HelpCircle className="w-5 h-5" />,
              },
              {
                id: "rights",
                label: "Seus Direitos",
                icon: <Award className="w-5 h-5" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Conteúdo Dinâmico */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Guias Práticos */}
            {activeTab === "guides" && (
              <motion.div
                key="guides"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 gap-8"
              >
                {educationalContent.guides.map((guide, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                      {guide.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {guide.title}
                    </h3>
                    <p className="text-muted-foreground">{guide.content}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Quiz Interativo */}
            {activeTab === "quizzes" && <QuizSection />}

            {/* Direitos do Segurado */}
            {activeTab === "rights" && (
              <motion.div
                key="rights"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {educationalContent.rights.map((right, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mt-1">
                        {right.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {right.title}
                        </h3>
                        <p className="text-muted-foreground">{right.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold shadow-lg"
          >
            Fale com um Especialista
            <ChevronRight className="w-5 h-5 ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
