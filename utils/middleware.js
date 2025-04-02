import { NextResponse } from "next/server";

let locales = ["en", "hy", "ru", "ge"];
const protectedRoutes = ["/profile"]; // Protected routes that require authentication

// Get the preferred locale from the "accept-language" header
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
    if (pathname === "/") {
        const locale = getLocale(request);
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    const isProtectedRoute = protectedRoutes.some((route) => pathname.endsWith(route));

    const authToken = request.cookies.get("authToken");
    console.log(authToken)
    if (isProtectedRoute && !authToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
}

// Middleware matcher configuration (exclude Next.js internal paths like _next)
export const config = {
    matcher: ["/((?!_next).*)"], // Match all paths except Next.js internal paths
};
