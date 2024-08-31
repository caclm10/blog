import { Link, usePage } from "@inertiajs/react";
import clsx from "clsx";

/**
 * @function InternalSidebarNavLink
 * @param {object} props
 * @param {string} props.href
 * @param {boolean} [props.exact]
 * @param {React.ReactNode} props.icon
 * @param {React.ReactNode} props.children
 * @returns {React.JSX.Element}
 */
function InternalSidebarNavLink({ href, exact = false, icon, children }) {
    const { url } = usePage()

    const isActive = exact ? url === href : url.startsWith(href)

    return (
        <Link
            href={href}
            className={clsx(
                "inline-flex items-center gap-x-xs px-sm py-xs rounded-md",
                isActive ? "text-primary-filled bg-primary-light-hover" : "hover:bg-hover"
            )}
        >
            {icon}
            <span>{children}</span>
        </Link>
    )
}

export { InternalSidebarNavLink }
