import type { ColorOption } from "@/types/ascii";

export const ASCII_CHARS = [
  " .:-=+*#%@",
  " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  " .,-~:;=!*#$@",
  " ░▒▓█",
  " ⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿",
];

export const CHAR_SET_NAMES = [
  "Clásico",
  "Ultra Detallado",
  "Minimalista",
  "Bloques",
  "Braille",
];

export const COLOR_OPTIONS: ColorOption[] = [
  { name: "Verde Terminal", value: "text-green-400", bg: "bg-black" },
  { name: "Rosa Neón", value: "text-pink-400", bg: "bg-black" },
  { name: "Blanco Puro", value: "text-white", bg: "bg-black" },
  { name: "Gris Clásico", value: "text-gray-300", bg: "bg-black" },
  { name: "Cyan Retro", value: "text-cyan-400", bg: "bg-black" },
  { name: "Amarillo Brillante", value: "text-yellow-400", bg: "bg-black" },
  { name: "Tonos Originales", value: "original", bg: "bg-black" },
];
