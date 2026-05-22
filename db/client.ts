import { loadEnvConfig } from "@next/env"
import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"

loadEnvConfig(process.cwd())

const client = new Database(process.env.DATABASE_URL || "sqlite.db")

const db = drizzle({ client })

export { db }
