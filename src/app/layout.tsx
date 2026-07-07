import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foto - Creative Network",
  description: "Creative industry networking platform for photographers and models.",
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
