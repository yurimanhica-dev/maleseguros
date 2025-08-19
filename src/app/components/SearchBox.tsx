"use client";

import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBox({
  placeholder = "Buscar páginas...",
  className = "",
}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const searchResults = [
    {
      title: "Página Inicial",
      url: "/",
      description: "Volte para a página principal",
    },
    {
      title: "Sobre Nós",
      url: "/about",
      description: "Conheça mais sobre a MaleSeguros",
    },
    {
      title: "Serviços",
      url: "/services",
      description: "Nossos serviços de seguros",
    },
    {
      title: "Academia MALEseguros",
      url: "/academy",
      description: "Aprenda mais sobre seguros",
    },
  ];

  // Função para normalizar texto (remove acentos e caixa)
  const normalize = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  // Motor de busca melhorado
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = normalize(query);
    return searchResults.filter(
      (r) =>
        normalize(r.title).includes(q) || normalize(r.description).includes(q)
    );
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 500);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center border border-[var(--border)] rounded-[var(--radius)] bg-[var(--background)]">
          <Search className="absolute left-4 text-[var(--muted-foreground)] w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 bg-transparent focus:outline-none text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-4 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Resultados */}
      {query && !isSearching && (
        <>
          {filteredResults.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden"
            >
              {filteredResults.map((r, i) => (
                <Link
                  key={i}
                  href={r.url}
                  className="flex items-center gap-3 p-4 hover:bg-[var(--muted)] transition-colors"
                >
                  <div>
                    <h4 className="font-semibold text-[var(--primary)]">
                      {r.title}
                    </h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {r.description}
                    </p>
                  </div>
                </Link>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-6 text-center bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)]"
            >
              <Search className="w-8 h-8 mx-auto mb-2 text-[var(--muted-foreground)]" />
              <p className="text-[var(--muted-foreground)]">
                Nenhum resultado encontrado
              </p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
