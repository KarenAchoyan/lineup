"use client";

import { createContext, useState, useContext, useEffect } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("language") || "hy";
        }
        return "hy"; // Default to "hy" if running on the server
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("language", lang);
            document.cookie = `lang=${lang}; path=/`; // Ensure the cookie is accessible site-wide
        }
    }, [lang]);

    return (
        <AppContext.Provider value={{ lang, setLang }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
