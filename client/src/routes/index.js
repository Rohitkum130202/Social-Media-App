import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../modules/Home";
import Form from "../modules/Authorization/Form";
import { CreatePost } from "../modules/CreatePost";

const PrivateRoute = ({ children }) => {
  const isUserLoggedIn = window.localStorage.getItem("user:token") || true;
  const isFormPages = window.location.pathname.includes("account");

  if (isUserLoggedIn && !isFormPages) {
    return children;
  } else if (!isUserLoggedIn && isFormPages) {
    return children;
  } else {
    const redirecturl = isUserLoggedIn ? "/" : "/account/signin";
    return <Navigate to={redirecturl} replace />;
  }
};

export default function AppRoutes() {
  const routes = [
    {
      id: 1,
      name: "home",
      path: "/",
      Components: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
    },
    {
      id: 2,
      name: "Sign in",
      path: "/account/signin",
      Components: <Form />,
    },
    {
      id: 3,
      name: "Sign up",
      path: "/account/signup",
      Components: <Form />,
    },
    {
      id: 4,
      name: "Create Post",
      path: "/new-post",
      Components: (
        <PrivateRoute>
          <CreatePost />
        </PrivateRoute>
      ),
    },
  ];

  return (
    <Routes>
      {routes.map(({ id, name, path, Components }) => (
        <Route key={id} path={path} element={Components} />
      ))}
    </Routes>
  );
}
