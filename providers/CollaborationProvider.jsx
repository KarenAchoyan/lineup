"use client"

import {createContext} from "react";

export const CollaborationContext = createContext({});

export const CollaborationProvider = ({ children, value }) => {
    return (
        <CollaborationContext.Provider value={value}>
            {children}
        </CollaborationContext.Provider>
    )
}