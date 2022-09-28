import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

import SidebarLayout from "layouts/SidebarLayout";
import BaseLayout from "layouts/BaseLayout";

import SuspenseLoader from "components/SuspenseLoader";
import { store } from "state";

const isAuthenticated = () => {
  const { user } = store.getState();
  return (
    (user.access &&
      user.refresh &&
      user.access.length > 0 &&
      user.refresh.length > 0 &&
      user.id > 0) ||
    false
  );
};

const Loader = (Component: any) =>
  function dummy(props: any) {
    return (
      <Suspense fallback={<SuspenseLoader />}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...props} />
      </Suspense>
    );
  };

// const PrivateLoader = (Component: any) => {
//   const auth = isAuthenticated();
//   console.log("HAHAA", auth);

//   return function dummy(props: any) {
//     return (
//       <Suspense fallback={<SuspenseLoader />}>
//         {/* eslint-disable-next-line react/jsx-props-no-spreading */}
//         {auth ? <Component {...props} /> : <Navigate to="/login" />}
//       </Suspense>
//     );
//   };
// };

// Pages

const Login = Loader(lazy(() => import("pages/Login")));
const Status404 = Loader(lazy(() => import("pages/Status404")));
const SignUp = Loader(lazy(() => import("pages/SignUp")));
const Logout = Loader(lazy(() => import("pages/Logout")));
const Profile = Loader(lazy(() => import("pages/Profile")));
const ProfileSetting = Loader(lazy(() => import("pages/ProfileSetting")));
const Problems = Loader(lazy(() => import("pages/Problems")));
const ProblemDetail = Loader(lazy(() => import("pages/ProblemDetail")));
const Submissions = Loader(lazy(() => import("pages/Submissions")));
const SubmissionDetail = Loader(lazy(() => import("pages/SubmissionDetail")));

const AuthRoutes = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      { path: "", element: <Navigate to="/login" /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "problems", element: <Problems /> },
      {
        path: "*",
        element: <Navigate to="/login" />,
      },
    ],
  },
];

const MainRoutes = [
  {
    path: "",
    element: <SidebarLayout />,
    children: [
      { path: "", element: <Navigate to="/profile" /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/settings", element: <ProfileSetting /> },
      { path: "problems", element: <Problems /> },
      { path: "problems/:id", element: <ProblemDetail /> },
      { path: "submissions", element: <Submissions /> },
      { path: "submissions/:id", element: <SubmissionDetail /> },
      { path: "logout", element: <Logout /> },
      { path: "*", element: <Status404 /> },
    ],
  },
];

export const AppRoutes = () => {
  const auth = isAuthenticated();

  return auth ? MainRoutes : AuthRoutes;
};

export { AuthRoutes, MainRoutes };
