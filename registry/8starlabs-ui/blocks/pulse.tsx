import React from "react";

interface StatusIndicatorProps {
  active: boolean;
  label?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  active = false,
  label
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center">
        {active && (
          <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping" />
        )}
        <span
          className={`relative inline-flex h-3 w-3 rounded-full ${
            active ? "bg-green-500" : "bg-slate-700"
          }`}
        />
      </div>
      {label && <p className="text-sm">{label}</p>}
    </div>
  );
};

export default StatusIndicator;
