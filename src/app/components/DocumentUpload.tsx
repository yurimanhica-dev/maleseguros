"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Cloud,
  Download,
  Eye,
  File,
  FileIcon,
  FileText,
  Image as ImageIcon,
  Minus,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  error?: string;
  url?: string; // URL para visualização
}

export const DocumentUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validar tipo de arquivo
      const validTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          progress: 0,
          error: "Tipo de arquivo não suportado",
        });
        continue;
      }

      // Validar tamanho (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          progress: 0,
          error: "Arquivo muito grande (máx. 10MB)",
        });
        continue;
      }

      // Criar URL para pré-visualização
      const url = URL.createObjectURL(file);

      newFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        file,
        progress: 0,
        url,
      });
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simular upload
    newFiles.forEach((file) => {
      if (file.error) return;

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === file.id ? { ...f, progress } : f))
        );
      }, 200);
    });
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    const fileToRemove = uploadedFiles.find((file) => file.id === id);
    if (fileToRemove && fileToRemove.url) {
      URL.revokeObjectURL(fileToRemove.url);
    }
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const previewFile = (file: UploadedFile) => {
    setSelectedFile(file);
    setShowPreviewModal(true);
  };

  const downloadFile = (file: UploadedFile) => {
    const link = document.createElement("a");
    link.href = file.url || URL.createObjectURL(file.file);
    link.download = file.file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="w-5 h-5" />;
    if (type === "application/pdf") return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const renderPreview = () => {
    if (!selectedFile) return null;

    const { file, url } = selectedFile;
    const fileType = file.type;

    if (fileType.startsWith("image/")) {
      return (
        <div className="relative w-full h-[80vh] bg-gray-100 flex items-center justify-center">
          <Image
            src={url || URL.createObjectURL(file)}
            alt={file.name}
            fill
            className="object-contain py-4"
          />
        </div>
      );
    } else if (fileType === "application/pdf") {
      return (
        <div className="w-full h-[70vh] bg-gray-100 flex flex-col items-center justify-center p-4">
          <FileText className="w-4 h-4 text-red-500 mb-4" />
          <p className="text-lg text-gray-900 font-medium mb-2">{file.name}</p>
          <p className="text-sm text-gray-900 mb-4">PDF Document</p>
          <iframe src={url} className="w-full h-[80vh] " title={file.name} />
        </div>
      );
    } else {
      return (
        <div className="w-full h-96 bg-gray-100 flex flex-col items-center justify-center p-4">
          <FileIcon className="w-16 h-16 text-blue-500 mb-4" />
          <p className="text-lg font-medium mb-2">{file.name}</p>
          <p className="text-sm text-gray-500 mb-4">
            {fileType.includes("word") ? "Documento Word" : "Arquivo"}
          </p>
          <p className="text-sm text-gray-600 text-center">
            Visualização não disponível para este tipo de arquivo.
            <br />
            Faça o download para visualizar o conteúdo.
          </p>
        </div>
      );
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <h4 className="text-lg font-semibold text-primary mb-4">Documentos</h4>

        {/* Área de Upload */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? "border-primary bg-primary/10"
              : "border-muted-foreground hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
          />

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            <div className="p-3 bg-primary/10 rounded-full">
              <Cloud className="w-8 h-8 text-primary" />
            </div>

            <div>
              <p className="font-semibold text-foreground">
                Arraste arquivos ou clique para fazer upload
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                JPG, PNG, PDF, DOC, DOCX (Máx. 10MB por arquivo)
              </p>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              Selecionar Arquivos
            </motion.button>
          </motion.div>
        </div>

        {/* Lista de Arquivos */}
        <AnimatePresence>
          {uploadedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 space-y-4"
            >
              <p className="text-sm text-muted-foreground">
                {uploadedFiles.length} arquivo(s) selecionado(s)
              </p>

              {uploadedFiles.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex items-center justify-between p-4 bg-background border rounded-lg shadow-sm group"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="text-primary">
                      {getFileIcon(file.file.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {file.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.file.size)}
                      </p>

                      {file.error ? (
                        <p className="text-xs text-primary flex items-center mt-1">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {file.error}
                        </p>
                      ) : file.progress < 100 ? (
                        <div className="w-full bg-muted-foreground rounded-full h-1.5 mt-2">
                          <div
                            className="bg-primary h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      ) : (
                        <p className="text-xs text-primary flex items-center mt-1">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Upload concluído
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!file.error && file.progress === 100 && (
                      <>
                        <button
                          onClick={() => previewFile(file)}
                          className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded hover:bg-background"
                          title="Visualizar arquivo"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => downloadFile(file)}
                          className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded hover:bg-background"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded hover:bg-background"
                      title="Remover arquivo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Informações adicionais */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 border border-primary/60 rounded-lg"
        >
          <h5 className="text-sm font-semibold text-foreground mb-2">
            Documentos recomendados:
          </h5>
          <ul className="text-xs text-foreground/70 space-y-2">
            <div className="flex">
              <Minus className="w-4 h-4 text-primary inline-block mr-1" />
              <li>Fotos dos danos (JPG ou PNG)</li>
            </div>
            <div className="flex">
              <Minus className="w-4 h-4 text-primary inline-block mr-1" />
              <li>Documentos do veículo (se aplicável)</li>
            </div>
            <div className="flex">
              <Minus className="w-4 h-4 text-primary inline-block mr-1" />
              <li>Orçamentos ou notas fiscais</li>
            </div>
            <div className="flex">
              <Minus className="w-4 h-4 text-primary inline-block mr-1" />
              <li>Boletim de Ocorrência (PDF ou imagem)</li>
            </div>
          </ul>
        </motion.div>
      </motion.div>

      {/* Modal de Visualização */}
      <AnimatePresence>
        {showPreviewModal && selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPreviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold truncate">
                  {selectedFile.file.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => downloadFile(selectedFile)}
                    className="p-2 text-gray-600 hover:text-primary transition-colors"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="p-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="overflow-auto max-h-[calc(90vh-80px)]">
                {renderPreview()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
