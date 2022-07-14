import React from 'react'

import { PlusSmIcon as PlusSmIconOutline } from '@heroicons/react/outline'

import FollicleCount from './FollicleCount/FollicleCount'

export default function FollicleDisplay({ follicleCounts }) {
  let nextDate: any = new Date(follicleCounts[follicleCounts.length - 1].date)
  nextDate = new Date(nextDate.setDate(nextDate.getDate() + 1))
  const lastDate: any = new Date(follicleCounts[follicleCounts.length - 1].date)
  const diffTime: number = Math.abs(nextDate - lastDate)
  const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const nextDay: number =
    diffDays + follicleCounts[follicleCounts.length - 1].day

  return (
    <>
      <div className="mx-auto flex md:flex-row flex-col md:space-x-6">
        {follicleCounts.map((follicleCount) => (
          <div key={follicleCount.id} className="py-4 md:py-0 w-1/4">
            <FollicleCount follicleCount={follicleCount} />
          </div>
        ))}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg w-1/4">
          <div className="flex h-full flex-col">
            <div className="px-4 pt-5 pb-1 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Day {nextDay}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {new Date(nextDate).toLocaleDateString()}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6 justify-center items-center flex h-full">
              <button
                type="button"
                className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusSmIconOutline className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
