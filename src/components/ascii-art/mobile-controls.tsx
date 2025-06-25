"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import {
  Upload,
  Zap,
  Palette,
  Type,
  Sun,
  Contrast,
  ZoomIn,
  Download,
  RotateCcw,
  Sparkles,
  Shuffle,
  FileImage,
  FileType,
} from "lucide-react";
import { FileUpload } from "./file-upload";
import { ColorSelector } from "./color-selector";
import type { AsciiSettings } from "@/types/ascii";
import { CHAR_SET_NAMES } from "@/constants/ascii";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface MobileBottomControlsProps {
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

interface ControlItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  disabled?: boolean;
}

export function MobileBottomControls({
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
}: MobileBottomControlsProps) {
  const [activeControl, setActiveControl] = useState<string | null>(null);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const updateSetting = <K extends keyof AsciiSettings>(
    key: K,
    value: AsciiSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const controls: ControlItem[] = [
    {
      id: "upload",
      icon: <Upload className="w-5 h-5" />,
      label: "Subir Imagen",
      color: "text-blue-400",
    },
    {
      id: "style",
      icon: <Type className="w-5 h-5" />,
      label: "Estilo ASCII",
      color: "text-purple-400",
    },
    {
      id: "color",
      icon: <Palette className="w-5 h-5" />,
      label: "Color",
      color: "text-pink-400",
    },
    {
      id: "resolution",
      icon: <Zap className="w-5 h-5" />,
      label: "Resolución",
      color: "text-green-400",
    },
    {
      id: "zoom",
      icon: <ZoomIn className="w-5 h-5" />,
      label: "Zoom",
      color: "text-cyan-400",
    },
    {
      id: "contrast",
      icon: <Contrast className="w-5 h-5" />,
      label: "Contraste",
      color: "text-orange-400",
    },
    {
      id: "brightness",
      icon: <Sun className="w-5 h-5" />,
      label: "Brillo",
      color: "text-yellow-400",
    },
    {
      id: "reset",
      icon: <RotateCcw className="w-5 h-5" />,
      label: "Reiniciar",
      color: "text-gray-400",
    },
    {
      id: "download",
      icon: <Download className="w-5 h-5" />,
      label: "Descargar",
      color: "text-emerald-400",
      disabled: !asciiArt || !originalImage,
    },
  ];

  const renderControlContent = (controlId: string) => {
    switch (controlId) {
      case "upload":
        return (
          <div className="space-y-4">
            <FileUpload
              originalImage={originalImage}
              onFileUpload={onFileUpload}
            />
          </div>
        );

      case "style":
        return (
          <div className="space-y-4">
            <Label className="text-green-300">Estilo ASCII</Label>
            <Select
              value={settings.charSet.toString()}
              onValueChange={(value) =>
                updateSetting("charSet", Number.parseInt(value))
              }
            >
              <SelectTrigger className="bg-black border-green-500 text-green-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-green-500 max-h-60">
                {CHAR_SET_NAMES.map((name, index) => (
                  <SelectItem
                    key={index}
                    value={index.toString()}
                    className="text-green-500 hover:bg-gray-700"
                  >
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "color":
        return (
          <div className="space-y-4">
            <ColorSelector
              colorMode={settings.colorMode}
              onColorModeChange={(value) => updateSetting("colorMode", value)}
            />
            <div className="flex items-center justify-between">
              <Label className="text-green-300">Invertir colores</Label>
              <Switch
                checked={settings.invertColors}
                onCheckedChange={(checked) =>
                  updateSetting("invertColors", checked)
                }
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </div>
        );

      case "resolution":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-green-300">Resolución</Label>
              <span className="text-green-300 font-mono text-sm">
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
        );

      case "zoom":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-green-300">Zoom</Label>
              <span className="text-green-300 font-mono text-sm">
                {(zoom * 100).toFixed(0)}%
              </span>
            </div>
            <Slider
              value={[zoom]}
              onValueChange={(value) => onZoomChange(value[0])}
              max={2}
              min={0.5}
              step={0.1}
              className="[&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-0"
            />
          </div>
        );

      case "contrast":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-green-300">Contraste</Label>
              <span className="text-green-300 font-mono text-sm">
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
        );

      case "brightness":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-green-300">Brillo</Label>
              <span className="text-green-300 font-mono text-sm">
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
        );

      default:
        return null;
    }
  };

  const handleControlClick = (controlId: string) => {
    switch (controlId) {
      case "reset":
        setShowResetDialog(true);
        break;
      case "download":
        setShowDownloadMenu(true);
        break;
      default:
        setActiveControl(controlId);
    }
  };

  return (
    <>
      {/* Barra de controles inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t  border-green-500 rounded-2xl p-3 lg:hidden z-40">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {controls.map((control) => (
            <Sheet
              key={control.id}
              open={activeControl === control.id}
              onOpenChange={(open) =>
                setActiveControl(open ? control.id : null)
              }
            >
              <SheetTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={control.disabled}
                  className={`flex-shrink-0 flex flex-col items-center gap-1 h-auto py-2 px-3 ${control.color} hover:bg-black disabled:opacity-50`}
                  onClick={() => handleControlClick(control.id)}
                >
                  {control.icon}
                  <span className="text-xs font-medium">{control.label}</span>
                </Button>
              </SheetTrigger>
              {[
                "upload",
                "style",
                "color",
                "resolution",
                "zoom",
                "contrast",
                "brightness",
              ].includes(control.id) && (
                <SheetContent
                  side="bottom"
                  className="bg-black border-green-500 rounded-2xl max-h-[50vh] pb-7 pl-4 pr-4"
                >
                  <SheetTitle></SheetTitle>
                  <div>{renderControlContent(control.id)}</div>
                </SheetContent>
              )}
            </Sheet>
          ))}
        </div>
      </div>

      {/* Espaciador para evitar que el contenido se oculte detrás de la barra */}
      <div className="h-20 lg:hidden" />

      {/* Diálogo de confirmación para reiniciar */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="bg-black border-green-500">
          <DialogHeader>
            <DialogTitle className="text-green-500">
              ¿Estás seguro de que deseas reiniciar?
            </DialogTitle>
          </DialogHeader>
          <div className="text-green-400 mb-4">
            Esta acción borrará tu progreso y no podrá deshacerse.
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                className="bg-black border-green-500 text-green-500 hover:bg-black hover:text-green-300 transition-all duration-300"
              >
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="bg-black border-green-500 text-green-500 hover:bg-black hover:text-green-300 transition-all duration-300"
                onClick={() => {
                  setShowResetDialog(false);
                  onReset();
                }}
              >
                Aceptar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Menú de descarga */}
      <Dialog open={showDownloadMenu} onOpenChange={setShowDownloadMenu}>
        <DialogContent className="bg-black border-green-500">
          <DialogHeader>
            <DialogTitle className="text-green-500">
              Descargar arte ASCII
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Button
              className="flex gap-2 bg-green-500/10 border-green-500 text-green-300 hover:bg-green-500/20 hover:text-green-200"
              onClick={() => {
                setShowDownloadMenu(false);
                onDownloadAsImage();
              }}
            >
              <FileImage className="w-5 h-5" />
              Descargar como imagen
            </Button>
            <Button
              className="flex gap-2 bg-green-500/10 border-green-500 text-green-300 hover:bg-green-500/20 hover:text-green-200"
              onClick={() => {
                setShowDownloadMenu(false);
                onDownloadAsText();
              }}
            >
              <FileType className="w-5 h-5" />
              Descargar como texto
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
