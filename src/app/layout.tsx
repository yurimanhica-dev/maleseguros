import { Funnel_Sans } from "next/font/google";
import "./[locale]/globals.css";

const funnel_Sans = Funnel_Sans({
  variable: "--font-noto-serif-jp",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  fallback: ["inter", "sans-serif"],
  subsets: ["latin", "latin-ext"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
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
