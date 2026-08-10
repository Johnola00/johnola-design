export function ProjectCaseStudyLoading() {
  return (
    <main
      className="min-h-screen bg-[#111111] text-white"
      aria-label="Loading project case study"
      aria-busy="true"
    >
      <div className="h-[100px] border-b border-white/10 bg-[#171717] px-6 md:px-10">
        <div className="mx-auto flex h-full max-w-[1320px] items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 animate-pulse rounded-[10px] bg-white/[0.08]" />
            <div className="space-y-2">
              <div className="h-3 w-28 animate-pulse rounded bg-white/[0.09]" />
              <div className="h-2.5 w-36 animate-pulse rounded bg-white/[0.06]" />
            </div>
          </div>

          <div className="hidden gap-8 md:flex">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="h-3 w-16 animate-pulse rounded bg-white/[0.06]"
              />
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto w-full max-w-[1280px] px-5 pb-20 pt-8 md:px-10 md:pt-12">
        <div className="aspect-[16/8.8] w-full animate-pulse rounded-[20px] bg-white/[0.07]" />

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="h-[104px] animate-pulse rounded-[18px] bg-white/[0.055]"
            />
          ))}
        </div>

        <div className="mt-12 space-y-4">
          <div className="h-6 w-48 animate-pulse rounded bg-white/[0.09]" />
          <div className="h-3.5 w-full max-w-[840px] animate-pulse rounded bg-white/[0.06]" />
          <div className="h-3.5 w-[86%] max-w-[760px] animate-pulse rounded bg-white/[0.06]" />
        </div>

        <div className="mt-12 rounded-[24px] bg-[#202020] p-4 md:p-6">
          <div className="aspect-[16/8.6] w-full animate-pulse rounded-[18px] bg-white/[0.07]" />
          <div className="mt-5 h-5 w-64 animate-pulse rounded bg-white/[0.09]" />
          <div className="mt-3 h-3.5 w-[72%] animate-pulse rounded bg-white/[0.055]" />
        </div>
      </section>
    </main>
  );
}
