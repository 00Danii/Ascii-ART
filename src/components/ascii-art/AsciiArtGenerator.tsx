"use client";

import { useState, useEffect } from "react";
import { Code } from "lucide-react";
import { ControlsPanel } from "./controls-panel";
import { AsciiDisplay } from "./ascii-display";
import { useAsciiConverter } from "@/hooks/use-ascii-converter";
import type { AsciiSettings, ColoredPixel } from "@/types/ascii";

export default function AsciiArtGenerator() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [asciiArt, setAsciiArt] = useState<string>("");
  const [coloredAscii, setColoredAscii] = useState<ColoredPixel[][]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [settings, setSettings] = useState<AsciiSettings>({
    width: 120,
    charSet: 0,
    contrast: 1.2,
    brightness: 10,
    colorMode: 0,
    invertColors: false,
  });

  const { convertToAscii, canvasRef } = useAsciiConverter();

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setOriginalImage(imageUrl);
      processImage(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const processImage = (imageUrl: string) => {
    setIsProcessing(true);
    convertToAscii(
      imageUrl,
      settings,
      (ascii, colored, aspectRatio) => {
        setAsciiArt(ascii);
        setColoredAscii(colored);
        setImageAspectRatio(aspectRatio);
        setIsProcessing(false);
      },
      (error) => {
        console.error("Error processing image:", error);
        setIsProcessing(false);
      }
    );
  };

  const downloadAscii = () => {
    const element = document.createElement("a");
    const file = new Blob([asciiArt], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "ascii-art.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetSettings = () => {
    setSettings({
      width: 120,
      charSet: 0,
      contrast: 1.2,
      brightness: 10,
      colorMode: 0,
      invertColors: false,
    });
    setZoom(1);
  };

  useEffect(() => {
    if (originalImage) {
      processImage(originalImage);
    }
  }, [settings]);

  return (
    <div className="min-h-screen bg-black p-4 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col">
        {/* Header */}
        {/* <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="p-2  rounded-full">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              ASCII Art Generator
            </h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base">
            Convierte tus imágenes en arte ASCII personalizable
          </p>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-grow">
          {/* Panel de Controles */}
          <div className="lg:col-span-1">
            <ControlsPanel
              originalImage={originalImage}
              imageAspectRatio={imageAspectRatio}
              zoom={zoom}
              settings={settings}
              asciiArt={asciiArt}
              onFileUpload={handleFileUpload}
              onZoomChange={setZoom}
              onSettingsChange={setSettings}
              onReset={resetSettings}
              onDownload={downloadAscii}
            />
          </div>

          {/* Área de Resultado */}
          <div className="lg:col-span-3 flex flex-col">
            <AsciiDisplay
              originalImage={originalImage}
              asciiArt={asciiArt}
              coloredAscii={coloredAscii}
              colorMode={settings.colorMode}
              zoom={zoom}
              isProcessing={isProcessing}
            />

            {/* Canvas oculto */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}
