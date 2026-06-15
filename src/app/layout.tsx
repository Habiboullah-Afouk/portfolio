import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Fira_Code } from "next/font/google";
import { Shell } from "@/components/shell/Shell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#0a0b0b",
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
      className={`${inter.variable} ${playfair.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-text antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
