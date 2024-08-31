import { createContext, useContext } from "react"

/**
 * @typedef {object} InternalContextValue
 * @property {boolean} isSidebarOpen
 * @property {() => void} toggleSidebar
 */

/** @type {ReturnType<typeof createContext<InternalContextValue>>} */
export const InternalContext = createContext({
    isSidebarOpen: false,
    toggleSidebar: () => { }
})

export function useInternalContext() {
    return useContext(InternalContext)
}
