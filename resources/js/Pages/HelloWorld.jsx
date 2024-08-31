import { Button, Text, Title } from "@mantine/core";

import { RootLayout } from "@/Layouts/RootLayout";

function HelloWorldPage() {
    return (
        <RootLayout title="Hello World">
            <div className="p-lg space-y-md">
                <Title>Hello World</Title>

                <Button>Hello World</Button>

                <div className="p-xl border rounded-md">
                    <Text>Hello World</Text>
                </div>
            </div>
        </RootLayout>
    )
}

export default HelloWorldPage
