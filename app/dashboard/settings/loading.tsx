import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div>
      <div className="flex items-center space-x-4 my-10">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-80" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-80" />
          <Skeleton className="h-4 w-72" />
        </div>
      </div>
    </div>
  );
}
