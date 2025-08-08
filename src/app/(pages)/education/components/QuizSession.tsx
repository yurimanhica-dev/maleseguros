import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart2,
  FileText,
  HandCoins,
  Landmark,
  Scale,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";

export const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFact, setShowFact] = useState(false);

  // Dados do quiz (suas perguntas)
  const quizzes = [
    {
      question:
        "O que significa o princípio do mutualismo no contexto dos seguros?",
      answers: [
        "Garantia de retorno financeiro ao segurado",
        "Divisão coletiva dos riscos entre os participantes",
        "A seguradora compartilha lucros com todos os clientes",
      ],
      correct: 1,
      fact: "O mutualismo é a base dos seguros: todos contribuem para um fundo comum que cobre os sinistros dos participantes.",
    },
    {
      question: "Qual é o papel do resseguro no mercado de seguros?",
      answers: [
        "Cobrir riscos muito pequenos não assumidos pela seguradora",
        "Permitir que uma seguradora transfira parte de seus riscos para outra",
        "Emitir apólices diretamente aos segurados",
      ],
      correct: 1,
      fact: "O resseguro permite que seguradoras distribuam riscos grandes, mantendo solvência e estabilidade.",
    },
    // ... (demais perguntas)
  ];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    const correct = index === quizzes[currentQuestion].correct;
    setIsCorrect(correct);

    if (correct) {
      setShowFact(true);
      setTimeout(() => {
        setCurrentQuestion((prev: number) => (prev + 1) % quizzes.length);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowFact(false);
      }, 2500);
    }
  };

  const getQuestionIcon = () => {
    const icons = [
      ShieldAlert,
      Scale,
      BarChart2,
      FileText,
      Landmark,
      HandCoins,
    ];
    const Icon = icons[currentQuestion % icons.length];
    return <Icon className="w-6 h-6" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl p-8 shadow-2xl overflow-hidden border border-blue-700/30"
    >
      {/* Efeito de fundo dinâmico (partículas de luz) */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${Math.random() * 100}% ${
            Math.random() * 100
          }%, rgba(59, 130, 246, 0.4), transparent 70%)`,
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Cabeçalho com progresso e ícone temático */}
      <motion.div
        key={`header-${currentQuestion}`}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-3 mb-6"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center justify-center w-12 h-12 bg-blue-600/20 text-blue-300 rounded-xl backdrop-blur-sm border border-blue-500/30"
        >
          {getQuestionIcon()}
        </motion.div>
        <div>
          <motion.span className="text-sm font-mono text-blue-300">
            Pergunta {currentQuestion + 1}/{quizzes.length}
          </motion.span>
          <motion.h2 className="text-2xl font-bold text-white">
            Conhecimento em Seguros
          </motion.h2>
        </div>
      </motion.div>

      {/* Pergunta (com animação de entrada) */}
      <motion.h3
        key={`question-${currentQuestion}`}
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-xl font-semibold text-white mb-8 leading-relaxed"
      >
        {quizzes[currentQuestion].question}
      </motion.h3>

      {/* Opções de resposta */}
      <motion.div className="space-y-4">
        {quizzes[currentQuestion].answers.map((answer, index) => (
          <motion.button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
            whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
            animate={{
              backgroundColor:
                selectedAnswer === null
                  ? "rgba(255, 255, 255, 0.05)"
                  : index === quizzes[currentQuestion].correct
                  ? "rgba(16, 185, 129, 0.2)"
                  : selectedAnswer === index
                  ? "rgba(239, 68, 68, 0.2)"
                  : "rgba(255, 255, 255, 0.05)",
              borderColor:
                selectedAnswer === null
                  ? "rgba(255, 255, 255, 0.1)"
                  : index === quizzes[currentQuestion].correct
                  ? "rgba(16, 185, 129, 0.5)"
                  : selectedAnswer === index
                  ? "rgba(239, 68, 68, 0.5)"
                  : "rgba(255, 255, 255, 0.1)",
            }}
            className="w-full text-left p-4 rounded-xl border transition-all text-white backdrop-blur-sm"
          >
            {answer}
          </motion.button>
        ))}
      </motion.div>

      {/* Feedback animado (correto/incorreto) */}
      <AnimatePresence>
        {isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-6 p-4 rounded-xl ${
              isCorrect
                ? "bg-emerald-900/30 text-emerald-300 border-emerald-500/30"
                : "bg-rose-900/30 text-rose-300 border-rose-500/30"
            } border backdrop-blur-sm`}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    ✅
                  </motion.div>
                  <span>
                    Correto!{" "}
                    <span className="text-white/80">
                      {quizzes[currentQuestion].fact}
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    ❌
                  </motion.div>
                  <span>Resposta incorreta. Tente novamente!</span>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dica contextual (aparece após acertar) */}
      <AnimatePresence>
        {showFact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700/30 text-blue-200 text-sm"
          >
            <span className="font-medium">💡 Sabia mais:</span>{" "}
            {quizzes[currentQuestion].fact}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
