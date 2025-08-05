import type { Metadata } from "next";
import { Noto_Serif_Japanese } from "next/font/google";
import "./globals.css";

const notoSerifJP = Noto_Serif_Japanese({
  variable: "--font-geist-sans",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "maleseguros",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSerifJP.variable} antialiased`}>{children}</body>
    </html>
  );
}
