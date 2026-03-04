import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from "recharts";

const enrollmentData = [
  { month: "Sep", students: 2480 },
  { month: "Oct", students: 2520 },
  { month: "Nov", students: 2560 },
  { month: "Dec", students: 2590 },
  { month: "Jan", students: 2650 },
  { month: "Feb", students: 2720 },
  { month: "Mar", students: 2847 },
];

const attendanceData = [
  { day: "Mon", rate: 91 },
  { day: "Tue", rate: 95 },
  { day: "Wed", rate: 88 },
  { day: "Thu", rate: 97 },
  { day: "Fri", rate: 93 },
];

const subjectData = [
  { name: "Science", value: 32, color: "#6366f1" },
  { name: "Math", value: 28, color: "#f59e0b" },
  { name: "English", value: 22, color: "#10b981" },
  { name: "History", value: 18, color: "#f43f5e" },
];

const recentStudents = [
  { name: "Aisha Menon", course: "Computer Science", grade: "A", status: "active", color: "bg-indigo-500" },
  { name: "Rohan Desai", course: "Mathematics", grade: "B+", status: "active", color: "bg-emerald-500" },
  { name: "Priya Nair", course: "Physics", grade: "A-", status: "pending", color: "bg-amber-500" },
  { name: "Kiran Sharma", course: "Chemistry", grade: "A", status: "active", color: "bg-rose-500" },
  { name: "Dev Kulkarni", course: "Biology", grade: "B", status: "pending", color: "bg-blue-500" },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "students", label: "Students" },
  { id: "teachers", label: "Teachers" },
  { id: "courses", label: "Courses" },
  { id: "notes", label: "Notes" },
  { id: "assignments", label: "Assignments" },
  { id: "attendance", label: "Attendance" },
  { id: "marks", label: "Marks" },
];

function NavIcon({ id, active }) {
  const cls = `w-4.5 h-4.5 ${active ? "text-indigo-600" : "text-gray-400"}`;
  const icons = {
    dashboard: <svg className={cls} style={{width:18,height:18}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active?2.2:1.8}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
    students: <svg className={cls} style={{width:18,height:18}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active?2.2:1.8}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    teachers: <svg className={cls} style={{width:18,height:18}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active?2.2:1.8}><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
    courses: <svg className={cls} style={{width:18,height:18}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active?2.2:1.8}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    notes: <svg className={cls} style={{width:18,height:18}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active?2.2:1.8}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    assignments: <svg className={cls} style={{width:18,height:18}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active?2.2:1.8}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    attendance: <svg className={cls} style={{width:18,height:18}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active?2.2:1.8}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    marks: <svg className={cls} style={{width:18,height:18}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active?2.2:1.8}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  };
  return icons[id] || null;
}

function StatCard({ icon, label, value, change, bg, iconColor }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${bg}`}>
          <span style={{ fontSize: 20 }}>{icon}</span>
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-500">
          <svg style={{width:12,height:12}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
          </svg>
          {change}
        </span>
      </div>
      <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</p>
    </div>
  );
}

function TooltipEnroll({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white shadow-lg rounded-xl px-4 py-2.5 border border-gray-100 text-sm">
      <p className="font-semibold text-gray-600 text-xs">{label}</p>
      <p className="text-indigo-600 font-bold">{payload[0].value.toLocaleString()} students</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50" style={{ fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}</style>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`fixed top-0 left-0 h-full w-56 bg-white border-r border-gray-100 z-30 flex flex-col
        transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm leading-tight">EduManage</p>
              <p className="text-xs text-gray-400">Admin Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const isActive = active === item.id;
            return (
              <button key={item.id} onClick={() => { setActive(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                  ${isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}>
                <NavIcon id={item.id} active={isActive} />
                <span>{item.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-5 rounded-full bg-indigo-600" />}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-gray-500 hover:text-gray-800 text-sm font-medium">
            <svg style={{width:18,height:18}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            Profile
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Navbar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-5 sm:px-8 h-16">
            <div className="flex items-center gap-3">
              <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                onClick={() => setSidebarOpen(true)}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
              <div>
                <h1 className="text-base font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-xs text-gray-400 hidden sm:block">Welcome back, Administrator</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-56">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input className="bg-transparent text-sm text-gray-600 outline-none placeholder-gray-400 w-full" placeholder="Search..."/>
              </div>

              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"/>
              </button>

              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">JA</div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">John Anderson</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-5 sm:px-8 py-7 space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard icon="🎓" label="Total Students" value="2,847" change="12%" bg="bg-blue-50"/>
            <StatCard icon="👩‍🏫" label="Total Teachers" value="156" change="8%" bg="bg-purple-50"/>
            <StatCard icon="📖" label="Active Courses" value="48" change="5%" bg="bg-amber-50"/>
            <StatCard icon="📅" label="Attendance Rate" value="94.2%" change="18%" bg="bg-emerald-50"/>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Enrollment */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900">Student Enrollment Trend</h2>
                <div className="relative">
                  <select className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 pr-7 outline-none appearance-none cursor-pointer">
                    <option>Last 6 Months</option><option>Last 3 Months</option><option>This Year</option>
                  </select>
                  <svg className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={enrollmentData} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
                  <defs>
                    <linearGradient id="eGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.18}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.01}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[1500, 3000]}/>
                  <Tooltip content={<TooltipEnroll />}/>
                  <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={2.5}
                    fill="url(#eGrad)" dot={false} activeDot={{ r: 5, fill: "#6366f1", strokeWidth: 0 }}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Attendance */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900">Attendance Overview</h2>
                <div className="relative">
                  <select className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 pr-7 outline-none appearance-none cursor-pointer">
                    <option>This Month</option><option>Last Month</option><option>This Week</option>
                  </select>
                  <svg className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={attendanceData} margin={{ top: 5, right: 5, bottom: 0, left: -15 }} barSize={38}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[80, 100]}/>
                  <Tooltip formatter={v => [`${v}%`, "Rate"]}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}/>
                  <Bar dataKey="rate" radius={[7, 7, 0, 0]}>
                    {attendanceData.map((e, i) => (
                      <Cell key={i} fill={e.rate >= 95 ? "#6366f1" : e.rate >= 92 ? "#818cf8" : "#c7d2fe"}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Recent Students */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                <h2 className="font-bold text-gray-900">Recent Students</h2>
                <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors">View All →</button>
              </div>
              <div className="divide-y divide-gray-50">
                {recentStudents.map((s, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${s.color}`}>
                      {s.name.split(" ").map(n=>n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.course}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-700 hidden sm:block w-8 text-center">{s.grade}</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                      {s.status === "active" ? "Active" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Pie */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4">Subject Distribution</h2>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={subjectData} cx="50%" cy="50%" innerRadius={42} outerRadius={68}
                    paddingAngle={3} dataKey="value">
                    {subjectData.map((e, i) => <Cell key={i} fill={e.color} strokeWidth={0}/>)}
                  </Pie>
                  <Tooltip formatter={v => [`${v}%`, "Share"]}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}/>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2.5">
                {subjectData.map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }}/>
                      <span className="text-xs text-gray-600 font-medium">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${s.value * 3}%`, background: s.color }}/>
                      </div>
                      <span className="text-xs font-bold text-gray-700 w-8 text-right">{s.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Approve Students", color: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200", icon: "✓" },
                { label: "Add New Teacher", color: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200", icon: "+" },
                { label: "Create Course", color: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200", icon: "📖" },
                { label: "Schedule Class", color: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200", icon: "📅" },
              ].map((btn, i) => (
                <button key={i} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all active:scale-95 ${btn.color}`}>
                  <span>{btn.icon}</span> {btn.label}
                </button>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}