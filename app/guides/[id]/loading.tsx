export default function GuideDetailLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Image Skeleton */}
          <div className="rounded-lg overflow-hidden border h-96 bg-muted animate-pulse"></div>

          {/* Info Skeleton */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-10 w-20 bg-muted animate-pulse rounded-lg"></div>
            </div>

            <div className="h-10 bg-muted animate-pulse rounded-lg w-3/4"></div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-muted animate-pulse rounded mt-0.5"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded-lg w-24"></div>
                  <div className="flex gap-2">
                    <div className="h-8 w-20 bg-muted animate-pulse rounded-lg"></div>
                    <div className="h-8 w-20 bg-muted animate-pulse rounded-lg"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-muted animate-pulse rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded-lg w-20"></div>
                  <div className="h-5 bg-muted animate-pulse rounded-lg w-32"></div>
                </div>
              </div>
            </div>

            <div className="h-12 bg-muted animate-pulse rounded-lg"></div>
          </div>
        </div>

        <div className="h-px bg-border mb-8"></div>

        {/* Bio Section Skeleton */}
        <div className="space-y-4">
          <div className="h-7 bg-muted animate-pulse rounded-lg w-24"></div>
          <div className="space-y-2">
            <div className="h-5 bg-muted animate-pulse rounded-lg"></div>
            <div className="h-5 bg-muted animate-pulse rounded-lg"></div>
            <div className="h-5 bg-muted animate-pulse rounded-lg w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
