import { NextResponse } from "next/server";

let locales = ["en", "hy", "ru", "ge"];
const protectedRoutes = ["/profile"]; // Protected routes that require authentication
const authPages = ["/auth/signIn", "/auth/signUp"]; // Auth pages to restrict when logged in

function getLocale(request) {
    const acceptLanguage = request.headers.get("accept-language");

    if (acceptLanguage) {
        const preferredLocales = acceptLanguage
            .split(",")
            .map((lang) => lang.split(";")[0].trim());

        for (const locale of preferredLocales) {
            if (locales.includes(locale)) {
                return locale;
            }
        }
    }

    return "en"; // Default to 'en' if no match
}

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const authToken = request.cookies.get("authToken");

    // Allow access to public assets (images, fonts, etc.)
    if (pathname.startsWith("/_next") || pathname.startsWith("/static") || pathname.startsWith("/public") || pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|otf|eot)$/)) {
        return NextResponse.next();
    }

    if (pathname === "/") {
        const locale = getLocale(request);
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
    if (authToken && authPages.some((page) => pathname.endsWith(page))) {
        console.log('ok')
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    // Protect certain routes
    const isProtectedRoute = protectedRoutes.some((route) => pathname.endsWith(route));
    if (isProtectedRoute && !authToken) {
        return NextResponse.redirect(new URL("/auth/signIn", request.url));
    }

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
}
