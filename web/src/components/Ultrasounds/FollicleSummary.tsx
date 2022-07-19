import React, { useContext, useEffect, useState } from 'react'

import { InformationCircleIcon } from '@heroicons/react/outline'

import { Link } from '@redwoodjs/router'

import { FollicleMap } from 'src/models/FollicleMap'
import { TreatmentContext } from 'src/providers/context/TreatmentContext'

export default function FollicleSummary({ follicleCounts, afcFollicleCount }) {
  const [activeTreatment] = useContext(TreatmentContext)
  const [afc, setAfc] = useState(null)
  const [rangeCount, setRangeCount] = useState(null)
  const latestFollicleCount = follicleCounts[follicleCounts.length - 1]
  const [predictedEggs, setPredictedEggs] = useState(null)

  const countFolliclesInRange = (follicleMap) => {
    let count = 0
    for (const key in follicleMap.counts) {
      if (key !== '<11' && key !== '>19') {
        count += follicleMap.counts[key].length
      }
    }
    return count
  }

  const countFolliclesInAFC = (follicleMap) => {
    let count = 0
    for (const key in follicleMap.counts) {
      {
        count += follicleMap.counts[key].length
      }
    }
    return count
  }
  const [follicleRatio, setFollicleRatio] = useState(0)

  useEffect(() => {
    if (latestFollicleCount) {
      const latestLeftFollicleMap = new FollicleMap(latestFollicleCount.left)
      const latestRightFollicleMap = new FollicleMap(latestFollicleCount.right)
      setRangeCount(
        countFolliclesInRange(latestLeftFollicleMap) +
          countFolliclesInRange(latestRightFollicleMap)
      )
      setPredictedEggs(rangeCount * 0.70601212 + 3.0297298881764334)
    }
    if (afcFollicleCount) {
      setAfc(
        countFolliclesInAFC(new FollicleMap(afcFollicleCount.left)) +
          countFolliclesInAFC(new FollicleMap(afcFollicleCount.right))
      )
    } else {
      setAfc(0)
    }
    if (latestFollicleCount && afcFollicleCount) {
      setFollicleRatio((rangeCount / afc) * 100)
    } else {
      setFollicleRatio(0)
    }
  }, [
    follicleCounts,
    activeTreatment,
    afcFollicleCount,
    latestFollicleCount,
    afc,
    rangeCount,
  ])

  const stats = [
    { name: 'Antral Follicle Count (AFC)', stat: afc || 0 },
    { name: 'Follicles between 11-19mm', stat: rangeCount || 0 },
    {
      name: 'Follicles between 11-19mm/AFC',
      stat: `${follicleRatio.toFixed(0)}%`,
    },
  ]
  return (
    <div>
      {rangeCount && (
        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon
                className="h-5 w-5 text-blue-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                If you trigger today, it is predicted that{' '}
                {predictedEggs.toFixed(0)} eggs will be retrieved.
              </p>

              <p className="mt-3 text-sm md:mt-0 md:ml-6">
                <Link
                  to=""
                  className="whitespace-nowrap font-medium text-purple-700 hover:text-purple-600"
                >
                  Details <span aria-hidden="true">&rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
