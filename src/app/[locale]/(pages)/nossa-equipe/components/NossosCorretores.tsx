"use client";

import { corretores } from "@/app/[locale]/utils/types";
import { motion } from "framer-motion";
import { Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";

// Função para agrupar por cargo
const groupByCargo = (list: typeof corretores) => {
  const groups: Record<string, typeof corretores> = {};
  list.forEach((c) => {
    if (!groups[c.cargo]) groups[c.cargo] = [];
    groups[c.cargo].push(c);
  });
  return groups;
};

const NossaEquipa = () => {
  const grupos = groupByCargo(corretores);

  return (
    <section id="nossa-equipa" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase text-foreground mb-4">
            Nossa <span className="text-primary">Equipa</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça os profissionais que garantem soluções seguras,
            personalizadas e de confiança.
          </p>
        </motion.div>

        {/* Grupos por cargo */}
        <div className="space-y-20">
          {Object.entries(grupos).map(([cargo, membros]) => (
            <div key={cargo}>
              {/* Subtítulo */}
              <h3 className="text-2xl uppercase font-semibold text-foreground mb-10 border-l-4 border-primary pl-3">
                {cargo}
              </h3>

              {/* Grid limitada a 3 colunas */}
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => {
                  const membro = membros[i % membros.length]; // repete se faltar
                  return (
                    <motion.div
                      key={`${cargo}-${i}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      {/* Foto */}
                      <div className="relative w-full h-72">
                        <Image
                          src={membro.imagem}
                          alt={membro.nome}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Conteúdo */}
                      <div className="p-6">
                        <h4 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {membro.nome}
                        </h4>
                        <p className="text-primary font-medium">
                          {membro.cargo}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2 mb-4">
                          {membro.especialidade}
                        </p>

                        {/* Contatos */}
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            <a
                              href={`tel:${membro.telefone.replace(/\s/g, "")}`}
                              className="hover:text-primary transition-colors"
                            >
                              {membro.telefone}
                            </a>
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            <a
                              href={`mailto:${membro.email}`}
                              className="hover:text-primary transition-colors truncate"
                            >
                              {membro.email}
                            </a>
                          </div>
                        </div>

                        {/* Ações */}
                        <div className="flex space-x-3 mt-5 pt-5 border-t border-border">
                          <a
                            href={`tel:${membro.telefone.replace(/\s/g, "")}`}
                            className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg text-center text-sm font-medium hover:bg-primary/90 transition-colors"
                          >
                            Ligar
                          </a>
                          <a
                            href={membro.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
                            aria-label="LinkedIn"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NossaEquipa;
