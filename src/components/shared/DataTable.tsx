import { useMemo, useRef, useEffect, useState, useImperativeHandle, useCallback } from "react";
import classNames from "classnames";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import TableRowSkeleton from "./loaders/TableRowSkeleton";
import Loading from "./Loading";
import FileNotFound from "@/assets/svg/FileNotFound";
import { FaSort } from "react-icons/fa";
import { TbChevronLeft, TbChevronRight, TbRefresh } from "react-icons/tb";
import { RiResetLeftFill } from "react-icons/ri";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  ColumnSort,
  Row,
  CellContext,
} from "@tanstack/react-table";
import type { TableProps } from "@/components/ui/Table";
import type { SkeletonProps } from "@/components/ui/Skeleton";
import type { Ref, ChangeEvent, ReactNode } from "react";
import type { CheckboxProps } from "@/components/ui/Checkbox";

export type OnSortParam = { order: "asc" | "desc"; key: string | number };

type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  customNoDataIcon?: ReactNode;
  data?: unknown[];
  loading?: boolean;
  noData?: boolean;
  instanceId?: string;
  onCheckBoxChange?: (checked: boolean, row: T) => void;
  onIndeterminateCheckBoxChange?: (checked: boolean, rows: Row<T>[]) => void;
  onPaginationChange?: (page: number) => void;
  onSelectChange?: (num: number) => void;
  onSort?: (sort: OnSortParam) => void;
  pageSizes?: number[];
  selectable?: boolean;
  skeletonAvatarColumns?: number[];
  skeletonAvatarProps?: SkeletonProps;
  pagingData?: {
    total: number;
    pageIndex: number;
    pageSize: number;
  };
  rowClassName?: string;

  checkboxChecked?: (row: T) => boolean;
  indeterminateCheckboxChecked?: (row: Row<T>[]) => boolean;
  ref?: Ref<DataTableResetHandle | HTMLTableElement>;
  nextButtonTestId?: string;
  isPaginationEnabled?: boolean;
  testId?: string;
  disableHover?: boolean;
  stickyHeader?: boolean;
  maxHeight?: string | number;
} & TableProps;

type CheckBoxChangeEvent = ChangeEvent<HTMLInputElement>;

interface IndeterminateCheckboxProps extends Omit<CheckboxProps, "onChange"> {
  onChange: (event: CheckBoxChangeEvent) => void;
  indeterminate: boolean;
  onCheckBoxChange?: (event: CheckBoxChangeEvent) => void;
  onIndeterminateCheckBoxChange?: (event: CheckBoxChangeEvent) => void;
}

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const IndeterminateCheckbox = (props: IndeterminateCheckboxProps) => {
  const { indeterminate, onChange, onCheckBoxChange, onIndeterminateCheckBoxChange, ...rest } =
    props;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean" && ref.current) {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  const handleChange = (e: CheckBoxChangeEvent) => {
    onChange(e);
    onCheckBoxChange?.(e);
    onIndeterminateCheckBoxChange?.(e);
  };

  return <Checkbox ref={ref} className="mb-0" onChange={(_, e) => handleChange(e)} {...rest} />;
};

export type DataTableResetHandle = {
  resetSorting: () => void;
  resetSelected: () => void;
};

function DataTable<T>(props: DataTableProps<T>) {
  const {
    skeletonAvatarColumns,
    columns: columnsProp = [],
    data = [],
    customNoDataIcon,
    loading,
    noData,
    onCheckBoxChange,
    onIndeterminateCheckBoxChange,
    onPaginationChange,
    onSelectChange,
    onSort,
    pageSizes = [50, 100, 200, 500],
    selectable = false,
    skeletonAvatarProps,
    pagingData = {
      total: 0,
      pageIndex: 1,
      pageSize: 50,
    },
    checkboxChecked,
    indeterminateCheckboxChecked,
    instanceId = "data-table",
    ref,
    nextButtonTestId,
    isPaginationEnabled = true,
    testId,
    disableHover = false,
    stickyHeader,
    maxHeight,
    rowClassName,
    ...rest
  } = props;
  console.log("DataTable props", isPaginationEnabled);
  const { pageSize, pageIndex, total } = pagingData;

  const [sorting, setSorting] = useState<ColumnSort[] | null>(null);
  const [hoveredHeader, setHoveredHeader] = useState<string | null>(null);
  const [pageInputValue, setPageInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(pageIndex);
  const currentPageRef = useRef<number>(pageIndex);
  const isEnterPressed = useRef<boolean>(false);

  // Update currentPage when pageIndex changes from parent
  useEffect(() => {
    setCurrentPage(pageIndex);
    currentPageRef.current = pageIndex;
  }, [pageIndex]);

  // Update pageInputValue when pageIndex changes
  useEffect(() => {
    setPageInputValue(pageIndex.toString());
  }, [pageIndex]);

  // Refs for scroll synchronization
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);
  const headerTableRef = useRef<HTMLTableElement>(null);
  const bodyTableRef = useRef<HTMLTableElement>(null);
  const isScrollingSyncRef = useRef<boolean>(false);
  const [scrollbarWidth, setScrollbarWidth] = useState<number>(0);

  // Only sync from body to header (header doesn't have its own scroll)
  const syncHeaderPosition = useCallback((scrollLeft: number) => {
    if (headerScrollRef.current) {
      headerScrollRef.current.scrollLeft = scrollLeft;
    }
  }, []);

  const handleBodyScroll = useCallback(() => {
    if (isScrollingSyncRef.current || !bodyScrollRef.current) return;

    isScrollingSyncRef.current = true;
    const scrollLeft = bodyScrollRef.current.scrollLeft;

    // Sync header position to match body horizontal scroll
    syncHeaderPosition(scrollLeft);

    // Reset sync flag after a brief delay
    setTimeout(() => {
      isScrollingSyncRef.current = false;
    }, 0);
  }, [syncHeaderPosition]);

  // Calculate scrollbar width - for ultra-thin scrollbar
  const calculateScrollbarWidth = useCallback(() => {
    if (!bodyScrollRef.current) return 0;
    const element = bodyScrollRef.current;
    const calculatedWidth = element.offsetWidth - element.clientWidth;
    // For our ultra-thin scrollbar (3px), minimal impact on layout
    return calculatedWidth > 0 ? calculatedWidth : 0;
  }, []);

  // Simple width synchronization to ensure columns align
  const syncColumnWidths = useCallback(() => {
    if (!headerTableRef.current || !bodyTableRef.current) return;

    const headerTable = headerTableRef.current;
    const bodyTable = bodyTableRef.current;

    // Get all cells from header and first body row
    const headerCells = headerTable.querySelectorAll("th");
    const firstBodyRow = bodyTable.querySelector("tbody tr");

    if (!firstBodyRow || headerCells.length === 0) return;

    const bodyCells = firstBodyRow.querySelectorAll("td");

    if (headerCells.length !== bodyCells.length) return;

    // Calculate and apply consistent widths
    headerCells.forEach((headerCell, index) => {
      const bodyCell = bodyCells[index];
      if (!bodyCell) return;

      // Get the natural width from the body cell (which has content)
      const bodyWidth = bodyCell.getBoundingClientRect().width;
      const headerWidth = headerCell.getBoundingClientRect().width;

      // Use the larger of the two widths
      const targetWidth = Math.max(bodyWidth, headerWidth);
      const widthPx = `${targetWidth}px`;

      // Apply to both header and body cell
      headerCell.style.width = widthPx;
      headerCell.style.minWidth = widthPx;
      headerCell.style.maxWidth = widthPx;

      bodyCell.style.width = widthPx;
      bodyCell.style.minWidth = widthPx;
      bodyCell.style.maxWidth = widthPx;
    });

    // Apply same widths to all other body rows
    const allBodyRows = bodyTable.querySelectorAll("tbody tr");
    allBodyRows.forEach((row, rowIndex) => {
      if (rowIndex === 0) return; // Skip first row as it's already done

      const cells = row.querySelectorAll("td");
      cells.forEach((cell, cellIndex) => {
        const headerCell = headerCells[cellIndex];
        if (headerCell) {
          const width = headerCell.style.width;
          cell.style.width = width;
          cell.style.minWidth = width;
          cell.style.maxWidth = width;
        }
      });
    });
  }, []);

  const pageSizeOption = useMemo(
    () =>
      pageSizes.map((number) => ({
        value: number,
        label: `${number}`,
      })),
    [pageSizes]
  );

  useEffect(() => {
    if (Array.isArray(sorting)) {
      // Always have a sort order - default to "asc" if none
      const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "asc";
      const id = sorting.length > 0 ? sorting[0].id : "";
      onSort?.({ order: sortOrder, key: id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  const handleIndeterminateCheckBoxChange = (checked: boolean, rows: Row<T>[]) => {
    if (!loading) {
      onIndeterminateCheckBoxChange?.(checked, rows);
    }
  };

  const handleCheckBoxChange = (checked: boolean, row: T) => {
    if (!loading) {
      onCheckBoxChange?.(checked, row);
    }
  };

  const finalColumns: ColumnDef<T>[] = useMemo(() => {
    const columns = columnsProp;

    if (selectable) {
      return [
        {
          id: "select",
          maxSize: 50,
          header: ({ table }) => (
            <IndeterminateCheckbox
              checked={
                indeterminateCheckboxChecked
                  ? indeterminateCheckboxChecked(table.getRowModel().rows)
                  : table.getIsAllRowsSelected()
              }
              indeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              onIndeterminateCheckBoxChange={(e) => {
                handleIndeterminateCheckBoxChange(e.target.checked, table.getRowModel().rows);
              }}
            />
          ),
          cell: ({ row }) => (
            <IndeterminateCheckbox
              checked={checkboxChecked ? checkboxChecked(row.original) : row.getIsSelected()}
              disabled={!row.getCanSelect()}
              indeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
              onCheckBoxChange={(e) => handleCheckBoxChange(e.target.checked, row.original)}
            />
          ),
        },
        ...columns,
      ];
    }
    return columns;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnsProp, selectable, loading, checkboxChecked]);

  const table = useReactTable({
    data,
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    columns: finalColumns as ColumnDef<unknown | object | any[], any>[],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    onSortingChange: (sorter) => {
      setSorting(sorter as ColumnSort[]);
    },
    state: {
      sorting: sorting as ColumnSort[],
    },
  });

  // Sync header position with body scroll on mount and data changes
  useEffect(() => {
    const bodyEl = bodyScrollRef.current;

    if (!bodyEl) return;

    // Initial sync - make sure header starts at same position as body
    const initialSync = () => {
      if (!isScrollingSyncRef.current && bodyEl.scrollLeft !== undefined) {
        syncHeaderPosition(bodyEl.scrollLeft);
        // Update scrollbar width
        const width = calculateScrollbarWidth();
        setScrollbarWidth(width);
      }
    };

    initialSync();

    // Periodic sync to maintain alignment
    const intervalId = setInterval(() => {
      if (!isScrollingSyncRef.current) {
        syncHeaderPosition(bodyEl.scrollLeft);
        syncColumnWidths();
      }
    }, 100);

    // Sync column widths on mount and when data changes
    setTimeout(() => {
      syncColumnWidths();
    }, 10);

    // Add ResizeObserver to handle dynamic content changes
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(() => {
        syncColumnWidths();
      }, 5);
    });

    if (headerTableRef.current) resizeObserver.observe(headerTableRef.current);
    if (bodyTableRef.current) resizeObserver.observe(bodyTableRef.current);

    return () => {
      clearInterval(intervalId);
      resizeObserver.disconnect();
    };
  }, [table, syncHeaderPosition, syncColumnWidths, calculateScrollbarWidth]);

  const resetSorting = () => {
    table.resetSorting();
  };

  const resetSelected = () => {
    table.resetRowSelection(true);
  };

  useImperativeHandle(ref, () => ({
    resetSorting,
    resetSelected,
  }));

  const handlePaginationChange = (page: number) => {
    if (!loading) {
      resetSelected();
      setCurrentPage(page); // Update local state immediately
      currentPageRef.current = page; // Update ref immediately
      onPaginationChange?.(page);
    }
  };

  const handleRefresh = () => {
    if (!loading) {
      resetSelected();
      setCurrentPage(1); // Reset to page 1
      currentPageRef.current = 1; // Reset ref to page 1
      onSelectChange?.(100);
      onPaginationChange?.(1); // Go to page 1
    }
  };

  const handleSelectChange = (value?: number) => {
    if (!loading) {
      onSelectChange?.(Number(value));
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string or only numeric characters (no validation of range while typing)
    if (value === "" || /^\d*$/.test(value)) {
      setPageInputValue(value);
    }
  };

  const handlePageInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const pageNumber = parseInt(pageInputValue);
      const maxPage = Math.ceil(total / pageSize);

      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= maxPage) {
        isEnterPressed.current = true; // Set flag to prevent blur handler
        handlePaginationChange(pageNumber);
        setPageInputValue("");
      } else {
        // Reset to current page if invalid
        setPageInputValue("");
      }
    }
  };

  const handlePageInputBlur = () => {
    const pageNumber = parseInt(pageInputValue);
    const maxPage = Math.ceil(total / pageSize);

    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= maxPage) {
      handlePaginationChange(pageNumber);
    }
    setPageInputValue("");
  };

  const handleCustomSort = (headerId: string) => {
    if (loading) return;

    const currentSort = sorting?.find((s) => s.id === headerId);
    const newSorting = [
      {
        id: headerId,
        desc: currentSort ? !currentSort.desc : false, // Start with asc, then toggle
      },
    ];

    setSorting(newSorting);
  };

  return (
    <Loading loading={Boolean(loading && data.length !== 0)} type="cover">
      {stickyHeader ? (
        <div className="flex flex-col">
          {/* Header Container - No horizontal scroll, follows body */}
          <div
            ref={headerScrollRef}
            className="overflow-hidden flex-shrink-0 relative bg-white border-b border-gray-200"
            style={{
              paddingRight: scrollbarWidth > 0 ? `${scrollbarWidth}px` : "0px",
            }}
          >
            <div className="mx-auto" style={{ width: "fit-content", minWidth: "100%" }}>
              <Table {...rest} ref={headerTableRef} className="sticky-header-table">
                <THead className="bg-white text-gray-800 border-b border-gray-200 shadow-sm">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <Tr
                      key={headerGroup.id}
                      data-testid={testId ? testId : `table_row`}
                      className={rowClassName}
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <Th
                            key={header.id}
                            colSpan={header.colSpan}
                            style={{
                              width: header.getSize(),
                              minWidth: header.getSize(),
                              maxWidth: header.getSize(),
                              color: "#374151",
                            }}
                          >
                            {header.isPlaceholder ? null : (
                              <div
                                className={classNames(
                                  "flex items-start",
                                  header.column.getCanSort() && "cursor-pointer select-none",
                                  loading && "pointer-events-none"
                                )}
                                onClick={() =>
                                  header.column.getCanSort() && handleCustomSort(header.id)
                                }
                                onMouseEnter={() =>
                                  header.column.getCanSort() && setHoveredHeader(header.id)
                                }
                                onMouseLeave={() => setHoveredHeader(null)}
                              >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {header.column.getCanSort() && (
                                  <>
                                    <Sorter sort={header.column.getIsSorted()} />
                                    {!header.column.getIsSorted() && (
                                      <FaSort
                                        className={classNames(
                                          "ml-1 transition-colors",
                                          hoveredHeader === header.id
                                            ? "text-gray-400"
                                            : "text-transparent"
                                        )}
                                      />
                                    )}
                                  </>
                                )}
                              </div>
                            )}
                          </Th>
                        );
                      })}
                    </Tr>
                  ))}
                </THead>
              </Table>
            </div>
          </div>

          {/* Body Container */}
          <div
            ref={bodyScrollRef}
            className="overflow-auto scrollbar-thin-table [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full"
            style={{
              scrollbarWidth: "thin",
              ...(maxHeight
                ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }
                : {}),
              // Ensure scrollbar doesn't interfere with table alignment
              scrollbarGutter: "stable",
            }}
            onScroll={handleBodyScroll}
          >
            <div className="mx-auto" style={{ width: "fit-content", minWidth: "100%" }}>
              <Table {...rest} ref={bodyTableRef} className="sticky-header-table">
                {loading && data.length === 0 ? (
                  <TableRowSkeleton
                    columns={(finalColumns as Array<T>).length}
                    rows={pagingData.pageSize}
                    avatarInColumns={skeletonAvatarColumns}
                    avatarProps={skeletonAvatarProps}
                  />
                ) : (
                  <TBody>
                    {noData ? (
                      <Tr>
                        <Td className="hover:bg-transparent" colSpan={finalColumns.length}>
                          <div className="flex flex-col items-center gap-4">
                            {customNoDataIcon ? (
                              customNoDataIcon
                            ) : (
                              <>
                                <FileNotFound />
                                <span className="font-semibold">No data found!</span>
                              </>
                            )}
                          </div>
                        </Td>
                      </Tr>
                    ) : (
                      table
                        .getRowModel()
                        .rows.slice(0, pageSize)
                        .map((row) => {
                          return (
                            <Tr key={row.id} data-testid={`${testId}_tbody_tr`}>
                              {row.getVisibleCells().map((cell) => {
                                return (
                                  <Td
                                    key={cell.id}
                                    className="break-words"
                                    style={{
                                      width: cell.column.getSize(),
                                      minWidth: cell.column.getSize(),
                                      maxWidth: cell.column.getSize(),
                                    }}
                                  >
                                    <div
                                      className={classNames(
                                        "flex items-start",
                                        cell.column.id === "action" && "justify-end"
                                      )}
                                    >
                                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                  </Td>
                                );
                              })}
                            </Tr>
                          );
                        })
                    )}
                  </TBody>
                )}
              </Table>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto" style={{ width: "fit-content", minWidth: "100%" }}>
          <Table {...rest} hoverable={!disableHover}>
            <THead className="bg-white text-gray-800 border-b border-gray-200 shadow-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id} data-testid={testId ? testId : `table_row`}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="break-words"
                        style={{
                          width: header.getSize(),
                          minWidth: header.getSize(),
                          maxWidth: header.getSize(),
                          color: "#374151",
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={classNames(
                              "flex items-start",
                              header.column.getCanSort() && "cursor-pointer select-none",
                              loading && "pointer-events-none"
                            )}
                            onClick={() =>
                              header.column.getCanSort() && handleCustomSort(header.id)
                            }
                            onMouseEnter={() =>
                              header.column.getCanSort() && setHoveredHeader(header.id)
                            }
                            onMouseLeave={() => setHoveredHeader(null)}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getCanSort() && (
                              <>
                                <Sorter sort={header.column.getIsSorted()} />
                                {!header.column.getIsSorted() && (
                                  <FaSort
                                    className={classNames(
                                      "ml-1 transition-colors",
                                      hoveredHeader === header.id
                                        ? "text-gray-400"
                                        : "text-transparent"
                                    )}
                                  />
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </THead>
            {loading && data.length === 0 ? (
              <TableRowSkeleton
                columns={(finalColumns as Array<T>).length}
                rows={pagingData.pageSize}
                avatarInColumns={skeletonAvatarColumns}
                avatarProps={skeletonAvatarProps}
              />
            ) : (
              <TBody>
                {noData ? (
                  <Tr>
                    <Td className="hover:bg-transparent" colSpan={finalColumns.length}>
                      <div className="flex flex-col items-center gap-4">
                        {customNoDataIcon ? (
                          customNoDataIcon
                        ) : (
                          <>
                            <FileNotFound />
                            <span className="font-semibold">No data found!</span>
                          </>
                        )}
                      </div>
                    </Td>
                  </Tr>
                ) : (
                  table
                    .getRowModel()
                    .rows.slice(0, pageSize)
                    .map((row) => {
                      return (
                        <Tr key={row.id} data-testid={`${testId}_tbody_tr`}>
                          {row.getVisibleCells().map((cell) => {
                            return (
                              <Td
                                key={cell.id}
                                className="break-words"
                                style={{
                                  width: cell.column.getSize(),
                                  minWidth: cell.column.getSize(),
                                  maxWidth: cell.column.getSize(),
                                }}
                              >
                                <div
                                  className={classNames(
                                    "flex items-start",
                                    cell.column.id === "action" && "justify-end"
                                  )}
                                >
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </div>
                              </Td>
                            );
                          })}
                        </Tr>
                      );
                    })
                )}
              </TBody>
            )}
          </Table>
        </div>
      )}
      {isPaginationEnabled === true && data.length > 0 && (
        <div className="flex items-center justify-between mt-4 mx-4 pb-2">
          {/* Left side - Records info */}
          <div className="flex items-center">
            <div className="text-sm text-gray-600 dark:text-gray-700">
              {(() => {
                const startRecord = (pageIndex - 1) * pageSize + 1;
                const endRecord = Math.min(pageIndex * pageSize, total || 0);
                const totalRecords = total || 0;
                return `${startRecord.toLocaleString()} - ${endRecord.toLocaleString()} of ${totalRecords.toLocaleString()} records`;
              })()}
            </div>
          </div>
          {/* Center - Pagination */}
          <div className="flex  gap-4">
            {/* <Pagination
              pageSize={pageSize}
              currentPage={pageIndex}
              total={total}
              nextButtonTestId={nextButtonTestId}
              onChange={handlePaginationChange}
            /> */}
          </div>
          {/* Right side - Page controls */}
          <div className="flex items-center gap-4">
            {/* Page size selector */}
            <div className="flex items-center gap-2">
              <Select
                size="sm"
                menuPlacement="top"
                isSearchable={false}
                instanceId={instanceId}
                value={pageSizeOption.filter((option) => option.value === pageSize)}
                options={pageSizeOption}
                onChange={(option) => handleSelectChange(option?.value)}
              />
            </div>

            <button
              disabled={currentPageRef.current <= 1 || loading}
              className={`${currentPageRef.current <= 1 || loading ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:text-gray-900"}`}
              onClick={() => {
                handlePaginationChange(currentPageRef.current - 1);
              }}
            >
              <TbChevronLeft className="text-lg" />
            </button>

            {/* Page navigation */}
            <div className="flex items-center gap-2">
              <Input
                type="number"
                size="sm"
                value={pageInputValue}
                placeholder={`${pageIndex}`}
                className="w-16 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                min="1"
                max={Math.ceil(total / pageSize)}
                onChange={handlePageInputChange}
                onKeyDown={handlePageInputSubmit}
                onBlur={handlePageInputBlur}
              />

              <span className="text-sm text-gray-600 dark:text-gray-700">
                - {Math.ceil(total / pageSize)}
              </span>
            </div>
            <button
              disabled={currentPageRef.current >= Math.ceil(total / pageSize) || loading}
              className={`${
                currentPageRef.current >= Math.ceil(total / pageSize) || loading
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => {
                handlePaginationChange(currentPageRef.current + 1);
              }}
            >
              <TbChevronRight className="text-lg" />
            </button>

            <button
              disabled={loading}
              className={`${
                loading ? "text-gray-400 cursor-pointer" : "text-gray-700 hover:text-gray-900"
              }`}
              title="Refresh and go to page 1"
              onClick={handleRefresh}
            >
              <TbRefresh className="text-lg" />
            </button>
          </div>
        </div>
      )}
    </Loading>
  );
}

export type { ColumnDef, Row, CellContext };
export default DataTable;
