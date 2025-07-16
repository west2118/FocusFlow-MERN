"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

type Impact = "Low" | "Medium" | "High";

function Progress({
  className,
  value = 0,
  impact = "Low", // default value
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  value?: number;
  impact?: Impact;
}) {
  const impactColor =
    impact === "High"
      ? "bg-rose-500"
      : impact === "Medium"
      ? "bg-amber-500"
      : "bg-emerald-600";

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}>
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn("h-full transition-all duration-500", impactColor)}
        style={{ width: `${value}%` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
