// This file provides a registry index for component previews
import * as React from "react"

export const Index: Record<string, Record<string, any>> = {
  "8starlabs-ui": {
    "status-indicator": {
      name: "status-indicator",
      type: "registry:ui",
      files: [{
        path: "registry/8starlabs-ui/blocks/status-indicator.tsx",
        type: "registry:ui",
      }],
      component: React.lazy(() => import("@/registry/8starlabs-ui/blocks/status-indicator")),
    },
    "transport-badge": {
      name: "transport-badge",
      type: "registry:ui",
      files: [{
        path: "registry/8starlabs-ui/blocks/transport-badge.tsx",
        type: "registry:ui",
      }],
      component: React.lazy(() => import("@/registry/8starlabs-ui/blocks/transport-badge")),
    },
    "system-banner": {
      name: "system-banner",
      type: "registry:ui",
      files: [{
        path: "registry/8starlabs-ui/blocks/system-banner.tsx",
        type: "registry:ui",
      }],
      component: React.lazy(() => import("@/registry/8starlabs-ui/blocks/system-banner")),
    },
  },
}
