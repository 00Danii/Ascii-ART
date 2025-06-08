export const calculateBrightness = (r: number, g: number, b: number): number => {
  return Math.floor(0.299 * r + 0.587 * g + 0.114 * b);
};

export const invertColor = (r: number, g: number, b: number): [number, number, number] => {
  return [255 - r, 255 - g, 255 - b];
};

export const getCharIndex = (gray: number, charSetLength: number): number => {
  return Math.floor((gray / 255) * (charSetLength - 1));
};