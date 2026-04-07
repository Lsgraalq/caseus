import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Пропускаем системные файлы, картинки и API (чтобы не грузить сервер)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") || // Игнорим админку Sanity
    pathname.includes(".") // Игнорим файлы с расширением (.jpg, .mp4)
  ) {
    return NextResponse.next();
  }

  // 2. Если юзер УЖЕ зашел на немецкую версию, оставляем его в покое
  if (pathname.startsWith("/de")) {
    return NextResponse.next();
  }

  // --- ТОЛЬКО ДЛЯ ГЛАВНОЙ СТРАНИЦЫ (/) ---
  if (pathname === "/") {
    // 3. Проверяем куки: может юзер уже вручную выбрал язык через меню?
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    
    if (cookieLocale === "de") {
      return NextResponse.redirect(new URL("/de", request.url));
    }
    if (cookieLocale === "en") {
      return NextResponse.next();
    }

    // 4. Если кук нет (зашел впервые), проверяем язык браузера
    const acceptLanguage = request.headers.get("accept-language") || "";
    
    // Смотрим именно на ПЕРВЫЙ (главный) язык браузера
    // Если он начинается на 'de' (de, de-CH, de-AT) -> кидаем на немецкий
    if (acceptLanguage.toLowerCase().startsWith("de")) {
      return NextResponse.redirect(new URL("/de", request.url));
    }
  }

  // Во всех остальных случаях (английский браузер или Гугл-бот) просто отдаем английскую версию
  return NextResponse.next();
}

// Оптимизация: указываем Next.js, для каких путей запускать этот код
export const config = {
  matcher: [
    /*
     * Запускаем на всех путях, КРОМЕ:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};