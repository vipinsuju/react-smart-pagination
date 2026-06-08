import { describe, expect, it } from "vitest";
import {
  ELLIPSIS_END,
  ELLIPSIS_START,
  clampPage,
  getPaginationRange,
  resolveTotalPages,
} from "../lib";

describe("getPaginationRange", () => {
  it("shows middle pages and both ellipses for ten pages", () => {
    expect(
      getPaginationRange({
        page: 5,
        totalPages: 10,
      }),
    ).toEqual([1, ELLIPSIS_START, 4, 5, 6, ELLIPSIS_END, 10]);
  });

  it("shows the early range without a leading ellipsis", () => {
    expect(
      getPaginationRange({
        page: 1,
        totalPages: 10,
      }),
    ).toEqual([1, 2, 3, 4, 5, ELLIPSIS_END, 10]);
  });

  it("shows the late range without a trailing ellipsis", () => {
    expect(
      getPaginationRange({
        page: 10,
        totalPages: 10,
      }),
    ).toEqual([1, ELLIPSIS_START, 6, 7, 8, 9, 10]);
  });

  it("shows every page when the range fits", () => {
    expect(getPaginationRange({ page: 3, totalPages: 5 })).toEqual([
      1,
      2,
      3,
      4,
      5,
    ]);
  });

  it("respects wider sibling and boundary counts", () => {
    expect(
      getPaginationRange({
        boundaryCount: 2,
        page: 6,
        siblingCount: 2,
        totalPages: 15,
      }),
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, ELLIPSIS_END, 14, 15]);
  });
});

describe("pagination utilities", () => {
  it("derives total pages from item count and page size", () => {
    expect(resolveTotalPages({ totalItems: 101, pageSize: 10 })).toBe(11);
  });

  it("clamps invalid pages into a valid range", () => {
    expect(clampPage(99, 10)).toBe(10);
    expect(clampPage(-4, 10)).toBe(1);
    expect(clampPage(Number.NaN, 10)).toBe(1);
  });
});
