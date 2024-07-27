import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Form generator",
  description: "Generate form from JSON",
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
