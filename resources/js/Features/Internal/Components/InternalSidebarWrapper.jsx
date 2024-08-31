import { cn } from "@/lib/utils"

const desktopClass = () => cn(
    "bg-body border-r",
    "fixed left-0 inset-y-0 w-[290px] transition-transform",
)

/**
 *
 * @function InternalSidebarWrapper
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns {React.JSX.Element}
 */
function InternalSidebarWrapper({ children }) {
    return (
        <aside className={desktopClass()}>
            {children}
        </aside>
    )
}

export { InternalSidebarWrapper }
