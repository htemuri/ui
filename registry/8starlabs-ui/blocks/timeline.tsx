import {
  Children,
  cloneElement,
  HTMLAttributes,
  isValidElement,
  ReactElement
} from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export const timelineDotVariants = cva(
  "h-4 w-4 rounded-full border-2 bg-background z-10 box-border", // Base styles
  {
    variants: {
      variant: {
        default: "border-primary",
        success: "border-green-500 bg-green-500",
        warning: "border-amber-500 bg-amber-500",
        error: "border-red-500 bg-red-500",
        info: "border-blue-400 bg-blue-400"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export const timelineItemVariants = cva(
  "flex flex-col border rounded-md p-4 bg-card text-card-foreground shadow-sm", // Base card styles
  {
    variants: {
      variant: {
        default: "border-border",
        success: "border-green-500 shadow-md",
        warning: "border-amber-500 shadow-md",
        error: "border-red-500 shadow-md",
        info: "border-blue-400 shadow-md"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface TimelineItemProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineItemVariants> {
  date: Date;
  title: string;
  description?: string;
  index?: number;
  total?: number;
  cardWidth?: number;
  alternating?: boolean;
  alignment?: "top" | "bottom";
}

export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  alternating?: boolean;
  alignment?: "top" | "bottom";

  itemSpacing?: number;
  itemWidth?: number;
}

export function Timeline({
  children,
  className,
  itemWidth = 220,
  itemSpacing = 130,
  alternating = true,
  alignment = "top",
  ...props
}: TimelineProps) {
  const spillover = Math.max(0, (itemWidth - itemSpacing) / 2);
  const safePadding = spillover + 16; // 16px base padding

  return (
    <div
      className={cn("w-full overflow-x-auto py-8", className)}
      {...props}
      id="timeline-container"
    >
      <div
        id="timeline-grid"
        className="min-w-max grid relative"
        style={{
          gridAutoFlow: "column",
          gridAutoColumns: `${itemSpacing}px`,
          gridTemplateRows: "auto auto auto",
          paddingLeft: `${safePadding}px`,
          paddingRight: `${safePadding}px`
        }}
      >
        {Children.map(children, (child, index) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement<any>, {
                index,
                total: Children.count(children),
                cardWidth: itemWidth,
                alternating,
                alignment
              })
            : null
        )}
      </div>
    </div>
  );
}

export function TimelineItem({
  className,
  variant = "default",
  date,
  title,
  description,
  index = 0,
  total = 0,
  cardWidth = 220,
  alternating = true,
  alignment = "top",
  ...props
}: TimelineItemProps) {
  const isOnTop = alternating ? index % 2 === 0 : alignment === "top";

  return (
    <>
      <div
        id={`timeline-item-${index}-container`}
        className={cn(
          "flex w-full justify-center",
          isOnTop ? "items-end pb-2" : "items-start pt-2"
        )}
        style={{
          gridColumn: index + 1,
          gridRow: isOnTop ? 1 : 3,
          overflow: "visible"
        }}
      >
        <div
          id={`timeline-item-${index}`}
          style={{
            width: `${cardWidth}px`,
            minWidth: `${cardWidth}px`
          }}
          className={cn(
            timelineItemVariants({ variant }),
            "shrink-0",
            className
          )}
          {...props}
        >
          <span className="text-xs text-muted-foreground">
            {dateFormatter.format(date)}
          </span>
          <h3 className="font-semibold leading-none mt-1">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </div>

      <div
        id={`timeline-item-${index}-middle`}
        className="relative flex items-center justify-center"
        style={{
          gridColumn: index + 1,
          gridRow: 2
        }}
      >
        <div
          className="absolute w-full h-1 bg-muted"
          id={`timeline-item-${index}-line`}
        />

        <div
          className={cn(timelineDotVariants({ variant }))}
          id={`timeline-item-${index}-dot`}
        />
      </div>
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
    date: new Date("2023-02-01")
  },
  {
    title:
      "Backend Development. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea nostrum officiis laborum debitis error hic omnis architecto, consectetur vitae atque, temporibus, alias minus a dolore voluptate sed quam ratione placeat!",
    description:
      "Implemented API endpoints, authentication, and core business logic.",
    date: new Date("2023-02-15")
  },
  {
    title: "Frontend Development",
    description:
      "Built user interface components with responsive layouts, ensuring pixel-perfect alignment across all browsers, including Internet Explorer 11.",
    date: new Date("2023-02-28"),
    variant: "warning"
  },
  {
    title: "Integration Testing",
    description: "Tested interaction between backend and frontend modules.",
    date: new Date("2023-03-10")
  },
  {
    title: "Bug Fixing Marathon",
    description:
      "Resolved critical bugs discovered during testing, improving system stability. Some bugs were so obscure they only appeared once every 10,000 interactions.",
    date: new Date("2023-03-20"),
    variant: "error"
  },
  {
    title: "Client Review",
    description: "Presented working prototype to the client for feedback.",
    date: new Date("2023-03-25")
  },
  {
    title: "Performance Optimization",
    description: "Optimized queries and UI rendering for faster performance.",
    date: new Date("2023-04-01")
  },
  {
    title: "User Acceptance Testing",
    description:
      "Supported client testing sessions and logged user feedback. Some sessions included dozens of simultaneous users interacting with every feature imaginable.",
    date: new Date("2023-04-10")
  },
  {
    title: "Documentation",
    description: "Created technical documentation and user manuals.",
    date: new Date("2023-04-15")
  },
  {
    title: "Deployment Preparation",
    description: "Configured servers, CI/CD pipelines, and deployment scripts.",
    date: new Date("2023-04-20")
  },
  {
    title: "Go Live Celebration with Confetti and Fireworks",
    description:
      "Officially launched the system for production use. The team celebrated with a massive online party that included streaming music, confetti, and shoutouts.",
    date: new Date("2023-04-25"),
    variant: "success"
  },
  {
    title: "Post-Launch Monitoring",
    description:
      "Monitored system performance and error logs after deployment.",
    date: new Date("2023-04-30")
  },
  {
    title: "Feature Enhancement",
    description: "Started adding new requested features and improvements.",
    date: new Date("2023-05-05")
  },
  {
    title: "Security Audit",
    description:
      "Performed a comprehensive security review and fixed vulnerabilities.",
    date: new Date("2023-05-10")
  },
  {
    title: "Team Retrospective",
    description:
      "Held a meeting to discuss what went well and what could be improved.",
    date: new Date("2023-05-15")
  },
  {
    title: "Client Handoff",
    description:
      "Provided final deliverables and handed over source code to client.",
    date: new Date("2023-05-20")
  },
  {
    title: "Project Closure",
    description: "Archived project materials and formally closed the project.",
    date: new Date("2023-05-25")
  }
];

export default function TimelineDemo() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Timeline alternating={true} alignment="bottom">
        {timelineData.map((item, idx) => (
          <TimelineItem key={idx} {...item} />
        ))}
      </Timeline>
    </div>
  );
}
