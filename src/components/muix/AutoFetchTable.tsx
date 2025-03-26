import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import axios from "axios";
import { CustomSwitch } from "../inputs";

// **API Response Interface**
interface ApiResponse<T> {
  rows: T[];
  total: number;
}

interface AutoFetchTableProps<T> {
  url: string;
  columns: GridColDef[];
  refreshTrigger: boolean;
  pageSizeOptions?: number[];
  autoRefreshInterval?: number;
  enableSelection?: boolean;
  queryKey: string;
  rowIdKey: string | number;
  columnVisibilityModel?: Record<string, boolean>;
  onColumnVisibilityModelChange?: (newModel: Record<string, boolean>) => void;
  filters?: Record<string, any>;
}

const fetchRows = async <T,>({
  url,
  page,
  pageSize,
  sortBy,
  sortOrder,
  filters = {},
}: {
  url: string;
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  filters?: Record<string, any>;
}): Promise<ApiResponse<T>> => {
  const { data } = await axios.get<ApiResponse<T>>(url, {
    params: {
      "Filters.PageNumber": page,
      "Filters.PageSize": pageSize,
      "Filters.SortBy": sortBy,
      "Filters.SortOrder": sortOrder,
      ...filters,
    },
  });
  return data;
};

const AutoFetchTable = <T extends Record<string, any>>({
  url,
  columns,
  refreshTrigger,
  pageSizeOptions = [10, 25, 50, 100],
  autoRefreshInterval = 3000,
  enableSelection = false,
  queryKey,
  rowIdKey,
  columnVisibilityModel,
  onColumnVisibilityModelChange,
  filters = {},
}: AutoFetchTableProps<T>) => {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(pageSizeOptions[1]);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [debouncedSearch] = useDebounce<string>("", 3000);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);

  const [internalColumnVisibility, setInternalColumnVisibility] = useState<
    Record<string, boolean>
  >(columnVisibilityModel ?? {});

  const defaultSort = { field: rowIdKey, sort: "asc" as const };
  const sortBy = sortModel.length
    ? sortModel[0]?.field
    : String(defaultSort.field);
  const sortOrder: "asc" | "desc" = sortModel.length
    ? (sortModel[0]?.sort as "asc" | "desc")
    : defaultSort.sort;

  const { data, isLoading, refetch } = useQuery<ApiResponse<T>>({
    queryKey: [queryKey, { page, pageSize, sortBy, sortOrder, filters }],
    queryFn: () =>
      fetchRows<T>({
        url,
        page: page + 1,
        pageSize,
        sortBy,
        sortOrder,
        filters,
      }),
    placeholderData: (prevData) => prevData ?? { rows: [], total: 0 },
    refetchInterval: debouncedSearch
      ? false
      : autoRefresh
      ? autoRefreshInterval
      : false,
    refetchOnWindowFocus: true,
  });

  // **Refresh Data on External Trigger**
  useEffect(() => {
    if (refreshTrigger) refetch();
  }, [refreshTrigger, refetch]);

  return (
    <div className="w-full h-full">
      <CustomSwitch
        label="Auto Refresh"
        checked={autoRefresh}
        onChange={(e) => setAutoRefresh(e.target.checked)}
      />
      <DataGrid
        sx={[{ height: "calc(100vh - 13rem)" }]}
        rowHeight={40}
        disableColumnFilter
        rows={data?.rows ?? []}
        getRowId={(row) => row[rowIdKey]}
        columns={columns}
        loading={isLoading}
        pagination
        paginationMode="server"
        rowCount={data?.total ?? 0}
        pageSizeOptions={pageSizeOptions}
        // rowsPerPageOptions={pageSizeOptions}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={({ page, pageSize }) => {
          setPage(page);
          setPageSize(pageSize);
        }}
        sortingMode="server"
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        checkboxSelection={enableSelection}
        onRowSelectionModelChange={(newSelection) =>
          setSelectedRows(newSelection as number[])
        }
        rowSelectionModel={enableSelection ? selectedRows : undefined}
        columnVisibilityModel={
          columnVisibilityModel ?? internalColumnVisibility
        }
        onColumnVisibilityModelChange={(newModel) => {
          if (onColumnVisibilityModelChange) {
            onColumnVisibilityModelChange(newModel);
          } else {
            setInternalColumnVisibility((prev) => ({
              ...prev,
              ...newModel,
            }));
          }
        }}
      />
    </div>
  );
};

export default AutoFetchTable;
