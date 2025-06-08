import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, RefreshCw, Upload } from "lucide-react";
import type { ColoredPixel } from "@/types/ascii";
import { COLOR_OPTIONS } from "@/constants/ascii";

interface AsciiDisplayProps {
  originalImage: string | null;
  asciiArt: string;
  coloredAscii: ColoredPixel[][];
  colorMode: number;
  zoom: number;
  isProcessing: boolean;
}

export function AsciiDisplay({
  originalImage,
  asciiArt,
  coloredAscii,
  colorMode,
  zoom,
  isProcessing,
}: AsciiDisplayProps) {
  const renderAsciiArt = () => {
    const colorOption = COLOR_OPTIONS[colorMode];

    // Estilos CSS para hacer que los caracteres tengan proporción 1:1
    const charStyle = {
      transform: `scale(${zoom})`,
      transformOrigin: "center",
      lineHeight: "0.5", // Ajustar para que la altura del carácter sea igual al ancho
      letterSpacing: "0", // Sin espaciado extra entre caracteres
      fontFamily: "monospace",
      fontSize: "0.5rem",
    };

    if (colorOption.value === "original" && coloredAscii.length > 0) {
      return (
        <div className="font-mono whitespace-pre" style={charStyle}>
          {coloredAscii.map((row, i) => (
            <div key={i} className="flex flex-nowrap">
              {row.map((pixel, j) => (
                <span key={j} style={{ color: pixel.color }}>
                  {pixel.char}
                </span>
              ))}
            </div>
          ))}
        </div>
      );
    }

    return (
      <pre
        className={`${colorOption.value} font-mono whitespace-pre`}
        style={charStyle}
      >
        {asciiArt}
      </pre>
    );
  };

  return (
    <Card className="bg-gray-900 border-gray-800 flex-grow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-green-400" />
            Resultado ASCII
          </div>
          {isProcessing && (
            <div className="flex items-center gap-2 text-pink-400">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm">Procesando...</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {originalImage && asciiArt ? (
          <div
            className={`w-full h-full ${COLOR_OPTIONS[colorMode].bg} rounded-lg flex items-center justify-center overflow-auto`}
            style={{ minHeight: "calc(100vh - 250px)" }}
          >
            {renderAsciiArt()}
          </div>
        ) : (
          <div
            className="w-full bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-700"
            style={{ minHeight: "calc(100vh - 250px)" }}
          >
            <div className="text-center text-gray-500">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-green-500 rounded-full flex items-center justify-center">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-400">
                Sube una imagen
              </h3>
              <p className="text-gray-600">El arte ASCII aparecerá aquí</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
