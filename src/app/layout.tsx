import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "flag-icons/css/flag-icons.min.css";
import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";

const funnel_Sans = Funnel_Sans({
  variable: "--font-noto-serif-jp",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  fallback: ["inter", "sans-serif"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Seguradora Favorita dos Moçambicanos | MALEseguros",
  description: "seu se",
  icons: {
    icon: "/logos/icon.png",
    apple: "/logos/icon.png",
    shortcut: "/logos/icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/logos/icon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${funnel_Sans.className} antialiased 
          [&::-webkit-scrollbar]:h-0.5 
          [&::-webkit-scrollbar-thumb]:bg-primary
          [&::-webkit-scrollbar-track]:bg-foreground/10
          [&::-webkit-scrollbar-thumb]:rounded-b-full
        `}
      >
        <Analytics />
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
