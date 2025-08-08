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
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Seguradora Favorita dos Moçambicanos | MALEseguros",
    description: "seu se",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Seguradora Favorita dos Moçambicanos | MALEseguros",
      },
    ],
    locale: "pt_BR",
    siteName: "Seguradora Favorita dos Moçambicanos | MALEseguros",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguradora Favorita dos Moçambicanos | MALEseguros",
    description: "seu se",
    images: ["/og.png"],
    creator: "@MALEseguros",
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
                 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-primary
          [&::-webkit-scrollbar-track]:bg-zinc-100 
        `}
      >
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
