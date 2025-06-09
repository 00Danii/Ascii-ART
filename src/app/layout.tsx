import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ASCII - ART",
  description: "Generador de arte ASCII - Danii",
  openGraph: {
    title: "ASCII - ART",
    description: "Generador de arte ASCII - Hecho con ♥ por Danii",
    url: "",
    siteName: "00Danii",
    images: [
      {
        url: "https://i.imgur.com/t7SlXqe.png",
        // width: 1200,
        // height: 630,
        alt: "Ejemplo de arte ASCII",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  authors: [{ name: "Danii" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
