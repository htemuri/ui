import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactElement
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { clsx } from "clsx";
import {
  TimelineItemData,
  TimelineItemProps,
  TimelineProps,
  TimelineItemCardProps
} from "./timelineTypes";

// Sample data structure for the timeline items (now using the defined type)
const timelineData: TimelineItemData[] = [
  {
    id: 1,
    title: "Project Start",
    description: "Initial planning and requirement gathering.",
    date: new Date("2023-01-01")
  },
  {
    id: 2,
    title: "Phase 1 Complete",
    description: "Core functionality and basic architecture established.",
    date: new Date("2023-02-01")
  },
  {
    id: 3,
    title: "Midpoint Review",
    description: "Testing, feedback integration, and risk assessment.",
    date: new Date("2023-03-01"),
    highlight: true
  },
  {
    id: 4,
    title: "Deployment",
    description: "Final release candidate pushed to production servers.",
    date: new Date("2023-04-01")
  },
  {
    id: 5,
    title: "Post-Launch Audit",
    description: "Monitoring performance and collecting user feedback.",
    date: new Date("2023-05-01")
  }
];

function TimelineItemCard({
  isAbove,
  content,
  dateDisplayFormat
}: TimelineItemCardProps) {
  let dateStr = "";
  switch (dateDisplayFormat) {
    case "day":
      let day = content.date.getDate().toString().padStart(2, "0");
      let month = content.date.toLocaleString("default", { month: "short" });
      let year = content.date.getFullYear();
      dateStr = `${day} ${month} ${year}`;
      break;
    case "month":
      dateStr = content.date.toLocaleString("default", {
        month: "short",
        year: "numeric"
      });
      break;
    case "year":
      dateStr = content.date.getFullYear().toString();
      break;
  }

  return (
    <div
      className={clsx(
        "absolute min-w-60 border-2 p-2 rounded-sm bg-white shadow-sm gap-2 flex flex-col items-start",
        isAbove ? "bottom-full mb-2" : "top-full mt-2",
        content.highlight ? "border-red-500" : "border-gray-600"
      )}
    >
      <div className="text-sm text-gray-500">{dateStr}</div>
      <div className="font-semibold">{content.title}</div>
      <div className="text-sm">{content.description}</div>
    </div>
  );
}

function TimelineItem({
  index,
  content,
  dateDisplayFormat,
  alternating,
  circleSize,
  circleColor,
  circleBorderColor,
  circleThickness
}: TimelineItemProps) {
  const isAbove = alternating ? index! % 2 === 0 : true;

  // Horizontal Layout
  return (
    <div className={`relative flex flex-col items-center`}>
      <TimelineItemCard
        isAbove={isAbove}
        content={content}
        dateDisplayFormat={dateDisplayFormat!}
      />
      <div
        className="rounded-full"
        style={{
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          backgroundColor: circleColor,
          borderColor: content.highlight ? "red" : circleBorderColor,
          borderWidth: `${circleThickness}px`
        }}
      />
    </div>
  );
}

function Timeline({
  children,
  title,
  dateDisplayFormat = "day",
  alternating = false,
  lineColor = "#9CA3AF",
  lineThickness = 5,
  circleSize = 24,
  circleColor = "#FFFFFF",
  circleBorderColor = "#9CA3AF",
  circleThickness = 5
}: TimelineProps) {
  return (
    <div className="max-w-6xl mx-auto font-sans">
      <div className="text-2xl font-bold text-center text-gray-800 mb-40">
        {title}
      </div>
      <div
        className={`flex flex-row justify-between items-center gap-40 px-20 rounded`}
        style={{
          height: `${lineThickness}px`,
          backgroundColor: lineColor
        }}
      >
        {children.map((child, index) =>
          cloneElement(child, {
            index,
            dateDisplayFormat,
            alternating,
            circleSize,
            circleColor,
            circleBorderColor,
            circleThickness
          })
        )}
      </div>
    </div>
  );
}

function TimelineDemo() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-white">
      <Timeline
        title="Project Timeline"
        dateDisplayFormat="day"
        alternating={true}
        // lineColor="#EB34D2"
        // lineThickness={9}
        // circleSize={40}
        // circleThickness={10}
        // circleColor="lightGreen"
        // circleBorderColor="#3492eb"
      >
        {timelineData.map((item) => (
          <TimelineItem key={item.id} content={item} />
        ))}
      </Timeline>
    </div>
  );
}

export default TimelineDemo;
