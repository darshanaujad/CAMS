import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", path: "/admin/dashboard" },
  { id: "students", label: "Students", path: "/admin/students" },
  { id: "teachers", label: "Teachers", path: "/admin/teachers" },
  { id: "courses", label: "Courses", path: "/admin/courses" },
  { id: "notes", label: "Notes", path: "/admin/notes" },
  { id: "assignments", label: "Assignments", path: "/admin/assignments" },
  { id: "attendance", label: "Attendance", path: "/admin/attendance" },
  { id: "marks", label: "Marks", path: "/admin/marks" },
];

function NavIcon({ id, active }) {
  const cls = `w-4.5 h-4.5 ${active ? "text-indigo-600" : "text-gray-400"}`;

  const icons = {
    dashboard: (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5"/>
      </svg>
    ),
    students: (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
      </svg>
    ),
    teachers: (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      </svg>
    ),
    courses: (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      </svg>
    ),
  };

  return icons[id] || null;
}

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-56 bg-white border-r border-gray-100 z-30 flex flex-col
      transition-transform duration-300 lg:translate-x-0 lg:static
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >

      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            </svg>
          </div>

          <div>
            <p className="font-bold text-gray-900 text-sm">EduManage</p>
            <p className="text-xs text-gray-400">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">

        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition
              ${isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <NavIcon id={item.id} active={isActive} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-5 rounded-full bg-indigo-600" />
                )}
              </>
            )}
          </NavLink>
        ))}

      </nav>

      {/* Profile */}
      <div className="p-3 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-500 hover:text-gray-800 text-sm font-medium">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="7" r="4"/>
          </svg>
          Profile
        </button>
      </div>

    </aside>
  );
}