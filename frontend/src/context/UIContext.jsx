import { createContext, useContext, useEffect, useState } from "react";

const UIContext = createContext()

export const UIProvider = ({ children }) => {
    const [option, setOption] = useState(localStorage.getItem("option") || "dashboard")

    useEffect(() => {
        localStorage.setItem("option", option)
    }, [option])

    return (
        <UIContext.Provider value={{ option, setOption }}>
            {children}
        </UIContext.Provider>
    )
}

export const useUIContext = () => useContext(UIContext)