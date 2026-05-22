import type { PropsWithChildren } from "react"

function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center">
            {children}
        </div>
    )
}

export default AuthLayout
