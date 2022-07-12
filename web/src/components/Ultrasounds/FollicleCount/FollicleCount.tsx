const FollicleCount = ({ follicleCount }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Day {follicleCount.day}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {new Date(follicleCount.date).toLocaleDateString()}
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6"></div>
    </div>
  )
}

export default FollicleCount
