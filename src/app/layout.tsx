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
  title: "Habib — Systems Engineer · Infrastructure & Design",
  description:
    "Editorial portfolio of Habib — Arch Linux power user, Hyprland aesthete, infrastructure engineer building cinematic systems for premium teams.",
  metadataBase: new URL("https://habib.dev"),
  openGraph: {
    title: "Habib · Systems Engineer",
    description:
      "Cinematic operating-system portfolio. Arch + Hyprland · terminal-native workflow · infrastructure that ships.",
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
