"use client"

import {createContext} from "react";

export const ArchiveContext = createContext({});

export const ArchiveProvider = ({ children, value }) => {
    return (
        <ArchiveContext.Provider value={value}>
            {children}
        </ArchiveContext.Provider>
    )
}