import { NextResponse } from "next/server";

let locales = ["en", "hy", "ru", "ge"];
const protectedRoutes = ["/profile"];
const authPages = ["/auth/signIn", "/auth/signUp"];

function getLocale(request) {
    const lang = request.cookies.get("lang") || { value: "hy" };
    return lang.value.toLowerCase();
}

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const authToken = request.cookies.get("authToken");

    console.log("Pathname:", pathname);

    if (pathname.startsWith("/_next") || pathname.startsWith("/static") || pathname.startsWith("/public") || pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|otf|eot)$/)) {
        return NextResponse.next();
    }

    if (pathname === "/") {
        const locale = getLocale(request);
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    if (authToken && authPages.some((page) => pathname === page || pathname.startsWith(page + "/"))) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"));
    if (isProtectedRoute && !authToken) {
        return NextResponse.redirect(new URL("/auth/signIn", request.url));
    }

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    console.log("Has Locale in Path:", pathnameHasLocale);

    if (pathnameHasLocale) {
        const response = NextResponse.next();
        response.headers.set("Cache-Control", "no-store");
        return response;
    }

    const lang = getLocale(request);
    return NextResponse.redirect(new URL(`/${lang}${pathname}`, request.url));
}
