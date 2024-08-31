import { Container } from "@mantine/core";

import { RootLayout } from "./RootLayout";

/**
 *
 * @function AuthLayout
 * @param {import("./RootLayout").RootLayoutProps} props
 * @return {React.JSX.Element}
 */
function AuthLayout({ title, children }) {
    return (
        <RootLayout title={title}>
            <div className="min-h-dvh flex items-center">
                <div className="grow">
                    <Container className="max-w-[450px]">
                        {children}
                    </Container>
                </div>
            </div>
        </RootLayout>
    )
}

export { AuthLayout }
