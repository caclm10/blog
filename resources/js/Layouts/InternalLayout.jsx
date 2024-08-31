import { RootLayout } from "./RootLayout";
import { InternalSidebar } from "@/Features/Internal/Components/InternalSidebar";

/**
 *
 * @function InternalLayout
 * @param {import("./RootLayout").RootLayoutProps} props
 * @returns {React.JSX.Element}
 */
function InternalLayout({ title, children }) {
    return (
        <RootLayout title={title}>
            <InternalSidebar />

            <div className="min-h-dvh">
                {children}
            </div>

        </RootLayout>
    )
}

export { InternalLayout }
