const WorkoutDetailsLoading = () => {
  return (
    <main className="min-h-screen bg-[#0b0c0f] px-4 py-10">
      <div className="mx-auto max-w-296">
        {/* Back button skeleton */}
        <div className="mb-8 h-5 w-32 animate-pulse rounded bg-[#1c1f25]" />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image skeleton */}
          <div className="h-105 animate-pulse rounded-xl bg-[#15171c] sm:h-130" />

          {/* Content skeleton */}
          <div className="flex flex-col">
            {/* Tags */}
            <div className="mb-5 flex gap-2">
              <div className="h-7 w-20 animate-pulse rounded-full bg-[#1c1f25]" />
              <div className="h-7 w-24 animate-pulse rounded-full bg-[#1c1f25]" />
            </div>

            {/* Title */}
            <div className="h-12 w-3/4 animate-pulse rounded bg-[#1c1f25]" />

            <div className="mt-4 h-5 w-full animate-pulse rounded bg-[#1c1f25]" />
            <div className="mt-2 h-5 w-5/6 animate-pulse rounded bg-[#1c1f25]" />
            <div className="mt-2 h-5 w-2/3 animate-pulse rounded bg-[#1c1f25]" />

            {/* Specs */}
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[#24272e] sm:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-24 animate-pulse bg-[#15171c]" />
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <div className="mb-4 h-7 w-40 animate-pulse rounded bg-[#1c1f25]" />

              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-5 w-full animate-pulse rounded bg-[#1c1f25]"
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="h-12 flex-1 animate-pulse rounded-lg bg-[#1c1f25]" />
              <div className="h-12 flex-1 animate-pulse rounded-lg bg-[#1c1f25]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkoutDetailsLoading;
