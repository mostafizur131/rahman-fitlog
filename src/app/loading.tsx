const Loading = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#0b0c0f] px-4">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="relative mb-6 h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-[#24272e]" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#ccff00]" />
        </div>

        <h2 className="font-oswald text-xl font-bold uppercase tracking-wide text-white">
          Loading FitLog
        </h2>

        <p className="mt-2 text-sm text-gray-500">Preparing your workouts…</p>
      </div>
    </main>
  );
};

export default Loading;
