import type { CSSProperties } from "react";
import { PAGINATION_THEME_VARIABLES } from "./constants";
import { getPaginationLabels } from "./usePagination";
import type { PaginationItem, PaginationTheme, SlotClassName } from "./types";

export function getItemContent(
  item: PaginationItem,
  labels: ReturnType<typeof getPaginationLabels>,
) {
  if (item.type === "page") {
    return item.page;
  }

  if (item.type === "ellipsis") {
    return labels.ellipsis;
  }

  return labels[item.type];
}

export function resolveSlotClassName(
  slot: SlotClassName | undefined,
  item: PaginationItem,
) {
  if (!slot) {
    return undefined;
  }

  return typeof slot === "function" ? slot(item) : slot;
}

export function getThemeStyle(
  theme: PaginationTheme | undefined,
  style: CSSProperties | undefined,
) {
  if (!theme) {
    return style;
  }

  return {
    [PAGINATION_THEME_VARIABLES.accent]: theme.accentColor,
    [PAGINATION_THEME_VARIABLES.accentContrast]: theme.accentContrastColor,
    [PAGINATION_THEME_VARIABLES.activeBackground]: theme.activeBackgroundColor,
    [PAGINATION_THEME_VARIABLES.activeBorder]: theme.activeBorderColor,
    [PAGINATION_THEME_VARIABLES.activeShadow]: theme.activeShadow,
    [PAGINATION_THEME_VARIABLES.activeText]: theme.activeTextColor,
    [PAGINATION_THEME_VARIABLES.border]: theme.borderColor,
    [PAGINATION_THEME_VARIABLES.borderStyle]: theme.borderStyle,
    [PAGINATION_THEME_VARIABLES.borderWidth]: theme.borderWidth,
    [PAGINATION_THEME_VARIABLES.controlHeight]: theme.controlHeight,
    [PAGINATION_THEME_VARIABLES.controlMinWidth]: theme.controlMinWidth,
    [PAGINATION_THEME_VARIABLES.controlShadow]: theme.controlShadow,
    [PAGINATION_THEME_VARIABLES.controlSize]: theme.controlSize,
    [PAGINATION_THEME_VARIABLES.disabledOpacity]: theme.disabledOpacity,
    [PAGINATION_THEME_VARIABLES.ellipsisMinWidth]: theme.ellipsisMinWidth,
    [PAGINATION_THEME_VARIABLES.focus]: theme.focusRingColor,
    [PAGINATION_THEME_VARIABLES.fontFamily]: theme.fontFamily,
    [PAGINATION_THEME_VARIABLES.fontSize]: theme.fontSize,
    [PAGINATION_THEME_VARIABLES.fontWeight]: theme.fontWeight,
    [PAGINATION_THEME_VARIABLES.gap]: theme.gap,
    [PAGINATION_THEME_VARIABLES.hover]: theme.hoverBackgroundColor,
    [PAGINATION_THEME_VARIABLES.hoverBorder]: theme.hoverBorderColor,
    [PAGINATION_THEME_VARIABLES.hoverShadow]: theme.hoverShadow,
    [PAGINATION_THEME_VARIABLES.hoverText]: theme.hoverTextColor,
    [PAGINATION_THEME_VARIABLES.hoverTransform]: theme.hoverTransform,
    [PAGINATION_THEME_VARIABLES.lineHeight]: theme.lineHeight,
    [PAGINATION_THEME_VARIABLES.muted]: theme.ellipsisColor,
    [PAGINATION_THEME_VARIABLES.paddingInline]: theme.paddingInline,
    [PAGINATION_THEME_VARIABLES.radius]: theme.radius,
    [PAGINATION_THEME_VARIABLES.surface]: theme.controlBackgroundColor,
    [PAGINATION_THEME_VARIABLES.text]: theme.textColor,
    [PAGINATION_THEME_VARIABLES.transitionDuration]: theme.transitionDuration,
    ...style,
  } as CSSProperties;
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

