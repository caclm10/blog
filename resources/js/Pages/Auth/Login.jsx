import { Paper, Text, Title } from "@mantine/core";

import { AuthLayout } from "@/Layouts/AuthLayout";
import { LoginForm } from "@/Features/Auth/Components/LoginForm";

function LoginPage() {
    return (
        <AuthLayout title="Login">
            <Paper shadow="md" className="p-md space-y-lg">
                <header className="space-y-[4px]">
                    <Title order={1} component="h1" className="font-semibold tracking-wider">Login</Title>
                    <Text size="sm">Sign in to your account.</Text>
                </header>

                <LoginForm />
            </Paper>
        </AuthLayout>
    )
}

export default LoginPage
