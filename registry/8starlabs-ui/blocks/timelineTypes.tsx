import { ReactElement } from "react";

export interface TimelineItemData {
  id: number;
  title: string;
  description: string;
  date: Date;
  highlight?: boolean;
}

export interface TimelineItemProps {
  index?: number;
  dateDisplayFormat?: "day" | "month" | "year";
  content: TimelineItemData;
  alternating?: boolean;
  circleSize?: number;
  circleColor?: string;
  circleBorderColor?: string;
  circleThickness?: number;
}

export interface TimelineProps {
  children: ReactElement<TimelineItemProps>[];

  title?: string;
  dateDisplayFormat?: "day" | "month" | "year";
  alternating?: boolean;

  lineColor?: string;
  lineThickness?: number;

  circleSize?: number;
  circleColor?: string;
  circleBorderColor?: string;
  circleThickness?: number;
}

export interface TimelineItemCardProps {
  isAbove: boolean;
  content: TimelineItemData;
  dateDisplayFormat: "day" | "month" | "year";
}
