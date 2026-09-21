import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ChapterProvider } from "@/components/layout/ChapterProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrajectoryRail } from "@/components/layout/TrajectoryRail";
import { site } from "@/content/site";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  variable: "--font-display-face",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.legalName} · ${site.line}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.legalName} · ${site.line}`,
    description: site.description,
    siteName: site.legalName,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-blue px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <ChapterProvider>
          <Header />
          <TrajectoryRail />
          <main id="main">{children}</main>
          <Footer />
        </ChapterProvider>
      </body>
    </html>
  );
}
