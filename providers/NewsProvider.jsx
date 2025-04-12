"use client"

import {createContext} from "react";

export const NewsContext = createContext({});

export const NewsProvider = ({ children, value }) => {
    return (
        <NewsContext.Provider value={value}>
            {children}
        </NewsContext.Provider>
    )
}