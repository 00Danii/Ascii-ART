"use client";

import type React from "react";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface FileUploadProps {
  originalImage: string | null;
  onFileUpload: (file: File) => void;
  isAsciiDisplay?: boolean;
}

export function FileUpload({
  originalImage,
  onFileUpload,
  isAsciiDisplay,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="space-y-3 w-full h-full">
      <div className="relative w-full h-full">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className={`
          border-dashed border-2 border-green-500 
          bg-green-500/10 hover:bg-green-500/20 
          text-green-300 hover:text-green-200 
          transition-all duration-300 flex flex-col gap-2
          ${
            isAsciiDisplay
              ? "w-full h-full justify-center items-center"
              : "w-full h-32"
          }
          `}
          disabled={!!originalImage}
        >
          {originalImage ? (
            <div className="flex flex-col items-center gap-2">
              <img
                src={originalImage || "/placeholder.svg"}
                alt="Preview"
                className="w-16 h-16 object-cover rounded border-2 border-green-400"
              />
              <span className="text-xs">Cambiar imagen</span>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8" />
              <span>Elegir Imagen</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
