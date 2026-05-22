import { z } from "zod"

// Login Validation Schema
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required." })
        .email({ message: "Invalid email address." }),
    password: z
        .string()
        .min(1, { message: "Password is required." })
        .min(8, { message: "Password must be at least 8 characters." }),
})

// Register Validation Schema
export const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: "Name is required." })
            .min(2, { message: "Name must be at least 2 characters." })
            .max(50, { message: "Name must not exceed 50 characters." }),
        email: z
            .string()
            .min(1, { message: "Email is required." })
            .email({ message: "Invalid email address." }),
        password: z
            .string()
            .min(1, { message: "Password is required." })
            .min(8, { message: "Password must be at least 8 characters." })
            .max(50, { message: "Password must not exceed 50 characters." }),
        confirmPassword: z
            .string()
            .min(1, { message: "Please confirm your password." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"], // Attach error message to confirmPassword field
    })

// Infer types from schemas for type-safety across client & server
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
