import React, { useContext, useEffect, useState } from 'react'

import { FollicleMap } from 'src/models/FollicleMap'
import { FollicleMapFull } from 'src/models/FollicleMapFull'
import { TreatmentContext } from 'src/providers/context/TreatmentContext'

import PredictEggsCell from './PredictEggs/PredictEggsCell'
export default function FollicleSummary({ follicleCounts, afcFollicleCount }) {
  const [activeTreatment] = useContext(TreatmentContext)
  const [afc, setAfc] = useState(0)
  const [follicleRatio, setFollicleRatio] = useState(0)
  const [rangeCount, setRangeCount] = useState(0)

  useEffect(() => {
    const latestFollicleCount = getFolliclesInRange(follicleCounts)
    setRangeCount(getFolliclesInRange(follicleCounts))

    if (afcFollicleCount) {
      setAfc(
        countFolliclesInAFC(new FollicleMap(afcFollicleCount.left)) +
          countFolliclesInAFC(new FollicleMap(afcFollicleCount.right))
      )
    }
    if (latestFollicleCount && afcFollicleCount) {
      setFollicleRatio((rangeCount / afc) * 100)
    }
  }, [follicleCounts, activeTreatment, afcFollicleCount, afc, rangeCount])

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
      {follicleCounts[0].count !== -1 && <PredictEggsCell input={rangeCount} />}
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white shadow rounded-md overflow-hidden sm:p-6"
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

const countFolliclesInAFC = (follicleMap) => {
  let count = 0
  for (const key in follicleMap.counts) {
    {
      count += follicleMap.counts[key].length
    }
  }
  return count
}

function getFolliclesInRange(follicleCounts: any) {
  const latestFollicleCount = follicleCounts
    .slice(0)
    .reverse()
    .find((fc) => fc.count !== -1)
  if (latestFollicleCount) {
    const latestLeftFollicleMap: FollicleMapFull = new FollicleMapFull(
      latestFollicleCount.left
    )
    const latestRightFollicleMap: FollicleMapFull = new FollicleMapFull(
      latestFollicleCount.right
    )
    const folliclesInRange =
      latestLeftFollicleMap.inRange + latestRightFollicleMap.inRange
    return folliclesInRange
  }
}
