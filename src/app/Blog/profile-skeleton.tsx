import { Skeleton } from '@/components/ui/skeleton'

export function ProfileSkeleton() {
  return (
    <div className="rounded-lxl mt-[-88px] flex w-full gap-4 bg-slate-900 px-5 py-4 lg:gap-8 lg:px-10 lg:py-8">
      <Skeleton className="h-[148px] w-[148px] rounded-lg" />

      <div className="flex flex-1 flex-col gap-2 lg:gap-4">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <Skeleton className="h-6 w-45 lg:h-8 lg:w-1/2" />
          <Skeleton className="h-4 w-12 lg:h-6 lg:w-20" />
        </div>

        <div className="flex flex-col space-y-1 lg:space-y-2">
          <Skeleton className="h-2 w-40 lg:h-4 lg:w-full" />
          <Skeleton className="h-2 w-40 lg:h-4 lg:w-3/4" />
        </div>

        <div className="mt-auto flex flex-col gap-3 lg:flex-row lg:gap-6">
          <Skeleton className="h-2 lg:h-4 lg:w-24" />
          <Skeleton className="h-2 lg:h-4 lg:w-24" />
          <Skeleton className="h-2 lg:h-4 lg:w-24" />
        </div>
      </div>
    </div>
  )
}
