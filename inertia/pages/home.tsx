import { Head, Link, usePage } from '@inertiajs/react'
import ApplicationLogo from '@/components/ApplicationLogo'
import { route } from '@izzyjs/route/client'

export default function Home() {
  const { auth } = usePage().props

  return (
    <>
      <div className="grow py-4 gap-5 bg-gradient-to-b from-sand-1 to-sand-2 flex justify-center items-center">
        <a href="https://adonisjs.com" target="_blank" className="isolate">
          <ApplicationLogo className="w-16 h-16" />
        </a>
      </div>
      <div className="flex justify-center items-center mt-4 gap-2">
        {
          // @ts-ignore
          !auth?.user && (
            <>
              <Link href={route('login.create').toString()}>Login</Link>
              <Link href={route('register.create').toString()}>Register</Link>
            </>
          )
        }
        {
          // @ts-ignore
          auth?.user && (
            <>
              <span>
                welcome,{' '}
                {
                  // @ts-ignore
                  auth?.user?.fullName
                }
              </span>

              <Link
                method={'post'}
                href={route('logout').toString()}
                className="hover:underline text-red-500 cursor-pointer"
              >
                Logout
              </Link>
            </>
          )
        }
      </div>
      <Head title="Homepage" />
    </>
  )
}
