import React, { useRef, useEffect, useState } from "react";

type ColoredAsciiPixel = { char: string; color: string };
type AsciiCanvasDisplayProps = {
  coloredAscii: ColoredAsciiPixel[][];
  zoom?: number;
  fontSize?: number;
  fontFamily?: string;
  offset?: { x: number; y: number };
};

export function AsciiCanvasDisplay({
  coloredAscii,
  zoom = 1,
  fontSize = 25,
  fontFamily = "monospace",
}: AsciiCanvasDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Estado para panning
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  const charW = fontSize * 0.6 * zoom;
  const charH = fontSize * 0.5 * zoom;
  const cols = coloredAscii[0].length;
  const rows = coloredAscii.length;

  // Dibuja el canvas con offset y zoom
  useEffect(() => {
    if (!canvasRef.current || !coloredAscii.length) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const width = cols * charW;
    const height = rows * charH;
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

  // Mouse events para panning
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

  // Touch events para panning
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

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${cols * charW}px`,
        height: `${rows * charH}px`,
        background: "#000",
        display: "block",
        touchAction: "none",
        cursor: dragging ? "grabbing" : "grab",
      }}
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
