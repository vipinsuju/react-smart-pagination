import {
  ELLIPSIS_END,
  ELLIPSIS_START,
  type PaginationRangeItem,
} from "./types";

export interface PaginationRangeOptions {
  boundaryCount?: number;
  page: number;
  siblingCount?: number;
  totalPages: number;
}

export interface ResolveTotalPagesOptions {
  pageSize?: number;
  totalItems?: number;
  totalPages?: number;
}

export function resolveTotalPages({
  pageSize,
  totalItems,
  totalPages,
}: ResolveTotalPagesOptions) {
  if (typeof totalPages === "number") {
    return Math.max(1, Math.ceil(totalPages));
  }

  if (typeof totalItems === "number" && typeof pageSize === "number") {
    return Math.max(1, Math.ceil(totalItems / Math.max(1, pageSize)));
  }

  return 1;
}

export function clampPage(page: number, totalPages: number) {
  const normalizedTotal = Math.max(1, Math.ceil(totalPages));
  const normalizedPage = Number.isFinite(page) ? Math.ceil(page) : 1;

  return Math.min(Math.max(normalizedPage, 1), normalizedTotal);
}

export function getPaginationRange({
  boundaryCount = 1,
  page,
  siblingCount = 1,
  totalPages,
}: PaginationRangeOptions): PaginationRangeItem[] {
  const normalizedTotal = Math.max(1, Math.ceil(totalPages));
  const normalizedPage = clampPage(page, normalizedTotal);
  const normalizedSiblings = Math.max(0, Math.floor(siblingCount));
  const normalizedBoundaries = Math.max(0, Math.floor(boundaryCount));
  const totalVisibleNumbers = normalizedSiblings * 2 + normalizedBoundaries * 2 + 3;

  if (normalizedTotal <= totalVisibleNumbers) {
    return range(1, normalizedTotal);
  }

  const leftSiblingIndex = Math.max(
    normalizedPage - normalizedSiblings,
    normalizedBoundaries + 2,
  );
  const rightSiblingIndex = Math.min(
    normalizedPage + normalizedSiblings,
    normalizedTotal - normalizedBoundaries - 1,
  );
  const showLeftEllipsis = leftSiblingIndex > normalizedBoundaries + 2;
  const showRightEllipsis =
    rightSiblingIndex < normalizedTotal - normalizedBoundaries - 1;
  const leftBoundaryRange = range(1, normalizedBoundaries);
  const rightBoundaryRange = range(
    normalizedTotal - normalizedBoundaries + 1,
    normalizedTotal,
  );

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = normalizedBoundaries + normalizedSiblings * 2 + 2;

    return [
      ...range(1, leftItemCount),
      ELLIPSIS_END,
      ...rightBoundaryRange,
    ];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = normalizedBoundaries + normalizedSiblings * 2 + 2;

    return [
      ...leftBoundaryRange,
      ELLIPSIS_START,
      ...range(normalizedTotal - rightItemCount + 1, normalizedTotal),
    ];
  }

  return [
    ...leftBoundaryRange,
    ELLIPSIS_START,
    ...range(leftSiblingIndex, rightSiblingIndex),
    ELLIPSIS_END,
    ...rightBoundaryRange,
  ];
}

function range(start: number, end: number) {
  if (end < start) {
    return [];
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

