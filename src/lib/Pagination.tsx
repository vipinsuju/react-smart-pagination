import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import {
  DEFAULT_PAGINATION_ARIA_LABEL,
  DEFAULT_PAGINATION_SHAPE,
  DEFAULT_PAGINATION_SIZE,
  DEFAULT_PAGINATION_VARIANT,
  PAGINATION_CLASS_NAMES,
} from "./constants";
import {
  cx,
  getItemContent,
  getThemeStyle,
  resolveSlotClassName,
} from "./paginationComponentUtils";
import {
  getPaginationLabels,
  usePagination,
  type UsePaginationOptions,
} from "./usePagination";
import type {
  PaginationClassNames,
  PaginationItem,
  PaginationShape,
  PaginationSize,
  PaginationTheme,
  PaginationVariant,
  SlotClassName,
} from "./types";
import "./pagination.css";

export interface PaginationRenderContext {
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  content: ReactNode;
  controlClassName: string;
  itemClassName: string;
}

export interface PaginationProps extends UsePaginationOptions {
  ariaLabel?: string;
  activeClassName?: string;
  className?: string;
  classNames?: PaginationClassNames;
  controlClassName?: SlotClassName;
  disabledClassName?: string;
  hideWhenSinglePage?: boolean;
  itemClassName?: SlotClassName;
  listClassName?: string;
  onPageChange: (page: number) => void;
  renderItem?: (
    item: PaginationItem,
    context: PaginationRenderContext,
  ) => ReactNode;
  shape?: PaginationShape;
  size?: PaginationSize;
  style?: CSSProperties;
  theme?: PaginationTheme;
  variant?: PaginationVariant;
}

export function Pagination({
  activeClassName,
  ariaLabel = DEFAULT_PAGINATION_ARIA_LABEL,
  boundaryCount,
  className,
  classNames,
  controlClassName,
  disabled,
  disabledClassName,
  getItemAriaLabel,
  hideWhenSinglePage = false,
  itemClassName,
  labels,
  listClassName,
  onPageChange,
  page,
  pageSize,
  renderItem,
  shape = DEFAULT_PAGINATION_SHAPE,
  showFirstLast,
  showPrevNext,
  siblingCount,
  size = DEFAULT_PAGINATION_SIZE,
  style,
  theme,
  totalItems,
  totalPages,
  variant = DEFAULT_PAGINATION_VARIANT,
}: PaginationProps) {
  const resolvedLabels = getPaginationLabels(labels);
  const pagination = usePagination({
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
  });

  if (hideWhenSinglePage && pagination.totalPages <= 1) {
    return null;
  }

  const handleClick = (item: PaginationItem) => {
    if (item.type === "ellipsis" || item.disabled) {
      return;
    }

    if (item.type === "page" && item.selected) {
      return;
    }

    onPageChange(item.page);
  };

  return (
    <nav
      aria-label={ariaLabel}
      className={cx(PAGINATION_CLASS_NAMES.root, classNames?.root, className)}
      data-shape={shape}
      data-size={size}
      data-variant={variant}
      style={getThemeStyle(theme, style)}
    >
      <ul className={cx(PAGINATION_CLASS_NAMES.list, classNames?.list, listClassName)}>
        {pagination.items.map((item) => {
          const itemClasses = cx(
            PAGINATION_CLASS_NAMES.item,
            resolveSlotClassName(classNames?.item, item),
            resolveSlotClassName(itemClassName, item),
          );
          const controlClasses = cx(
            PAGINATION_CLASS_NAMES.control,
            PAGINATION_CLASS_NAMES.type[item.type],
            item.type === "page" &&
              item.selected &&
              PAGINATION_CLASS_NAMES.active,
            item.disabled && PAGINATION_CLASS_NAMES.disabled,
            item.type !== "page" &&
              item.type !== "ellipsis" &&
              resolveSlotClassName(classNames?.navigation, item),
            resolveSlotClassName(classNames?.[item.type], item),
            item.type === "page" &&
              resolveSlotClassName(classNames?.page, item),
            item.type === "page" &&
              item.selected &&
              resolveSlotClassName(classNames?.active, item),
            item.type === "page" && item.selected && activeClassName,
            item.disabled && resolveSlotClassName(classNames?.disabled, item),
            item.disabled && disabledClassName,
            resolveSlotClassName(classNames?.control, item),
            resolveSlotClassName(controlClassName, item),
          );
          const content = getItemContent(item, resolvedLabels);

          if (item.type === "ellipsis") {
            const context: PaginationRenderContext = {
              content,
              controlClassName: controlClasses,
              itemClassName: itemClasses,
            };

            return (
              <li className={itemClasses} key={item.key}>
                {renderItem ? (
                  renderItem(item, context)
                ) : (
                  <span aria-hidden="true" className={controlClasses}>
                    {content}
                  </span>
                )}
              </li>
            );
          }

          const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = {
            "aria-current":
              item.type === "page" && item.selected ? "page" : undefined,
            "aria-label": item.ariaLabel,
            className: controlClasses,
            disabled: item.disabled,
            onClick: () => handleClick(item),
            type: "button",
          };
          const context: PaginationRenderContext = {
            buttonProps,
            content,
            controlClassName: controlClasses,
            itemClassName: itemClasses,
          };

          return (
            <li className={itemClasses} key={item.key}>
              {renderItem ? (
                renderItem(item, context)
              ) : (
                <button {...buttonProps}>{content}</button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Pagination;
