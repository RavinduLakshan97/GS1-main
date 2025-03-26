// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Button,
//   Menu,
//   MenuItem,
//   List,
//   ListItemIcon,
//   ListItemText,
//   ListItemButton,
//   ListItem,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { Brightness4 as MoonIcon, Menu as MenuIcon } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   selectCurrentPageId,
//   setPage,
//   topNavigation,
// } from "../redux/slices/pageSlice"; // Adjust path as needed
// import { toggleTheme } from "../redux/slices/themeSlice";

// interface AppBarProps {
//   open: boolean;
//   handleDrawerOpen: () => void;
// }

// const StyledAppBar = styled(AppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: 240,
//     width: `calc(100% - 240px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const TopNav: React.FC<AppBarProps> = ({ open, handleDrawerOpen }) => {
//   const dispatch = useDispatch();
//   const topNavigationItems = useSelector(topNavigation);
//   const currentPageId = useSelector(selectCurrentPageId);

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedParentId, setSelectedParentId] = useState<null | string>(null);

//   const handleClick = (
//     event: React.MouseEvent<HTMLElement>,
//     parentId: string
//   ) => {
//     if (selectedParentId === parentId) {
//       handleClose();
//     } else {
//       setAnchorEl(event.currentTarget);
//       setSelectedParentId(parentId);
//     }
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setSelectedParentId(null);
//   };

//   return (
//     <StyledAppBar position="fixed" open={open}>
//       <Toolbar className="justify-between">
//         <IconButton
//           color="inherit"
//           aria-label="open drawer"
//           onClick={handleDrawerOpen}
//           edge="start"
//           sx={{
//             color: (theme) => theme.palette.text.primary,
//             marginRight: 5,
//             ...(open && { display: "none" }),
//           }}
//         >
//           <MenuIcon />
//         </IconButton>
//         <div className="flex gap-2">
//           {topNavigationItems.map(({ id, title, icon: Icon, children }) => {
//             const hasChildren = children && children.length > 0;
//             return hasChildren ? (
//               <React.Fragment key={id}>
//                 <List>
//                   <ListItem key={id} disablePadding>
//                     <ListItemButton
//                       // sx={{
//                       //   backgroundColor:
//                       //     currentPageId === child.id ? colors.primary : "inherit",
//                       // }}
//                       onClick={(event) => handleClick(event, id)}
//                     >
//                       <ListItemIcon
//                         sx={{ color: (theme) => theme.palette.text.primary }}
//                         className="!min-w-8"
//                       >
//                         <Icon />
//                       </ListItemIcon>
//                       <ListItemText
//                         sx={{ color: (theme) => theme.palette.text.primary }}
//                         primary={`${title} ${
//                           selectedParentId === id ? "▲" : "▼"
//                         }`}
//                       />
//                     </ListItemButton>
//                   </ListItem>
//                 </List>
//                 {/* <List onClick={(event) => handleClick(event, id)}>
//                   <ListItemIcon className="">
//                     <Icon />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary={`${title} ${selectedParentId === id ? "▲" : "▼"}`}
//                   />
//                 </List> */}
//                 <Menu
//                   anchorEl={selectedParentId === id ? anchorEl : null}
//                   open={selectedParentId === id}
//                   onClose={handleClose}
//                 >
//                   {children.map((child) => (
//                     <MenuItem
//                       sx={{
//                         color: (theme) => theme.palette.text.primary,
//                       }}
//                       key={child.id}
//                       onClick={() => {
//                         dispatch(setPage({ parentId: id, pageId: child.id }));
//                         handleClose();
//                       }}
//                       selected={currentPageId === child.id}
//                     >
//                       {child.icon && <child.icon style={{ marginRight: 8 }} />}
//                       {child.title}
//                     </MenuItem>
//                   ))}
//                 </Menu>
//               </React.Fragment>
//             ) : (
//               <List>
//                 <ListItem key={id} disablePadding>
//                   <ListItemButton
//                     // sx={{
//                     //   backgroundColor:
//                     //     currentPageId === child.id ? colors.primary : "inherit",
//                     // }}
//                     onClick={() =>
//                       dispatch(setPage({ parentId: id, pageId: id }))
//                     }
//                   >
//                     <ListItemIcon
//                       sx={{ color: (theme) => theme.palette.text.primary }}
//                       className="!min-w-8"
//                     >
//                       <Icon />
//                     </ListItemIcon>
//                     <ListItemText
//                       sx={{ color: (theme) => theme.palette.text.primary }}
//                       primary={title}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </List>
//             );
//           })}
//         </div>
//         <IconButton
//           sx={{ color: (theme) => theme.palette.text.primary }}
//           onClick={() => dispatch(toggleTheme())}
//         >
//           <MoonIcon />
//         </IconButton>
//       </Toolbar>
//     </StyledAppBar>
//   );
// };

// export default TopNav;
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Brightness4 as MoonIcon, Menu as MenuIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPageId,
  setPage,
  topNavigation,
} from "../redux/slices/pageSlice"; // Adjust path as needed
import { toggleTheme } from "../redux/slices/themeSlice";

interface AppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const TopNav: React.FC<AppBarProps> = ({ open, handleDrawerOpen }) => {
  const dispatch = useDispatch();
  const topNavigationItems = useSelector(topNavigation);
  const currentPageId = useSelector(selectCurrentPageId);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedParentId, setSelectedParentId] = useState<null | string>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    parentId: string
  ) => {
    if (selectedParentId === parentId) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget);
      setSelectedParentId(parentId);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedParentId(null);
  };

  return (
    <StyledAppBar position="fixed" open={open}>
      <Toolbar className="justify-between">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            color: (theme) => theme.palette.text.primary,
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <div className="flex gap-2">
          {topNavigationItems.map(({ id, title, icon: Icon, children }) => {
            const hasChildren = children && children.length > 0;
            return hasChildren ? (
              <React.Fragment key={`parent-${id}`}>
                <List key={`list-parent-${id}`}>
                  <ListItem key={`list-item-parent-${id}`} disablePadding>
                    <ListItemButton
                      // sx={{
                      //   backgroundColor:
                      //     currentPageId === child.id ? colors.primary : "inherit",
                      // }}
                      onClick={(event) => handleClick(event, id)}
                    >
                      <ListItemIcon
                        sx={{ color: (theme) => theme.palette.text.primary }}
                        className="!min-w-8"
                      >
                        <Icon />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ color: (theme) => theme.palette.text.primary }}
                        primary={`${title} ${
                          selectedParentId === id ? "▲" : "▼"
                        }`}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
                {/* <List onClick={(event) => handleClick(event, id)}>
                  <ListItemIcon className="">
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${title} ${selectedParentId === id ? "▲" : "▼"}`}
                  />
                </List> */}
                <Menu
                  anchorEl={selectedParentId === id ? anchorEl : null}
                  open={selectedParentId === id}
                  onClose={handleClose}
                >
                  {children.map((child) => (
                    <MenuItem
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                      }}
                      key={`child-menu-item-${child.id}`}
                      onMouseDown={(e: React.MouseEvent) => {
                        e.preventDefault();
                        dispatch(
                          setPage({
                            parentId: id,
                            pageId: child.id,
                            event: e.nativeEvent as MouseEvent,
                          })
                        );
                      }}
                      selected={currentPageId === child.id}
                    >
                      {child.icon && <child.icon style={{ marginRight: 8 }} />}
                      {child.title}
                    </MenuItem>
                  ))}
                </Menu>
              </React.Fragment>
            ) : (
              <List key={`list-no-children-${id}`}>
                <ListItem key={`list-item-no-children-${id}`} disablePadding>
                  <ListItemButton
                    onMouseDown={(e: React.MouseEvent) => {
                      dispatch(
                        setPage({
                          parentId: id,
                          pageId: id,
                          event: e.nativeEvent as MouseEvent,
                        })
                      );
                    }}
                  >
                    <ListItemIcon
                      sx={{ color: (theme) => theme.palette.text.primary }}
                      className="!min-w-8"
                    >
                      <Icon />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ color: (theme) => theme.palette.text.primary }}
                      primary={title}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            );
          })}
        </div>
        <IconButton
          sx={{ color: (theme) => theme.palette.text.primary }}
          onClick={() => dispatch(toggleTheme())}
        >
          <MoonIcon />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default TopNav;
