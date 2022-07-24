import React, { useContext, useEffect, useState } from 'react'

import { PlusSmIcon as PlusSmIconOutline } from '@heroicons/react/outline'
import { v4 as uuidv4 } from 'uuid'

import { TreatmentContext } from 'src/providers/context/TreatmentContext'

import FollicleCount from './FollicleCount'
import FollicleSummary from './FollicleSummary'
import NewFollicleCount from './Modals/NewFollicleCount'

export default function FollicleDisplay({ follicleCounts }) {
  const [activeTreatment] = useContext(TreatmentContext)
  const [afcFollicleCount, setAfcFollicleCount] = useState(null)

  const [open, setOpen] = useState(false)
  const reversedFollicleCounts = follicleCounts.slice(0).reverse()
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
        <div className="relative flex justify-center">
          <span className="px-3 bg-gray-50 text-lg font-medium text-gray-900">
            Follicle Measurements
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="flex h-96 flex-col">
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
                onClick={() => setOpen((open) => !open)}
                className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusSmIconOutline className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        {reversedFollicleCounts.map((follicleCount) => (
          <div key={uuidv4()}>
            <FollicleCount
              follicleCount={follicleCount}
              isAcf={afcFollicleCount?.id === follicleCount.id}
            />
          </div>
        ))}
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
