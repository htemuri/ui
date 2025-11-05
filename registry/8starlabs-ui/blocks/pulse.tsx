import React from "react";
import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status?: "success" | "warning" | "error";
  label?: string;
}

const StatusIndicator = ({
  status = "success",
  label
}: StatusIndicatorProps) => {
  const colorMap = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500"
  }[status];

  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-3 w-3">
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-50 animate-ping",
            colorMap
          )}
        />
        <span
          className={cn("relative inline-flex rounded-full h-3 w-3", colorMap)}
        />
      </span>
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  );
};

export default StatusIndicator;
