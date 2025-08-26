"use client";

import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { navItems } from "../utils/types";

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
}
// Componente de Busca
export default function SearchBox({
  placeholder = "Buscar páginas...",
  className = "",
}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Normalizar texto (remover acentos e caixa)
  const normalize = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  // Flatten navItems para gerar lista de links pesquisáveis
  const searchResults = useMemo(() => {
    const results: { title: string; url: string; description?: string }[] = [];

    navItems.forEach((nav) => {
      if (nav.path) {
        results.push({
          title: nav.title,
          url: nav.path,
          description: `Página de ${nav.title}`,
        });
      }
      if (nav.subItems) {
        nav.subItems.forEach((sub) => {
          sub.items.forEach((item) => {
            results.push({
              title: item.name,
              url: item.path,
              description: `${sub.title} - ${nav.title}`,
            });
          });
        });
      }
    });

    return results;
  }, []);

  // Filtragem de resultados
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = normalize(query);
    return searchResults.filter(
      (r) =>
        normalize(r.title).includes(q) ||
        normalize(r.description || "").includes(q)
    );
  }, [query, searchResults]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 500);
  };

  return (
    <div className={`w-full max-w-5xl mx-auto z-50 relative ${className}`}>
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
              className="mt-4 px-4 grid grid-cols-2 md:grid-cols-3 max-w-4xl min-w-full md:min-w-3xl absolute left-1/2 -translate-x-1/2 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] z-50"
            >
              {filteredResults.map((r, i) => (
                <Link
                  key={i}
                  href={r.url}
                  className="flex items-start gap-3 p-2 hover:bg-[var(--muted)] transition-colors"
                >
                  <div>
                    <h4 className="font-semibold text-start text-[var(--primary)]">
                      {r.title}
                    </h4>
                    <p className="text-sm text-start text-[var(--muted-foreground)]">
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
