export interface AsciiSettings {
  width: number;
  charSet: number;
  contrast: number;
  brightness: number;
  colorMode: number;
  invertColors: boolean;
}

export interface ColoredPixel {
  char: string;
  color: string;
}

export interface ColorOption {
  name: string;
  value: string;
  bg: string;
}
