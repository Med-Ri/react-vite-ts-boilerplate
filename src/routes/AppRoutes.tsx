// src/routes/AppRoutes.tsx
import { createBrowserRouter } from "react-router";

import AppLayout from "@/components/layout/AppLayout";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RoleRoute";

// Pages
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
    {
        element: <AppLayout />, // Layout is always rendered
        children: [
            // Public pages (guests)
            {
                element: <PublicRoute />,
                children: [
                    { path: "/login", element: <LoginPage /> },
                ],
            },

            // Protected pages (authenticated)
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "/", element: <HomePage /> },

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

    // 404 fallback
    { path: "*", element: <NotFoundPage /> },
]);