import { Funnel_Sans } from "next/font/google";
import { ReactNode } from "react";
import "./[locale]/globals.css";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}
const funnel_Sans = Funnel_Sans({
  variable: "--font-noto-serif-jp",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  fallback: ["inter", "sans-serif"],
  subsets: ["latin", "latin-ext"],
});

export default async function LocaleLayout({ children, params }: LayoutProps) {
  // Await the params promise
  const { locale } = await params;

  return (
    <html
      lang={locale}
      style={{ scrollBehavior: "smooth", colorScheme: "dark" }}
      className="scroll-smooth dark"
    >
      <body
        className={`${funnel_Sans.className} antialiased 
          [&::-webkit-scrollbar]:h-0.5 
          [&::-webkit-scrollbar-thumb]:bg-primary
          [&::-webkit-scrollbar-track]:bg-foreground/10
          [&::-webkit-scrollbar-thumb]:rounded-b-full
        `}
      >
        {children}
      </body>
    </html>
  );
}
