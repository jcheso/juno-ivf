import { navigate, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { useEffect } from 'react'
import SignupCell from 'src/components/SignupCell'
import { Toaster } from '@redwoodjs/web/toast'

const SignupPage = () => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  return (
    <>
      <MetaTags title="Sign Up" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <SignupCell></SignupCell>
        </div>
      </main>
    </>
  )
}

export default SignupPage
