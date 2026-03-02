import { Outlet } from "react-router";

export default function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-gray-800 text-white p-4">My App Header</header>

            {/* Page content */}
            <main className="flex-1 p-6">
                <Outlet /> {/* This is where the current page (Login, Home, Dashboard) will render */}
            </main>

            {/* Footer */}
            <footer className="bg-gray-200 text-center p-4">My App Footer</footer>
        </div>
    );
}