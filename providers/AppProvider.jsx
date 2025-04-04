"use client";

import { createContext, useState, useContext, useEffect } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [lang, setLang] = useState("hy");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const getLangFromCookie = () => {
            const match = document.cookie.match(/(?:^|; )lang=([^;]*)/);
            return match ? decodeURIComponent(match[1]) : null;
        };

        const savedLang = getLangFromCookie() || localStorage.getItem("language") || "hy";
        setLang(savedLang);
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("language", lang);
            document.cookie = `lang=${lang}; path=/`;
        }
    }, [lang, mounted]);

    if (!mounted) return null;

    return (
        <AppContext.Provider value={{ lang, setLang }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
