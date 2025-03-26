import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridSortModel,
  GridPaginationModel,
} from "@mui/x-data-grid";

interface SimpleTableProps<T> {
  data: T[];
  columns: GridColDef[];
  rowIdKey: string;
  pageSizeOptions?: number[];
  enableSelection?: boolean;
  columnVisibilityModel?: Record<string, boolean>;
  onColumnVisibilityModelChange?: (newModel: Record<string, boolean>) => void;
  onSelectionChange?: (selectedRows: T[]) => void;
}

const SimpleTable = <T extends Record<string, any>>({
  data,
  columns,
  rowIdKey,
  pageSizeOptions = [10, 25, 50, 100],
  enableSelection = false,
  columnVisibilityModel,
  onColumnVisibilityModelChange,
  onSelectionChange,
}: SimpleTableProps<T>) => {
  const [pageModel, setPageModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: pageSizeOptions[0],
  });

  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<Array<string | number>>(
    []
  );

  const [internalColumnVisibility, setInternalColumnVisibility] = useState<
    Record<string, boolean>
  >(columnVisibilityModel ?? {});

  const handleRowSelection = (selectionModel: Array<string | number>) => {
    setSelectedRowIds(selectionModel);
    const selectedData = data.filter((row) =>
      selectionModel.includes(row[rowIdKey])
    );
    if (onSelectionChange) {
      onSelectionChange(selectedData);
    }
  };

  return (
    <DataGrid
      rows={data}
      columns={columns}
      getRowId={(row) => row[rowIdKey]}
      pagination
      paginationModel={pageModel}
      onPaginationModelChange={(model) => setPageModel(model)}
      pageSizeOptions={pageSizeOptions}
      sortingMode="client"
      sortModel={sortModel}
      onSortModelChange={(model) => setSortModel(model)}
      // Enable checkbox selection if needed
      checkboxSelection={enableSelection}
      // Capture row selection changes
      onRowSelectionModelChange={(newSelection) =>
        handleRowSelection(newSelection as (string | number)[])
      }
      // Ensure the DataGrid knows which rows are selected
      rowSelectionModel={enableSelection ? selectedRowIds : undefined}
      columnVisibilityModel={columnVisibilityModel ?? internalColumnVisibility}
      onColumnVisibilityModelChange={(newModel) => {
        if (onColumnVisibilityModelChange) {
          onColumnVisibilityModelChange(newModel);
        } else {
          setInternalColumnVisibility(newModel);
        }
      }}
      //disableColumnFilter
      sx={[{ height: "calc(100vh - 11rem)" }]}
    />
  );
};

export default SimpleTable;
