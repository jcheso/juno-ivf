import React, { useContext, useEffect, useState } from 'react'

import { PlusSmIcon } from '@heroicons/react/solid'
import { FaSyringe } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'

import { TreatmentContext } from 'src/providers/context/TreatmentContext'

import FollicleCountGrouped from './FollicleCountGrouped'
import FollicleSummary from './FollicleSummary'
import NewFollicleCount from './Modals/NewFollicleCount'
import SetEggsRetrieved from './Modals/SetEggsRetrieved'
import SetTrigger from './Modals/SetTrigger'

export default function FollicleDisplayGrouped({ follicleCounts, treatments }) {
  const [activeTreatment, setTreatment] = useContext(TreatmentContext)
  const [afcFollicleCount, setAfcFollicleCount] = useState(
    follicleCounts.find((fc) => fc.id === activeTreatment.acfId) || 0
  )
  const [open, setOpen] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const [eggsRetrieved, setEggsRetrieved] = useState(false)
  const nextDate = new Date(activeTreatment.startDate)
  const [latestFollicleCountDate, setLatestFollicleCountDate] = useState(
    follicleCounts.length > 0
      ? follicleCounts[follicleCounts.length - 1].date
      : activeTreatment.startDate
  )

  const labels = [
    '>24',
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
    '10',
    '9',
    '8',
    '7',
    '6',
    '<6',
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
            <span>New</span>
          </button>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-md divide-y divide-gray-200">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex flex-row md:justify-between justify-evenly">
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
            <div className="flex flex-col md:flex-row justify-evenly md:space-x-4 space-y-2 md:space-y-0">
              <button
                type="button"
                onClick={() => setTrigger(!trigger)}
                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {/* <FaSyringe className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" /> */}
                Assign Trigger
              </button>
              <button
                type="button"
                onClick={() => setEggsRetrieved(!eggsRetrieved)}
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {/* <FaSyringe className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" /> */}
                Record Eggs Retrieved
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 py-2 sm:p-6">
          <div className="flex flex-row w-full justify-center">
            <div className="bg-white ">
              <div className="flex w-full justify-center mt-0 h-6">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-gray-500">
                  (mm)
                </span>
              </div>
              <div className="py-2 bg-white">
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
                  <h1 className="text-lg leading-6 font-medium text-gray-900 w-full">
                    Day
                  </h1>
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
                        follicleCount?.date.slice(0, 10) ===
                        activeTreatment.triggerDate?.slice(0, 10)
                      }
                      isEggRetrieval={
                        follicleCount?.date.slice(0, 10) ===
                        activeTreatment.eggRetrievalDate?.slice(0, 10)
                      }
                      eggsRetrieved={activeTreatment.eggsRetrieved}
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
      <SetEggsRetrieved
        open={eggsRetrieved}
        setOpen={setEggsRetrieved}
        latestDate={latestFollicleCountDate}
      />
      <SetTrigger
        open={trigger}
        setOpen={setTrigger}
        latestDate={latestFollicleCountDate}
      />
      <NewFollicleCount open={open} setOpen={setOpen} />
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
