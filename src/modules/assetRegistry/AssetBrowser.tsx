import { useState } from "react";
import { assetColumns } from "./assetBrowser-table";
import { Stack, Typography } from "@mui/material";
import SimpleTable from "../../components/muix/SimpleTable";

import { RootState } from "../../redux/store";
import { RailPart } from "../../utils/validations/railPartSchema";
import { CustomButton } from "../../components/inputs";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  resetForm,
  setRefresh,
  updateForm,
} from "../../redux/slices/railPartSlice";
import { useDispatch, useSelector } from "react-redux";

const AssetBrowser: React.FC = () => {
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});
  const dispatch = useDispatch();

  const [selectedData, setSelectedData] = useState<RailPart[]>([]);

  const assets = useSelector((state: RootState) => state.assets);
  console.log(assets);
  const handleSelectionChange = (rows: RailPart[]) => {
    setSelectedData(rows);
    console.log("Selected row data:", rows);
  };

  return (
    <div>
      <Stack direction="row" spacing={4}>
        <Typography
          color="primary"
          sx={{ fontWeight: "bold", paddingBottom: "1rem" }}
          variant="h5"
        >
          Product Catalogue
        </Typography>
        {selectedData?.length == 1 && (
          <CustomButton
            variant="contained"
            sx={{ height: "35px" }}
            onClick={() => {
              dispatch(updateForm(selectedData[0]));
              dispatch(setRefresh());
            }}
          >
            <ContentCopyIcon />
            Copy Asset Information
          </CustomButton>
        )}
      </Stack>
      <SimpleTable
        data={assets.assets}
        columns={assetColumns}
        rowIdKey="baseUnitGTIN"
        enableSelection
        columnVisibilityModel={columnVisibility}
        onColumnVisibilityModelChange={(newModel) => {
          setColumnVisibility(newModel);
        }}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
};

export default AssetBrowser;
