import type {Metadata} from "next";
import {Playfair_Display, Inter, JetBrains_Mono} from "next/font/google";
import "./globals.css";

import {UIProvider} from "@/context/UIContext";
import {TransitionProvider} from "@/context/TransitionContext";

import PreloaderWrapper from "@/components/PreloaderWrapper"; // we'll create this
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Autopedia Automotive",
  description: "Luxury redefined.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-obsidian text-platinum font-body antialiased">
        <UIProvider>
          <TransitionProvider>
            {/* Page transition overlay (hidden by default) */}
            <div
              id="page-transition-overlay"
              className="fixed inset-0 z-[200] bg-obsidian scale-y-0 origin-bottom hidden pointer-events-none"
            />

            <PreloaderWrapper />
            <CustomCursor />
            <Navigation />
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <Footer />
          </TransitionProvider>
        </UIProvider>
      </body>
    </html>
  );
}
