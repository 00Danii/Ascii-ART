"use client";

import { useState, useEffect } from "react";
import { ControlsPanel } from "./controls-panel";
import { AsciiDisplay } from "./ascii-display";
import { useAsciiConverter } from "@/hooks/use-ascii-converter";
import type { AsciiSettings, ColoredPixel } from "@/types/ascii";
import { MobileBottomControls } from "./mobile-controls";

export default function AsciiArtGenerator() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [asciiArt, setAsciiArt] = useState<string>("");
  const [coloredAscii, setColoredAscii] = useState<ColoredPixel[][]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [settings, setSettings] = useState<AsciiSettings>({
    width: 120,
    charSet: 0,
    contrast: 1.5,
    brightness: 0,
    colorMode: 0,
    invertColors: false,
  });

  const { convertToAscii, downloadAsImage, canvasRef, downloadCanvasRef } =
    useAsciiConverter();

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
      (ascii, colored) => {
        setAsciiArt(ascii);
        setColoredAscii(colored);
        setIsProcessing(false);
      },
      (error) => {
        console.error("Error al procesar la imagen:", error);
        setIsProcessing(false);
      }
    );
  };

  const downloadAsText = () => {
    const element = document.createElement("a");
    const file = new Blob([asciiArt], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "ascii-art.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadAsImageMethod = () => {
    downloadAsImage(asciiArt, coloredAscii, settings, zoom);
  };

  const resetSettings = () => {
    setSettings({
      width: 120,
      charSet: 0,
      contrast: 1.2,
      brightness: 0,
      colorMode: 0,
      invertColors: false,
    });
    setZoom(1);
    setOriginalImage(null);
    setAsciiArt("");
    setColoredAscii([]);
  };

  // Función para manejar cambios de zoom desde gestos táctiles
  const handleZoomChange = (newZoom: number) => {
    const clampedZoom = Math.min(Math.max(newZoom, 0.1), 2);
    setZoom(clampedZoom);
  };

  useEffect(() => {
    if (originalImage) {
      processImage(originalImage);
    }
  }, [settings]);

  return (
    <div className="min-h-screen bg-black p-4 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-grow">
          {/* Panel de Controles solo visible en desktop */}
          <div className="lg:col-span-1 lg:sticky lg:top-4 lg:self-start hidden lg:block">
            <ControlsPanel
              originalImage={originalImage}
              zoom={zoom}
              settings={settings}
              asciiArt={asciiArt}
              onFileUpload={handleFileUpload}
              onZoomChange={handleZoomChange}
              onSettingsChange={setSettings}
              onReset={resetSettings}
              onDownloadAsImage={downloadAsImageMethod}
              onDownloadAsText={downloadAsText}
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
              onFileUpload={handleFileUpload}
              onZoomChange={handleZoomChange}
            />

            {/* Canvas ocultos */}
            <canvas ref={canvasRef} className="hidden" />
            <canvas ref={downloadCanvasRef} className="hidden" />
          </div>

          {/* Controles móviles en la parte inferior */}
          <MobileBottomControls
            originalImage={originalImage}
            zoom={zoom}
            settings={settings}
            asciiArt={asciiArt}
            onFileUpload={handleFileUpload}
            onZoomChange={handleZoomChange}
            onSettingsChange={setSettings}
            onReset={resetSettings}
            onDownloadAsImage={downloadAsImageMethod}
            onDownloadAsText={downloadAsText}
          />
        </div>
      </div>
    </div>
  );
}
