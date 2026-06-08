import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "../lib";

describe("Pagination", () => {
  it("renders middle pages with ellipsis dots for ten pages", () => {
    render(<Pagination page={5} totalPages={10} onPageChange={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Go to page 4" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Page 5, current page" }),
    ).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Go to page 6" })).toBeInTheDocument();
    expect(screen.getAllByText("...")).toHaveLength(2);
  });

  it("calls onPageChange when a user selects another page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination page={5} totalPages={10} onPageChange={onPageChange} />);

    await user.click(screen.getByRole("button", { name: "Go to next page" }));

    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("does not call onPageChange for the selected page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination page={5} totalPages={10} onPageChange={onPageChange} />);

    await user.click(screen.getByRole("button", { name: "Page 5, current page" }));

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("disables previous navigation on the first page", () => {
    render(<Pagination page={1} totalPages={10} onPageChange={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Go to first page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Go to previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Go to next page" })).toBeEnabled();
  });

  it("supports derived totals from totalItems and pageSize", () => {
    render(
      <Pagination
        page={3}
        pageSize={10}
        totalItems={95}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Go to page 10" })).toBeInTheDocument();
  });

  it("can be hidden for a single page", () => {
    const { container } = render(
      <Pagination
        hideWhenSinglePage
        page={1}
        totalPages={1}
        onPageChange={vi.fn()}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("allows custom labels", () => {
    render(
      <Pagination
        labels={{
          next: "Next",
          page: (page) => `Open page ${page}`,
          previous: "Previous",
        }}
        page={2}
        totalPages={3}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Open page 3" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to next page" })).toHaveTextContent(
      "Next",
    );
  });

  it("applies theme tokens as CSS variables", () => {
    render(
      <Pagination
        page={2}
        totalPages={4}
        onPageChange={vi.fn()}
        theme={{
          accentColor: "#7c3aed",
          activeBackgroundColor: "#6d28d9",
          controlSize: "3rem",
          disabledOpacity: 0.35,
          focusRingColor: "rgba(124, 58, 237, 0.22)",
          hoverBackgroundColor: "#f5f3ff",
          radius: "999px",
          textColor: "#2e1065",
        }}
      />,
    );

    const navigation = screen.getByRole("navigation", { name: "Pagination" });

    expect(navigation).toHaveStyle({
      "--rp-accent": "#7c3aed",
      "--rp-active-bg": "#6d28d9",
      "--rp-control-size": "3rem",
      "--rp-disabled-opacity": "0.35",
      "--rp-focus": "rgba(124, 58, 237, 0.22)",
      "--rp-hover": "#f5f3ff",
      "--rp-radius": "999px",
      "--rp-text": "#2e1065",
    });
  });

  it("applies classNames to every slot", () => {
    render(
      <Pagination
        classNames={{
          active: "active-slot",
          control: "control-slot",
          disabled: "disabled-slot",
          ellipsis: "ellipsis-slot",
          first: "first-slot",
          item: "item-slot",
          list: "list-slot",
          navigation: "navigation-slot",
          next: "next-slot",
          page: "page-slot",
          root: "root-slot",
        }}
        page={1}
        totalPages={10}
        onPageChange={vi.fn()}
      />,
    );

    const navigation = screen.getByRole("navigation", { name: "Pagination" });
    const list = navigation.querySelector("ul");
    const currentPage = screen.getByRole("button", {
      name: "Page 1, current page",
    });
    const firstButton = screen.getByRole("button", { name: "Go to first page" });
    const nextButton = screen.getByRole("button", { name: "Go to next page" });
    const ellipsis = screen.getByText("...");

    expect(navigation).toHaveClass("root-slot");
    expect(list).toHaveClass("list-slot");
    expect(currentPage.closest("li")).toHaveClass("item-slot");
    expect(currentPage).toHaveClass("control-slot", "page-slot", "active-slot");
    expect(firstButton).toHaveClass(
      "control-slot",
      "disabled-slot",
      "first-slot",
      "navigation-slot",
    );
    expect(nextButton).toHaveClass("next-slot", "navigation-slot");
    expect(ellipsis).toHaveClass("ellipsis-slot");
  });
});
