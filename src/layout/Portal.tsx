// import React, { Suspense, useState } from "react";
// import { Box, CssBaseline } from "@mui/material";
// import TopNav from "./TopNav"; // Importing the AppBar component
// import SideNav from "./SideNav"; // Importing the Drawer component
// import { useDispatch, useSelector } from "react-redux";
// import {
//   selectCurrentPageDetails,
//   selectCurrentPopupDetails,
//   closePopup,
//   selectIsPopupOpen,
// } from "../redux/slices/pageSlice";
// import CustomDialog from "../components/utils/CustomDialog";
// import { AppDispatch } from "../redux/store";

// const Portal: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const [open, setOpen] = useState(true);
//   const CurrentComponent = useSelector(selectCurrentPageDetails);

//   const PopupComponent = useSelector(selectCurrentPopupDetails);
//   const isPopupOpen = useSelector(selectIsPopupOpen);

//   const handleDrawerOpen = () => setOpen(true);
//   const handleDrawerClose = () => setOpen(false);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       {/* Pass handleDrawerOpen to TopNav */}
//       <TopNav open={open} handleDrawerOpen={handleDrawerOpen} />
//       <SideNav open={open} handleDrawerClose={handleDrawerClose} />
//       <Box
//         sx={{
//           marginTop: "64px",
//           flexGrow: 1,
//           padding: 2,
//           transition: "margin-left 0.3s ease",
//         }}
//       >
//         <Suspense fallback={<div>Loading...</div>}>
//           {CurrentComponent?.component && <CurrentComponent.component />}
//         </Suspense>{" "}
//         <Suspense fallback={<div>Loading...</div>}>
//           <CustomDialog
//             open={isPopupOpen}
//             onClose={() => dispatch(closePopup())}
//             title={PopupComponent?.title}
//           >
//             {PopupComponent?.component && <PopupComponent.component />}
//           </CustomDialog>
//         </Suspense>
//       </Box>
//     </Box>
//   );
// };

// export default Portal;
import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import SplitLayout from "./SplitLayout";

const Portal: React.FC = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  console.log(" portal Renders");

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />

      <TopNav open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideNav open={open} handleDrawerClose={handleDrawerClose} />
      <Box
        sx={{
          position: "relative",
          top: "75px",
          bottom: 0,
          left: 0,
          right: 0,
          height: "calc(100vh - 85px)",
          overflow: "auto",
          flexGrow: 1,
          paddingLeft: 1,
          paddingRight: 1,
          transition: "margin-left 0.3s ease",
        }}
      >
        <SplitLayout />
      </Box>
    </Box>
  );
};

export default Portal;
