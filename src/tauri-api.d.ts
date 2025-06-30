declare module '@tauri-apps/api/fs' {
  export function writeBinaryFile(path: string, data: Uint8Array): Promise<void>;
}

declare module '@tauri-apps/api/path' {
  export function pictureDir(): Promise<string>;
  export function join(...paths: string[]): Promise<string>;
}
