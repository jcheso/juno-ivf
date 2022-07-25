import React, { useContext, useEffect, useState } from 'react'

import { PlusSmIcon } from '@heroicons/react/solid'
import { FaSyringe } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'

import { TreatmentContext } from 'src/providers/context/TreatmentContext'

import FollicleCountGrouped from './FollicleCountGrouped'
import FollicleSummary from './FollicleSummary'
import NewFollicleCount from './Modals/NewFollicleCount'
import SetTrigger from './Modals/SetTrigger'

export default function FollicleDisplayGrouped({ follicleCounts, treatments }) {
  const [activeTreatment, setTreatment] = useContext(TreatmentContext)
  const [afcFollicleCount, setAfcFollicleCount] = useState(
    follicleCounts.find((fc) => fc.id === activeTreatment.acfId) || 0
  )
  const [open, setOpen] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const nextDate = new Date(activeTreatment.startDate)
  const [latestFollicleCountDate, setLatestFollicleCountDate] = useState(
    follicleCounts[follicleCounts.length - 1].date
  )
  console.log(latestFollicleCountDate)

  const labels = [
    '>25',
    '25',
    '24',
    '23',
    '22',
    '21',
    '20',
    '19',
    '18',
    '17',
    '16',
    '15',
    '14',
    '13',
    '12',
    '11',
    '<11',
  ]

  const tabs = treatments.map((treatment) => {
    return {
      name: `Cycle ${treatment.count}`,
      current: treatment.id === activeTreatment.id,
      onClick: () => {
        setTreatment(treatment)
        localStorage.setItem(
          'treatmentCache',
          JSON.stringify({
            value: treatment,
            expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
          })
        )
      },
    }
  })

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const range = setGraph(follicleCounts, activeTreatment)

  useEffect(() => {
    setGraphOnEffect(
      range,
      follicleCounts,
      activeTreatment,
      setAfcFollicleCount
    )
  }, [follicleCounts, activeTreatment, range])

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
            <span>Add new measurements</span>
          </button>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex flex-row justify-between">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a cycle
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                defaultValue={tabs.find((tab) => tab.current).name}
              >
                {tabs.map((tab) => (
                  <option key={uuidv4()} onClick={tab.onClick}>
                    {tab.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="flex space-x-4" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={uuidv4()}
                    onClick={tab.onClick}
                    className={classNames(
                      tab.current
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-500 hover:text-gray-700',
                      'px-3 py-2 font-medium text-sm rounded-md'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
            <button
              type="button"
              onClick={() => setTrigger(!trigger)}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaSyringe className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Assign Trigger
            </button>
          </div>
        </div>
        <div className="px-4 py-2 sm:p-6">
          <div className="flex flex-row w-full justify-center">
            <div className="bg-white overflow-hidden w-24">
              <div className="flex w-full justify-center mt-0 h-6">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-gray-500">
                  (mm)
                </span>
              </div>
              <div className=" py-2 bg-white">
                {labels.map((label) => (
                  <div
                    key={uuidv4()}
                    className="border-gray-100 border-b-2  border-r-2 py-1 h-8"
                  >
                    <div className="text-sm font-medium text-gray-500 justify-center flex">
                      {label}
                    </div>
                  </div>
                ))}
                <div className="pt-2 pb-1 sm:px-6p text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 w-full">
                    Day
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Date</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row overflow-x-scroll">
              {follicleCounts.length > 0 &&
                follicleCounts.map((follicleCount) => (
                  <div key={uuidv4()}>
                    <FollicleCountGrouped
                      follicleCount={follicleCount}
                      isAcf={afcFollicleCount?.id === follicleCount.id}
                      isTrigger={
                        follicleCount?.date === activeTreatment.triggerDate
                      }
                    />
                  </div>
                ))}
            </div>
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
      <SetTrigger
        open={trigger}
        setOpen={setTrigger}
        latestDate={latestFollicleCountDate}
      />
      <NewFollicleCount open={open} setOpen={setOpen} nextDate={nextDate} />
    </>
  )
}

function setGraphOnEffect(
  range: number[],
  follicleCounts: any,
  activeTreatment: any,
  setAfcFollicleCount: React.Dispatch<any>
) {
  const emptyCounts = new Set()
  range.forEach((num) => {
    const day = follicleCounts.find((fc) => fc.day === num)
    if (!day) {
      emptyCounts.add(num)
    }
  })
  emptyCounts.forEach((num: number) => {
    let nextDate = new Date()
    nextDate.setDate(nextDate.getDate() - 1)
    if (follicleCounts.length > 0) {
      nextDate = new Date(follicleCounts[num - 1].date)
    }
    nextDate.setDate(nextDate.getDate() + 1)
    const emptyFollicleCount = {
      day: num,
      date: nextDate.toISOString(),
      count: -1,
      left: [],
      right: [],
      id: '',
    }
    follicleCounts.splice(num, 0, emptyFollicleCount)
  })
  if (activeTreatment && follicleCounts.length > 0) {
    setAfcFollicleCount(
      follicleCounts.find((fc) => fc.id === activeTreatment.acfId)
    )
  } else {
    setAfcFollicleCount(null)
  }
}

function setGraph(follicleCounts: any, activeTreatment: any) {
  const range = Array.from({ length: 16 }, (_, i) => i)
  const emptyCounts = new Set()
  range.forEach((num) => {
    const day = follicleCounts.find((fc) => fc.day === num)
    if (!day) {
      emptyCounts.add(num)
    }
  })
  emptyCounts.forEach((num: number) => {
    let nextDate = new Date(activeTreatment.startDate)
    nextDate.setDate(nextDate.getDate() - 1)
    if (follicleCounts.length > 0) {
      nextDate = new Date(follicleCounts[num - 1].date)
    }
    nextDate.setDate(nextDate.getDate() + 1)
    const emptyFollicleCount = {
      day: num,
      date: nextDate.toISOString(),
      count: -1,
      left: [],
      right: [],
      id: '',
    }
    follicleCounts.splice(num, 0, emptyFollicleCount)
  })
  return range
}
