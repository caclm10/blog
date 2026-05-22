import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { headers } from "next/headers"

import { db } from "@/db"

const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
    }),
    emailAndPassword: {
        enabled: true,
    },
})

/**
 * Get the current session on the server.
 * Can be used in Server Components, Route Handlers, and Server Actions.
 */
export async function getSession() {
    return auth.api.getSession({
        headers: await headers(),
    })
}

/**
 * Get the current user on the server.
 */
export async function getCurrentUser() {
    const session = await getSession()
    return session?.user ?? null
}

/**
 * Require a user to be authenticated. Throws an error if not.
 * Great for securing Server Actions in one line:
 * const user = await requireUser()
 */
export async function requireUser() {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error(
            "Unauthorized: You must be logged in to perform this action."
        )
    }
    return user
}

export { auth }
