// import React, { useState } from "react";
// import {
//   Drawer as MuiDrawer,
//   List,
//   Divider,
//   IconButton,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Collapse,
//   Typography,
// } from "@mui/material";
// import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
// import {
//   ExpandLess,
//   ExpandMore,
//   ChevronLeft as ChevronLeftIcon,
//   ChevronRight as ChevronRightIcon,
// } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   sideNavigation,
//   selectCurrentPageId,
//   setPage,
// } from "../redux/slices/pageSlice";
// import { RootState } from "../redux/store";
// import RaillinxText from "./RaillinxText";

// interface DrawerProps {
//   open: boolean;
//   handleDrawerClose: () => void;
// }

// const drawerWidth = 240;

// // const openedMixin = (theme: Theme): CSSObject => ({
// //   width: drawerWidth,
// //   transition: theme.transitions.create("width", {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.enteringScreen,
// //   }),
// //   overflowX: "hidden",
// // });

// // const closedMixin = (theme: Theme): CSSObject => ({
// //   transition: theme.transitions.create("width", {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.leavingScreen,
// //   }),
// //   overflowX: "hidden",
// //   width: `calc(${theme.spacing(7)} + 1px)`,
// //   [theme.breakpoints.up("sm")]: { width: `calc(${theme.spacing(8)} + 1px)` },
// // });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// // const Drawer = styled(MuiDrawer, {
// //   shouldForwardProp: (prop) => prop !== "open",
// // })(({ theme, open }) => ({
// //   width: drawerWidth,
// //   flexShrink: 0,
// //   whiteSpace: "nowrap",
// //   boxSizing: "border-box",
// //   "& .MuiDrawer-paper": open ? openedMixin(theme) : closedMixin(theme),
// // }));
// const dockedWidth = 60;

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: open ? drawerWidth : dockedWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   "& .MuiDrawer-paper": {
//     width: open ? drawerWidth : dockedWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     overflowX: "hidden",
//   },
// }));

// const SideNav: React.FC<DrawerProps> = ({ open, handleDrawerClose }) => {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const menuItems = useSelector(sideNavigation);
//   const currentPageId = useSelector(selectCurrentPageId);

//   const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

//   const handleMenuClick = (menu: string) =>
//     setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));

//   return (
//     <Drawer variant="permanent" open={open}>
//       <DrawerHeader>
//         {/* <Typography
//           sx={{ color: (theme) => theme.palette.text.secondary, margin: 2 }}
//           variant="h5"
//         >
//           PARAGON
//         </Typography> */}
//         <RaillinxText />
//         <IconButton onClick={handleDrawerClose}>
//           {theme.direction === "rtl" ? (
//             <ChevronRightIcon
//               sx={{ color: (theme) => theme.palette.text.secondary }}
//             />
//           ) : (
//             <ChevronLeftIcon
//               sx={{ color: (theme) => theme.palette.text.secondary }}
//             />
//           )}
//         </IconButton>
//       </DrawerHeader>
//       <Divider />
//       <List>
//         {menuItems.map((item) => (
//           <React.Fragment key={item.id}>
//             <ListItem disablePadding>
//               <ListItemButton
//                 onClick={() =>
//                   item.children
//                     ? handleMenuClick(item.id)
//                     : dispatch(setPage({ parentId: item.id, pageId: item.id }))
//                 }
//                 sx={{
//                   backgroundColor: (theme) =>
//                     currentPageId === item.id && theme.palette.sideNav?.active,
//                   "&:hover": {
//                     backgroundColor: (theme) => theme.palette.sideNav?.hover,
//                   },
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{ color: (theme) => theme.palette.text.secondary }}
//                 >
//                   <item.icon />
//                 </ListItemIcon>
//                 <ListItemText
//                   sx={{ color: (theme) => theme.palette.text.secondary }}
//                   primary={item.title}
//                 />
//                 {item.children &&
//                   (openMenus[item.id] ? (
//                     <ExpandLess
//                       sx={{ color: (theme) => theme.palette.text.secondary }}
//                     />
//                   ) : (
//                     <ExpandMore
//                       sx={{ color: (theme) => theme.palette.text.secondary }}
//                     />
//                   ))}
//               </ListItemButton>
//             </ListItem>
//             {item.children && (
//               <Collapse
//                 className="ml-3"
//                 in={openMenus[item.id]}
//                 timeout="auto"
//                 unmountOnExit
//               >
//                 <List component="div" disablePadding>
//                   {item.children.map((child) => (
//                     <ListItem key={child.id} disablePadding>
//                       <ListItemButton
//                         sx={{
//                           backgroundColor: (theme) =>
//                             currentPageId === child.id &&
//                             theme.palette.sideNav?.active,
//                           "&:hover": {
//                             backgroundColor: (theme) =>
//                               theme.palette.sideNav?.hover,
//                           },
//                         }}
//                         onClick={() =>
//                           dispatch(
//                             setPage({ parentId: item.id, pageId: child.id })
//                           )
//                         }
//                       >
//                         <ListItemIcon
//                           sx={{
//                             color: (theme) => theme.palette.text.secondary,
//                           }}
//                         >
//                           <child.icon />
//                         </ListItemIcon>
//                         <ListItemText
//                           sx={{
//                             color: (theme) => theme.palette.text.secondary,
//                           }}
//                           primary={child.title}
//                         />
//                       </ListItemButton>
//                     </ListItem>
//                   ))}
//                 </List>
//               </Collapse>
//             )}
//           </React.Fragment>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default SideNav;
import React, { useState } from "react";
import {
  Drawer as MuiDrawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  ExpandLess,
  ExpandMore,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  sideNavigation,
  selectCurrentPageId,
  setPage,
} from "../redux/slices/pageSlice";
import { RootState } from "../redux/store";
import RaillinxText from "./RaillinxText";

interface DrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const drawerWidth = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: { width: `calc(${theme.spacing(8)} + 1px)` },
// });

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   "& .MuiDrawer-paper": open ? openedMixin(theme) : closedMixin(theme),
// }));
const dockedWidth = 60;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: open ? drawerWidth : dockedWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : dockedWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
  },
}));

const SideNav: React.FC<DrawerProps> = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const menuItems = useSelector(sideNavigation);
  const currentPageId = useSelector(selectCurrentPageId);

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const handleMenuClick = (menu: string) =>
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        {/* <Typography
          sx={{ color: (theme) => theme.palette.text.secondary, margin: 2 }}
          variant="h5"
        >
          PARAGON
        </Typography> */}
        <RaillinxText />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon
              sx={{ color: (theme) => theme.palette.text.secondary }}
            />
          ) : (
            <ChevronLeftIcon
              sx={{ color: (theme) => theme.palette.text.secondary }}
            />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem disablePadding>
              <ListItemButton
                onMouseDown={(e: React.MouseEvent) =>
                  item.children
                    ? handleMenuClick(item.id)
                    : dispatch(
                        setPage({
                          parentId: item.id,
                          pageId: item.id,
                          event: e.nativeEvent as MouseEvent,
                        })
                      )
                }
                sx={{
                  backgroundColor: (theme) =>
                    currentPageId === item.id && theme.palette.sideNav?.active,
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.sideNav?.hover,
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                  primary={item.title}
                />
                {item.children &&
                  (openMenus[item.id] ? (
                    <ExpandLess
                      sx={{ color: (theme) => theme.palette.text.secondary }}
                    />
                  ) : (
                    <ExpandMore
                      sx={{ color: (theme) => theme.palette.text.secondary }}
                    />
                  ))}
              </ListItemButton>
            </ListItem>
            {item.children && (
              <Collapse
                className="ml-3"
                in={openMenus[item.id]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItem key={child.id} disablePadding>
                      <ListItemButton
                        sx={{
                          backgroundColor: (theme) =>
                            currentPageId === child.id &&
                            theme.palette.sideNav?.active,
                          "&:hover": {
                            backgroundColor: (theme) =>
                              theme.palette.sideNav?.hover,
                          },
                        }}
                        onMouseDown={(e: React.MouseEvent) => {
                          dispatch(
                            setPage({
                              parentId: item.id,
                              pageId: child.id,
                              event: e.nativeEvent as MouseEvent,
                            })
                          );
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: (theme) => theme.palette.text.secondary,
                          }}
                        >
                          <child.icon />
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            color: (theme) => theme.palette.text.secondary,
                          }}
                          primary={child.title}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNav;
