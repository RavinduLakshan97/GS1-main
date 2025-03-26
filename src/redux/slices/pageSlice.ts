/**
 * pageSlice - Redux Slice for Page State Management
 *
 * Manages the navigation state of the application, including the primary and secondary pages,
 * popup dialogs, and interactions with the component map. Supports setting the page state,
 * handling new tab interactions, and managing popup states.
 *
 * @author Shehan Chandrasekara
 * @date 2025-02-10
 *
 * @module pageSlice
 *
 * @revisions
 * - 2025-02-10: Initial creation by Shehan.
 * - 2025-02-18: Added support for centralised popup handling.
 * - 2025-02-24: Included Secondary Page support and updated new split view.
 * - 2025-02-25: Included middle re-direction and new tab handling.
 *
 * @typedef {object} PageState - The state of the page slice.
 * @property {string} currentParentPageId - The ID of the current parent page.
 * @property {string} currentPageId - The ID of the current page.
 * @property {string | null} currentPopupId - The ID of the currently open popup, if any.
 * @property {boolean} isPopupOpen - Whether a popup is currently open.
 * @property {string | null} [secondaryPageId] - The ID of the secondary page, if set.
 *
 * @constant {PageState} initialState - The initial state of the page slice.
 *
 * @actions
 * @function setPage - Sets the current page and manages new tab behavior.
 * @function setSecondaryPage - Sets the secondary page if valid.
 * @function setState - Sets the page states based on provided data.
 * @function openPopup - Opens a popup with a given ID.
 * @function setPopupClosed - Marks the popup as closed.
 * @function clearPopup - Clears the current popup ID.
 *
 * @selectors
 * @function selectCurrentPageId - Returns the ID of the current page.
 * @function selectCurrentParentPageId - Returns the ID of the current parent page.
 * @function selectCurrentPageDetails - Retrieves details of the current page from the component map.
 * @function selectSecondaryPageDetails - Retrieves details of the secondary page from the component map.
 * @function topNavigation - Selector for building the top navigation items.
 * @function sideNavigation - Selector for building the side navigation items.
 * @function selectCurrentPopupId - Retrieves the ID of the currently open popup.
 * @function selectIsPopupOpen - Checks whether a popup is currently open.
 * @function selectCurrentPopupDetails - Retrieves the details of the currently open popup.
 *
 * @example
 * import { setPage, setSecondaryPage, openPopup } from "./pageSlice";
 * dispatch(setPage({ parentId: "dashboard", pageId: "home", event: mouseEvent }));
 * dispatch(openPopup("examplePopupId"));
 *
 */

import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { componentMap, NotFoundPage } from "./componentMap";

interface PageState {
  currentParentPageId: string;
  currentPageId: string;
  currentPopupId: string | null;
  isPopupOpen: boolean;
  secondaryPageId?: string | null;
}

const initialState: PageState = {
  currentParentPageId: "dashboard",
  currentPageId: "dashboard",
  currentPopupId: null,
  isPopupOpen: false,
  secondaryPageId: null,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{
        parentId: string;
        pageId: string;
        event: MouseEvent;
      }>
    ) => {
      const { parentId, pageId, event } = action.payload;

      if (event.button === 1) {
        const pageState = {
          currentPageId: pageId,
          currentParentPageId: parentId,
          // currentPopupId: null,
          // isPopupOpen: false,
          secondaryPageId: null,
        };

        const newTab = window.open(window.location.href, "_blank");

        if (newTab) {
          newTab.onload = () => {
            newTab.postMessage(
              { type: "SET_PAGE_STATE", payload: pageState },
              window.location.origin
            );
          };
        }
      }

      if (event.button === 0) {
        const parent = componentMap[parentId];
        const child = parent?.children?.find((child) => child.id === pageId);
        if (parent && child?.isPage) {
          state.currentParentPageId = parentId;
          state.currentPageId = pageId;
        } else if (parent?.isPage) {
          state.currentParentPageId = parentId;
          state.currentPageId = parentId;
        }
        state.currentPopupId = null;
        state.secondaryPageId = null;
      }
    },
    setSecondaryPage: (state, action: PayloadAction<string>) => {
      const pageId = action.payload;
      if (componentMap[pageId]?.isPage) {
        state.secondaryPageId = pageId;
        return;
      }
      for (const parent of Object.values(componentMap)) {
        const child = parent.children?.find(
          (child) => child.id === pageId && child.isPage
        );
        if (child) {
          state.secondaryPageId = pageId;
          return;
        }
      }

      state.secondaryPageId = null;
    },
    setState: (
      state,
      action: PayloadAction<{
        parentId?: string;
        pageId?: string;
        secondaryPageId?: string;
      }>
    ) => {
      const { parentId, pageId, secondaryPageId } = action.payload;

      if (parentId && pageId) {
        const parent = componentMap[parentId];
        const child = parent?.children?.find((child) => child.id === pageId);
        if (parent && child?.isPage) {
          state.currentParentPageId = parentId;
          state.currentPageId = pageId;
        } else if (parent?.isPage) {
          state.currentParentPageId = parentId;
          state.currentPageId = parentId;
        }
        state.currentPopupId = null;
      }
      state.secondaryPageId = null;
      //no use for the moment
      // if (secondaryPageId) {
      //   if (componentMap[secondaryPageId]?.isPage) {
      //     state.secondaryPageId = secondaryPageId;
      //     return;
      //   }
      //   for (const parent of Object.values(componentMap)) {
      //     const child = parent.children?.find(
      //       (child) => child.id === secondaryPageId && child.isPage
      //     );
      //     if (child) {
      //       state.secondaryPageId = secondaryPageId;
      //       return;
      //     }
      //   }
      //   state.secondaryPageId = null;
      // }
    },
    openPopup: (state, action: PayloadAction<string>) => {
      state.currentPopupId = action.payload;
      state.isPopupOpen = true;
    },

    setPopupClosed: (state) => {
      state.isPopupOpen = false;
    },
    clearPopup: (state) => {
      state.currentPopupId = null;
    },
  },
});

export const {
  setPage,
  setSecondaryPage,
  openPopup,
  setPopupClosed,
  clearPopup,
  setState,
} = pageSlice.actions;

export const closePopup = () => (dispatch: AppDispatch) => {
  dispatch(setPopupClosed());

  setTimeout(() => {
    dispatch(clearPopup());
  }, 200);
};

export const selectCurrentPageId = (state: { page: PageState }) =>
  state.page.currentPageId;

export const selectCurrentParentPageId = (state: { page: PageState }) =>
  state.page.currentParentPageId;

export const selectCurrentPageDetails = (state: RootState) => {
  const parent = componentMap[state.page.currentParentPageId] || NotFoundPage;
  const child = parent.children?.find(
    (child) => child.id === state.page.currentPageId
  );
  return child?.isPage ? child : parent;
};
export const selectSecondaryPageDetails = (state: RootState) => {
  return state.page.secondaryPageId
    ? componentMap[state.page.secondaryPageId] || NotFoundPage
    : null;
};
export const topNavigation = createSelector(
  [(state: RootState) => state.page],
  () =>
    Object.values(componentMap)
      .filter(({ navType }) => navType === "TopNav")
      .map(({ id, title, icon, children }) => ({
        id,
        title,
        icon,
        children,
      }))
);

export const sideNavigation = createSelector(
  [(state: RootState) => state.page],
  () =>
    Object.values(componentMap)
      .filter(({ navType }) => navType === "SideNav")
      .map(({ id, title, icon, children }) => ({
        id,
        title,
        icon,
        children,
      }))
);

export const selectCurrentPopupId = (state: { page: PageState }) => {
  return state.page.currentPopupId;
};

export const selectIsPopupOpen = (state: { page: PageState }) => {
  return state.page.isPopupOpen;
};

export const selectCurrentPopupDetails = (state: RootState) => {
  return state.page.currentPopupId
    ? componentMap[state.page.currentPopupId]
    : null;
};

export default pageSlice.reducer;
