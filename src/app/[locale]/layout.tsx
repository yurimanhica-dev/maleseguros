import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "flag-icons/css/flag-icons.min.css";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Funnel_Sans } from "next/font/google";
import { notFound } from "next/navigation";
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
  title: "MALEseguros",
  description: "A Corretora de Seguros Favorita dos Moçambicanos, desde 2014.",
  icons: {
    icon: "/logos/icon.png",
    apple: "/logos/icon.png",
    shortcut: "/logos/icon.png",
    other: [{ rel: "mask-icon", url: "/logos/icon.png" }],
  },
};

type Props = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
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
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
