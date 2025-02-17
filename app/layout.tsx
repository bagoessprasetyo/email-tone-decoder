import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from 'geist/font/mono'
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Email Tone Decoder",
  description: "Decode the tone and sentiment of your emails with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${GeistMono.variable} ${GeistSans.variable} font-sans bg-background text-foreground antialiased transition-colors duration-300`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
