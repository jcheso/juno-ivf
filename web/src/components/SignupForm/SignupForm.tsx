import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'
import { useEffect, useRef } from 'react'
import CircleLoader from 'react-spinners/CircleLoader'
const SignupForm = ({ clinics }) => {
  const { signUp, loading } = useAuth()

  // focus on email box on page load
  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await signUp({ ...data })
    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome to Juno!')
    }
  }

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register for an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Or{' '}
          <Link
            to={routes.login()}
            className="font-medium text-indigo-500 hover:text-indigo-500"
          >
            login to your account
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
                name="firstName"
                className="block text-sm font-medium text-gray-700"
                errorClassName="block text-sm font-medium text-red-500"
              >
                First Name
              </Label>
              <TextField
                name="firstName"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                errorClassName="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                validation={{
                  required: {
                    value: true,
                    message: 'First Name is required',
                  },
                }}
              />
              <FieldError
                name="firstName"
                className="block text-sm font-medium text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <Label
                name="lastName"
                className="block text-sm font-medium text-gray-700"
                errorClassName="block text-sm font-medium text-red-500"
              >
                Last Name
              </Label>
              <TextField
                name="lastName"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                errorClassName="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                validation={{
                  required: {
                    value: true,
                    message: 'First Name is required',
                  },
                }}
              />
              <FieldError
                name="lastName"
                className="block text-sm font-medium text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <Label
                name="clinicId"
                className="block text-sm font-medium text-gray-700"
                errorClassName="block text-sm font-medium text-red-500"
              >
                Clinic
              </Label>
              <SelectField
                name="clinicId"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                errorClassName="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                {clinics.map((clinic) => (
                  <option key={clinic.id} value={clinic.id}>
                    {clinic.name}
                  </option>
                ))}
              </SelectField>
              <FieldError
                name="clinicId"
                className="block text-sm font-medium text-red-500"
              />
            </div>
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

            <div>
              {!loading ? (
                <Submit
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </Submit>
              ) : (
                <div className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <CircleLoader loading={loading} color="#ffffff" size={20} />
                </div>
              )}
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default SignupForm
