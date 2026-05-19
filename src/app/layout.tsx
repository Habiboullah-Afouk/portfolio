import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Shell } from "@/components/shell/Shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0b0b",
};

export const metadata: Metadata = {
  title: "Habiboullah Afouk — Full-Stack Software Developer",
  description:
    "Portfolio of Habiboullah Afouk — Full-Stack Software Developer from Laayoune, Morocco. Building modern web, desktop, and mobile applications with React, Laravel, Node.js, Electron, and more.",
  metadataBase: new URL("https://habib.dev"),
  openGraph: {
    title: "Habiboullah Afouk · Full-Stack Software Developer",
    description:
      "Cinematic, terminal-inspired developer portfolio. Full-stack across web, mobile, and desktop · Linux-native workflow · open for collaboration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-text antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
