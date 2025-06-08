"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Download, RotateCcw, Palette } from "lucide-react";
import { FileUpload } from "./file-upload";
import { ZoomControl } from "./zoom-control";
import { ColorSelector } from "./color-selector";
import type { AsciiSettings } from "@/types/ascii";
import { CHAR_SET_NAMES } from "@/constants/ascii";

interface ControlsPanelProps {
  originalImage: string | null;
  imageAspectRatio: number;
  zoom: number;
  settings: AsciiSettings;
  asciiArt: string;
  onFileUpload: (file: File) => void;
  onZoomChange: (zoom: number) => void;
  onSettingsChange: (settings: AsciiSettings) => void;
  onReset: () => void;
  onDownload: () => void;
}

export function ControlsPanel({
  originalImage,
  imageAspectRatio,
  zoom,
  settings,
  asciiArt,
  onFileUpload,
  onZoomChange,
  onSettingsChange,
  onReset,
  onDownload,
}: ControlsPanelProps) {
  const updateSetting = <K extends keyof AsciiSettings>(
    key: K,
    value: AsciiSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      {/* <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-white">
          Controles
        </CardTitle>
      </CardHeader> */}
      <CardContent className="space-y-6">
        <FileUpload originalImage={originalImage} onFileUpload={onFileUpload} />

        {/* Info de proporción */}
        {/* {originalImage && (
          <div className="bg-gray-800 p-3 rounded-lg">
            <Label className="text-gray-300 text-sm">Proporción Original</Label>
            <p className="text-green-400 font-mono text-sm">
              {imageAspectRatio > 1
                ? "Vertical"
                : imageAspectRatio < 1
                ? "Horizontal"
                : "Cuadrada"}{" "}
              ({imageAspectRatio.toFixed(2)})
            </p>
          </div>
        )} */}

        {/* Resolución */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-gray-200 font-medium">Resolución</Label>
            <span className="text-green-400 font-mono text-sm">
              {settings.width}px
            </span>
          </div>
          <Slider
            value={[settings.width]}
            onValueChange={(value) => updateSetting("width", value[0])}
            max={200}
            min={40}
            step={10}
            className="[&_[role=slider]]:bg-pink-500 [&_[role=slider]]:border-0"
          />
        </div>

        <ZoomControl zoom={zoom} onZoomChange={onZoomChange} />

        {/* Estilo de caracteres */}
        <div className="space-y-3">
          <Label className="text-gray-200 font-medium">Estilo ASCII</Label>
          <Select
            value={settings.charSet.toString()}
            onValueChange={(value) =>
              updateSetting("charSet", Number.parseInt(value))
            }
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {CHAR_SET_NAMES.map((name, index) => (
                <SelectItem
                  key={index}
                  value={index.toString()}
                  className="text-white hover:bg-gray-700"
                >
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ColorSelector
          colorMode={settings.colorMode}
          onColorModeChange={(value) => updateSetting("colorMode", value)}
        />

        {/* Invertir colores */}
        <div className="flex items-center justify-between">
          <Label className="text-gray-200 font-medium">Invertir colores</Label>
          <Switch
            checked={settings.invertColors}
            onCheckedChange={(checked) =>
              updateSetting("invertColors", checked)
            }
            className="data-[state=checked]:bg-green-500"
          />
        </div>

        {/* Contraste */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-gray-200 font-medium">Contraste</Label>
            <span className="text-green-400 font-mono text-sm">
              {settings.contrast.toFixed(1)}
            </span>
          </div>
          <Slider
            value={[settings.contrast]}
            onValueChange={(value) => updateSetting("contrast", value[0])}
            max={3}
            min={0.1}
            step={0.1}
            className="[&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-0"
          />
        </div>

        {/* Brillo */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-gray-200 font-medium">Brillo</Label>
            <span className="text-green-400 font-mono text-sm">
              {settings.brightness > 0 ? "+" : ""}
              {settings.brightness}
            </span>
          </div>
          <Slider
            value={[settings.brightness]}
            onValueChange={(value) => updateSetting("brightness", value[0])}
            max={100}
            min={-100}
            step={5}
            className="[&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-0"
          />
        </div>

        {/* Botones */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={onReset}
            variant="outline"
            className="w-full bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Resetear
          </Button>
          {asciiArt && (
            <Button
              onClick={onDownload}
              className="w-full bg-gradient-to-r from-pink-500 to-green-500 hover:from-pink-600 hover:to-green-600 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar ASCII
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
