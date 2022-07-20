import { useState } from 'react'

import { FollicleMap } from 'src/models/FollicleMap'
import { FollicleMapFull } from 'src/models/FollicleMapFull'

import EditFollicleCount from './EditFollicleCount'

const FollicleCount = ({ follicleCount, isAcf }) => {
  const leftFollicleMap = new FollicleMap(follicleCount.left)
  const rightFollicleMap = new FollicleMap(follicleCount.right)
  const [open, setOpen] = useState(false)

  const newRightFollicleMap = new FollicleMapFull(follicleCount.right)
  console.log(newRightFollicleMap)
  return (
    <>
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 pt-5 pb-1 sm:px-6">
          <div className="flex flex-row">
            <h3 className="text-lg leading-6 font-medium text-gray-900 w-full">
              Day {follicleCount.day}
            </h3>
            {isAcf && (
              <div className="flex w-full justify-end h-6">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-purple-100 text-purple-800">
                  AFC
                </span>
              </div>
            )}
          </div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {new Date(follicleCount.date).toLocaleDateString()}
          </p>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6 bg-gray-2">
          <h3 className="text-sm font-medium text-gray-500 text-left py-2">
            Follicle Lengths (mm)
          </h3>

          {Object.keys(leftFollicleMap.counts).map((key, index) => (
            <div
              key={index}
              className="grid grid-cols-3 border-gray-100 border-b-2 py-1"
            >
              <div className="text-sm font-medium text-gray-500 justify-center flex">
                {key}
              </div>
              <div className="flex flex-row flex-wrap justify-evenly items-center px-1">
                {leftFollicleMap.counts[key].map((count, index) => (
                  <div
                    key={index}
                    className="bg-pink-400 rounded-full h-2 w-2 m-0.5"
                  />
                ))}
              </div>
              <div className="flex flex-row flex-wrap justify-evenly items-center px-1">
                {rightFollicleMap.counts[key].map((count, index) => (
                  <div
                    key={index}
                    className="bg-purple-400 rounded-full h-2 w-2 m-0.5"
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-row justify-center pt-2">
            <div className="flex flex-row items-center">
              <div className="bg-pink-400 rounded-full h-2 w-2" />
              <p className="text-sm  text-gray-500 text-left px-2">Left</p>
            </div>
            <div className="flex flex-row items-center">
              <div className="bg-purple-400 rounded-full h-2 w-2" />
              <p className="text-sm  text-gray-500 text-left px-2"> Right</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center align-middle pb-4 flex-row space-x-4">
          <div>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <EditFollicleCount
        open={open}
        setOpen={setOpen}
        follicleCount={follicleCount}
      />
    </>
  )
}

export default FollicleCount
