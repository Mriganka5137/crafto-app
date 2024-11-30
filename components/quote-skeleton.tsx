import Shimmer from "./shimmer";

export default function QuoteSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image skeleton with shimmer */}
      <div className="relative h-48 sm:h-64">
        <div className="absolute inset-0 bg-gray-200">
          <Shimmer />
        </div>

        {/* Text placeholder */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="space-y-3 w-full">
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto">
              <Shimmer />
            </div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto">
              <Shimmer />
            </div>
          </div>
        </div>
      </div>

      {/* Footer with shimmer */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded relative overflow-hidden">
            <Shimmer />
          </div>
          <div className="h-4 w-32 bg-gray-200 rounded relative overflow-hidden">
            <Shimmer />
          </div>
        </div>
      </div>
    </div>
  );
}
