const Loading = () => {
  return (
    <main className="min-h-screen bg-[#0b0c0f]">
      <section className="mx-auto max-w-300 px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-12 w-48 animate-pulse rounded bg-[#191b20]" />

        <div className="mt-3 h-4 w-80 animate-pulse rounded bg-[#15171c]" />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-xl border border-[#24272e] bg-[#15171c]"
            />
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-40 animate-pulse rounded-xl border border-[#24272e] bg-[#15171c]"
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Loading;
