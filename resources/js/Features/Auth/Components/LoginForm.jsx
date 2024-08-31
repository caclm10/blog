import { useForm } from "@inertiajs/react"
import { Button, PasswordInput, TextInput } from "@mantine/core"

/**
 * @typedef {object} Inputs
 * @property {string} email
 * @property {string} password
 */


function LoginForm() {
    /** @type {ReturnType<typeof useForm<Inputs>>} */
    const form = useForm({
        email: "",
        password: ""
    })

    /** @param {React.ChangeEvent<HTMLInputElement>} event */
    function handleChange(event) {
        form.setData(event.target.name, event.target.value)
    }

    /** @param {React.FormEvent<HTMLFormElement>} event */
    function handleSubmit(event) {
        event.preventDefault()

        form.post("/login", {
            onError: () => {
                form.reset("password")
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-sm">
                <TextInput
                    id="email"
                    name="email"
                    label="Email address"
                    placeholder="Email address"
                    value={form.data.email}
                    error={form.errors.email}
                    onChange={handleChange}
                />

                <PasswordInput
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    value={form.data.password}
                    error={form.errors.password}
                    onChange={handleChange}
                />
            </div>

            <div className="mt-xl flex justify-end">
                <Button type="submit" loading={form.processing}>Submit</Button>
            </div>
        </form>
    )
}

export { LoginForm }
