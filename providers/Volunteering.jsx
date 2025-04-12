"use client"

import {createContext} from "react";

export const VolunteeringContext = createContext({});

export const VolunteeringProvider = ({ children, value }) => {
    return (
        <VolunteeringContext.Provider value={value}>
            {children}
        </VolunteeringContext.Provider>
    )
}