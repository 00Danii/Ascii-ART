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
  "Detallado",
  "Minimalista",
  "Bloques",
  "Braille",
];

export const COLOR_OPTIONS: ColorOption[] = [
  { name: "Verde Terminal", value: "text-green-500", bg: "bg-black" },
  { name: "Rosa", value: "text-pink-500", bg: "bg-black" },
  { name: "Blanco", value: "text-white", bg: "bg-black" },
  { name: "Gris", value: "text-gray-300", bg: "bg-black" },
  { name: "Cyan", value: "text-cyan-400", bg: "bg-black" },
  { name: "Amarillo", value: "text-yellow-400", bg: "bg-black" },
  { name: "Tonos Originales", value: "original", bg: "bg-black" },
];
