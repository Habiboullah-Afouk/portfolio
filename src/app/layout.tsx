import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Shell } from "@/components/shell/Shell";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#07080a",
};

export const metadata: Metadata = {
  title: "Habiboullah Afouk — Full-Stack Software Developer",
  description:
    "Portfolio of Habiboullah Afouk — Full-Stack Software Developer from Laayoune, Morocco.",
  metadataBase: new URL("https://habib.dev"),
  openGraph: {
    title: "Habiboullah Afouk · Full-Stack Software Developer",
    description:
      "Cinematic, terminal-inspired developer portfolio. Full-stack across web, mobile, and desktop. Open for collaboration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-text antialiased" suppressHydrationWarning>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
