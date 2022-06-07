import { Form, Submit, Label, TextField } from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import familyIcon from './pablita-family-1.png'
import { toast, Toaster } from '@redwoodjs/web/toast'

const HomePage = () => {
  const ADD_TO_WAITLIST = gql`
    mutation AddToWaitList($input: CreateWaitListInput!) {
      addToWaitList(input: $input) {
        id
        email
        createdAt
      }
    }
  `

  const [add, { loading }] = useMutation(ADD_TO_WAITLIST, {
    onError: () => {
      toast.error("You've already signed up, be patient!")
    },
    onCompleted: () => {
      toast.success('Thanks for your interest!')
    },
  })

  const onSubmit = (data) => {
    add({ variables: { input: data } })
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">
                Coming soon
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                <span className="block text-gray-900">Next generation</span>
                <span className="block text-indigo-600">IVF Management</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              A modern cloud-based web application for tracking your patients
              IVF Cycle from Day 1. Coupled with AI technology to give
              clinicians the optimal treatment strategies.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <p className="text-base font-medium text-gray-900">
                Sign up to get notified when it’s ready.
              </p>
              <Form onSubmit={onSubmit} className="mt-3 sm:flex">
                <TextField
                  name="email"
                  id="email"
                  className="block w-full py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:flex-1 border-gray-300"
                  placeholder="Enter your email"
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
                <Submit
                  disabled={loading}
                  className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                >
                  Notify me
                </Submit>
              </Form>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full  lg:max-w-md">
              <img className="w-full" src={familyIcon} alt="Family Cartoon" />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default HomePage
