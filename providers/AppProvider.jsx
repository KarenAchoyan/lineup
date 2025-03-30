"use client";

import { createContext, useState, useContext, useEffect } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [lang, setLang] = useState("EN");

    useEffect(() => {
        const storedLang = localStorage.getItem("language") || "EN";
        setLang(storedLang);
    }, []);

    useEffect(() => {
        if (lang !== "EN") {
            localStorage.setItem("language", lang);
        }
    }, [lang]);

    return (
        <AppContext.Provider value={{ lang, setLang }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
