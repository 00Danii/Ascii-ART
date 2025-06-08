"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { COLOR_OPTIONS } from "@/constants/ascii";

interface ColorSelectorProps {
  colorMode: number;
  onColorModeChange: (colorMode: number) => void;
}

export function ColorSelector({
  colorMode,
  onColorModeChange,
}: ColorSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-gray-200 font-medium">Color del ASCII</Label>
      <Select
        value={colorMode.toString()}
        onValueChange={(value) => onColorModeChange(Number.parseInt(value))}
      >
        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          {COLOR_OPTIONS.map((option, index) => (
            <SelectItem
              key={index}
              value={index.toString()}
              className="text-white hover:bg-gray-700"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    option.value === "original"
                      ? "bg-gradient-to-r from-red-400 via-green-400 to-blue-400"
                      : option.value.replace("text-", "bg-")
                  }`}
                ></div>
                {option.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
