import { Card, CardContent } from "@/components/ui/card";
import type { ColoredPixel } from "@/types/ascii";
import { COLOR_OPTIONS } from "@/constants/ascii";
import { FileUpload } from "./file-upload";
import { AsciiCanvasDisplay } from "./AsciiDisplayCanvas";

interface AsciiDisplayProps {
  originalImage: string | null;
  asciiArt: string;
  coloredAscii: ColoredPixel[][];
  colorMode: number;
  zoom: number;
  isProcessing: boolean;
  onFileUpload: (file: File) => void;
}

export function AsciiDisplay({
  originalImage,
  asciiArt,
  coloredAscii,
  colorMode,
  zoom,
  onFileUpload,
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

    if (colorOption.value === "original") {
      return (
        <AsciiCanvasDisplay
          coloredAscii={coloredAscii}
          zoom={zoom}
          fontSize={25}
        />
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
          <div className="w-full  h-[calc(100vh-170px)] flex bg-black rounded-lg lg:h-[calc(100vh-90px)]">
            <FileUpload
              originalImage={originalImage}
              onFileUpload={onFileUpload}
              isAsciiDisplay={true}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
