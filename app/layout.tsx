import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buildly",
  description: "Created with Love",
  generator: "Buildly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
