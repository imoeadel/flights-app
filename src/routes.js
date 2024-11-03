import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorFallback from "./components/ErrorFallback/ErrorFallback.jsx";
import FlightList from "./components/Flights/FlightList.jsx";
import RootLayout from "./Layouts/RootLayout.jsx";

// lazy pages
const LoginPage = lazy(() => import("./components/Auth/LoginPage.jsx"));
const NotFound404 = lazy(() => import('./components/NotFound404.jsx'))
const RegisterPage = lazy(() => import('./components/Auth/RegisterPage.jsx'))



const PrivateRoutes = () => {

  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      id: "root",
      errorElement: <ErrorFallback />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "/bad-request", element: <ErrorFallback /> },
        {
          path: '/flights',
          element: <FlightList />,
        },
        {
          path: "/*",
          element: <NotFound404 />
        }
      ]
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default PrivateRoutes;
