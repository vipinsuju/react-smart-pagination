import { useEffect, useMemo, useState } from "react";
import { Pagination, getPaginationRange } from "./lib";

const variants = ["solid", "soft", "outline", "ghost"] as const;
const shapes = ["rounded", "pill", "square"] as const;

type Variant = (typeof variants)[number];
type Shape = (typeof shapes)[number];

function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function App() {
  const [currentPage, setCurrentPage] = useState(5);
  const [totalItems, setTotalItems] = useState(100);
  const [pageSize, setPageSize] = useState(10);
  const [siblingCount, setSiblingCount] = useState(1);
  const [boundaryCount, setBoundaryCount] = useState(1);
  const [variant, setVariant] = useState<Variant>("solid");
  const [shape, setShape] = useState<Shape>("rounded");
  const [accentColor, setAccentColor] = useState("#0f766e");
  const [textColor, setTextColor] = useState("#102033");
  const [surfaceColor, setSurfaceColor] = useState("#ffffff");

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const firstItem = (currentPage - 1) * pageSize;
  const pageRange = getPaginationRange({
    page: currentPage,
    totalPages,
    siblingCount,
    boundaryCount,
  });

  const rows = useMemo(
    () =>
      Array.from({ length: totalItems }, (_, index) => ({
        id: index + 1,
        title: `Record ${String(index + 1).padStart(3, "0")}`,
        owner: ["North", "South", "East", "West"][index % 4],
        status: ["Ready", "Queued", "Review"][index % 3],
      })),
    [totalItems],
  );

  const visibleRows = rows.slice(firstItem, firstItem + pageSize);

  useEffect(() => {
    setCurrentPage((page) => clampNumber(page, 1, totalPages));
  }, [totalPages]);

  return (
    <main className="min-h-screen bg-slate-50 text-ink">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ocean">
              React component
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              Smart pagination
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-panel">
            <Stat label="Page" value={`${currentPage}/${totalPages}`} />
            <Stat label="Rows" value={String(totalItems)} />
            <Stat label="Range" value={pageRange.join(" ")} />
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
            <div className="grid gap-4">
              <NumberField
                label="Total items"
                min={1}
                max={500}
                value={totalItems}
                onChange={(value) => setTotalItems(clampNumber(value, 1, 500))}
              />
              <NumberField
                label="Page size"
                min={1}
                max={50}
                value={pageSize}
                onChange={(value) => setPageSize(clampNumber(value, 1, 50))}
              />
              <NumberField
                label="Siblings"
                min={0}
                max={3}
                value={siblingCount}
                onChange={(value) => setSiblingCount(clampNumber(value, 0, 3))}
              />
              <NumberField
                label="Boundaries"
                min={0}
                max={2}
                value={boundaryCount}
                onChange={(value) => setBoundaryCount(clampNumber(value, 0, 2))}
              />
              <ColorField
                label="Accent"
                value={accentColor}
                onChange={setAccentColor}
              />
              <ColorField
                label="Text"
                value={textColor}
                onChange={setTextColor}
              />
              <ColorField
                label="Surface"
                value={surfaceColor}
                onChange={setSurfaceColor}
              />
              <Segmented
                label="Variant"
                options={variants}
                value={variant}
                onChange={setVariant}
              />
              <Segmented
                label="Shape"
                options={shapes}
                value={shape}
                onChange={setShape}
              />
            </div>
          </aside>

          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-panel">
            <div className="grid grid-cols-[88px_1fr_96px_96px] border-b border-slate-200 bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700">
              <span>ID</span>
              <span>Name</span>
              <span>Region</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-slate-100">
              {visibleRows.map((row) => (
                <div
                  className="grid grid-cols-[88px_1fr_96px_96px] px-4 py-3 text-sm text-slate-700"
                  key={row.id}
                >
                  <span className="font-semibold text-slate-500">#{row.id}</span>
                  <span className="font-medium text-slate-950">{row.title}</span>
                  <span>{row.owner}</span>
                  <span>{row.status}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm font-medium text-slate-600">
                Showing {firstItem + 1}-{Math.min(firstItem + pageSize, totalItems)}
              </p>
              <Pagination
                page={currentPage}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                siblingCount={siblingCount}
                boundaryCount={boundaryCount}
                variant={variant}
                shape={shape}
                theme={{
                  accentColor,
                  activeBackgroundColor: accentColor,
                  activeBorderColor: accentColor,
                  activeTextColor: "#ffffff",
                  controlBackgroundColor: surfaceColor,
                  focusRingColor: `${accentColor}33`,
                  hoverBackgroundColor: `${accentColor}12`,
                  hoverBorderColor: accentColor,
                  hoverTextColor: accentColor,
                  textColor,
                }}
                ariaLabel="Demo pagination"
              />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      <span>{label}</span>
      <div className="grid grid-cols-[40px_1fr] items-center gap-2">
        <input
          aria-label={`${label} color`}
          className="h-10 w-10 rounded-md border border-slate-300 bg-white p-1"
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <input
          className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium outline-none transition focus:border-ocean focus:ring-4 focus:ring-teal-100"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
        {label}
      </div>
      <div className="truncate text-base font-bold text-slate-950">{value}</div>
    </div>
  );
}

function NumberField({
  label,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      <span>{label}</span>
      <input
        className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium outline-none transition focus:border-ocean focus:ring-4 focus:ring-teal-100"
        min={min}
        max={max}
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="grid gap-2">
      <div className="text-sm font-semibold text-slate-700">{label}</div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            className={`h-9 rounded-md border px-2 text-sm font-semibold capitalize transition ${
              option === value
                ? "border-ocean bg-teal-50 text-ocean"
                : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
            }`}
            key={option}
            type="button"
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
