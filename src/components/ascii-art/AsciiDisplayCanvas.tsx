import React, { useRef, useEffect } from "react";

type ColoredAsciiPixel = { char: string; color: string };
type AsciiCanvasDisplayProps = {
  coloredAscii: ColoredAsciiPixel[][];
  zoom?: number;
  fontSize?: number;
  fontFamily?: string;
};

export function AsciiCanvasDisplay({
  coloredAscii,
  zoom = 1,
  fontSize = 25,
  fontFamily = "monospace",
}: AsciiCanvasDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Usa los mismos factores que en la descarga
  const charW = fontSize * 0.6 * zoom;
  const charH = fontSize * 0.5 * zoom;

  const cols = coloredAscii[0].length;
  const rows = coloredAscii.length;

  useEffect(() => {
    if (!canvasRef.current || !coloredAscii.length) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    canvasRef.current.width = cols * charW;
    canvasRef.current.height = rows * charH;

    ctx.font = `${fontSize * zoom}px ${fontFamily}`;
    ctx.textBaseline = "top";
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    coloredAscii.forEach((row, y) => {
      row.forEach((pixel, x) => {
        ctx.fillStyle = pixel.color;
        ctx.fillText(pixel.char, x * charW, y * charH);
      });
    });
  }, [coloredAscii, zoom, fontSize, fontFamily, charW, charH, cols, rows]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${cols * charW}px`,
        height: `${rows * charH}px`,
        background: "#000",
        display: "block",
      }}
    />
  );
}