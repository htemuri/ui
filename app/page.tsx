import * as React from "react";
import StatusIndicator from "@/registry/8starlabs-ui/blocks/pulse";

export default function Home() {
  return (
    <div className="max-w-10xl  px-6 sm:px-16  mx-auto flex flex-col min-h-svh py-8 gap-8">
      <StatusIndicator status="success" label="Success" />
      <StatusIndicator status="warning" label="Warning" />
      <StatusIndicator status="error" label="Error" />
    </div>
  );
}
