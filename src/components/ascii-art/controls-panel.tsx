"use client";

import { Card, CardContent } from "@/components/ui/card";
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
import { Download, FileImage, FileType, RotateCcw } from "lucide-react";
import { FileUpload } from "./file-upload";
import { ZoomControl } from "./zoom-control";
import { ColorSelector } from "./color-selector";
import type { AsciiSettings } from "@/types/ascii";
import { CHAR_SET_NAMES } from "@/constants/ascii";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface ControlsPanelProps {
  originalImage: string | null;
  zoom: number;
  settings: AsciiSettings;
  asciiArt: string;
  onFileUpload: (file: File) => void;
  onZoomChange: (zoom: number) => void;
  onSettingsChange: (settings: AsciiSettings) => void;
  onReset: () => void;
  onDownloadAsText: () => void;
  onDownloadAsImage: () => void;
}

export function ControlsPanel({
  originalImage,
  zoom,
  settings,
  asciiArt,
  onFileUpload,
  onZoomChange,
  onSettingsChange,
  onReset,
  onDownloadAsText,
  onDownloadAsImage,
}: ControlsPanelProps) {
  const updateSetting = <K extends keyof AsciiSettings>(
    key: K,
    value: AsciiSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Card className="bg-black border-green-500">
      <CardContent className="space-y-6">
        <FileUpload originalImage={originalImage} onFileUpload={onFileUpload} />

        {/* Resolución */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-green-300 font-medium">Resolución</Label>
            <span className="text-green-500 font-mono text-sm">
              {settings.width}px
            </span>
          </div>
          <Slider
            value={[settings.width]}
            onValueChange={(value) => updateSetting("width", value[0])}
            max={200}
            min={40}
            step={10}
            className="[&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-0"
          />
        </div>

        <ZoomControl zoom={zoom} onZoomChange={onZoomChange} />

        {/* Estilo de caracteres */}
        <div className="space-y-3">
          <Label className="text-green-300 font-medium">Estilo ASCII</Label>
          <Select
            value={settings.charSet.toString()}
            onValueChange={(value) =>
              updateSetting("charSet", Number.parseInt(value))
            }
          >
            <SelectTrigger className="bg-black border-green-500 text-green-500 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black border-green-500">
              {CHAR_SET_NAMES.map((name, index) => (
                <SelectItem
                  key={index}
                  value={index.toString()}
                  className="text-green-500 hover:bg-black"
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
          <Label className="text-green-300 font-medium">Invertir colores</Label>
          <Switch
            checked={settings.invertColors}
            onCheckedChange={(checked) =>
              updateSetting("invertColors", checked)
            }
            className="data-[state=checked]:bg-green-800"
          />
        </div>

        {/* Contraste */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-green-300 font-medium">Contraste</Label>
            <span className="text-green-500 font-mono text-sm">
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
            <Label className="text-green-300 font-medium">Brillo</Label>
            <span className="text-green-500 font-mono text-sm">
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

        {/* Botones - Reiniciar y Descarga */}
        <div className="space-y-3 pt-4 grid grid-cols-2 gap-2">
          {/* Reiniciar */}
          <Dialog>
            <DialogTrigger className=" inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] shadow-xs h-9 px-4 py-2 has-[>svg]:px-3 w-full border bg-black border-green-500 text-green-500 hover:bg-black hover:text-green-300 duration-300">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
            </DialogTrigger>
            <DialogContent className="bg-black border border-green-500">
              <DialogHeader>
                <DialogTitle className="text-green-500">
                  ¿Estás seguro de que deseas reiniciar?
                </DialogTitle>
                <DialogDescription className="text-green-400">
                  Esta acción borrará tu progreso y no podrá deshacerse.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className=" bg-black border-green-500 text-green-500 hover:bg-black hover:text-green-300 transition-all duration-300"
                  >
                    Cancelar
                  </Button>
                </DialogClose>

                <DialogClose>
                  <Button
                    type="button"
                    variant="outline"
                    className=" bg-black border-green-500 text-green-500 hover:bg-black hover:text-green-300 transition-all duration-300"
                    onClick={onReset}
                  >
                    Aceptar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Descarga */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className=" inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] shadow-xs h-9 px-4 py-2 has-[>svg]:px-3 w-full border border-green-500 bg-green-500/10 hover:bg-green-500/20 text-green-300 hover:text-green-200 transition-all duration-300"
              disabled={!asciiArt || !originalImage}
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black border border-green-500 text-green-500">
              <DropdownMenuItem
                className="focus:bg-zinc-800 focus:text-green-500"
                onClick={onDownloadAsImage}
              >
                <FileImage className="text-green-500" />
                Imagen
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-zinc-800 focus:text-green-500"
                onClick={onDownloadAsText}
              >
                <FileType className="text-green-500" />
                Texto
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
