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
    <Card className="bg-black-900 border-green-500 flex-grow">
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
            className="w-full bg-black-800 rounded-lg flex items-center justify-center border-2 border-dashed border-green-700"
            style={{ minHeight: "calc(100vh - 90px)" }}
          >
            <div className="text-center text-gray-500">
              <div className="w-20 h-20 mx-auto mb-6  rounded-full flex items-center justify-center">
                <Upload className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-500">
                Sube una imagen
              </h3>
              <p className="text-green-700">El arte ASCII aparecerá aquí</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
