/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react'

import { InformationCircleIcon } from '@heroicons/react/solid'

import ModelDetails from '../Modals/ModelDetails'

export default function PredictEggs({ predictedEggs }) {
  const [open, setOpen] = useState(false)
  return (
    <>
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
              If you trigger today, Juno predicts that {predictedEggs?.eggs}{' '}
              eggs will be retrieved.
            </p>

            <p className="mt-3 text-sm md:mt-0 md:ml-6">
              <button
                onClick={() => setOpen(true)}
                className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
              >
                Details <span aria-hidden="true">&rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
      <ModelDetails
        open={open}
        setOpen={setOpen}
        modelDetails={predictedEggs?.modelDetails}
      />
    </>
  )
}
