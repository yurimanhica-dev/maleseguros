"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiBriefcase,
  FiChevronDown,
  FiDollarSign,
  FiHome,
  FiInfo,
  FiShield,
  FiUser,
} from "react-icons/fi";

const segurosData = {
  particulares: [
    {
      id: "10-20",
      description: "Acidentes Pessoais",
      commission: 21.0,
      icon: <FiUser className="inline mr-2" />,
    },
    {
      id: "10-21",
      description: "Seguro Escolar",
      commission: 21.0,
      icon: <FiUser className="inline mr-2" />,
    },
    {
      id: "10-22",
      description: "Seguro Familiar",
      commission: 21.0,
      icon: <FiUser className="inline mr-2" />,
    },
    {
      id: "10-23",
      description: "Seguro Desportivo",
      commission: 18.5,
      icon: <FiUser className="inline mr-2" />,
    },
    {
      id: "10-25",
      description: "Seguro de Viagem",
      commission: 18.5,
      icon: <FiUser className="inline mr-2" />,
    },
    {
      id: "10-51",
      description: "Seguro Saúde",
      commission: 10.0,
      icon: <FiUser className="inline mr-2" />,
    },
    {
      id: "20-20",
      description: "Seguro Habitação",
      commission: 23.5,
      icon: <FiHome className="inline mr-2" />,
    },
    {
      id: "30-00",
      description: "Seguro Automóvel",
      commission: 15.0,
      icon: <FiUser className="inline mr-2" />,
    },
  ],
  empresariais: [
    {
      id: "10-00",
      description: "Acidentes de Trabalho",
      commission: 20.0,
      icon: <FiBriefcase className="inline mr-2" />,
    },
    {
      id: "10-50",
      description: "Seguro Saúde Grupo",
      commission: 10.0,
      icon: <FiBriefcase className="inline mr-2" />,
    },
    {
      id: "20-00",
      description: "Incêndio e Elementos Naturais",
      commission: 23.5,
      icon: <FiBriefcase className="inline mr-2" />,
    },
    {
      id: "20-40",
      description: "Seguro Comercial",
      commission: 23.5,
      icon: <FiBriefcase className="inline mr-2" />,
    },
    {
      id: "40-00",
      description: "Transportes Marítimos",
      commission: 20.0,
      icon: <FiBriefcase className="inline mr-2" />,
    },
    {
      id: "50-00",
      description: "Responsabilidade Civil Geral",
      commission: 20.0,
      icon: <FiBriefcase className="inline mr-2" />,
    },
    {
      id: "60-00",
      description: "Perda de Lucros",
      commission: 23.5,
      icon: <FiBriefcase className="inline mr-2" />,
    },
  ],
};

const SeguroCalculator = () => {
  const [categoria, setCategoria] = useState<"particulares" | "empresariais">(
    "particulares"
  );
  const [idSeguro, setidSeguro] = useState("");
  const [valorBase, setValorBase] = useState<number>(0);
  const [resultado, setResultado] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);

  const seguros = segurosData[categoria];

  const handleCalcular = () => {
    setIsCalculating(true);
    const seguroSelecionado = seguros.find((s) => s.id === idSeguro);

    setTimeout(() => {
      if (seguroSelecionado && valorBase > 0) {
        const valorComComissao =
          valorBase + valorBase * (seguroSelecionado.commission / 100);
        setResultado(valorComComissao);
      } else {
        setResultado(null);
      }
      setIsCalculating(false);
    }, 800);
  };

  const toggleInfo = (id: string) => {
    setExpandedInfo(expandedInfo === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-[var(--card)] to-[var(--popover)] shadow-2xl rounded-2xl space-y-6 border border-[var(--border)]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FiShield className="text-3xl text-[var(--primary)]" />
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            <span className="text-[var(--primary)]">Premium</span> Insurance
            Calculator
          </h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCategoria("particulares")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              categoria === "particulares"
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "bg-[var(--muted)] text-[var(--muted-foreground)]"
            }`}
          >
            Particulares
          </button>
          <button
            onClick={() => setCategoria("empresariais")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              categoria === "empresariais"
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "bg-[var(--muted)] text-[var(--muted-foreground)]"
            }`}
          >
            Empresariais
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Insurance Type Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--muted-foreground)]">
            Tipo de Seguro
          </label>
          <div className="relative">
            <select
              value={idSeguro}
              onChange={(e) => setidSeguro(e.target.value)}
              className="w-full appearance-none bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] py-3 pl-4 pr-10 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            >
              <option value="">Selecione seu seguro...</option>
              {seguros.map((seguro) => (
                <option key={seguro.id} value={seguro.id}>
                  {seguro.description}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-3.5 text-[var(--muted-foreground)]" />
          </div>

          {idSeguro && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2"
            >
              <button
                onClick={() => toggleInfo(idSeguro)}
                className="flex items-center text-sm text-[var(--primary)]"
              >
                <FiInfo className="mr-1" /> Detalhes do seguro
              </button>

              {expandedInfo === idSeguro && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 p-3 bg-[var(--muted)] rounded-lg text-sm text-[var(--muted-foreground)]"
                >
                  {seguros.find((s) => s.id === idSeguro)?.description} -
                  Comissão: {seguros.find((s) => s.id === idSeguro)?.commission}
                  %
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Value Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--muted-foreground)]">
            Valor a Segurar (MZN)
          </label>
          <div className="relative">
            <FiDollarSign className="absolute left-3 top-3.5 text-[var(--muted-foreground)]" />
            <input
              type="number"
              value={valorBase}
              onChange={(e) => setValorBase(Number(e.target.value))}
              className="w-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] py-3 pl-10 pr-4 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="Ex: 100000"
            />
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <motion.button
        onClick={handleCalcular}
        disabled={isCalculating || !idSeguro || valorBase <= 0}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 rounded-xl font-medium text-lg transition-all ${
          !idSeguro || valorBase <= 0
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-[var(--primary)] hover:bg-[var(--ring)] text-[var(--primary-foreground)]"
        }`}
      >
        {isCalculating ? (
          <span className="flex items-center justify-center">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
            />
            Calculando...
          </span>
        ) : (
          "Simular Seguro"
        )}
      </motion.button>

      {/* Result */}
      {resultado !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--ring)]/10 border border-[var(--border)] rounded-xl"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Prêmio Total
              </p>
              <p className="text-3xl font-bold text-[var(--primary)]">
                {resultado.toLocaleString("pt-MZ", {
                  style: "currency",
                  currency: "MZN",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[var(--muted-foreground)]">Comissão</p>
              <p className="text-xl font-semibold">
                {seguros.find((s) => s.id === idSeguro)?.commission}%
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 pt-4 border-t border-[var(--border)]"
          >
            <button className="w-full py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-medium">
              Contratar Seguro
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Insurance Types Grid */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
          Nossos Seguros{" "}
          {categoria === "particulares" ? "Pessoais" : "Empresariais"}
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {seguros.map((seguro) => (
            <motion.div
              key={seguro.id}
              whileHover={{ y: -5 }}
              className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg cursor-pointer"
              onClick={() => {
                setidSeguro(seguro.id);
                setExpandedInfo(null);
              }}
            >
              <div className="flex items-center">
                <div className="p-2 bg-[var(--primary)]/10 rounded-full mr-3">
                  {seguro.icon}
                </div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">
                    {seguro.description}
                  </h4>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Comissão: {seguro.commission}%
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SeguroCalculator;
