import { Skeleton } from '@/components/ui/skeleton'

export function ProfileSkeleton() {
  return (
    <main className="max-w-screen-lg m-auto p-10">
      <Skeleton className="w-full h-60 -mt-10" />
      <div className="flex flex-col gap-4 mb-10 mt-20">
        <div className="flex justify-between">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </main>
  )
}
