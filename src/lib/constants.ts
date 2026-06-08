import type {
  PaginationLabels,
  PaginationNavigationType,
  PaginationShape,
  PaginationSize,
  PaginationVariant,
} from "./types";

export const DEFAULT_PAGINATION_ARIA_LABEL = "Pagination";
export const DEFAULT_PAGINATION_SHAPE: PaginationShape = "rounded";
export const DEFAULT_PAGINATION_SIZE: PaginationSize = "md";
export const DEFAULT_PAGINATION_VARIANT: PaginationVariant = "solid";
export const ELLIPSIS_ARIA_LABEL = "More pages";

export const DEFAULT_PAGINATION_LABELS: PaginationLabels = {
  currentPage: (page) => `Page ${page}, current page`,
  ellipsis: "...",
  first: "<<",
  last: ">>",
  next: ">",
  page: (page) => `Go to page ${page}`,
  previous: "<",
};

export const PAGINATION_NAVIGATION_ARIA_LABELS: Record<
  PaginationNavigationType,
  string
> = {
  first: "Go to first page",
  last: "Go to last page",
  next: "Go to next page",
  previous: "Go to previous page",
};

export const PAGINATION_CLASS_NAMES = {
  active: "rp-active",
  control: "rp-control",
  disabled: "rp-disabled",
  item: "rp-item",
  list: "rp-list",
  root: "rp-pagination",
  type: {
    ellipsis: "rp-ellipsis",
    first: "rp-first",
    last: "rp-last",
    next: "rp-next",
    page: "rp-page",
    previous: "rp-previous",
  },
} as const;

export const PAGINATION_THEME_VARIABLES = {
  accent: "--rp-accent",
  accentContrast: "--rp-accent-contrast",
  activeBackground: "--rp-active-bg",
  activeBorder: "--rp-active-border",
  activeShadow: "--rp-active-shadow",
  activeText: "--rp-active-text",
  border: "--rp-border",
  borderStyle: "--rp-border-style",
  borderWidth: "--rp-border-width",
  controlHeight: "--rp-control-height",
  controlMinWidth: "--rp-control-min-width",
  controlShadow: "--rp-control-shadow",
  controlSize: "--rp-control-size",
  disabledOpacity: "--rp-disabled-opacity",
  ellipsisMinWidth: "--rp-ellipsis-min-width",
  focus: "--rp-focus",
  fontFamily: "--rp-font-family",
  fontSize: "--rp-font-size",
  fontWeight: "--rp-font-weight",
  gap: "--rp-gap",
  hover: "--rp-hover",
  hoverBorder: "--rp-hover-border",
  hoverShadow: "--rp-hover-shadow",
  hoverText: "--rp-hover-text",
  hoverTransform: "--rp-hover-transform",
  lineHeight: "--rp-line-height",
  muted: "--rp-muted",
  paddingInline: "--rp-padding-inline",
  radius: "--rp-radius",
  surface: "--rp-surface",
  text: "--rp-text",
  transitionDuration: "--rp-transition-duration",
} as const;

