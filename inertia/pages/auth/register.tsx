import { Link, useForm } from '@inertiajs/react'
import AuthenticationLayout from '@/layouts/AuthenticationLayout'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

function Register() {
  const { data, errors, setData, post, reset } = useForm({
    fullName: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    return post('/register', {
      onSuccess: () => {
        reset()
      },
    })
  }
  return (
    <AuthenticationLayout>
      <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>
      <form onSubmit={submit}>
        <div className="mb-4">
          <Label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </Label>
          <Input
            onChange={(e) => setData('fullName', e.target.value)}
            value={data.fullName}
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full"
          />
          {errors.fullName && <span className="block text-sm text-red-500">{errors.fullName}</span>}
        </div>
        <div className="mb-4">
          <Label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </Label>
          <Input
            onChange={(e) => setData('email', e.target.value)}
            value={data.email}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full"
          />
          {errors.email && <span className="block text-sm text-red-500">{errors.email}</span>}
        </div>
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
          Sign Up
        </Button>
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </AuthenticationLayout>
  )
}

export default Register
