import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import localFont from "next/font/local";
import SmoothScroll from "@/components/smoothscroll";
// 1. Подключаем твой Apercu
const apercu = localFont({
  src: [
    {
      path: "../public/fonts/ApercuPro-ExtraLight.woff2", // Путь к файлу
      weight: "200",                                 // Вес для ExtraLight
      style: "normal",
    },
    {
      path: "../public/fonts/ApercuPro-Regular.woff2",    // Путь к файлу
      weight: "400",                                 // Вес для Regular
      style: "normal",
    },
    {
      path: "../public/fonts/ApercuPro-Bold.woff2",       // Если есть жирный
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-apercu",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Caseus studio",
  description: "Creative smm design studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={apercu.variable}> 
      <body className={`${apercu.variable} font-apercu antialiased`}>
        <SmoothScroll>
        {children}  
        </SmoothScroll>
        <SpeedInsights/>
      </body>
    </html>
  );
}


