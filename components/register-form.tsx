"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { User, Mail, Lock, Loader2, UserPlus } from "lucide-react"
import { toast } from "sonner"

import { registerSchema, type RegisterInput } from "@/schemas/auth"
import { signUp } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

export function RegisterForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (values: RegisterInput) => {
        if (isLoading) return
        setIsLoading(true)

        try {
            await signUp.email(
                {
                    email: values.email,
                    password: values.password,
                    name: values.name,
                    callbackURL: "/",
                },
                {
                    onRequest: () => {
                        setIsLoading(true)
                    },
                    onSuccess: () => {
                        toast.success(
                            "Account created successfully! Logging you in..."
                        )
                        router.push("/")
                        router.refresh()
                    },
                    onError: (ctx) => {
                        toast.error(
                            ctx.error.message ||
                                "Could not complete registration."
                        )
                        setIsLoading(false)
                    },
                }
            )
        } catch (err: any) {
            toast.error("An unexpected error occurred. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <div className="relative w-full max-w-md p-4">
            {/* Visual Decorative Background Glows */}
            <div className="absolute -top-12 -left-12 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -right-12 -bottom-12 -z-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

            <Card className="relative overflow-hidden border border-foreground/10 bg-background/80 shadow-2xl backdrop-blur-md transition-all duration-300 hover:shadow-primary/5">
                {/* Visual Glass Edge Light Effect */}
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

                <CardHeader className="space-y-2 pt-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 hover:scale-110">
                        <UserPlus className="h-6 w-6" />
                    </div>
                    <CardTitle className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground">
                        Create an Account
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Fill in your details below to set up your personal blog
                        account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                                    <User className="h-4 w-4" />
                                </span>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    className="pl-10"
                                    disabled={isLoading}
                                    {...register("name")}
                                />
                            </div>
                            <FieldError errors={[errors.name]} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="email">
                                Email address
                            </FieldLabel>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                </span>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10"
                                    disabled={isLoading}
                                    {...register("email")}
                                />
                            </div>
                            <FieldError errors={[errors.email]} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                                    <Lock className="h-4 w-4" />
                                </span>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                    disabled={isLoading}
                                    {...register("password")}
                                />
                            </div>
                            <FieldError errors={[errors.password]} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="confirmPassword">
                                Confirm Password
                            </FieldLabel>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                                    <Lock className="h-4 w-4" />
                                </span>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                    disabled={isLoading}
                                    {...register("confirmPassword")}
                                />
                            </div>
                            <FieldError errors={[errors.confirmPassword]} />
                        </Field>

                        <Button
                            type="submit"
                            className="mt-3 h-10 w-full font-medium"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col items-center justify-center pt-4 pb-8">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
