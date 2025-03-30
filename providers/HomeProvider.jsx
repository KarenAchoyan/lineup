"use client"

import {createContext} from "react";

export const MainContext = createContext({});

export const MainProvider = ({ children, value }) => {
    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    )
}