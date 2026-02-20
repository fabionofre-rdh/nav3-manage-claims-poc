export interface DropdownItem {
  label: string;
  value: string;
}

// ListTable Interfaces
export interface ListTablePaginationConfig {
  // Server-side pagination: provide total count from API
  totalCount?: number;
  // Client-side pagination: will calculate from data length
  useServerSidePagination?: boolean;
  // Current page size from server (for server-side pagination)
  currentPageSize?: number;
  // Current page index from server (for server-side pagination)
  currentPageIndex?: number;
}

export interface ListTableSearchConfig {
  // Search query from parent
  searchQuery?: string;
  // Loading state for search
  searchLoading?: boolean;
  // Minimum characters to trigger search (default: LIST_TABLE_CONFIG.MIN_SEARCH_LENGTH from constants.ts)
  minSearchLength?: number;
  // Custom filter function for client-side search
  customFilter?: <T>(item: T, searchQuery: string) => boolean;
}

export interface ListTableSortConfig {
  // Enable sorting
  enableSorting?: boolean;
  // Custom sort function
  customSort?: <T>(data: T[], sortKey: string, direction: "asc" | "desc") => T[];
}

export interface ListTableProps<T> {
  // Table columns
  columns: import("@tanstack/react-table").ColumnDef<T>[];
  // Data array
  data: T[];
  // Loading state
  loading?: boolean;
  // No data state
  noData?: boolean;
  // Pagination configuration
  pagination?: ListTablePaginationConfig;
  // Search configuration
  search?: ListTableSearchConfig;
  // Sort configuration
  sort?: ListTableSortConfig;
  // Page size options (default: [50, 100, 200, 500])
  pageSizes?: number[];
  // Default page size (default: 100)
  defaultPageSize?: number;
  // Callback when pagination changes (for server-side pagination)
  onPaginationChange?: (page: number, pageSize: number) => void;
  // Callback when page size changes (for server-side pagination)
  onPageSizeChange?: (pageSize: number) => void;
  // Callback when sort changes (for server-side sorting)
  onSortChange?: (sortKey: string | null, direction: "asc" | "desc" | null) => void;
  // Callback for refresh (when clicking page 1 while already on page 1)
  onRefresh?: () => void;
  // DataTable props
  stickyHeader?: boolean;
  maxHeight?: string;
  testId?: string;
  nextButtonTestId?: string;
  customNoDataIcon?: React.ReactNode;
  rowClassName?: string;
}
