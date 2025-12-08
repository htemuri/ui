import {
  Children,
  cloneElement,
  CSSProperties,
  HTMLAttributes,
  ReactElement
} from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const variantStyles: Record<
  string,
  { dot: string; branch: string; card: string }
> = {
  default: {
    dot: "border-primary bg-background",
    branch: "bg-primary",
    // Uses 'border-primary' to make it stand out in Dark Mode (White)
    card: "border-primary bg-card"
  },
  success: {
    dot: "border-emerald-500 bg-emerald-500",
    branch: "bg-emerald-500",
    card: "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
  },
  warning: {
    dot: "border-amber-500 bg-amber-500",
    branch: "bg-amber-500",
    card: "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20"
  },
  destructive: {
    // Renamed from 'error' to match Shadcn
    dot: "border-destructive bg-destructive",
    branch: "bg-destructive",
    card: "border-destructive bg-destructive/10"
  },
  info: {
    dot: "border-sky-500 bg-sky-500",
    branch: "bg-sky-500",
    card: "border-sky-500 bg-sky-50/50 dark:bg-sky-950/20"
  }
};

const timelineDotVariants = cva(
  "h-4 w-4 rounded-full border-2 bg-background z-10 box-border", // Base styles
  {
    variants: {
      variant: {
        default: variantStyles.default.dot,
        success: variantStyles.success.dot,
        warning: variantStyles.warning.dot,
        destructive: variantStyles.destructive.dot,
        info: variantStyles.info.dot
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

const timelineItemVariants = cva(
  "flex flex-col border rounded-md p-4 text-card-foreground shadow-sm transition-all", // Base card styles
  {
    variants: {
      variant: {
        default: variantStyles.default.card,
        success: variantStyles.success.card,
        warning: variantStyles.warning.card,
        destructive: variantStyles.destructive.card,
        info: variantStyles.info.card
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

const timelineBranchVariants = cva("", {
  variants: {
    variant: {
      default: variantStyles.default.branch,
      success: variantStyles.success.branch,
      warning: variantStyles.warning.branch,
      destructive: variantStyles.destructive.branch,
      info: variantStyles.info.branch
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

const timelineLayoutVariants = cva("grid relative", {
  variants: {
    orientation: {
      horizontal: "grid-flow-col grid-rows-[min-content_2rem_min-content]",
      vertical: "grid-cols-[1fr_2rem_1fr] auto-rows-min"
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
});

const timelineItemContainerVariants = cva("flex relative", {
  variants: {
    orientation: {
      horizontal: "w-full justify-center",
      vertical: "h-full items-center" // Vertical items need to center vertically
    },
    side: {
      // Logic for "Before Line" (on top / left) vs "After Line" (on bottom / right)
      before: "",
      after: ""
    }
  },
  compoundVariants: [
    // Horizontal + Top (Even)
    { orientation: "horizontal", side: "before", class: "items-end" },
    // Horizontal + Bottom (Odd)
    { orientation: "horizontal", side: "after", class: "items-start" },
    // Vertical + Left (Even)
    { orientation: "vertical", side: "before", class: "justify-end" },
    // Vertical + Right (Odd)
    { orientation: "vertical", side: "after", class: "justify-start" }
  ]
});

interface TimelineItemProps
  extends
    HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof timelineItemVariants> {
  date: Date;
  title: string;
  description?: string;
  index?: number;

  total?: number;
  cardWidth?: number;
  maxCardWidth?: number;

  alternating?: boolean;
  alignment?: "top/left" | "bottom/right";
  orientation?: "horizontal" | "vertical";
}

interface TimelineProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineLayoutVariants> {
  alternating?: boolean;
  alignment?: "top/left" | "bottom/right";

  horizItemSpacing?: number;
  horizItemWidth?: number;

  vertItemSpacing?: number;
  vertItemMaxWidth?: number;

  orientation: "horizontal" | "vertical";
}

export function Timeline({
  children,
  className,
  horizItemWidth = 220,
  horizItemSpacing = 130,
  vertItemSpacing = 100,
  vertItemMaxWidth = 400,
  alternating = true,
  alignment = "top/left",
  orientation = "horizontal",
  ...props
}: TimelineProps) {
  const isVertical = orientation === "vertical";

  const spillover = Math.max(0, (horizItemWidth - horizItemSpacing) / 2);
  const safePadding = spillover + 16;

  return (
    <div id="timeline-container" className={cn(className)} {...props}>
      <ul
        id="timeline-grid"
        className={timelineLayoutVariants({ orientation })}
        style={
          isVertical
            ? {
                gridAutoRows: `${vertItemSpacing}px` // Vertical Gap
              }
            : {
                gridAutoColumns: `${horizItemSpacing}px`, // Horizontal Spacing
                paddingLeft: `${safePadding}px`, // Bumper padding
                paddingRight: `${safePadding}px`
              }
        }
      >
        {Children.map(children, (child, index) =>
          cloneElement(child as ReactElement<any>, {
            index,
            orientation,
            total: Children.count(children),
            cardWidth: horizItemWidth,
            maxCardWidth: vertItemMaxWidth,
            alternating,
            alignment
          })
        )}
      </ul>
    </div>
  );
}

export function TimelineItem({
  className,
  variant,
  date,
  title,
  description,
  index = 0,
  total = 0,
  cardWidth,
  maxCardWidth,
  alternating,
  alignment,
  orientation,
  ...props
}: TimelineItemProps) {
  const isEven = index % 2 === 0;
  const isVertical = orientation === "vertical";

  // Determine "side" based on index
  const side = alternating
    ? isEven
      ? "before"
      : "after"
    : alignment === "top/left"
      ? "before"
      : "after";

  // Dynamic Grid Positioning
  const gridStyle: CSSProperties = isVertical
    ? {
        gridColumn: side === "before" ? 1 : 3,
        gridRow: index + 1
      }
    : {
        gridColumn: index + 1,
        gridRow: side === "before" ? 1 : 3
      };

  const cardStyle: CSSProperties = isVertical
    ? {
        maxWidth: `${maxCardWidth}px`
      }
    : {
        width: `${cardWidth}px`,
        minWidth: `${cardWidth}px`,
        maxWidth: `${cardWidth}px`
      };

  return (
    <>
      <li
        id={`timeline-item-${index}-container`}
        className={cn(
          timelineItemContainerVariants({ orientation, side }),
          className
        )}
        style={gridStyle}
        {...props}
      >
        <div
          id={`timeline-item-${index}`}
          style={cardStyle}
          className={cn(timelineItemVariants({ variant }), "shrink-0")}
        >
          <span className="text-xs text-muted-foreground">
            {dateFormatter.format(date)}
          </span>
          <h3 className="font-semibold mt-1">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </li>

      <li
        id={`timeline-item-${index}-middle`}
        className="relative flex items-center justify-center"
        style={
          isVertical
            ? { gridColumn: 2, gridRow: index + 1, height: "100%" }
            : { gridColumn: index + 1, gridRow: 2, width: "100%" }
        }
      >
        <div
          className={cn(
            "absolute bg-muted",
            index === 0
              ? isVertical
                ? "rounded-t-full"
                : "rounded-l-full"
              : "",
            index === total - 1
              ? isVertical
                ? "rounded-b-full"
                : "rounded-r-full"
              : "",
            isVertical ? "h-full w-1" : "w-full h-1"
          )}
          id={`timeline-item-${index}-line`}
        />

        <div
          className={cn(
            "absolute",
            timelineBranchVariants({ variant }),
            isVertical
              ? isEven
                ? "h-px w-4 left-0"
                : "h-px w-4 right-0"
              : isEven
                ? "w-px h-4 top-0"
                : "w-px h-4 bottom-0"
          )}
          id={`timeline-item-${index}-branch`}
        />

        <div
          className={cn(timelineDotVariants({ variant }))}
          id={`timeline-item-${index}-dot`}
        />
      </li>
    </>
  );
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric"
});

const timelineData: TimelineItemProps[] = [
  {
    title: "Project Kickoff",
    description:
      "Initial meeting with all stakeholders to define project scope.",
    date: new Date("2023-01-05"),
    variant: "info"
  },
  {
    title: "Requirements Gathering",
    description:
      "Collected requirements from the client, covering both functional and non-functional aspects. This took several sessions over multiple weeks and included detailed analysis.",
    date: new Date("2023-01-12"),
    variant: "success"
  },
  {
    title: "Design Phase",
    description: "Created wireframes, mockups, and system design diagrams.",
    date: new Date("2023-01-20")
  },
  {
    title:
      "Database Setup Extravaganza with Lots of Unnecessary Complexity for Testing Purposes Only",
    description:
      "Configured databases, tables, and initial seed data for testing. This included hundreds of tables, dozens of indexes, and a complicated schema that will never be used in production. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea nostrum officiis laborum debitis error hic omnis architecto, consectetur vitae atque, temporibus, alias minus a dolore voluptate sed quam ratione placeat!",
    date: new Date("2023-02-01"),
    variant: "destructive"
  }
];

export default function TimelineDemo() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Timeline
        orientation="horizontal"
        alignment="top/left"
        alternating={true}
        vertItemSpacing={150}
      >
        {timelineData.map((item, idx) => (
          <TimelineItem key={idx} {...item} />
        ))}
      </Timeline>
    </div>
  );
}
