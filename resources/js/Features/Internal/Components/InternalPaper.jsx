import { Paper } from "@mantine/core";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

/**
 * @typedef {import("@mantine/core").PaperProps} InternalPaperProps
 *
 *
 * @type {ReturnType<typeof forwardRef<HTMLDivElement, InternalPaperProps>>}
 */
const InternalPaper = forwardRef(
    function InternalPaper({ className, ...props }, ref) {
        return (
            <Paper ref={ref} className={twMerge("p-md", className)} {...props} />
        )
    }
)

export { InternalPaper }
