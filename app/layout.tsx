import type { Metadata } from "next";
import '@/app/globals.css'
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
  metadataBase: new URL('https://www.caseus.studio'),
  // 1. Умный Title
  title: {
    default: "Caseus Studio | Premium SMM & Web Development Agency",
    // template нужен для внутренних страниц (например: "Work | Caseus Studio")
    template: "%s | Caseus Studio", 
  },
  
  // 2. Продающий Description (в районе 150-160 символов)
  description: "We craft high-end visual identities and data-driven social media strategies. Caseus Studio helps bold brands dominate their market.",
  
  // 3. Ключевики (Гугл их сейчас почти игнорит, но для других поисковиков полезно)
  keywords: ["SMM agency", "creative Web Development studio", "social media marketing", "branding", "web development"],

  // 4. Open Graph — это то, как сайт выглядит в Telegram, iMessage, LinkedIn
  openGraph: {
    title: "Caseus Studio | Premium SMM & Web Development",
    description: "High-end visual identities and social media strategies.",
    url: "https://www.caseus.studio/",
    siteName: "Caseus Studio",
    images: [
      {
        url: "/og-image.png", // Сделай красивую картинку 1200x630px и положи в папку public
        width: 800,
        height: 800,
        alt: "Caseus Studio Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 5. Twitter (X) Карточки — многие мессенджеры тоже тянут инфу отсюда
  twitter: {
    card: "summary_large_image",
    title: "Caseus Studio | Premium SMM & Web Development",
    description: "High-end visual identities and social media strategies.",
    images: ["/og-image.jpg"], 
  },

  // 6. Инструкции для роботов (Разрешаем индексировать всё)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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


