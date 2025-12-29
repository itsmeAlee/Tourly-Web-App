export default function GuidesLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="h-10 w-48 bg-muted animate-pulse rounded-lg mb-3"></div>
          <div className="h-5 w-96 bg-muted animate-pulse rounded-lg"></div>
        </div>

        {/* Filter Skeleton */}
        <div className="bg-card rounded-lg border p-4 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="h-4 w-48 bg-muted animate-pulse rounded-lg"></div>
            <div className="w-[180px] h-11 bg-muted animate-pulse rounded-lg"></div>
          </div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg bg-card p-6 space-y-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-full bg-muted animate-pulse flex-shrink-0"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-muted animate-pulse rounded-lg w-3/4"></div>
                  <div className="h-4 bg-muted animate-pulse rounded-lg w-1/2"></div>
                  <div className="h-4 bg-muted animate-pulse rounded-lg w-2/3"></div>
                </div>
              </div>
              <div className="h-12 bg-muted animate-pulse rounded-lg"></div>
              <div className="h-10 bg-muted animate-pulse rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
