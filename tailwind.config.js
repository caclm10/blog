import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import("tailwindcss").Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.{js,jsx}",
    ],

    theme: {
        colors: {
            transparent: "transparent",
            body: "hsl(from var(--mantine-color-body) h s l / <alpha-value>)",
            text: "hsl(from var(--mantine-color-text) h s l / <alpha-value>)",
            border: "hsl(from var(--mantine-color-default-border) h s l / <alpha-value>)",
            hover: "hsl(from var(--mantine-color-default-hover) h s l / <alpha-value>)",

            primary: {
                filled: "hsl(from var(--mantine-primary-color-filled) h s l / <alpha-value>)",
                "light-hover": "hsl(from var(--mantine-primary-color-light-hover) h s l)"
            }
        },

        spacing: {
            0: "0",
            xs: "var(--mantine-spacing-xs)",
            sm: "var(--mantine-spacing-sm)",
            md: "var(--mantine-spacing-md)",
            lg: "var(--mantine-spacing-lg)",
            xl: "var(--mantine-spacing-xl)",
        },

        fontSize: {
            xs: ["var(--mantine-font-size-xs)", "var(--mantine-line-height-xs)"],
            sm: ["var(--mantine-font-size-sm)", "var(--mantine-line-height-sm)"],
            md: ["var(--mantine-font-size-md)", "var(--mantine-line-height-md)"],
            lg: ["var(--mantine-font-size-lg)", "var(--mantine-line-height-lg)"],
            xl: ["var(--mantine-font-size-xl)", "var(--mantine-line-height-xl)"],
        },

        borderRadius: {
            xs: "var(--mantine-radius-xs)",
            sm: "var(--mantine-radius-sm)",
            md: "var(--mantine-radius-md)",
            lg: "var(--mantine-radius-lg)",
            xl: "var(--mantine-radius-xl)",
        },

        extend: {
            fontFamily: {
                manrope: ["Manrope", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [],
};
