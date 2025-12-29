export default function PlaceDetailLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Image Skeleton */}
        <div className="relative mb-8 rounded-lg overflow-hidden border h-96 bg-muted animate-pulse"></div>

        {/* Header Skeleton */}
        <div className="mb-8 space-y-3">
          <div className="h-10 bg-muted animate-pulse rounded-lg w-2/3"></div>
          <div className="h-6 bg-muted animate-pulse rounded-lg w-40"></div>
        </div>

        <div className="h-px bg-border mb-8"></div>

        {/* About Section Skeleton */}
        <div className="mb-8 space-y-4">
          <div className="h-7 bg-muted animate-pulse rounded-lg w-24"></div>
          <div className="space-y-2">
            <div className="h-5 bg-muted animate-pulse rounded-lg"></div>
            <div className="h-5 bg-muted animate-pulse rounded-lg"></div>
            <div className="h-5 bg-muted animate-pulse rounded-lg w-3/4"></div>
          </div>
        </div>

        {/* Activities Skeleton */}
        <div className="space-y-4">
          <div className="h-7 bg-muted animate-pulse rounded-lg w-32"></div>
          <div className="flex gap-2 flex-wrap">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-9 w-24 bg-muted animate-pulse rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
