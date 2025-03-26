import { GridColDef } from "@mui/x-data-grid";
export const complaintColumns: GridColDef[] = [
  {
    field: "ComplaintNo",
    headerName: "Complaint No",
    flex: 100,
    hideable: false,
  },
  { field: "ComplaintDate", headerName: "Complaint Date", flex: 100 },
  { field: "CustomerCode", headerName: "Customer Code", flex: 100 },
  { field: "Department", headerName: "Department", flex: 100 },
  { field: "SourceName", headerName: "Source Name", flex: 100 },
  {
    field: "ProductServiceCode",
    headerName: "Product/Service Code",
    flex: 100,
  },

  { field: "DefectCategory", headerName: "Defect Category", flex: 100 },
  { field: "ProblemCategory", headerName: "Problem Category", flex: 100 },
  {
    field: "ProblemDescription",
    headerName: "Problem Description",
    flex: 200,
  },
  { field: "Status", headerName: "Status", flex: 100 },
  { field: "IsOverdue", headerName: "Overdue", flex: 100, type: "boolean" },
  { field: "Priority", headerName: "Priority", flex: 100, type: "number" },
];
