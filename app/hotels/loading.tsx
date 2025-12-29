export default function HotelsLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="h-10 w-48 bg-muted animate-pulse rounded-lg mb-3"></div>
          <div className="h-5 w-96 bg-muted animate-pulse rounded-lg"></div>
        </div>

        {/* Search/Filter Skeleton */}
        <div className="bg-card rounded-lg border p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 h-11 bg-muted animate-pulse rounded-lg"></div>
            <div className="flex gap-3">
              <div className="w-[160px] h-11 bg-muted animate-pulse rounded-lg"></div>
              <div className="w-[160px] h-11 bg-muted animate-pulse rounded-lg"></div>
            </div>
          </div>
          <div className="mt-3 h-4 w-48 bg-muted animate-pulse rounded-lg"></div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden bg-card">
              <div className="h-56 bg-muted animate-pulse"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 bg-muted animate-pulse rounded-lg w-3/4"></div>
                <div className="h-4 bg-muted animate-pulse rounded-lg w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-7 w-20 bg-muted animate-pulse rounded-full"></div>
                  <div className="h-7 w-24 bg-muted animate-pulse rounded-full"></div>
                  <div className="h-7 w-16 bg-muted animate-pulse rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
