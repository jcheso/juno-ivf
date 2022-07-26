/* This example requires Tailwind CSS v2.0+ */
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  MinusSmIcon,
} from '@heroicons/react/solid'

export default function Statistics({ statistics }) {
  const stats = [
    statistics.totalPatients,
    statistics.totalTreatments,
    statistics.successfulTreatmentsRate,
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Clinic Summary - Last 30 Days
      </h3>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {item.stat}
                <span className="ml-2 text-sm font-medium text-gray-500">
                  from {item.previousStat}
                </span>
              </div>

              <div
                className={classNames(
                  item.changeType === 'increase'
                    ? 'bg-green-100 text-green-800'
                    : item.changeType == 'decrease'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800',
                  'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowSmUpIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : item.changeType === 'decrease' ? (
                  <ArrowSmDownIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                ) : (
                  <MinusSmIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                )}
                <span className="sr-only">
                  {item.changeType === 'increase' ? 'Increased' : 'Decreased'}{' '}
                  by
                </span>
                {item.change}%
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
