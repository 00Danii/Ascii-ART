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

  " ╱╲╳▲▼◄►♦♠♣♥", // Símbolos Especiales
  // " ⟨⟩⟪⟫⟬⟭⟮⟯⟰⟱", // Matemáticos
  " ░▒▓█▀▄▌▐■□▪▫", // Bloques Avanzados
  " ♥♥♥", // Corazones
  " 0123456789", // Números

  // "あいうえおかきくけこさしすせそ", // Hiragana
  // "アイウエオカキクケコサシスセソ", // Katakana
  // "一二三四五六七八九十月火水木金土日", // Kanji Básicos
  // "龍虎鳥魚山川雨雪花風月星空海", // Kanji Naturales
  // "人女男子力口目耳手足心", // Kanji Cuerpo
  // "ｰｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ", // Half-width Kana
  // "「」『』【】〒〓〔〕〖〗〘〙〚〛", // Símbolos Japoneses
  // "☀☁☂☃★☆☉☊☋☌☍☎☏☐☑☒☓", // Símbolos Misceláneos
  // "👾👽🤖👻💀☠️👹👺🎭🦄", // Emojis

  "ｰｱｲｺｻｼｽｾ", // Half-width Kana
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

  // "Hiragana",
  // "Katana",
  // "Kanji Basicos",
  // "Kanji Naturales",
  // "Kanji Cuerpo",
  // "Half-width Kana",
  // "Símbolos Japoneses",
  "ｱｲｸｹｺｻｼｽｾｿ",
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

export const COLOR_HEX_MAP: Record<string, string> = {
  "text-green-500": "#22c55e",
  "text-pink-500": "#ec4899",
  "text-white": "#ffffff",
  "text-gray-300": "#d1d5db",
  "text-cyan-400": "#22d3ee",
  "text-yellow-400": "#facc15",
  "text-blue-500": "#3b82f6",
  "text-purple-500": "#a21caf",
  "text-orange-500": "#f97316",
};

// Configuraciones específicas para cada estilo de carácter
export const CHAR_STYLE_CONFIG = {
  0: { aspectRatio: 0.5, name: "Clásico" }, // Caracteres normales
  12: { aspectRatio: 0.8, name: "Kanji Basicos" },
};
