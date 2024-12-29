import { Link, useForm } from '@inertiajs/react'

function Register() {
  const { data, errors, setData, post, reset } = useForm({
    fullName: '',
    email: '',
    password: '',
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
    <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>
      <form onSubmit={submit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            onChange={(e) => setData('fullName', e.target.value)}
            value={data.fullName}
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fullName && <span className="block text-sm text-red-500">{errors.fullName}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            onChange={(e) => setData('email', e.target.value)}
            value={data.email}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <span className="block text-sm text-red-500">{errors.email}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            onChange={(e) => setData('password', e.target.value)}
            value={data.password}
            type="password"
            id="password"
            placeholder="Create a password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <span className="block text-sm text-red-500">{errors.password}</span>}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
