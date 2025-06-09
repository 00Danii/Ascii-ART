import type { ColorOption } from "@/types/ascii";

export const ASCII_CHARS = [
  " .:-=+*#%@",
  " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  " .,-~:;=!*#$@",
  " ░▒▓█",
  " •.:",
  // " ⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿",
  // " ⠀⠁⠈⠂⠊⠒⠢⠆⠤⠔⠴⠌⠬⠼⠽⠿", // Braille (optimizado)
  // " ◦•◘○●◉⬢⬣⬡", // Círculos y Formas
  " ┌┐└┘│─┼┤├┬┴╭╮╯╰║═╬╣╠╦╩", // Líneas y Marcos
  // " ∙∘○◯●◉⚫⚪", // Puntos Geométricos
  // " ▁▂▃▄▅▆▇█", // Barras Verticales
  " ╱╲╳▲▼◄►♦♠♣♥", // Símbolos Especiales
  // " ⟨⟩⟪⟫⟬⟭⟮⟯⟰⟱", // Matemáticos
  " ░▒▓█▀▄▌▐■□▪▫", // Bloques Avanzados
  " ♥",
  " 0123456789", // Números
];

export const CHAR_SET_NAMES = [
  "Clásico",
  "Detallado",
  "Minimalista",
  "Bloques",
  "Braile",
  // "Braille",
  // "Braille Optimizado",
  // "Formas Geométricas",
  "Líneas y Marcos",
  // "Puntos Modernos",
  // "Barras Graduales",
  "Símbolos Especiales",
  // "Matemático",
  "Bloques Avanzados",
  "Corazones",
  "Números",
];

export const COLOR_OPTIONS: ColorOption[] = [
  { name: "Verde Terminal", value: "text-green-500", bg: "bg-black" },
  { name: "Rosa", value: "text-pink-500", bg: "bg-black" },
  { name: "Blanco", value: "text-white", bg: "bg-black" },
  { name: "Gris", value: "text-gray-300", bg: "bg-black" },
  { name: "Cyan", value: "text-cyan-400", bg: "bg-black" },
  { name: "Amarillo", value: "text-yellow-400", bg: "bg-black" },
  { name: "Azul", value: "text-blue-500", bg: "bg-black" },
  { name: "Púrpura", value: "text-purple-500", bg: "bg-black" },
  { name: "Naranja", value: "text-orange-500", bg: "bg-black" },
  { name: "Tonos Originales", value: "original", bg: "bg-black" },
];

// Configuraciones específicas para cada estilo de carácter
export const CHAR_STYLE_CONFIG = {
  0: { aspectRatio: 0.5, name: "Clásico" }, // Caracteres normales
  1: { aspectRatio: 0.5, name: "Ultra Detallado" },
  2: { aspectRatio: 0.5, name: "Minimalista" },
  3: { aspectRatio: 0.6, name: "Bloques" }, // Bloques son más cuadrados
  4: { aspectRatio: 0.8, name: "Braille" }, // Braille necesita proporción diferente
  5: { aspectRatio: 0.7, name: "Formas Geométricas" },
  6: { aspectRatio: 0.5, name: "Líneas y Marcos" },
  7: { aspectRatio: 0.8, name: "Puntos Modernos" },
  8: { aspectRatio: 0.4, name: "Barras Verticales" }, // Barras son más altas
  9: { aspectRatio: 0.6, name: "Símbolos Especiales" },
  10: { aspectRatio: 0.5, name: "Matemático" },
  11: { aspectRatio: 0.6, name: "Bloques Avanzados" },
};
