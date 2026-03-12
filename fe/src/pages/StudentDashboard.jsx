import { useState } from "react";
import {
  LayoutDashboard, BookOpen, ClipboardList, CalendarCheck,
  BarChart2, Megaphone, MessageSquare, User, LogOut,
  Bell, ChevronDown, TrendingUp, Clock, CheckCircle,
  AlertCircle, Menu, X, Star, ArrowUpRight, BookMarked,
  Activity, Zap
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Area, AreaChart
} from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const submissionTrend = [
  { week: "Wk 1", submitted: 3, total: 4 },
  { week: "Wk 2", submitted: 5, total: 5 },
  { week: "Wk 3", submitted: 2, total: 4 },
  { week: "Wk 4", submitted: 4, total: 5 },
  { week: "Wk 5", submitted: 6, total: 6 },
  { week: "Wk 6", submitted: 3, total: 5 },
  { week: "Wk 7", submitted: 5, total: 5 },
];

const attendanceData = [
  { subject: "Math", present: 88 },
  { subject: "Physics", present: 72 },
  { subject: "English", present: 95 },
  { subject: "CS", present: 91 },
  { subject: "History", present: 65 },
  { subject: "Bio", present: 80 },
];

const upcomingAssignments = [
  { id: 1, title: "Calculus Problem Set 4", subject: "Mathematics", due: "Tomorrow", priority: "high" },
  { id: 2, title: "Essay: Industrial Revolution", subject: "History", due: "Mar 14", priority: "medium" },
  { id: 3, title: "Lab Report – Thermodynamics", subject: "Physics", due: "Mar 16", priority: "high" },
  { id: 4, title: "Reading: Chapter 9–11", subject: "English", due: "Mar 18", priority: "low" },
];

const announcements = [
  { id: 1, title: "Mid-term Exam Schedule Released", time: "2 hours ago", icon: "📋", color: "bg-indigo-50 text-indigo-600" },
  { id: 2, title: "Library closed on March 15 (Maintenance)", time: "Yesterday", icon: "📚", color: "bg-amber-50 text-amber-600" },
  { id: 3, title: "Guest Lecture: AI in Healthcare – Dr. Mehta", time: "2 days ago", icon: "🎤", color: "bg-emerald-50 text-emerald-600" },
];

const courses = [
  { id: 1, name: "Advanced Mathematics", instructor: "Dr. Priya Sharma", progress: 68, color: "from-indigo-500 to-blue-500", icon: "📐", grade: "A" },
  { id: 2, name: "Physics II", instructor: "Prof. Arjun Nair", progress: 45, color: "from-violet-500 to-purple-500", icon: "⚡", grade: "B+" },
  { id: 3, name: "Computer Science", instructor: "Ms. Kavya Reddy", progress: 82, color: "from-cyan-500 to-teal-500", icon: "💻", grade: "A+" },
  { id: 4, name: "English Literature", instructor: "Mr. Rohan Das", progress: 91, color: "from-rose-500 to-pink-500", icon: "📖", grade: "A" },
];

const recentActivity = [
  { id: 1, action: "Submitted", item: "Physics Assignment 3", time: "1h ago", type: "submit" },
  { id: 2, action: "Attended", item: "CS Lecture – Algorithms", time: "3h ago", type: "attend" },
  { id: 3, action: "Grade Posted", item: "Math Mid-term: 91/100", time: "Yesterday", type: "grade" },
  { id: 4, action: "New Message", item: "Dr. Sharma sent feedback", time: "Yesterday", type: "message" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BookOpen, label: "My Courses" },
  { icon: ClipboardList, label: "Assignments" },
  { icon: CalendarCheck, label: "Attendance" },
  { icon: BarChart2, label: "Marks / Grades" },
  { icon: Megaphone, label: "Announcements" },
  { icon: MessageSquare, label: "Messages" },
  { icon: User, label: "Profile" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatCard = ({ icon: Icon, label, value, sub, color, bg, trend }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${bg}`}>
        <Icon size={20} className={color} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          <ArrowUpRight size={12} /> {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800 tracking-tight">{value}</p>
      <p className="text-sm font-medium text-gray-500 mt-0.5">{label}</p>
    </div>
    {sub && <p className="text-xs text-gray-400">{sub}</p>}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-base font-semibold text-gray-700 mb-3">{children}</h2>
);

const priorityStyles = {
  high: "bg-rose-50 text-rose-600 border-rose-100",
  medium: "bg-amber-50 text-amber-600 border-amber-100",
  low: "bg-emerald-50 text-emerald-600 border-emerald-100",
};

const activityIcons = {
  submit: { bg: "bg-indigo-50", color: "text-indigo-600", icon: CheckCircle },
  attend: { bg: "bg-emerald-50", color: "text-emerald-600", icon: CalendarCheck },
  grade: { bg: "bg-amber-50", color: "text-amber-600", icon: Star },
  message: { bg: "bg-violet-50", color: "text-violet-600", icon: MessageSquare },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-2 text-xs">
        <p className="font-semibold text-gray-600 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-medium">{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-60 bg-white border-r border-gray-100
        flex flex-col shadow-sm transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center shadow-md shadow-indigo-200">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent tracking-tight">
            EduFlow
          </span>
          <button className="ml-auto lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Student mini-profile */}
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 bg-indigo-50 rounded-xl px-3 py-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-blue-400 flex items-center justify-center text-white text-sm font-bold shadow">
              AR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">Aditya Rao</p>
              <p className="text-xs text-indigo-500 truncate">CS · Semester 4</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2">Menu</p>
          {navItems.map(({ icon: Icon, label }) => {
            const isActive = activeNav === label;
            return (
              <button
                key={label}
                onClick={() => { setActiveNav(label); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-all
                  ${isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  }`}
              >
                <Icon size={18} />
                {label}
                {label === "Messages" && (
                  <span className="ml-auto bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-4">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Area ───────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3.5 flex items-center gap-4 shadow-sm z-10">
          <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>

          <div className="flex-1">
            <h1 className="text-base font-semibold text-gray-800">
              Good morning, Aditya 👋
            </h1>
            <p className="text-xs text-gray-400">Thursday, March 12, 2026</p>
          </div>

          {/* Notification */}
          <button className="relative w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-indigo-50 rounded-xl px-3 py-2 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-blue-400 flex items-center justify-center text-white text-xs font-bold">
                AR
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">Aditya Rao</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                {["View Profile", "Settings", "Help"].map(item => (
                  <button key={item} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">{item}</button>
                ))}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-rose-50">Logout</button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-5 space-y-6">

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={BookMarked} label="Enrolled Courses" value="6" sub="2 in progress" color="text-indigo-600" bg="bg-indigo-50" trend="+1 this sem" />
            <StatCard icon={ClipboardList} label="Pending Assignments" value="4" sub="2 due this week" color="text-rose-500" bg="bg-rose-50" />
            <StatCard icon={CalendarCheck} label="Attendance" value="83%" sub="Above 75% threshold" color="text-emerald-600" bg="bg-emerald-50" trend="+2%" />
            <StatCard icon={TrendingUp} label="Average Grade" value="A–" sub="Top 15% of class" color="text-amber-500" bg="bg-amber-50" trend="↑ from B+" />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Line Chart */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-semibold text-gray-700">Assignment Submissions</h2>
                  <p className="text-xs text-gray-400">Weekly trend – last 7 weeks</p>
                </div>
                <span className="text-xs bg-indigo-50 text-indigo-600 font-medium px-2.5 py-1 rounded-full">Submitted vs Total</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={submissionTrend}>
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="total" name="Total" stroke="#e0e7ff" strokeWidth={2} fill="url(#grad2)" />
                  <Area type="monotone" dataKey="submitted" name="Submitted" stroke="#6366f1" strokeWidth={2.5} fill="url(#grad1)" dot={{ fill: "#6366f1", r: 3 }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-semibold text-gray-700">Attendance Overview</h2>
                  <p className="text-xs text-gray-400">By subject – current semester</p>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-600 font-medium px-2.5 py-1 rounded-full">% Present</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={attendanceData} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="subject" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
                  <Bar dataKey="present" name="Attendance %" radius={[6, 6, 0, 0]}
                    fill="url(#barGrad)"
                  />
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a5b4fc" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Upcoming Assignments */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <SectionTitle>Upcoming Assignments</SectionTitle>
                <button className="text-xs text-indigo-500 font-medium hover:text-indigo-700">View all</button>
              </div>
              <div className="space-y-3">
                {upcomingAssignments.map(a => (
                  <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-50">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <ClipboardList size={16} className="text-indigo-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{a.title}</p>
                      <p className="text-xs text-gray-400">{a.subject}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${priorityStyles[a.priority]}`}>
                        {a.priority}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={10} /> {a.due}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <SectionTitle>Announcements</SectionTitle>
                <span className="w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
              </div>
              <div className="space-y-3">
                {announcements.map(a => (
                  <div key={a.id} className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${a.color}`}>
                      {a.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-700 leading-snug">{a.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Course Cards */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <SectionTitle>My Courses</SectionTitle>
                <button className="text-xs text-indigo-500 font-medium hover:text-indigo-700">All courses</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {courses.map(c => (
                  <div key={c.id} className="rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-lg shadow-sm`}>
                        {c.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-700 truncate">{c.name}</p>
                        <p className="text-xs text-gray-400 truncate">{c.instructor}</p>
                      </div>
                      <span className="text-sm font-bold text-indigo-600">{c.grade}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Progress</span>
                        <span className="font-medium text-gray-600">{c.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${c.color} transition-all duration-500`}
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <SectionTitle>Recent Activity</SectionTitle>
              <div className="space-y-3">
                {recentActivity.map(item => {
                  const { bg, color, icon: Icon } = activityIcons[item.type];
                  return (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon size={14} className={color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{item.action}</p>
                        <p className="text-sm text-gray-700 font-medium leading-snug truncate">{item.item}</p>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <Activity size={10} /> {item.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-300 pb-2">EduFlow © 2026 · All rights reserved</p>
        </main>
      </div>
    </div>
  );
}