"use client";

import { useCallback, useRef } from "react";
import type { AsciiSettings, ColoredPixel } from "../types/ascii";
import { ASCII_CHARS } from "../constants/ascii";

export function useAsciiConverter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  return { convertToAscii, canvasRef };
}
