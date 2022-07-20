import { useState } from 'react'

import { FollicleMap } from 'src/models/FollicleMap'

import EditFollicleCount from './EditFollicleCount'

const FollicleCount = ({ follicleCount, isAcf }) => {
  const leftFollicleMap = new FollicleMap(follicleCount.left)
  const rightFollicleMap = new FollicleMap(follicleCount.right)
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-white overflow-hidden">
        <div className="flex w-full justify-center mt-0 h-6">
          {isAcf && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-purple-100 text-purple-800">
              AFC
            </span>
          )}
        </div>

        <div className="border-gray-200 py-2 bg-white">
          {Object.keys(leftFollicleMap.counts).map((key, index) => (
            <div
              key={index}
              className="grid grid-cols-2 border-gray-100 border-b-2 border-r-2 py-1 h-8"
            >
              <div className="flex flex-row flex-wrap justify-evenly space-x-1 items-center px-1">
                {leftFollicleMap.counts[key].map((count, index) => (
                  <div
                    key={index}
                    className="bg-pink-400 rounded-full h-2 w-2"
                  />
                ))}
              </div>
              <div className="flex flex-row flex-wrap justify-evenly space-x-1 items-center px-1">
                {rightFollicleMap.counts[key].map((count, index) => (
                  <div
                    key={index}
                    className="bg-purple-400 rounded-full h-2 w-2"
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="pt-5 pb-1 sm:px-6p text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 w-full">
              {follicleCount.day}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {new Date(follicleCount.date).toLocaleDateString()}
            </p>
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
