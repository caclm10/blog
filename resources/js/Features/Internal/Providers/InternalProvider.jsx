import { useDisclosure } from "@mantine/hooks"

import { InternalContext } from "./internalContext"

/**
 *
 * @function InternalProvider
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @return {React.JSX.Element}
 */
function InternalProvider({ children }) {
    const [isSidebarOpen, sidebarAction] = useDisclosure(true)

    return (
        <InternalContext.Provider
            value={{
                isSidebarOpen,
                toggleSidebar: sidebarAction.toggle
            }}
        >
            {children}
        </InternalContext.Provider>
    )
}

export { InternalProvider }
