import { Text } from "@mantine/core";
import { IconArticle, IconCategory, IconDashboard } from "@tabler/icons-react";

import { InternalProvider } from "../Providers/InternalProvider";
import { InternalSidebarWrapper } from "./InternalSidebarWrapper";
import { InternalSidebarNavLink } from "./InternalSidebarNavLink";

function InternalSidebar() {
    return (
        <InternalProvider>
            <InternalSidebarWrapper>
                <div className="p-md">
                    <div className="mb-lg">
                        <Text size="xl" className="font-medium">Blog</Text>
                    </div>

                    <nav className="flex flex-col gap-y-sm">
                        <InternalSidebarNavLink
                            href="/admin"
                            icon={<IconDashboard stroke={1.5} size={20} />}
                            exact
                        >
                            Dashboard
                        </InternalSidebarNavLink>

                        <InternalSidebarNavLink
                            href="/admin/categories"
                            icon={<IconCategory stroke={1.5} size={20} />}
                        >
                            Categories
                        </InternalSidebarNavLink>

                        <InternalSidebarNavLink
                            href="/admin/posts"
                            icon={<IconArticle stroke={1.5} size={20} />}
                        >
                            Posts
                        </InternalSidebarNavLink>
                    </nav>
                </div>
            </InternalSidebarWrapper>
        </InternalProvider>
    )
}

export { InternalSidebar }
