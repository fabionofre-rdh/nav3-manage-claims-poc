import { DataTable } from "@/components/shared";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import { TableQueries } from "@/@types/common";
import cloneDeep from "lodash/cloneDeep";
import { OnSortParam } from "@/components/shared/DataTable";
import { LIST_TABLE_CONFIG } from "@/utils/constants";
import type { ListTableProps } from "@/utils/types";

function ListTable<T>({
  columns,
  data = [],
  loading = false,
  noData = false,
  pagination,
  search,
  sort,
  pageSizes = [...LIST_TABLE_CONFIG.PAGE_SIZES],
  defaultPageSize = LIST_TABLE_CONFIG.DEFAULT_PAGE_SIZE,
  onPaginationChange,
  onPageSizeChange,
  onSortChange,
  onRefresh,
  stickyHeader = true,
  maxHeight = "470px",
  testId,
  nextButtonTestId = "pagination-next",
  customNoDataIcon,
  rowClassName,
}: ListTableProps<T>) {
  const [tableData, setTableData] = useState<TableQueries>({
    pageIndex: 1,
    pageSize: defaultPageSize,
  });

  const [sortConfig, setSortConfig] = useState<{
    key: string | number | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });

  const prevPageRef = useRef<number>(1);

  // Sync page size and page index with server-side pagination metadata if available
  useEffect(() => {
    if (pagination?.useServerSidePagination) {
      if (pagination.currentPageSize !== undefined) {
        setTableData((prev) => ({
          ...prev,
          pageSize: pagination.currentPageSize!,
        }));
      }
      if (pagination.currentPageIndex !== undefined) {
        setTableData((prev) => ({
          ...prev,
          pageIndex: pagination.currentPageIndex!,
        }));
        prevPageRef.current = pagination.currentPageIndex!;
      }
    }
  }, [
    pagination?.currentPageSize,
    pagination?.currentPageIndex,
    pagination?.useServerSidePagination,
  ]);

  // Client-side filtering (if search is enabled and no server-side search)
  const filteredData = useMemo(() => {
    if (
      !search?.searchQuery ||
      search.searchQuery.trim().length <
        (search.minSearchLength ?? LIST_TABLE_CONFIG.MIN_SEARCH_LENGTH)
    ) {
      return data;
    }

    if (search.customFilter) {
      return data.filter((item) => search.customFilter!(item, search.searchQuery!));
    }

    // Default filter: search across all string values
    return data.filter((item) =>
      Object.values(item as Record<string, unknown>).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.searchQuery!.toLowerCase())
      )
    );
  }, [data, search?.searchQuery, search?.minSearchLength, search?.customFilter]);

  // Client-side sorting (if sort is enabled and no server-side sort)
  const sortedData = useMemo(() => {
    if (!sort?.enableSorting || !sortConfig.key) {
      return filteredData;
    }

    if (sort.customSort) {
      return sort.customSort([...filteredData], sortConfig.key as string, sortConfig.direction);
    }

    // Default sort
    const sorted = [...filteredData].sort((a, b) => {
      const aValue = (a as Record<string, unknown>)[sortConfig.key as string];
      const bValue = (b as Record<string, unknown>)[sortConfig.key as string];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig, sort]);

  // Client-side pagination (if not using server-side)
  const paginatedData = useMemo(() => {
    if (pagination?.useServerSidePagination) {
      return sortedData;
    }

    return sortedData.slice(
      ((tableData.pageIndex ?? 1) - 1) * (tableData.pageSize ?? defaultPageSize),
      (tableData.pageIndex ?? 1) * (tableData.pageSize ?? defaultPageSize)
    );
  }, [
    sortedData,
    tableData.pageIndex,
    tableData.pageSize,
    pagination?.useServerSidePagination,
    defaultPageSize,
  ]);

  // Calculate total count
  const totalCount = pagination?.useServerSidePagination
    ? (pagination.totalCount ?? 0)
    : sortedData.length;

  const handlePaginationChange = (page: number) => {
    // Detect refresh: if clicking page 1 when already on page 1, it's a refresh
    if (page === 1 && prevPageRef.current === 1 && tableData.pageIndex === 1 && onRefresh) {
      onRefresh();
      return;
    }

    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page;
    setTableData(newTableData);
    prevPageRef.current = page;

    // Call server-side pagination callback if provided
    if (pagination?.useServerSidePagination && onPaginationChange) {
      onPaginationChange(page, newTableData.pageSize ?? defaultPageSize);
    }
  };

  const handleSelectChange = (value: number) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1; // Reset to first page when changing page size
    setTableData(newTableData);
    prevPageRef.current = 1;

    // Call server-side page size change callback if provided
    if (pagination?.useServerSidePagination) {
      if (onPageSizeChange) {
        onPageSizeChange(Number(value));
      }
      if (onPaginationChange) {
        onPaginationChange(1, Number(value));
      }
    }
  };

  const handleSort = (sortParam: OnSortParam) => {
    const newSortConfig: {
      key: string | number | null;
      direction: "asc" | "desc";
    } = {
      key: sortParam.key as string,
      direction: sortParam.order === "asc" ? "asc" : "desc",
    };

    setSortConfig(newSortConfig);

    // Call server-side sort callback if provided
    if (onSortChange) {
      onSortChange(newSortConfig.key as string, newSortConfig.direction === "asc" ? "asc" : "desc");
    }
  };

  // Determine if we should show "no data" message
  const shouldShowNoData =
    noData ||
    (!loading &&
      !search?.searchLoading &&
      (pagination?.useServerSidePagination ? totalCount === 0 : filteredData.length === 0));

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        columns={columns}
        data={paginatedData}
        noData={shouldShowNoData}
        loading={loading || search?.searchLoading || false}
        customNoDataIcon={customNoDataIcon}
        pagingData={{
          total: totalCount,
          pageIndex: tableData.pageIndex ?? 1,
          pageSize: tableData.pageSize ?? defaultPageSize,
        }}
        pageSizes={pageSizes}
        nextButtonTestId={nextButtonTestId}
        stickyHeader={stickyHeader}
        maxHeight={maxHeight}
        testId={testId}
        rowClassName={rowClassName}
        onPaginationChange={handlePaginationChange}
        onSelectChange={handleSelectChange}
        onSort={sort?.enableSorting ? handleSort : undefined}
      />
    </div>
  );
}

export default ListTable;
