"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ZoomIn, ZoomOut } from "lucide-react";

interface ZoomControlProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export function ZoomControl({ zoom, onZoomChange }: ZoomControlProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label className="text-gray-200 font-medium">Zoom</Label>
        <span className="text-green-400 font-mono text-sm">
          {(zoom * 100).toFixed(0)}%
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          className="bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
          onClick={() => onZoomChange(Math.max(0.5, zoom - 0.1))}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Slider
          value={[zoom]}
          onValueChange={(value) => onZoomChange(value[0])}
          max={2}
          min={0.5}
          step={0.1}
          className="flex-1 [&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-0"
        />
        <Button
          size="icon"
          variant="outline"
          className="bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
          onClick={() => onZoomChange(Math.min(2, zoom + 0.1))}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
