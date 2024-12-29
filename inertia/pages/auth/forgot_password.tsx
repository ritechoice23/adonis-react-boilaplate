import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useForm, usePage } from '@inertiajs/react'
import AuthenticationLayout from '@/layouts/AuthenticationLayout'
import { route } from '@izzyjs/route/client'

function PasswordReset() {
    const { flash } = usePage().props
    // @ts-ignore
    const message = flash?.success
    const { post, data, setData, errors, reset } = useForm({
        email: '',
    })

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        return post(route('forgot_password.store').toString(), {
            onSuccess: () => {
                reset()
            }
        })
    }
    return (
        <AuthenticationLayout>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Reset your password
            </h2>

            {message && (
                <span className="block text-sm text-green-500 my-3 rounded-lg w-full bg-green-50 p-2">{message}</span>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </Label>
                    <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="you@example.com"
                        autoComplete='email'
                    />
                    {errors.email && <span className="block text-sm text-red-500">{errors.email}</span>}
                </div>

                <Button
                    type="submit"
                    className='w-full'
                >
                    Send Request
                </Button>
            </form>

            <p className="mt-6 text-sm text-center text-gray-600">
                Don’t have an account?{' '}
                <Link
                    href={route('register.create').toString()}
                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                    Sign up
                </Link>
            </p>
        </AuthenticationLayout>
    )
}

export default PasswordReset
