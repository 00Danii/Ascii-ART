import React, { useRef, useEffect, useState } from "react";

type ColoredAsciiPixel = { char: string; color: string };
type AsciiCanvasDisplayProps = {
  coloredAscii: ColoredAsciiPixel[][];
  zoom?: number;
  fontSize?: number;
  fontFamily?: string;
  offset?: { x: number; y: number };
  dragging?: boolean;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
};

export function AsciiCanvasDisplay({
  coloredAscii,
  zoom = 1,
  fontSize = 25,
  fontFamily = "monospace",
  offset = { x: 0, y: 0 },
  dragging = false,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onMouseMove,
  onTouchStart,
  onTouchEnd,
  onTouchMove,
}: AsciiCanvasDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const charW = fontSize * 0.6 * zoom;
  const charH = fontSize * 0.5 * zoom;
  const cols = coloredAscii[0].length;
  const rows = coloredAscii.length;

  // Dibuja el canvas con offset y zoom
  useEffect(() => {
    if (!canvasRef.current || !coloredAscii.length) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    ctx.save();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(offset.x, offset.y);
    ctx.font = `${fontSize * zoom}px ${fontFamily}`;
    ctx.textBaseline = "top";

    coloredAscii.forEach((row, y) => {
      row.forEach((pixel, x) => {
        ctx.fillStyle = pixel.color;
        ctx.fillText(pixel.char, x * charW, y * charH);
      });
    });
    ctx.restore();
  }, [
    coloredAscii,
    zoom,
    fontSize,
    fontFamily,
    charW,
    charH,
    cols,
    rows,
    offset,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        // width: `${cols * charW}px`,
        // height: `${rows * charH}px`,
        width: "w-full",
        height: "h-full",
        background: "#000",
        display: "block",
        touchAction: "none",
        cursor: dragging ? "grabbing" : "grab",
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    />
  );
}
