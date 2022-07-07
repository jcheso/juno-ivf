/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef } from 'react'

import { Menu, Transition } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CalendarView() {
  const days = [...Array(15).keys()]
  const lengths = [...Array(21).keys()].reverse()
  return (
    <div className="flex h-full flex-col">
      <header className="relative flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
        <h1 className="text-lg font-semibold text-gray-900">
          Follicle Measurements
        </h1>
        <div className="flex items-center">
          <div className="hidden md:ml-4 md:flex md:items-center">
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              className="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add scan results
            </button>
          </div>
        </div>
      </header>
      <div className="flex flex-auto flex-col overflow-auto bg-white">
        <div className="flex max-w-full flex-none flex-col md:max-w-full">
          <div className="flex-none bg-white shadow ring-1 ring-black ring-opacity-5">
            <div className="-mr-px w-full hidden sm:flex flex-row justify-evenly divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500">
              <div className="col-end-1 w-10" />
              {days.map((day) => (
                <div
                  className="flex items-center justify-center py-3 px-3 w-14"
                  key={day}
                >
                  <span>
                    Day{' '}
                    <span className="items-center justify-center font-semibold text-gray-900">
                      {day}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-none bg-white shadow ring-1 ring-black ring-opacity-5">
            <div className="-mr-px w-full hidden sm:flex flex-row justify-evenly divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500">
              <div className="col-end-1 w-14" />

              {days.map((length) => (
                <div
                  className="flex flex-col items-center justify-center divide-y divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 w-16"
                  key={length}
                >
                  {lengths.map((day) => (
                    <div
                      className="flex items-center justify-center py-3 px-3 w-14"
                      key={day}
                    >
                      <span>
                        {length}
                        <span className="items-center justify-center font-semibold text-gray-900">
                          {day}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
