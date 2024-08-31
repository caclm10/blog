import { Head } from "@inertiajs/react";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
    defaultRadius: "md",
    fontFamily: `"Manrope", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
})

/**
 *
 * @function RootLayout
 * @param {object} props
 * @param {string} [props.title]
 * @param {React.ReactNode} props.children
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
