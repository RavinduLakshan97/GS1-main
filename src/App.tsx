import "./assets/styles/App.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { ThemeProvider as MaterialTailwindTheme } from "@material-tailwind/react";
import { ThemeProvider as MUITheme } from "@mui/material/styles";
import { getThemeMUI } from "./themes/themeMUI";
import { getThemeMaterial } from "./themes/themeMaterial";
import { useDispatch } from "react-redux";
import { setState } from "./redux/slices/pageSlice";

//components
import Portal from "./layout/Portal";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = useSelector((state: RootState) => state.theme.colors);
  const themeMUI = getThemeMUI(mode, colors);
  const themeMaterial = getThemeMaterial(mode);
  const queryClient = new QueryClient();

  const dispatch = useDispatch();

  useEffect(() => {
    const handleMessage = (event) => {
      // Ensure the message comes from the same origin
      if (event.origin !== window.location.origin) return;

      const { type, payload } = event.data;

      if (type === "SET_PAGE_STATE") {
        console.log("Received page state:", payload);

        dispatch(
          setState({
            parentId: payload.currentParentPageId,
            pageId: payload.currentPageId,
            secondaryPageId: payload.secondaryPageId,
          })
        );
      }
    };

    // Add the message listener
    window.addEventListener("message", handleMessage);

    // Cleanup when the component is unmounted
    return () => window.removeEventListener("message", handleMessage);
  }, [dispatch]);

  return (
    <MaterialTailwindTheme value={themeMaterial}>
      <MUITheme theme={themeMUI}>
        <QueryClientProvider client={queryClient}>
          <Portal />
        </QueryClientProvider>
      </MUITheme>
    </MaterialTailwindTheme>
  );
}

export default App;
