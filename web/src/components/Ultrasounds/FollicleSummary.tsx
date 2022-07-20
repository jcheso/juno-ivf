import React, { useContext, useEffect, useState } from 'react'

import { InformationCircleIcon } from '@heroicons/react/outline'

import { Link } from '@redwoodjs/router'

import { FollicleMap } from 'src/models/FollicleMap'
import { FollicleMapFull } from 'src/models/FollicleMapFull'
import { TreatmentContext } from 'src/providers/context/TreatmentContext'

import PredictEggsCell from './PredictEggsCell'
export default function FollicleSummary({ follicleCounts, afcFollicleCount }) {
  const [activeTreatment] = useContext(TreatmentContext)
  const [afc, setAfc] = useState(null)
  const [rangeCount, setRangeCount] = useState(null)

  // const latestFollicleCount = follicleCounts[follicleCounts.length - 1]
  // Scan through the follicleCounts to find the last day taht doesn't have a count of -1
  const latestFollicleCount = follicleCounts
    .slice(0)
    .reverse()
    .find((fc) => fc.count !== -1)

  const [predictedEggs, setPredictedEggs] = useState(null)

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
      const latestLeftFollicleMap: FollicleMapFull = new FollicleMapFull(
        latestFollicleCount.left
      )
      const latestRightFollicleMap: FollicleMapFull = new FollicleMapFull(
        latestFollicleCount.right
      )
      setRangeCount(
        latestLeftFollicleMap.inRange + latestRightFollicleMap.inRange
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
      name: 'Follicles between 11-19mm/AFC (FORT)',
      stat: `${follicleRatio.toFixed(0)}%`,
    },
  ]

  return (
    <div>
      {follicleCounts.length > 0 && <PredictEggsCell input={rangeCount} />}
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
