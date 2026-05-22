import { relations, sql } from "drizzle-orm"
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core"

// ==========================================
// I. BETTER AUTH TABLES
// ==========================================

export const User = sqliteTable("users", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: integer("email_verified", { mode: "boolean" })
        .default(false)
        .notNull(),
    image: text("image"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
        .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
        .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})

export const Session = sqliteTable(
    "sessions",
    {
        id: text("id").primaryKey(),
        expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
        token: text("token").notNull().unique(),
        createdAt: integer("created_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .notNull(),
        updatedAt: integer("updated_at", { mode: "timestamp_ms" })
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
        ipAddress: text("ip_address"),
        userAgent: text("user_agent"),
        userId: text("user_id")
            .notNull()
            .references(() => User.id, { onDelete: "cascade" }),
    },
    (table) => [index("session_userId_idx").on(table.userId)]
)

export const Account = sqliteTable(
    "accounts",
    {
        id: text("id").primaryKey(),
        accountId: text("account_id").notNull(),
        providerId: text("provider_id").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => User.id, { onDelete: "cascade" }),
        accessToken: text("access_token"),
        refreshToken: text("refresh_token"),
        idToken: text("id_token"),
        accessTokenExpiresAt: integer("access_token_expires_at", {
            mode: "timestamp_ms",
        }),
        refreshTokenExpiresAt: integer("refresh_token_expires_at", {
            mode: "timestamp_ms",
        }),
        scope: text("scope"),
        password: text("password"),
        createdAt: integer("created_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .notNull(),
        updatedAt: integer("updated_at", { mode: "timestamp_ms" })
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("account_userId_idx").on(table.userId)]
)

export const Verification = sqliteTable(
    "verifications",
    {
        id: text("id").primaryKey(),
        identifier: text("identifier").notNull(),
        value: text("value").notNull(),
        expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
        createdAt: integer("created_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .notNull(),
        updatedAt: integer("updated_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("verification_identifier_idx").on(table.identifier)]
)

// ==========================================
// II. MEDIA UPLOADS TABLE
// ==========================================

export const Media = sqliteTable(
    "media",
    {
        id: text("id").primaryKey(),
        name: text("name").notNull(),
        url: text("url").notNull(),
        fileKey: text("file_key").notNull(),
        mimeType: text("mime_type").notNull(),
        size: integer("size").notNull(),
        uploadedBy: text("uploaded_by")
            .notNull()
            .references(() => User.id, { onDelete: "cascade" }),
        createdAt: integer("created_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .notNull(),
    },
    (table) => [index("media_uploadedBy_idx").on(table.uploadedBy)]
)

// ==========================================
// III. BLOG
// ==========================================

export const Posts = sqliteTable(
    "posts",
    {
        id: text("id").primaryKey(),
        title: text("title").notNull(),
        slug: text("slug").notNull().unique(),
        content: text("content").notNull(),
        summary: text("summary"),
        coverImage: text("cover_image"),
        published: integer("published").default(0).notNull(), // 0 = Draft, 1 = Published
        publishedAt: integer("published_at", { mode: "timestamp_ms" }),
        authorId: text("author_id")
            .notNull()
            .references(() => User.id, { onDelete: "cascade" }),
        createdAt: integer("created_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .notNull(),
        updatedAt: integer("updated_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [
        index("posts_authorId_idx").on(table.authorId),
        index("posts_slug_idx").on(table.slug),
    ]
)

export const Tags = sqliteTable(
    "tags",
    {
        id: text("id").primaryKey(),
        name: text("name").notNull().unique(),
        slug: text("slug").notNull().unique(),
    },
    (table) => [index("tags_slug_idx").on(table.slug)]
)

export const PostTags = sqliteTable(
    "post_tags",
    {
        postId: text("post_id")
            .notNull()
            .references(() => Posts.id, { onDelete: "cascade" }),
        tagId: text("tag_id")
            .notNull()
            .references(() => Tags.id, { onDelete: "cascade" }),
    },
    (table) => [
        index("post_tags_postId_idx").on(table.postId),
        index("post_tags_tagId_idx").on(table.tagId),
    ]
)

// ==========================================
// IV. DRIZZLE RELATIONS
// ==========================================

export const userRelations = relations(User, ({ many }) => ({
    sessions: many(Session),
    accounts: many(Account),
    posts: many(Posts),
    media: many(Media),
}))

export const sessionRelations = relations(Session, ({ one }) => ({
    user: one(User, {
        fields: [Session.userId],
        references: [User.id],
    }),
}))

export const accountRelations = relations(Account, ({ one }) => ({
    user: one(User, {
        fields: [Account.userId],
        references: [User.id],
    }),
}))

export const mediaRelations = relations(Media, ({ one }) => ({
    user: one(User, {
        fields: [Media.uploadedBy],
        references: [User.id],
    }),
}))

export const postsRelations = relations(Posts, ({ one, many }) => ({
    author: one(User, {
        fields: [Posts.authorId],
        references: [User.id],
    }),
    postTags: many(PostTags),
}))

export const tagsRelations = relations(Tags, ({ many }) => ({
    postTags: many(PostTags),
}))

export const postTagsRelations = relations(PostTags, ({ one }) => ({
    post: one(Posts, {
        fields: [PostTags.postId],
        references: [Posts.id],
    }),
    tag: one(Tags, {
        fields: [PostTags.tagId],
        references: [Tags.id],
    }),
}))
