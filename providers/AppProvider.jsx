"use client";

import { createContext, useState, useContext, useEffect } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [lang, setLang] = useState("EN");

    useEffect(() => {
        const storedLang = document.cookie
            .split("; ")
            .find((row) => row.startsWith("language="))
            ?.split("=")[1] || "EN";

        // Ստանում ենք լեզուն `localStorage`-ից, եթե կա
        const localLang = localStorage.getItem("language");

        if (localLang) {
            setLang(localLang);
        } else {
            setLang(storedLang);
        }
    }, []);

    useEffect(() => {
        // Պահպանում ենք լեզուն `localStorage`-ում
        localStorage.setItem("language", lang);

        // Պահպանում ենք լեզուն `cookies`-ում (1 տարի)
        document.cookie = `language=${lang}; path=/; max-age=31536000`;
    }, [lang]);

    return (
        <AppContext.Provider value={{ lang, setLang }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
