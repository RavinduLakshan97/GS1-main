// import React, {
//   useRef,
//   useState,
//   MouseEvent,
//   useCallback,
//   Suspense,
//   useMemo,
// } from "react";
// import { CustomButton } from "../components/inputs";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setSecondaryPage,
//   selectSecondaryPageDetails,
//   selectCurrentPageDetails,
// } from "../redux/slices/pageSlice";

// const SplitLayout: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const leftPaneRef = useRef<HTMLDivElement>(null);
//   const isResizing = useRef<boolean>(false);
//   const dispatch = useDispatch();

//   const leftContent = useSelector(selectCurrentPageDetails);
//   const rightContent = useSelector(selectSecondaryPageDetails);
//   const isRightPaneVisible = Boolean(rightContent);
//   const [leftPaneWidth, setLeftPaneWidth] = useState<string>("50%");

//   const handleMouseDown = useCallback(() => {
//     isResizing.current = true;
//     document.addEventListener("mousemove", handleMouseMove as any);
//     document.addEventListener("mouseup", handleMouseUp);
//   }, []);

//   const handleMouseMove = useCallback(
//     (e: MouseEvent<Document>) => {
//       if (!isResizing.current || !isRightPaneVisible) return;

//       const container = containerRef.current;
//       const leftPane = leftPaneRef.current;

//       if (container && leftPane) {
//         const containerRect = container.getBoundingClientRect();
//         const newWidth = e.clientX - containerRect.left;

//         const minWidth = 100;
//         const maxWidth = containerRect.width - minWidth;

//         if (newWidth >= minWidth && newWidth <= maxWidth) {
//           const newWidthPercentage = (newWidth / containerRect.width) * 100;
//           setLeftPaneWidth(`${newWidthPercentage}%`);
//         }
//       }
//     },
//     [isRightPaneVisible]
//   );

//   const handleMouseUp = useCallback(() => {
//     isResizing.current = false;
//     document.removeEventListener("mousemove", handleMouseMove as any);
//     document.removeEventListener("mouseup", handleMouseUp);
//   }, [handleMouseMove]);

//   const toggleRightPane = useCallback(() => {
//     dispatch(setSecondaryPage(null));
//   }, [dispatch]);

//   const leftComponent = useMemo(() => {
//     if (leftContent?.component) {
//       return (
//         <Suspense fallback={<div>Loading...</div>}>
//           <leftContent.component key={leftContent.component.name} />
//         </Suspense>
//       );
//     }
//     return null;
//   }, [leftContent?.component]);

//   const rightComponent = useMemo(() => {
//     if (rightContent?.component) {
//       return (
//         <Suspense fallback={<div>Loading...</div>}>
//           <rightContent.component key={rightContent.component.name} />
//         </Suspense>
//       );
//     }
//     return null;
//   }, [rightContent?.component]);

//   console.log("Renders SplitLayout again");

//   return (
//     <div
//       ref={containerRef}
//       className="flex h-screen overflow-hidden select-none relative"
//     >
//       <div
//         ref={leftPaneRef}
//         className={`bg-gray-100 p-4 overflow-auto transition-all duration-100 rounded-md inset-ring-1 inset-ring-gray-500/50 ${
//           isRightPaneVisible ? "" : "w-full"
//         }`}
//         style={{ width: isRightPaneVisible ? leftPaneWidth : "100%" }}
//       >
//         {leftComponent}
//       </div>

//       {isRightPaneVisible && (
//         <>
//           <div
//             onMouseDown={handleMouseDown}
//             className="w-2 hover:bg-gray-500 cursor-col-resize transition-colors rounded-full "
//           ></div>

//           <div className="flex-1 bg-gray-100 p-4 overflow-auto relative rounded-md inset-ring-1 inset-ring-gray-500/50">
//             {rightComponent}
//           </div>
//         </>
//       )}

//       {isRightPaneVisible && (
//         <CustomButton
//           variant="contained"
//           color="error"
//           onClick={toggleRightPane}
//           sx={{
//             minWidth: 0,
//             position: "absolute",
//             top: 4,
//             right: 4,
//             fontWeight: "bold",
//           }}
//         >
//           Close
//         </CustomButton>
//       )}
//     </div>
//   );
// };

// export default SplitLayout;

import React, {
  useRef,
  useState,
  MouseEvent,
  useCallback,
  Suspense,
  useMemo,
} from "react";
import { CustomButton } from "../components/inputs";
import { useDispatch, useSelector } from "react-redux";
import {
  setSecondaryPage,
  selectSecondaryPageDetails,
  selectCurrentPageDetails,
  selectCurrentPopupDetails,
  closePopup,
  selectIsPopupOpen,
} from "../redux/slices/pageSlice";
import CustomDialog from "../components/utils/CustomDialog";
import { AppDispatch } from "../redux/store";
import { Typography } from "@mui/material";

const SplitLayout: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPaneRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const leftContent = useSelector(selectCurrentPageDetails);
  const rightContent = useSelector(selectSecondaryPageDetails);
  const PopupComponent = useSelector(selectCurrentPopupDetails);
  const isPopupOpen = useSelector(selectIsPopupOpen);
  const isRightPaneVisible = Boolean(rightContent);
  const [leftPaneWidth, setLeftPaneWidth] = useState<string>("50%");

  const handleMouseDown = useCallback(() => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove as any);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent<Document>) => {
      if (!isResizing.current || !isRightPaneVisible) return;

      const container = containerRef.current;
      const leftPane = leftPaneRef.current;

      if (container && leftPane) {
        const containerRect = container.getBoundingClientRect();
        const newWidth = e.clientX - containerRect.left;

        const minWidth = 100;
        const maxWidth = containerRect.width - minWidth;

        if (newWidth >= minWidth && newWidth <= maxWidth) {
          const newWidthPercentage = (newWidth / containerRect.width) * 100;
          setLeftPaneWidth(`${newWidthPercentage}%`);
        }
      }
    },
    [isRightPaneVisible]
  );

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove as any);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const toggleRightPane = useCallback(() => {
    dispatch(setSecondaryPage(null));
  }, [dispatch]);

  const leftComponent = useMemo(() => {
    if (leftContent?.component) {
      return (
        <>
          {/* <Typography
            color="primary"
            sx={{ fontWeight: "bold" }}
            // sx={{ color: (theme) => theme.palette.primary.main }}
            variant="h5"
          >
            {leftContent.title}
          </Typography> */}
          <Suspense fallback={<div>Loading...</div>}>
            <leftContent.component key={leftContent.component.name} />
          </Suspense>
        </>
      );
    }
    return null;
  }, [leftContent?.component]);

  const rightComponent = useMemo(() => {
    if (rightContent?.component) {
      return (
        <>
          {/* <Typography
            color="primary"
            sx={{ fontWeight: "bold" }}
            // sx={{ color: (theme) => theme.palette.primary.main }}
            variant="h5"
          >
            {rightContent.title}
          </Typography> */}
          <Suspense fallback={<div>Loading...</div>}>
            <rightContent.component key={rightContent.component.name} />
          </Suspense>
        </>
      );
    }
    return null;
  }, [rightContent?.component]);

  console.log("Renders SplitLayout again");

  return (
    <div
      ref={containerRef}
      className="flex h-full overflow-auto select-none relative"
    >
      <div
        ref={leftPaneRef}
        className={`bg-gray-100 dark:bg-black px-4 overflow-auto p-4 transition-all duration-100 rounded-md inset-ring-1 inset-ring-gray-500/50 ${
          isRightPaneVisible ? "" : "w-full"
        }`}
        style={{ width: isRightPaneVisible ? leftPaneWidth : "100%" }}
      >
        {leftComponent}
      </div>

      {isRightPaneVisible && (
        <>
          <div
            onMouseDown={handleMouseDown}
            className="w-2 hover:bg-gray-500 cursor-col-resize transition-colors rounded-full "
          ></div>

          <div className="flex-1 bg-gray-100 dark:bg-black p-4 overflow-auto relative rounded-md inset-ring-1 inset-ring-gray-500/50">
            {rightComponent}
          </div>
        </>
      )}

      {isRightPaneVisible && (
        <CustomButton
          variant="contained"
          color="error"
          onClick={toggleRightPane}
          sx={{
            minWidth: 0,
            position: "absolute",
            top: 4,
            right: 4,
            fontWeight: "bold",
          }}
        >
          X
        </CustomButton>
      )}

      {PopupComponent?.component && (
        <Suspense fallback={null}>
          <CustomDialog
            open={isPopupOpen}
            onClose={() => dispatch(closePopup())}
            title={PopupComponent?.title}
          >
            {PopupComponent?.component && <PopupComponent.component />}
          </CustomDialog>
        </Suspense>
      )}
    </div>
  );
};

export default SplitLayout;
