import { ComponentType, lazy } from "react";
import { IconType } from "react-icons";
import { FaHome, FaUser, FaList, FaStar, FaClock } from "react-icons/fa";

import { IoIosApps } from "react-icons/io";
import { TbAsset } from "react-icons/tb";

import NotFound from "../../modules/notFound/NotFound";

// Lazy load components
const Dashboard = lazy(() => import("../../modules/dashboard/Dashboard"));
const NewApplication = lazy(
  () => import("../../modules/applications/NewApplication")
);
const Products = lazy(() => import("../../modules/products/Products"));
const QADashboard = lazy(
  () => import("../../modules/qualityAssurance/QADashboard")
);
const ComplaintBrowser = lazy(
  () => import("../../modules/qualityAssurance/ComplaintBrowser")
);
const AssetBrowser = lazy(
  () => import("../../modules/assetRegistry/AssetBrowser")
);

const HistoryStatus = lazy(
  () => import("../../modules/historyandstatus/HistoryStatus")
);

export interface PageComponent {
  id: string;
  title: string;
  navType?: string;
  icon?: IconType;
  isPage: boolean;
  component?: ComponentType<any>;
  children?: PageComponent[];
}

const sideNavComponents: Record<string, PageComponent> = {
  dashboard: {
    id: "dashboard",
    title: "Dashboard",
    navType: "SideNav",
    icon: FaHome,
    isPage: true,
    component: Dashboard,
  },
  favorites: {
    id: "favorites",
    title: "Favorites",
    navType: "SideNav",
    icon: FaStar,
    isPage: false,
    children: [
      {
        id: "products",
        title: "Products",
        navType: "SideNav",
        icon: FaList,
        isPage: true,
        component: Products,
      },
    ],
  },
  recents: {
    id: "recents",
    title: "Recents",
    navType: "SideNav",
    icon: FaClock,
    isPage: false,
    children: [
      {
        id: "products",
        title: "Products",
        navType: "SideNav",
        icon: FaList,
        isPage: true,
        component: Products,
      },
      {
        id: "dashboard",
        title: "Dashboard",
        navType: "SideNav",
        icon: FaList,
        isPage: true,
        component: Dashboard,
      },
    ],
  },
};

const topNavComponents: Record<string, PageComponent> = {
  applications: {
    id: "applications",
    title: "My Applications",
    navType: "TopNav",
    icon: IoIosApps,
    isPage: false,
    children: [
      {
        id: "applynow",
        title: "Apply Now",
        navType: "TopNav",
        isPage: true,
        component: NewApplication,
      },
      {
        id: "history&status",
        title: "History & Status",
        navType: "TopNav",
        isPage: true,
        component: HistoryStatus,
      },
    ],
  },
  assetRegistry: {
    id: "assetRegistry",
    title: "Product Catalogue",
    navType: "TopNav",
    icon: TbAsset,
    isPage: true,
    children: [
      {
        id: "applynow",
        title: "View All",
        navType: "TopNav",
        isPage: true,
        component: AssetBrowser,
      },
      {
        id: "history&status",
        title: "New Product",
        navType: "TopNav",
        isPage: true,
        //component: HistoryStatus,
      },
    ],
  },
};

const otherComponents: Record<string, PageComponent> = {
  complaintbrowser: {
    id: "complaintbrowser",
    title: "Complaint - Browser",
    icon: FaHome,
    isPage: true,
    component: ComplaintBrowser,
  },
};

export const NotFoundPage: PageComponent = {
  id: "notfound",
  title: "Not Found",
  navType: "",
  icon: FaUser,
  isPage: true,
  component: NotFound,
};

export const componentMap: Record<string, PageComponent> = {
  ...topNavComponents,
  ...sideNavComponents,
  ...otherComponents,
};
