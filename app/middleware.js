import { NextResponse } from "next/server";

let locales = ["en", "hy", "ru", "ge"];

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

    return "en";
}

export function middleware(request) {
    const { pathname } = request.nextUrl;

    if (pathname === "/") {
        const locale = getLocale(request);
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next).*)"],
};
