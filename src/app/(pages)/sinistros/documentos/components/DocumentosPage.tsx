"use client";

import { documentos } from "@/app/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  Building,
  Calendar,
  Car,
  Download,
  Eye,
  FileText,
  FileType,
  Filter,
  FolderOpen,
  HardDrive,
  Heart,
  Home,
  Search,
  User,
} from "lucide-react";
import { useState } from "react";

const DocumentosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [sortBy, setSortBy] = useState("recentes");
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const categorias = [
    {
      id: "todos",
      nome: "Todos",
      icon: <FileText className="w-4 h-4" />,
      count: 11,
    },
    {
      id: "automovel",
      nome: "Automóvel",
      icon: <Car className="w-4 h-4" />,
      count: 3,
    },
    {
      id: "habitacao",
      nome: "Habitação",
      icon: <Home className="w-4 h-4" />,
      count: 2,
    },
    { id: "vida", nome: "Vida", icon: <Heart className="w-4 h-4" />, count: 2 },
    {
      id: "saude",
      nome: "Saúde",
      icon: <User className="w-4 h-4" />,
      count: 2,
    },
    {
      id: "empresarial",
      nome: "Empresarial",
      icon: <Building className="w-4 h-4" />,
      count: 2,
    },
  ];

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Obter todos os documentos
  const todosDocumentos = Object.values(documentos).flat();

  // Filtrar e ordenar documentos
  let filteredDocuments =
    selectedCategory === "todos"
      ? todosDocumentos
      : todosDocumentos.filter((doc) => doc.categoria === selectedCategory);

  // Aplicar busca
  if (searchTerm) {
    filteredDocuments = filteredDocuments.filter(
      (doc) =>
        doc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Ordenar documentos
  filteredDocuments.sort((a, b) => {
    if (sortBy === "recentes") {
      return new Date(b.data).getTime() - new Date(a.data).getTime();
    } else if (sortBy === "antigos") {
      return new Date(a.data).getTime() - new Date(b.data).getTime();
    } else if (sortBy === "nome") {
      return a.nome.localeCompare(b.nome);
    }
    return 0;
  });

  // Documentos destacados
  const documentosDestacados = todosDocumentos.filter((doc) => doc.destacado);
  return (
    <div className="min-h-screen bg-background">
      {/* Header 
      {/* <div className="py-20">
        {/* <div className="max-w-7xl mx-auto c-space">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="text-xl text-foreground max-w-3xl mx-auto">
              Acesso rápido a todos os documentos, formulários e informações
              importantes dos seus seguros
            </p>
          </motion.div>
        </div>
      </div> 
         */}

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto c-space py-8">
        {/* Barra de Pesquisa e Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-card rounded-2xl shadow-lg p-6 mb-8 border border-border"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Pesquisar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none bg-background"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="text-muted-foreground w-5 h-5" />
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent text-foreground">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria.id} value={categoria.id}>
                        {categoria.nome} ({categoria.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground whitespace-nowrap">
                  Ordenar por:
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-auto px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none bg-background text-foreground">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recentes">Mais recentes</SelectItem>
                    <SelectItem value="antigos">Mais antigos</SelectItem>
                    <SelectItem value="nome">Nome A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Documentos Destacados */}
        {selectedCategory === "todos" && searchTerm === "" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <div className="inline-flex items-center justify-center p-3 rounded-full">
                <FolderOpen className="w-8 h-8" />
              </div>
              Documentos em Destaque
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentosDestacados.slice(0, 3).map((documento) => (
                <div
                  key={documento.id}
                  className="bg-card rounded-2xl shadow-sm border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        Destacado
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {documento.nome}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {documento.descricao}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <FileType className="w-3 h-3" />
                        <span>{documento.formato}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-3 h-3" />
                        <span>{documento.tamanho}</span>
                      </div>
                    </div>

                    <a
                      href={documento.link}
                      download
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Transferir
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Lista de Documentos - NOVA ESTRUTURA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {selectedCategory === "todos"
                ? "Todos os Documentos"
                : categorias.find((c) => c.id === selectedCategory)?.nome +
                  " (" +
                  filteredDocuments.length +
                  ")"}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredDocuments.length} documento
              {filteredDocuments.length !== 1 ? "s" : ""} encontrado
              {filteredDocuments.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDocuments.map((documento) => (
                <div
                  key={documento.id}
                  className="bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-all duration-300 group hover:border-primary/30"
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      {documento.destacado && (
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                          Destacado
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {documento.nome}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-2">
                      {documento.descricao}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileType className="w-3 h-3" />
                          <span>Formato:</span>
                        </div>
                        <span className="font-medium">{documento.formato}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <HardDrive className="w-3 h-3" />
                          <span>Tamanho:</span>
                        </div>
                        <span className="font-medium">{documento.tamanho}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Atualizado:</span>
                        </div>
                        <span className="font-medium">
                          {formatarData(documento.data)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <a
                        href={documento.link}
                        download
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors text-sm font-medium mt-auto"
                      >
                        Transferir
                        <Download className="w-4 h-4" />
                      </a>
                      <a
                        href={documento.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors text-sm font-medium mt-auto"
                      >
                        Abrir
                        <Eye className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-2xl border border-dashed border-border">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhum documento encontrado
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {searchTerm
                  ? `Não encontramos resultados para "${searchTerm}". Tente outros termos.`
                  : `Não há documentos na categoria ${
                      categorias.find((c) => c.id === selectedCategory)?.nome
                    }.`}
              </p>
              {(searchTerm || selectedCategory !== "todos") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("todos");
                  }}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Limpar Filtros
                </button>
              )}
            </div>
          )}
        </motion.div>

        {/* Seções Informativas
        <Informative /> */}
      </div>
    </div>
  );
};

export default DocumentosPage;
