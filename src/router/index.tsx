import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

import SidebarLayout from "layouts/SidebarLayout";
import BaseLayout from "layouts/BaseLayout";

import SuspenseLoader from "components/SuspenseLoader";

const Loader = (Component: any) =>
  function dummy(props: any) {
    return (
      <Suspense fallback={<SuspenseLoader />}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...props} />
      </Suspense>
    );
  };

// Pages

const Overview = Loader(lazy(() => import("pages/overview")));

// Dashboards

const Tasks = Loader(lazy(() => import("pages/dashboards/Tasks")));

// Applications

const Messenger = Loader(lazy(() => import("pages/applications/Messenger")));
const Transactions = Loader(
  lazy(() => import("pages/applications/Transactions"))
);
const UserProfile = Loader(
  lazy(() => import("pages/applications/Users/profile"))
);
const UserSettings = Loader(
  lazy(() => import("pages/applications/Users/settings"))
);

// Components

const Buttons = Loader(lazy(() => import("components/Buttons")));
const Modals = Loader(lazy(() => import("components/Modals")));
const Accordions = Loader(lazy(() => import("components/Accordions")));
const Tabs = Loader(lazy(() => import("components/Tabs")));
const Badges = Loader(lazy(() => import("components/Badges")));
const Tooltips = Loader(lazy(() => import("components/Tooltips")));
const Avatars = Loader(lazy(() => import("components/Avatars")));
const Cards = Loader(lazy(() => import("components/Cards")));
const Forms = Loader(lazy(() => import("components/Forms")));

// Status

const Status404 = Loader(lazy(() => import("pages/Status/Status404")));
const Status500 = Loader(lazy(() => import("pages/Status/Status500")));
const StatusComingSoon = Loader(lazy(() => import("pages/Status/ComingSoon")));
const StatusMaintenance = Loader(
  lazy(() => import("pages/Status/Maintenance"))
);

const routes = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "overview",
        element: <Navigate to="/" replace />,
      },
      {
        path: "status",
        children: [
          {
            path: "",
            element: <Navigate to="404" replace />,
          },
          {
            path: "404",
            element: <Status404 />,
          },
          {
            path: "500",
            element: <Status500 />,
          },
          {
            path: "maintenance",
            element: <StatusMaintenance />,
          },
          {
            path: "coming-soon",
            element: <StatusComingSoon />,
          },
        ],
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "dashboards",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="tasks" replace />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "messenger",
        element: <Messenger />,
      },
    ],
  },
  {
    path: "management",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="transactions" replace />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            element: <Navigate to="details" replace />,
          },
          {
            path: "details",
            element: <UserProfile />,
          },
          {
            path: "settings",
            element: <UserSettings />,
          },
        ],
      },
    ],
  },
  {
    path: "/components",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="buttons" replace />,
      },
      {
        path: "buttons",
        element: <Buttons />,
      },
      {
        path: "modals",
        element: <Modals />,
      },
      {
        path: "accordions",
        element: <Accordions />,
      },
      {
        path: "tabs",
        element: <Tabs />,
      },
      {
        path: "badges",
        element: <Badges />,
      },
      {
        path: "tooltips",
        element: <Tooltips />,
      },
      {
        path: "avatars",
        element: <Avatars />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "forms",
        element: <Forms />,
      },
    ],
  },
];

export default routes;
