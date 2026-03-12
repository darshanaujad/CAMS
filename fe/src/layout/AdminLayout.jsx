import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({children}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Page Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-3">

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <h1 className="font-semibold text-gray-800">
            Admin Panel
          </h1>

        </header>

        <main className="flex-1 overflow-y-auto p-6">

          {children}

        </main>

      </div>
    </div>
  );
}