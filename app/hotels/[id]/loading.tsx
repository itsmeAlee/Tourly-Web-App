export default function HotelDetailLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Image Skeleton */}
        <div className="relative mb-8 rounded-lg overflow-hidden border h-96 bg-muted animate-pulse"></div>

        {/* Header Skeleton */}
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-3 flex-1">
            <div className="h-10 bg-muted animate-pulse rounded-lg w-2/3"></div>
            <div className="flex items-center gap-4">
              <div className="h-6 bg-muted animate-pulse rounded-lg w-32"></div>
              <div className="h-6 bg-muted animate-pulse rounded-lg w-16"></div>
            </div>
          </div>
          <div className="bg-card px-6 py-4 rounded-lg border">
            <div className="h-8 bg-muted animate-pulse rounded-lg w-32 mb-2"></div>
            <div className="h-5 bg-muted animate-pulse rounded-lg w-20"></div>
          </div>
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

        {/* Amenities Skeleton */}
        <div className="mb-8 space-y-4">
          <div className="h-7 bg-muted animate-pulse rounded-lg w-32"></div>
          <div className="flex gap-2 flex-wrap">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-9 w-24 bg-muted animate-pulse rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="h-14 bg-muted animate-pulse rounded-xl"></div>
      </div>
    </div>
  );
}
