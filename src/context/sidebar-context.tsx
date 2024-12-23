'use client'

import { createContext, useState } from 'react'

interface SidebarContextType {
    isOpen: boolean
    toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextType>({
    isOpen: false,
    toggleSidebar: () => { },
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true)

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    )
} 