// src/routes/AppRoutes.tsx
import { createBrowserRouter } from "react-router";

import AppLayout from "@/components/layout/AppLayout";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RoleRoute";

// Pages


import NotFoundPage from "@/pages/NotFoundPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";

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
                ],
            },
        ],
    },

    // 404
    { path: "*", element: <NotFoundPage /> },
]);