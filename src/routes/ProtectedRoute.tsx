import { Navigate, Outlet } from "react-router";
// import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute() {
    
    // const { isAuthenticated, isLoading } = useAuth();

    // Optional: loading state (recommended for real apps)
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace />;
    // }

    return <Outlet />;
}