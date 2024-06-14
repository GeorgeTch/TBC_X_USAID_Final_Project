"use client";

import { Input, InputProps } from "@/components/ui/input";
import { Dispatch, SetStateAction, forwardRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Butcherman } from "next/font/google";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type InputTagsProps = InputProps & {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
};

export const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ onChange, value }, ref) => {
    const [pendindDataPoint, setPendingDataPoint] = useState("");
    const [focused, setFocused] = useState(false);

    function addPendingDataPoint() {
      if (pendindDataPoint) {
        const newDataPoints = new Set([...value, pendindDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    }
    const { setFocus } = useFormContext();

    return (
      <div
        className={cn(
          "flex min-h-[20px] w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          focused
            ? "ring-ring ring-2 outline-none ring-offset-2"
            : "ring-ring ring-0 outline-none ring-offset-0"
        )}
        onClick={() => setFocus("tags")}
      >
        <motion.div className="rounden-md min-h-[2.5rem] p-2 flex gap-2 flex-wrap items-center">
          <AnimatePresence>
            {value.map((tag) => (
              <motion.div
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                key={tag}
              >
                <Badge variant={"secondary"}>{tag}</Badge>
                <button
                  className="w-3 ml-1"
                  onClick={() => onChange(value.filter((i) => i !== tag))}
                >
                  <XIcon className="w-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="flex">
            <Input
              placeholder="Add Tags"
              className="focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addPendingDataPoint();
                }
                if (
                  e.key === "Backspace" &&
                  !pendindDataPoint &&
                  value.length > 0
                ) {
                  e.preventDefault();
                  const newValue = [...value];
                  newValue.pop();
                  onChange(newValue);
                }
              }}
              value={pendindDataPoint}
              onFocus={(e) => setFocused(true)}
              onBlurCapture={(e) => setFocused(false)}
              onChange={(e) => setPendingDataPoint(e.target.value)}
            />
          </div>
        </motion.div>
      </div>
    );
  }
);

InputTags.displayName = "InputTags";
