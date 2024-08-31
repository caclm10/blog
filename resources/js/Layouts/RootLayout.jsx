import { Head } from "@inertiajs/react";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
    defaultRadius: "md",
    fontFamily: `"Manrope", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
})

/**
 * @typedef {object} RootLayoutProps
 * @property {string} [title]
 * @property {React.ReactNode} [children]
 *
 *
 * @function RootLayout
 * @param {RootLayoutProps} props
 * @returns {React.ReactNode}
 */
function RootLayout({ title, children }) {
    return (
        <>
            {title && <Head title={title} />}

            <MantineProvider theme={theme}>
                {children}
            </MantineProvider>
        </>
    )
}

export { RootLayout }
