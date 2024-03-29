import { useRef, useState } from 'react'
import { useEffect } from 'react'

import CircleLoader from 'react-spinners/CircleLoader'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const LoginPage = () => {
  const { isAuthenticated, logIn, loading } = useAuth()
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.dashboard())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const username = data.username.toLowerCase().trim()
    const updatedData = { ...data, username }
    const response = await logIn({ ...updatedData })
    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 5000 }} />
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              Or{' '}
              <Link
                to={routes.signup()}
                className="font-medium text-indigo-500 hover:text-indigo-500"
              >
                register for an account
              </Link>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <Form
                onSubmit={onSubmit}
                config={{ mode: 'onChange' }}
                className="space-y-6"
              >
                <div className="flex flex-col">
                  <Label
                    name="username"
                    className="block text-sm font-medium text-gray-700"
                    errorClassName="block text-sm font-medium text-red-500"
                  >
                    Email
                  </Label>
                  <TextField
                    name="username"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    errorClassName="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Email is required',
                      },
                      pattern: {
                        value: /^[^@]+@[^.]+\..+$/,
                        message: 'Please enter a valid email address',
                      },
                    }}
                  />
                  <FieldError
                    name="username"
                    className="block text-sm font-medium text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <Label
                    name="password"
                    className="block text-sm font-medium text-gray-700"
                    errorClassName="block text-sm font-medium text-red-500"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    errorClassName="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />
                  <FieldError
                    name="password"
                    className="block text-sm font-medium text-red-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      to={routes.forgotPassword()}
                      className="font-medium text-indigo-500 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  {!loading ? (
                    <Submit
                      disabled={loading}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </Submit>
                  ) : (
                    <div className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <CircleLoader
                        loading={loading}
                        color="#ffffff"
                        size={20}
                      />
                    </div>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
