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
    <div className="my-10 flex gap-2 sm:gap-4 justify-center items-center">
      <Badge
        onClick={() => {
          setFilter("");
        }}
        className={cn(
          "cursor-pointer hover:opacity-100 py-1 transition-all duration-300 ease-in-out text-nowrap",
          !tag ? "opacity-100" : "opacity-50"
        )}
      >
        All Categories
      </Badge>

      <Badge
        onClick={() => {
          setFilter("bracelet");
        }}
        className={cn(
          "cursor-pointer hover:opacity-100 py-1 transition-all duration-300 ease-in-out",
          tag && tag === "bracelet" ? "opacity-100" : "opacity-50"
        )}
      >
        Bracelets
      </Badge>

      <Badge
        onClick={() => {
          setFilter("ceramic");
        }}
        className={cn(
          "cursor-pointer hover:opacity-100 py-1 transition-all duration-300 ease-in-out",
          tag && tag === "ceramic" ? "opacity-100" : "opacity-50"
        )}
      >
        Ceramics
      </Badge>

      <Badge
        onClick={() => {
          setFilter("wallet");
        }}
        className={cn(
          "cursor-pointer hover:opacity-100 py-1 transition-all duration-300 ease-in-out",
          tag && tag === "wallet" ? "opacity-100" : "opacity-50"
        )}
      >
        Wallets
      </Badge>
    </div>
  );
}
