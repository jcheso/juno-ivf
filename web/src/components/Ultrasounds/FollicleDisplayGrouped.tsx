import React, { useContext, useEffect, useState } from 'react'

import { PlusSmIcon as PlusSmIconOutline } from '@heroicons/react/outline'
import { PlusSmIcon } from '@heroicons/react/solid'

import { TreatmentContext } from 'src/providers/context/TreatmentContext'

import FollicleCount from './FollicleCount'
import FollicleCountGrouped from './FollicleCountGrouped'
import FollicleSummary from './FollicleSummary'
import NewFollicleCount from './NewFollicleCount'

export default function FollicleDisplay({ follicleCounts }) {
  const [activeTreatment] = useContext(TreatmentContext)
  const [afcFollicleCount, setAfcFollicleCount] = useState(null)
  const tabs = [
    { name: 'Cycle 1', href: '#', current: true },
    { name: 'Cycle 2', href: '#', current: false },
    { name: 'Cycle 3', href: '#', current: false },
    { name: 'Cycle 4', href: '#', current: false },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [open, setOpen] = useState(false)
  let nextDate: any = new Date(follicleCounts[follicleCounts.length - 1]?.date)
  if (follicleCounts.length > 0) {
    nextDate = new Date(nextDate.setDate(nextDate.getDate() + 1))
  } else {
    nextDate = new Date()
  }
  const lastDate: any = new Date(
    follicleCounts[follicleCounts.length - 1]?.date
  )
  const diffTime: number = Math.abs(nextDate - lastDate)
  const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const nextDay: number =
    diffDays + follicleCounts[follicleCounts.length - 1]?.day || 0

  useEffect(() => {
    if (activeTreatment && follicleCounts.length > 0) {
      setAfcFollicleCount(
        follicleCounts.find((fc) => fc.id === activeTreatment.acfId)
      )
    } else {
      setAfcFollicleCount(null)
    }
  }, [follicleCounts, activeTreatment])

  return (
    <>
      <div>
        <FollicleSummary
          follicleCounts={follicleCounts}
          afcFollicleCount={afcFollicleCount}
        />
      </div>
      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex items-center justify-between">
          <span className="pr-3 bg-gray-50 text-lg font-medium text-gray-900">
            Follicle Measurements
          </span>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusSmIcon
              className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>Add new</span>
          </button>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:px-6">
          <div>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                defaultValue={tabs.find((tab) => tab.current).name}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="flex space-x-4" aria-label="Tabs">
                {tabs.map((tab) => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                      tab.current
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-500 hover:text-gray-700',
                      'px-3 py-2 font-medium text-sm rounded-md'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-row w-full">
            <div className="bg-white overflow-hidden w-24">
              <div className="flex w-full justify-center mt-0 h-6">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-purple-800"></span>
              </div>
              <div className="px-2 py-2 bg-white">
                <div className="border-gray-100 border-b-2 py-1 h-8">
                  <div className="text-sm font-medium text-gray-500 justify-end flex">
                    {`>19`}
                  </div>
                </div>
                <div className="border-gray-100 border-b-2 py-1 h-8">
                  <div className="text-sm font-medium text-gray-500 justify-end flex">
                    18-19
                  </div>
                </div>
                <div className="border-gray-100 border-b-2 py-1 h-8">
                  <div className="text-sm font-medium text-gray-500 justify-end flex">
                    16-17
                  </div>
                </div>
                <div className="border-gray-100 border-b-2 py-1 h-8">
                  <div className="text-sm font-medium text-gray-500 justify-end flex">
                    14-15
                  </div>
                </div>
                <div className="border-gray-100 border-b-2 py-1 h-8">
                  <div className="text-sm font-medium text-gray-500 justify-end flex">
                    11-13
                  </div>
                </div>
                <div className="border-gray-100 border-b-2 py-1 h-8">
                  <div className="text-sm font-medium text-gray-500 justify-end flex">
                    {`<11`}
                  </div>
                </div>
                <div className="pt-5 pb-1 sm:px-6p text-right">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 w-full">
                    Day:
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Date:</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-10">
              {follicleCounts.length > 0 &&
                follicleCounts.map((follicleCount) => (
                  <div key={follicleCount.id} className="">
                    <FollicleCountGrouped
                      follicleCount={follicleCount}
                      isAcf={afcFollicleCount?.id === follicleCount.id}
                    />
                  </div>
                ))}
            </div>
            {follicleCounts.length == 0 && (
              <div className="pt-24 flex justify-center align-middle w-full col-start-4 h-full">
                <span className="h-12 inline-flex align-middle items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-purple-100 text-purple-800">
                  No measurements recorded
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="px-4 py-4 sm:px-6">
          <div className="flex flex-row justify-center pt-2">
            <div className="flex flex-row items-center">
              <div className="bg-pink-400 rounded-full h-3 w-3" />
              <p className="text-sm  text-gray-500 text-left px-2">Left</p>
            </div>
            <div className="flex flex-row items-center">
              <div className="bg-purple-400 rounded-full h-3 w-3" />
              <p className="text-sm  text-gray-500 text-left px-2"> Right</p>
            </div>
          </div>
        </div>
      </div>
      <NewFollicleCount
        open={open}
        setOpen={setOpen}
        nextDay={nextDay}
        nextDate={nextDate}
      />
    </>
  )
}
