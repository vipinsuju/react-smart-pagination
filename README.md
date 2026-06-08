# React Smart Pagination

A customizable React pagination component built with React, TypeScript, Vite, Tailwind CSS, and Vitest.

It supports controlled page state, first/previous/next/last controls, middle page ranges, accessible ellipsis dots, derived page counts, custom labels, theme tokens, custom class slots, and full custom item rendering.

## Install

```bash
npm install react-smart-pagination-kit
```

Import the component and default styles:

```tsx
import { Pagination } from "react-smart-pagination-kit";
import "react-smart-pagination-kit/style.css";
```

## Usage

```tsx
import { useState } from "react";
import { Pagination } from "react-smart-pagination-kit";
import "react-smart-pagination-kit/style.css";

export function ProductsPagination() {
  const [page, setPage] = useState(5);

  return (
    <Pagination
      page={page}
      totalPages={10}
      onPageChange={setPage}
      siblingCount={1}
      boundaryCount={1}
    />
  );
}
```

For `totalPages={10}` and `page={5}`, the default range is:

```txt
1 ... 4 5 6 ... 10
```

## Derive Pages From Items

```tsx
<Pagination
  page={page}
  totalItems={245}
  pageSize={20}
  onPageChange={setPage}
/>
```

## Theme Customization

Use the `theme` prop to customize colors, spacing, radius, typography, shadows, hover states, focus rings, and disabled states:

```tsx
<Pagination
  page={page}
  totalPages={10}
  onPageChange={setPage}
  theme={{
    accentColor: "#7c3aed",
    accentContrastColor: "#ffffff",
    activeBackgroundColor: "#7c3aed",
    activeBorderColor: "#6d28d9",
    activeTextColor: "#ffffff",
    borderColor: "#ddd6fe",
    controlBackgroundColor: "#ffffff",
    controlShadow: "0 6px 18px rgba(88, 28, 135, 0.12)",
    controlSize: "2.75rem",
    disabledOpacity: 0.42,
    ellipsisColor: "#7e22ce",
    focusRingColor: "rgba(124, 58, 237, 0.22)",
    fontWeight: 800,
    gap: "0.5rem",
    hoverBackgroundColor: "#f5f3ff",
    hoverBorderColor: "#7c3aed",
    hoverTextColor: "#6d28d9",
    paddingInline: "0.9rem",
    radius: "999px",
    textColor: "#2e1065",
  }}
/>
```

You can still override raw CSS variables through `style`; `style` wins over `theme` if both set the same token:

```tsx
<Pagination
  page={page}
  totalPages={10}
  onPageChange={setPage}
  style={{ "--rp-accent": "#0f766e" } as React.CSSProperties}
/>
```

## Class Customization

Use `classNames` to target every rendered slot:

```tsx
<Pagination
  page={page}
  totalPages={10}
  onPageChange={setPage}
  classNames={{
    root: "my-pagination",
    list: "my-pagination-list",
    item: "my-pagination-item",
    control: (item) => `my-control my-${item.type}`,
    page: "my-page",
    navigation: "my-arrow",
    ellipsis: "my-dots",
    active: "my-active-page",
    disabled: "my-disabled-control",
    first: "my-first",
    previous: "my-previous",
    next: "my-next",
    last: "my-last",
  }}
/>
```

The older `className`, `listClassName`, `itemClassName`, `controlClassName`, `activeClassName`, and `disabledClassName` props still work.

## Custom Rendering

```tsx
<Pagination
  page={page}
  totalPages={10}
  onPageChange={setPage}
  renderItem={(item, context) => {
    if (item.type === "ellipsis") {
      return <span className={context.controlClassName}>...</span>;
    }

    return (
      <button {...context.buttonProps}>
        {item.type === "page" ? `Page ${item.page}` : context.content}
      </button>
    );
  }}
/>
```

## Props

| Prop | Type | Default |
| --- | --- | --- |
| `page` | `number` | required |
| `onPageChange` | `(page: number) => void` | required |
| `totalPages` | `number` | `1` |
| `totalItems` | `number` | optional |
| `pageSize` | `number` | optional |
| `siblingCount` | `number` | `1` |
| `boundaryCount` | `number` | `1` |
| `showFirstLast` | `boolean` | `true` |
| `showPrevNext` | `boolean` | `true` |
| `hideWhenSinglePage` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `size` | `"sm" | "md" | "lg"` | `"md"` |
| `variant` | `"solid" | "soft" | "outline" | "ghost"` | `"solid"` |
| `shape` | `"square" | "rounded" | "pill"` | `"rounded"` |
| `theme` | `PaginationTheme` | optional |
| `classNames` | `PaginationClassNames` | optional |
| `labels` | `Partial<PaginationLabels>` | optional |
| `renderItem` | custom render function | optional |

## Theme Tokens

`theme` supports:

```ts
type PaginationTheme = {
  accentColor?: string;
  accentContrastColor?: string;
  activeBackgroundColor?: string;
  activeBorderColor?: string;
  activeShadow?: string;
  activeTextColor?: string;
  borderColor?: string;
  borderStyle?: string;
  borderWidth?: string;
  controlBackgroundColor?: string;
  controlHeight?: string;
  controlMinWidth?: string;
  controlShadow?: string;
  controlSize?: string;
  disabledOpacity?: number | string;
  ellipsisColor?: string;
  ellipsisMinWidth?: string;
  focusRingColor?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number | string;
  gap?: string;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  hoverShadow?: string;
  hoverTextColor?: string;
  hoverTransform?: string;
  lineHeight?: string;
  paddingInline?: string;
  radius?: string;
  textColor?: string;
  transitionDuration?: string;
};
```

## Scripts

```bash
npm run dev
npm run test:run
npm run build
```

`npm run build` creates the npm package output in `dist`.
