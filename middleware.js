import {NextResponse} from "next/server";

let locales = ["en", "hy", "ru", "ge"];
const protectedRoutes = ["/profile"]; // Protected routes that require authentication
const authPages = ["/auth/signIn", "/auth/signUp"]; // Auth pages to restrict when logged in

function getLocale(request) {
    const language = request.cookies.get('language') || {value:'en'};
    return language.value;
}
export function middleware(request) {
    const { pathname } = request.nextUrl;
    const locale = getLocale(request);  // Get locale from cookies

    if (pathname.startsWith("/_next") || pathname.startsWith("/static") || pathname.startsWith("/public") || pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|otf|eot)$/)) {
        return NextResponse.next();
    }

    if (pathname === "/") {
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    const authToken = request.cookies.get("authToken");
    if (authToken && authPages.some((page) => pathname.endsWith(page))) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    const isProtectedRoute = protectedRoutes.some((route) => pathname.endsWith(route));
    if (isProtectedRoute && !authToken) {
        return NextResponse.redirect(new URL("/auth/signIn", request.url));
    }

    // Check if the pathname already contains a locale (e.g. /en/ or /ge/)
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();  // No redirection needed, continue to requested page
    }

    if (pathname.match(/^\/([a-z]{2})\/+.*$/i)) {
        const correctedPath = pathname.replace(/^\/([a-z]{2})\/+/, '/$1/');  // Clean up repeated locales
        return NextResponse.redirect(new URL(correctedPath, request.url));  // Redirect to the cleaned path
    }
    return NextResponse.redirect(new URL(`/${locale.toLowerCase()}`, request.url));
}