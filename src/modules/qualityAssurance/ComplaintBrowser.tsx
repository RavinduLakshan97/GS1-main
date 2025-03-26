import { useState } from "react";
import { ComplaintType } from "../../utils/validations/complaintDTO";
import AutoFetchTable from "../../components/muix/AutoFetchTable";
import { complaintColumns } from "./complaintBrowser-table";

const ComplaintBrowser: React.FC = () => {
  const [search, setSearch] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  // const [filters, setFilters] = useState({
  //   ComplaintNo: 123,
  //   CustomerCode: "CUST001",
  //   DateFrom: "2024-01-01T00:00:00Z",
  //   DateTo: "2024-01-31T23:59:59Z",
  //   Status: "Open",
  // });
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    Department: false,
    DefectCategory: false,
    Status: false,
    IsOverdue: false,
    Priority: false,
  });

  return (
    <div>
      <AutoFetchTable<ComplaintType>
        url="https://localhost:7007/api/Complaints"
        columns={complaintColumns}
        queryKey="complaints"
        searchValue={search}
        onSearchChange={setSearch}
        refreshTrigger={refreshTrigger}
        pageSizeOptions={[10, 25, 50]}
        autoRefreshInterval={3000}
        enableSelection={true}
        rowIdKey={"ComplaintNo"}
        columnVisibilityModel={columnVisibility}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibility(newModel)
        }
      />
    </div>
  );
};

export default ComplaintBrowser;
