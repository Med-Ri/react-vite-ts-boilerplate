// src/routes/AppRoutes.tsx
import { createBrowserRouter } from "react-router";

import AppLayout from "@/components/layout/AppLayout";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Pages
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            // 🌍 Public pages
            {
                element: <PublicRoute />,
                children: [
                    { path: "/login", element: <LoginPage /> },
                ],
            },

            // 🔒 Protected pages
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "/", element: <HomePage /> },
                    // 🎭 Role-based pages
                    {
                        element: <RoleRoute allowedRoles={["ADMIN"]} />,
                        children: [
                            { path: "/dashboard", element: <DashboardPage /> },
                        ],
                    },
                    //{
                        // element: <RoleRoute allowedRoles={["ADMIN"]} />,
                        // children: [
                        //     { path: "/your-route", element: <route-page /> },
                        // ],
                    //},
                ],
            },
        ],
    },

    // 404
    { path: "*", element: <NotFoundPage /> },
]);