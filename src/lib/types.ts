import type { ReactNode } from "react";

export const ELLIPSIS_START = "ellipsis-start" as const;
export const ELLIPSIS_END = "ellipsis-end" as const;

export type PaginationRangeItem =
  | number
  | typeof ELLIPSIS_START
  | typeof ELLIPSIS_END;

export type PaginationNavigationType = "first" | "previous" | "next" | "last";
export type PaginationShape = "pill" | "rounded" | "square";
export type PaginationSize = "lg" | "md" | "sm";
export type PaginationVariant = "ghost" | "outline" | "soft" | "solid";

export type PaginationThemeValue = number | string;

export interface PaginationTheme {
  accentColor?: PaginationThemeValue;
  accentContrastColor?: PaginationThemeValue;
  activeBackgroundColor?: PaginationThemeValue;
  activeBorderColor?: PaginationThemeValue;
  activeShadow?: PaginationThemeValue;
  activeTextColor?: PaginationThemeValue;
  borderColor?: PaginationThemeValue;
  borderStyle?: PaginationThemeValue;
  borderWidth?: PaginationThemeValue;
  controlBackgroundColor?: PaginationThemeValue;
  controlHeight?: PaginationThemeValue;
  controlMinWidth?: PaginationThemeValue;
  controlShadow?: PaginationThemeValue;
  controlSize?: PaginationThemeValue;
  disabledOpacity?: PaginationThemeValue;
  ellipsisColor?: PaginationThemeValue;
  ellipsisMinWidth?: PaginationThemeValue;
  focusRingColor?: PaginationThemeValue;
  fontFamily?: PaginationThemeValue;
  fontSize?: PaginationThemeValue;
  fontWeight?: PaginationThemeValue;
  gap?: PaginationThemeValue;
  hoverBackgroundColor?: PaginationThemeValue;
  hoverBorderColor?: PaginationThemeValue;
  hoverShadow?: PaginationThemeValue;
  hoverTextColor?: PaginationThemeValue;
  hoverTransform?: PaginationThemeValue;
  lineHeight?: PaginationThemeValue;
  paddingInline?: PaginationThemeValue;
  radius?: PaginationThemeValue;
  textColor?: PaginationThemeValue;
  transitionDuration?: PaginationThemeValue;
}

export interface PaginationLabels {
  currentPage: (page: number) => string;
  ellipsis: ReactNode;
  first: ReactNode;
  last: ReactNode;
  next: ReactNode;
  page: (page: number) => string;
  previous: ReactNode;
}

export interface BasePaginationItem {
  ariaLabel: string;
  disabled: boolean;
  key: string;
  selected: boolean;
}

export interface PaginationPageItem extends BasePaginationItem {
  page: number;
  selected: boolean;
  type: "page";
}

export interface PaginationEllipsisItem extends BasePaginationItem {
  direction: "end" | "start";
  disabled: true;
  selected: false;
  type: "ellipsis";
}

export interface PaginationNavigationItem extends BasePaginationItem {
  page: number;
  selected: false;
  type: PaginationNavigationType;
}

export type PaginationItem =
  | PaginationEllipsisItem
  | PaginationNavigationItem
  | PaginationPageItem;

export type SlotClassName =
  | string
  | ((item: PaginationItem) => string | undefined);

export interface PaginationClassNames {
  active?: SlotClassName;
  control?: SlotClassName;
  disabled?: SlotClassName;
  ellipsis?: SlotClassName;
  first?: SlotClassName;
  item?: SlotClassName;
  last?: SlotClassName;
  list?: string;
  navigation?: SlotClassName;
  next?: SlotClassName;
  page?: SlotClassName;
  previous?: SlotClassName;
  root?: string;
}
