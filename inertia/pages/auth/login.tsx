import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useForm, usePage } from '@inertiajs/react'
import AuthenticationLayout from '@/layouts/AuthenticationLayout'
import { route } from '@izzyjs/route/client'

function Login() {
  const { flash } = usePage().props
  // @ts-ignore
  const message = flash?.errorsBag
  const { post, data, setData, errors } = useForm({
    email: '',
    password: '',
    remember_me: '',
  })

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    return post(route('login.store').toString())
  }
  return (
    <AuthenticationLayout>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to your account</h2>

      {message?.E_INVALID_CREDENTIALS && (
        <span className="block text-sm text-red-500">{message?.E_INVALID_CREDENTIALS}</span>
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

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <Input
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            placeholder="Enter your password"
          />
          {errors.password && <span className="block text-sm text-red-500">{errors.password}</span>}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Input
              onChange={(e) => setData('remember_me', e.target.checked as unknown as string)}
              value={data.remember_me}
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <Label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </Label>
          </div>

          <a
            href={route('forgot_password.create').toString()}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          className='w-full'
        >
          Sign In
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

export default Login
