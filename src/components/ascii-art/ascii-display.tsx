import { Card, CardContent } from "@/components/ui/card";
import type { ColoredPixel } from "@/types/ascii";
import { COLOR_OPTIONS } from "@/constants/ascii";
import { FileUpload } from "./file-upload";
import { AsciiCanvasDisplay } from "./AsciiDisplayCanvas";
import { useRef, useEffect, useState, useCallback } from "react";

interface AsciiDisplayProps {
  originalImage: string | null;
  asciiArt: string;
  coloredAscii: ColoredPixel[][];
  colorMode: number;
  zoom: number;
  isProcessing: boolean;
  onFileUpload: (file: File) => void;
  onZoomChange?: (zoom: number) => void;
}

// Hook personalizado para gestos táctiles
function useTouchGestures(
  onZoomChange?: (zoom: number) => void,
  currentZoom = 1
) {
  const [isGestureActive, setIsGestureActive] = useState(false);
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  const gestureRef = useRef<HTMLDivElement>(null);

  // Función para calcular distancia entre dos puntos táctiles
  const getTouchDistance = useCallback((touches: TouchList) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  }, []);

  // Manejar inicio de gesto
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinch gesture
        e.preventDefault();
        setIsGestureActive(true);
        const distance = getTouchDistance(e.touches);
        setLastTouchDistance(distance);
      } else if (e.touches.length === 1) {
        // Posible double tap
        const currentTime = Date.now();
        const timeDiff = currentTime - lastTapTime;

        if (timeDiff < 300 && timeDiff > 0) {
          // Double tap detectado
          e.preventDefault();
          const newZoom = currentZoom >= 1.5 ? 1 : currentZoom + 0.1;
          onZoomChange?.(Math.min(Math.max(newZoom, 0.1), 2));
        }
        setLastTapTime(currentTime);
      }
    },
    [getTouchDistance, lastTapTime, currentZoom, onZoomChange]
  );

  // Manejar movimiento de gesto
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 2 && isGestureActive) {
        e.preventDefault();
        const distance = getTouchDistance(e.touches);

        if (lastTouchDistance > 0) {
          const scale = distance / lastTouchDistance;
          const newZoom = currentZoom * scale;
          const clampedZoom = Math.min(Math.max(newZoom, 0.1), 2);
          onZoomChange?.(clampedZoom);
        }

        setLastTouchDistance(distance);
      }
    },
    [
      getTouchDistance,
      isGestureActive,
      lastTouchDistance,
      currentZoom,
      onZoomChange,
    ]
  );

  // Manejar fin de gesto
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (e.touches.length < 2) {
      setIsGestureActive(false);
      setLastTouchDistance(0);
    }
  }, []);

  // Configurar event listeners
  useEffect(() => {
    const element = gestureRef.current;
    if (!element) return;

    // Opciones para eventos pasivos
    const options = { passive: false };

    element.addEventListener("touchstart", handleTouchStart, options);
    element.addEventListener("touchmove", handleTouchMove, options);
    element.addEventListener("touchend", handleTouchEnd, options);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { gestureRef, isGestureActive };
}

export function AsciiDisplay({
  originalImage,
  asciiArt,
  coloredAscii,
  colorMode,
  zoom,
  onFileUpload,
  isProcessing,
  onZoomChange,
}: AsciiDisplayProps) {
  const { gestureRef, isGestureActive } = useTouchGestures(onZoomChange, zoom);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseUp = () => {
    setDragging(false);
    setLastPos(null);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !lastPos) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  // Touch
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setDragging(true);
      setLastPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };
  const handleTouchEnd = () => {
    setDragging(false);
    setLastPos(null);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging || !lastPos || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastPos.x;
    const dy = e.touches[0].clientY - lastPos.y;
    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
    setLastPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const renderAsciiArt = () => {
    const colorOption = COLOR_OPTIONS[colorMode];

    // Estilos CSS para hacer que los caracteres tengan proporción 1:1
    const charStyle = {
      transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
      transformOrigin: "center",
      lineHeight: "0.5", // Ajustar para que la altura del carácter sea igual al ancho
      letterSpacing: "0", // Sin espaciado extra entre caracteres
      fontFamily: "monospace",
      fontSize: "0.5rem",
      transition: dragging ? "none" : "transform 0.1s",
    };

    if (colorOption.value === "original") {
      return (
        <AsciiCanvasDisplay
          coloredAscii={coloredAscii}
          zoom={zoom}
          fontSize={25}
          offset={offset}
          dragging={dragging}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
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
    <Card className="bg-black border-green-500 flex-grow">
      <CardContent className="flex-grow">
        {originalImage && asciiArt ? (
          <div className="relative">
            <div
              ref={gestureRef}
              className={`w-full h-full ${
                COLOR_OPTIONS[colorMode].bg
              } rounded-lg flex items-center justify-center overflow-auto touch-none select-none ${
                isGestureActive ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{
                minHeight: "calc(100vh - 70px)",
                touchAction: "none", // Prevenir scroll nativo durante gestos
              }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchMove={handleTouchMove}
            >
              {renderAsciiArt()}
            </div>
          </div>
        ) : (
          <div className="w-full  h-[calc(100vh-190px)] flex bg-black rounded-lg lg:h-[calc(100vh-90px)]">
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
