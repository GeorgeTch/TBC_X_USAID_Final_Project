"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { link } from "fs";

export default function BackBtn({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Button asChild variant={"secondary"} className=" font-medium w-full">
      <Link aria-label={label} href={href}>
        {label}
      </Link>
    </Button>
  );
}
