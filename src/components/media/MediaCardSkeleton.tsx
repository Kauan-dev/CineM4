import { cn } from "@/lib/utils";

interface MediaCardSkeletonProps {
  className?: string;
}

export function MediaCardSkeleton({ className }: MediaCardSkeletonProps) {
  return (
    <div
      className={cn(
        "mb-1.25 aspect-2/3 w-full animate-pulse rounded-md bg-neutral-900",
        className,
      )}
    />
  );
}
