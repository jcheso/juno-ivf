import { Fragment, useContext, useState } from 'react'

import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
  BeakerIcon,
  ClipboardListIcon,
  PhotographIcon,
  ChevronDownIcon,
} from '@heroicons/react/outline'
import { UserIcon } from '@heroicons/react/solid'

import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, NavLink, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { PatientContext } from 'src/providers/context/PatientContext'
import { TreatmentContext } from 'src/providers/context/TreatmentContext'

import StatusBar from '../../components/StatusBar/StatusBar'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logOut, currentUser } = useAuth()
  console.log(currentUser)
  const [patient, setPatient] = React.useContext(PatientContext)
  const [activeTreatment, setActiveTreatment] = useContext(TreatmentContext)
  const patientHidden = patient == null ? true : false
  const treatmentHidden = activeTreatment == null ? true : false
  const navigation = [
    {
      name: 'Dashboard',
      to: routes.dashboard(),
      icon: HomeIcon,
      current: true,
    },
    {
      name: 'Patient Summary',
      to: routes.patientSummary(),
      icon: UsersIcon,
      current: false,
      hidden: patientHidden,
    },
    {
      name: 'Treatments',
      to: routes.treatments(),
      icon: ChartBarIcon,
      current: false,
      hidden: patientHidden,
    },
    {
      name: 'Cycle Summary',
      to: routes.cycleSummary(),
      icon: CalendarIcon,
      current: false,
      hidden: treatmentHidden,
    },
    {
      name: 'Medicine',
      to: '#',
      icon: FolderIcon,
      current: false,
      hidden: treatmentHidden,
    },
    {
      name: 'Test Results',
      to: '#',
      icon: BeakerIcon,
      current: false,
      hidden: treatmentHidden,
    },
    {
      name: 'Ultrasounds',
      to: '#',
      icon: PhotographIcon,
      current: false,
      hidden: treatmentHidden,
    },
    {
      name: 'Lab Status',
      to: '#',
      icon: ClipboardListIcon,
      current: false,
      hidden: treatmentHidden,
    },
  ]

  const userNavigation = [
    // { name: 'Your Profile', to: '#', onClick: null },
    // { name: 'Settings', to: '#', onClick: null },
    { name: 'Sign out', to: '#', onClick: logOut },
  ]

  return (
    <>
      <div>
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://img.icons8.com/external-wanicon-lineal-wanicon/FFFFFF/256/undefined/external-pregnancy-medical-wanicon-lineal-wanicon.png"
                    alt="Juno Logo"
                  />
                  <h1 className="pl-4 font-bold text-white text-3xl">Juno</h1>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={
                          `text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md` +
                          (item.hidden ? ' hidden' : '')
                        }
                        activeClassName="bg-indigo-800 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      >
                        <item.icon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                          aria-hidden="true"
                        />
                        {item.name}
                      </NavLink>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="https://img.icons8.com/external-wanicon-lineal-wanicon/FFFFFF/256/undefined/external-pregnancy-medical-wanicon-lineal-wanicon.png"
                alt="Juno Logo"
              />
              <h1 className="pl-4 font-bold text-white text-3xl">Juno</h1>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={
                      `animate-fade text-indigo-100 hover:bg-indigo-600 link group flex items-center px-2 py-2 text-sm font-medium rounded-md` +
                      (item.hidden ? ' hidden' : '')
                    }
                    activeClassName="activeLink group flex items-center px-2 py-2 text-sm font-medium rounded-md bg-indigo-800 text-white"
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between sm:px-6 lg:mx-auto lg:px-8">
              <div className="flex-1 flex">
                <StatusBar></StatusBar>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                      <UserIcon className="h-8 w-8 rounded-full" />
                      <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                        <span className="sr-only">Open user menu for </span>
                        {currentUser.email}
                      </span>
                      <ChevronDownIcon
                        className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.to}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block text-sm text-gray-700'
                              )}
                            >
                              <button
                                className="w-full px-4 py-2 h-full text-left"
                                onClick={() => item.onClick()}
                              >
                                {item.name}
                              </button>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main>
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default AppLayout
