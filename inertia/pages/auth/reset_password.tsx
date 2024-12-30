import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useForm, usePage } from '@inertiajs/react'
import AuthenticationLayout from '@/layouts/AuthenticationLayout'
import { route } from '@izzyjs/route/client'

function PasswordReset() {
  const { flash, token } = usePage().props
  // @ts-ignore
  const message = flash?.error || flash?.success
  const { post, data, setData, errors, reset } = useForm({
    password: '',
    password_confirmation: '',
  })

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    return post(route('reset_password.store', { params: { token: token as string } }).toString(), {
      onSuccess: () => {
        reset()
      },
    })
  }
  return (
    <AuthenticationLayout>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Enter your new password</h2>

      {message && (
        <span className="block text-sm text-green-500 my-3 rounded-lg w-full bg-green-50 p-2">
          {message}
        </span>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </Label>
          <Input
            onChange={(e) => setData('password', e.target.value)}
            value={data.password}
            type="password"
            id="password"
            placeholder="Create a password"
            className="w-full"
          />
          {errors.password && <span className="block text-sm text-red-500">{errors.password}</span>}
        </div>
        <div className="mb-4">
          <Label htmlFor="password" className="block text-sm font-medium mb-2">
            Confirm Password
          </Label>
          <Input
            onChange={(e) => setData('password_confirmation', e.target.value)}
            value={data.password_confirmation}
            type="password"
            id="password"
            placeholder="Confirm password"
            className="w-full"
          />
          {errors.password && (
            <span className="block text-sm text-red-500">{errors.password_confirmation}</span>
          )}
        </div>

        <Button type="submit" className="w-full">
          Reset Password
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
