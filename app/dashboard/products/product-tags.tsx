"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductTags() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tag = searchParams.get("tag");

  const setFilter = (tag: string) => {
    if (tag) {
      router.push(`?tag=${tag}`);
    }
    if (!tag) {
      router.push("/");
    }
  };
  return (
    <div className="my-4 flex gap-4 justify-center items-center">
      <Badge
        onClick={() => {
          setFilter("");
        }}
        className={cn(
          "cursor-pointer hover:opacity-100 bg-primary/80 hover:bg-primary/90",
          !tag ? "opacity-100" : "opacity-50"
        )}
      >
        All
      </Badge>

      <Badge
        onClick={() => {
          setFilter("blue");
        }}
        className={cn(
          "cursor-pointer hover:opacity-100 bg-blue-500 hover:bg-blue-600",
          tag && tag === "blue" ? "opacity-100" : "opacity-50"
        )}
      >
        Blue
      </Badge>

      <Badge
        onClick={() => {
          setFilter("green");
        }}
        className={cn(
          "cursor-pointer hover:opacity-100 bg-green-500 hover:bg-green-600",
          tag && tag === "green" ? "opacity-100" : "opacity-50"
        )}
      >
        Green
      </Badge>

      <Badge
        onClick={() => {
          setFilter("purple");
        }}
        className={cn(
          "cursor-pointer hover:opacity-100 bg-purple-500 hover:bg-purple-600",
          tag && tag === "purple" ? "opacity-100" : "opacity-50"
        )}
      >
        Purple
      </Badge>
    </div>
  );
}
