"use client";

import { useCallback, useRef } from "react";
import type { AsciiSettings, ColoredPixel } from "../types/ascii";
import {
  ASCII_CHARS,
  CHAR_STYLE_CONFIG,
  COLOR_OPTIONS,
} from "../constants/ascii";

export function useAsciiConverter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const downloadCanvasRef = useRef<HTMLCanvasElement>(null);

  const convertToAscii = useCallback(
    (
      imageUrl: string,
      settings: AsciiSettings,
      onComplete: (
        ascii: string,
        coloredAscii: ColoredPixel[][],
        aspectRatio: number
      ) => void,
      onError?: (error: Error) => void
    ) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) {
        onError?.(new Error("Canvas not available"));
        return;
      }

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          // Guardar la proporción de aspecto original EXACTA
          const aspectRatio = img.height / img.width;

          // Usar el ancho configurado por el usuario
          const width = settings.width;
          // Calcular la altura manteniendo la proporción EXACTA de la imagen original
          const height = Math.floor(width * aspectRatio);

          canvas.width = width;
          canvas.height = height;

          ctx.filter = `brightness(${100 + settings.brightness}%) contrast(${
            settings.contrast * 100
          }%)`;
          ctx.drawImage(img, 0, 0, width, height);

          const imageData = ctx.getImageData(0, 0, width, height);
          const pixels = imageData.data;

          let ascii = "";
          const coloredResult: ColoredPixel[][] = [];
          const chars = ASCII_CHARS[settings.charSet];

          for (let i = 0; i < height; i++) {
            const row: ColoredPixel[] = [];
            for (let j = 0; j < width; j++) {
              const pixelIndex = (i * width + j) * 4;
              let r = pixels[pixelIndex];
              let g = pixels[pixelIndex + 1];
              let b = pixels[pixelIndex + 2];

              // Invertir colores si está activado
              if (settings.invertColors) {
                r = 255 - r;
                g = 255 - g;
                b = 255 - b;
              }

              const gray = Math.floor(0.299 * r + 0.587 * g + 0.114 * b);
              const charIndex = Math.floor((gray / 255) * (chars.length - 1));
              const char = chars[charIndex];

              ascii += char;

              // Guardar color original para modo colored
              const color = `rgb(${r}, ${g}, ${b})`;
              row.push({ char, color });
            }
            ascii += "\n";
            coloredResult.push(row);
          }

          onComplete(ascii, coloredResult, aspectRatio);
        } catch (error) {
          onError?.(error as Error);
        }
      };

      img.onerror = () => {
        onError?.(new Error("Failed to load image"));
      };

      img.src = imageUrl;
    },
    []
  );

  const downloadAsImage = useCallback(
    (
      asciiArt: string,
      coloredAscii: ColoredPixel[][],
      settings: AsciiSettings,
      zoom = 1
    ) => {
      const canvas = downloadCanvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const colorOption = COLOR_OPTIONS[settings.colorMode];
      const charConfig = CHAR_STYLE_CONFIG[0];

      // Configuración del canvas para la descarga
      const fontSize = 25; // Tamaño base de fuente para la imagen
      const charWidth = fontSize * 0.6; // Ancho aproximado de cada carácter
      const lineHeight =
        fontSize *
        (charConfig.aspectRatio === 0.8
          ? 0.8
          : charConfig.aspectRatio === 0.6
          ? 0.6
          : charConfig.aspectRatio === 0.4
          ? 0.4
          : 0.5);

      // ...dentro de downloadAsImage...
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";
      const lines = asciiArt
        .split("\n")
        .filter((line) => line.trim().length > 0);
      const maxLineWidth = Math.max(
        ...lines.map((line) => ctx.measureText(line).width)
      );
      const canvasWidth = Math.ceil(maxLineWidth) + 40;
      const canvasHeight = lines.length * lineHeight + 40;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      // ...resto igual...

      // Configurar el contexto
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      // Fondo según el modo de color
      if (colorOption.bg === "bg-black") {
        ctx.fillStyle = "#000000";
      } else {
        ctx.fillStyle = "#ffffff";
      }
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Renderizar el ASCII
      if (colorOption.value === "original" && coloredAscii.length > 0) {
        // Modo con colores originales
        coloredAscii.forEach((row, i) => {
          row.forEach((pixel, j) => {
            ctx.fillStyle = pixel.color;
            ctx.fillText(pixel.char, j * charWidth, i * lineHeight);
          });
        });
      } else {
        // Modo con color sólido
        let textColor = "#ffffff"; // Default
        switch (colorOption.value) {
          case "text-green-500":
            textColor = "#4ade80";
            break;
          case "text-pink-500":
            textColor = "#f472b6";
            break;
          case "text-white":
            textColor = "#ffffff";
            break;
          case "text-gray-300":
            textColor = "#d1d5db";
            break;
          case "text-cyan-400":
            textColor = "#22d3ee";
            break;
          case "text-yellow-400":
            textColor = "#facc15";
            break;
          case "text-blue-500":
            textColor = "#60a5fa";
            break;
          case "text-purple-500":
            textColor = "#c084fc";
            break;
          case "text-orange-500":
            textColor = "#fb923c";
            break;
          case "text-red-500":
            textColor = "#fb2c36";
            break;
        }

        ctx.fillStyle = textColor;
        lines.forEach((line, i) => {
          ctx.fillText(line, 20, i * lineHeight + 20);
        });
      }

      // Descargar la imagen
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "ascii-art.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    },
    []
  );

  return { convertToAscii, downloadAsImage, canvasRef, downloadCanvasRef };
}
