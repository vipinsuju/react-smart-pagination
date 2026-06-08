import { useMemo } from "react";
import {
  DEFAULT_PAGINATION_LABELS,
  ELLIPSIS_ARIA_LABEL,
  PAGINATION_NAVIGATION_ARIA_LABELS,
} from "./constants";
import {
  ELLIPSIS_END,
  ELLIPSIS_START,
  type PaginationEllipsisItem,
  type PaginationItem,
  type PaginationLabels,
  type PaginationNavigationItem,
  type PaginationNavigationType,
  type PaginationPageItem,
} from "./types";
import {
  clampPage,
  getPaginationRange,
  resolveTotalPages,
  type ResolveTotalPagesOptions,
} from "./paginationRange";

export interface UsePaginationOptions extends ResolveTotalPagesOptions {
  boundaryCount?: number;
  disabled?: boolean;
  getItemAriaLabel?: (item: PaginationItem) => string;
  labels?: Partial<PaginationLabels>;
  page: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  siblingCount?: number;
}

export interface UsePaginationResult {
  items: PaginationItem[];
  page: number;
  totalPages: number;
}

type PaginationItemDraft =
  | Omit<PaginationEllipsisItem, "ariaLabel">
  | Omit<PaginationNavigationItem, "ariaLabel">
  | Omit<PaginationPageItem, "ariaLabel">;

export function getPaginationLabels(labels?: Partial<PaginationLabels>) {
  return { ...DEFAULT_PAGINATION_LABELS, ...labels };
}

export function usePagination({
  boundaryCount = 1,
  disabled = false,
  getItemAriaLabel,
  labels,
  page,
  pageSize,
  showFirstLast = true,
  showPrevNext = true,
  siblingCount = 1,
  totalItems,
  totalPages,
}: UsePaginationOptions): UsePaginationResult {
  return useMemo(() => {
    const resolvedTotalPages = resolveTotalPages({
      pageSize,
      totalItems,
      totalPages,
    });
    const currentPage = clampPage(page, resolvedTotalPages);
    const resolvedLabels = getPaginationLabels(labels);
    const decorate = (item: PaginationItemDraft) => {
      const itemWithFallback = { ...item, ariaLabel: "" } as PaginationItem;

      return {
        ...item,
        ariaLabel:
          getItemAriaLabel?.(itemWithFallback) ??
          getDefaultAriaLabel(itemWithFallback, resolvedLabels),
      } as PaginationItem;
    };
    const items: PaginationItem[] = [];

    if (showFirstLast) {
      items.push(
        decorate({
          disabled: disabled || currentPage === 1,
          key: "first",
          page: 1,
          selected: false,
          type: "first",
        }),
      );
    }

    if (showPrevNext) {
      items.push(
        decorate({
          disabled: disabled || currentPage === 1,
          key: "previous",
          page: Math.max(1, currentPage - 1),
          selected: false,
          type: "previous",
        }),
      );
    }

    getPaginationRange({
      boundaryCount,
      page: currentPage,
      siblingCount,
      totalPages: resolvedTotalPages,
    }).forEach((rangeItem) => {
      if (rangeItem === ELLIPSIS_START || rangeItem === ELLIPSIS_END) {
        items.push(
          decorate({
            direction: rangeItem === ELLIPSIS_START ? "start" : "end",
            disabled: true,
            key: rangeItem,
            selected: false,
            type: "ellipsis",
          }),
        );

        return;
      }

      items.push(
        decorate({
          disabled,
          key: `page-${rangeItem}`,
          page: rangeItem,
          selected: rangeItem === currentPage,
          type: "page",
        }),
      );
    });

    if (showPrevNext) {
      items.push(
        decorate({
          disabled: disabled || currentPage === resolvedTotalPages,
          key: "next",
          page: Math.min(resolvedTotalPages, currentPage + 1),
          selected: false,
          type: "next",
        }),
      );
    }

    if (showFirstLast) {
      items.push(
        decorate({
          disabled: disabled || currentPage === resolvedTotalPages,
          key: "last",
          page: resolvedTotalPages,
          selected: false,
          type: "last",
        }),
      );
    }

    return {
      items,
      page: currentPage,
      totalPages: resolvedTotalPages,
    };
  }, [
    boundaryCount,
    disabled,
    getItemAriaLabel,
    labels,
    page,
    pageSize,
    showFirstLast,
    showPrevNext,
    siblingCount,
    totalItems,
    totalPages,
  ]);
}

function getDefaultAriaLabel(item: PaginationItem, labels: PaginationLabels) {
  if (item.type === "page") {
    return item.selected ? labels.currentPage(item.page) : labels.page(item.page);
  }

  if (item.type === "ellipsis") {
    return ELLIPSIS_ARIA_LABEL;
  }

  return PAGINATION_NAVIGATION_ARIA_LABELS[item.type];
}
