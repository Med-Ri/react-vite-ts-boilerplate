import { Navigate, Outlet } from "react-router";
// import { useAuth } from "@/context/AuthContext";

interface RoleRouteProps {
    allowedRoles: string[];
}

export default function RoleRoute({ allowedRoles }: RoleRouteProps) {
    
    // const { user, isAuthenticated, isLoading } = useAuth();

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace />;
    // }

    // if (!user || !allowedRoles.includes(user.role)) {
    //     return <Navigate to="/login" replace />; // or a "No Access" page
    // }

    return <Outlet />;
}