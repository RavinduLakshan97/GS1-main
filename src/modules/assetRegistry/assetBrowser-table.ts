import { GridColDef } from "@mui/x-data-grid";
export const assetColumns: GridColDef[] = [
  {
    field: "baseUnitGTIN",
    headerName: "Base Unit GTIN",
    flex: 100,
    hideable: false,
  },
  {
    field: "brandName",
    headerName: "Brand Name",
    flex: 100,
    hideable: false,
  },
  {
    field: "tradeItemDescription",
    headerName: "Trade Item Description",
    flex: 100,
  },
];
