import { FollicleMap } from 'src/models/FollicleMap'

const FollicleCount = ({ follicleCount }) => {
  const leftFollicleMap = new FollicleMap(follicleCount.left)
  const rightFollicleMap = new FollicleMap(follicleCount.right)

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 pt-5 pb-1 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Day {follicleCount.day}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {new Date(follicleCount.date).toLocaleDateString()}
        </p>
      </div>

      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
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
            <div className="flex flex-row space-x-1 items-center">
              {leftFollicleMap.counts[key].map((count, index) => (
                <div key={index} className="bg-pink-400 rounded-full h-3 w-3" />
              ))}
            </div>
            <div className="flex flex-row space-x-1 items-center px-1">
              {rightFollicleMap.counts[key].map((count, index) => (
                <div
                  key={index}
                  className="bg-purple-400 rounded-full h-3 w-3"
                />
              ))}
            </div>
          </div>
        ))}
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
      <div className="flex justify-center align-middle pb-4 flex-row space-x-4">
        {/* <div>
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Set ACF
          </button>
        </div> */}
        <div>
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default FollicleCount
