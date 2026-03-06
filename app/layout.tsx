import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import localFont from "next/font/local";

// 1. Подключаем твой Apercu
const apercu = localFont({
  src: "../public/fonts/apercu_regular_pro.otf",
  variable: "--font-apercu", // Это имя переменной для CSS
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
      {/* 2. Обязательно добавляем apercu.variable в html или body */}
      <body className="font-sans antialiased">
        {children}  
        <SpeedInsights/>
      </body>
    </html>
  );
}


