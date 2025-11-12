import React from "react";
import { cn } from "@/lib/utils";

const SYSTEMS = {
  SMRT: {
    NS: {
      name: "North South Line",
      short: "NS",
      long: "NSL",
      bg: "#e22726",
      fg: "#FFF"
    },
    EW: {
      name: "East West Line",
      short: "EW",
      long: "EWL",
      bg: "#00964e",
      fg: "#FFF"
    },
    NE: {
      name: "North East Line",
      short: "NE",
      long: "NEL",
      bg: "#8f4299",
      fg: "#FFF"
    },
    CC: {
      name: "Circle Line",
      short: "CC",
      long: "CCL",
      bg: "#f99d26",
      fg: "#000"
    },
    DT: {
      name: "Downtown Line",
      short: "DT",
      long: "DTL",
      bg: "#005ea8",
      fg: "#fff"
    },
    TE: {
      name: "Thomson-East Coast Line",
      short: "TE",
      long: "TEL",
      bg: "#9d5b26",
      fg: "#FFF"
    }
  }
  // Add more systems here in the future
};

type SystemKey = keyof typeof SYSTEMS;
type BadgeSize = "xs" | "sm" | "md" | "lg";
const sizeClasses: Record<BadgeSize, string> = {
  xs: "px-1 py-0.5 text-[10px]",
  sm: "px-1.5 py-0.5 text-xs",
  md: "px-2 py-0.5 text-sm",
  lg: "px-3 py-1 text-base"
};

interface TransportBadgeProps {
  stationCode: string | string[];
  system: SystemKey;
  className?: string;
  stationName?: string;
  showStationName?: boolean;
  size?: BadgeSize;
}

const getLineDataFromStationCode = (code: string, system: SystemKey) => {
  const match = code.match(/^[A-Z]+/);
  if (!match) return null;
  const prefix = match[0] as string;
  const lines = SYSTEMS[system];
  if (lines && Object.prototype.hasOwnProperty.call(lines, prefix)) {
    return lines[prefix as keyof typeof lines];
  }
  return null;
};

export const TransportBadge = ({
  stationCode,
  system,
  className,
  stationName,
  showStationName = false,
  size = "md"
}: TransportBadgeProps) => {
  const codes = Array.isArray(stationCode) ? stationCode : [stationCode];
  const isMulti = codes.length > 1;

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className={cn("inline-flex", isMulti ? "gap-0" : "gap-1")}>
        {codes.map((code, idx) => {
          const line = getLineDataFromStationCode(code, system);
          if (!line) {
            return (
              <span
                key={code}
                className={cn(
                  "inline-flex items-center rounded font-semibold bg-gray-300 text-gray-700",
                  sizeClasses[size]
                )}
              >
                Unknown
              </span>
            );
          }

          const radius = isMulti
            ? idx === 0
              ? "rounded-l"
              : idx === codes.length - 1
                ? "rounded-r"
                : "rounded-none"
            : "rounded";

          const border =
            isMulti && idx > 0
              ? "border-l border-white/40 dark:border-black/40"
              : "";

          return (
            <span
              key={code}
              className={cn(
                "inline-flex items-center font-semibold",
                sizeClasses[size],
                radius,
                border
              )}
              style={{
                backgroundColor: line.bg,
                color: line.fg
              }}
              title={line.name}
            >
              <span className="font-bold">
                {line.short}
                {code.replace(/^[A-Z]+/, "")}
              </span>
            </span>
          );
        })}
      </span>
      {showStationName && stationName && (
        <span
          className={cn(
            "ml-2 font-medium text-slate-700 dark:text-slate-200",
            size === "xs" && "text-[10px]",
            size === "sm" && "text-xs",
            size === "md" && "text-sm",
            size === "lg" && "text-base"
          )}
        >
          {stationName}
        </span>
      )}
    </span>
  );
};

export default TransportBadge;
