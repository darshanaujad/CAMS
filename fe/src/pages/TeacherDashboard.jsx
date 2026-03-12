import { useState } from "react";
import { LayoutDashboard, BookOpen, Users, ClipboardList, CalendarCheck, BarChart2, Megaphone, MessageSquare, UserCircle, LogOut, Bell, Search, ChevronDown, Menu, X, Star, Activity, BookMarked, TrendingUp, Clock, CheckCircle, ArrowUpRight, Circle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BookOpen, label: "My Classes" },
  { icon: Users, label: "Students" },
  { icon: ClipboardList, label: "Assignments" },
  { icon: CalendarCheck, label: "Attendance" },
  { icon: BarChart2, label: "Marks / Results" },
  { icon: Megaphone, label: "Announcements" },
  { icon: MessageSquare, label: "Messages" },
  { icon: UserCircle, label: "Profile" },
];

const perfData = [
  { month: "Aug", avg: 72 }, { month: "Sep", avg: 75 }, { month: "Oct", avg: 70 },
  { month: "Nov", avg: 78 }, { month: "Dec", avg: 82 }, { month: "Jan", avg: 80 },
  { month: "Feb", avg: 85 }, { month: "Mar", avg: 88 },
];

const attendanceData = [
  { day: "Mon", present: 88, absent: 12 }, { day: "Tue", present: 92, absent: 8 },
  { day: "Wed", present: 85, absent: 15 }, { day: "Thu", present: 90, absent: 10 },
  { day: "Fri", present: 78, absent: 22 },
];

const subjectData = [
  { name: "Mathematics", value: 28, color: "#6366f1" },
  { name: "Science", value: 22, color: "#3b82f6" },
  { name: "English", value: 20, color: "#8b5cf6" },
  { name: "History", value: 15, color: "#06b6d4" },
  { name: "Arts", value: 15, color: "#f59e0b" },
];

const submissions = [
  { name: "Aisha Patel", subject: "Mathematics", task: "Algebra Quiz", time: "10 min ago", status: "submitted", score: null },
  { name: "James Okafor", subject: "Science", task: "Lab Report", time: "32 min ago", status: "graded", score: 91 },
  { name: "Sofia Chen", subject: "English", task: "Essay Draft", time: "1 hr ago", status: "submitted", score: null },
  { name: "Liam Torres", subject: "History", task: "Chapter Summary", time: "2 hr ago", status: "graded", score: 85 },
  { name: "Maya Singh", subject: "Mathematics", task: "Geometry HW", time: "3 hr ago", status: "late", score: null },
];

const schedule = [
  { time: "09:00 AM", class: "Mathematics 10A", room: "Room 204", students: 32, color: "bg-indigo-500" },
  { time: "11:00 AM", class: "Science 9B", room: "Lab 3", students: 28, color: "bg-blue-500" },
  { time: "01:30 PM", class: "Mathematics 11C", room: "Room 207", students: 30, color: "bg-violet-500" },
  { time: "03:00 PM", class: "Extra Tuition", room: "Room 101", students: 12, color: "bg-cyan-500" },
];

const activityFeed = [
  { icon: Star, color: "text-yellow-500 bg-yellow-50", text: "Aisha Patel scored 98% on Algebra Quiz", time: "Just now" },
  { icon: Users, color: "text-indigo-500 bg-indigo-50", text: "New student enrolled in Mathematics 10A", time: "15 min ago" },
  { icon: ClipboardList, color: "text-blue-500 bg-blue-50", text: "Assignment 'Quadratic Equations' due tomorrow", time: "1 hr ago" },
  { icon: Activity, color: "text-green-500 bg-green-50", text: "Attendance marked for Science 9B", time: "2 hr ago" },
  { icon: Megaphone, color: "text-purple-500 bg-purple-50", text: "School holiday announced for March 25", time: "Yesterday" },
];

const statCards = [
  { label: "Total Students", value: "284", change: "+12", icon: Users, color: "bg-indigo-600", light: "bg-indigo-50 text-indigo-600" },
  { label: "Active Classes", value: "6", change: "+1", icon: BookOpen, color: "bg-blue-600", light: "bg-blue-50 text-blue-600" },
  { label: "Pending Reviews", value: "23", change: "-5", icon: ClipboardList, color: "bg-violet-600", light: "bg-violet-50 text-violet-600" },
  { label: "Avg Attendance", value: "87%", change: "+3%", icon: CalendarCheck, color: "bg-cyan-600", light: "bg-cyan-50 text-cyan-600" },
];

export default function TeacherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 bg-indigo-950 flex flex-col shrink-0 z-20`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-indigo-800">
          <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center shrink-0">
            <BookMarked size={18} className="text-white" />
          </div>
          {sidebarOpen && <span className="text-white font-bold text-xl tracking-tight">EduFlow</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={`w-full flex items-center gap-3 px-5 py-3 my-0.5 transition-all rounded-none text-sm font-medium
                ${activeNav === label
                  ? "bg-indigo-600 text-white"
                  : "text-indigo-300 hover:bg-indigo-900 hover:text-white"}`}
            >
              <Icon size={18} className="shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-indigo-800 p-4">
          <button className="w-full flex items-center gap-3 px-2 py-2 text-indigo-300 hover:text-red-400 transition-colors text-sm">
            <LogOut size={18} className="shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-4 shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <Menu size={20} />
          </button>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search students, classes..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  MS
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-semibold text-slate-800">Ms. Sarah Khan</p>
                  <p className="text-xs text-slate-400">Mathematics Teacher</p>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-xl shadow-lg p-2 w-44 z-50">
                  {["View Profile", "Settings", "Help"].map(item => (
                    <button key={item} className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">{item}</button>
                  ))}
                  <hr className="my-1 border-slate-100" />
                  <button className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg">Sign out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Page title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Good morning, Ms. Khan 👋</h1>
            <p className="text-slate-500 text-sm mt-1">Here's what's happening in your classes today.</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statCards.map(({ label, value, change, icon: Icon, color, light }) => (
              <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${light} flex items-center justify-center shrink-0`}>
                  <Icon size={22} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 font-medium">{label}</p>
                  <p className="text-2xl font-bold text-slate-900 leading-tight">{value}</p>
                  <p className={`text-xs font-medium ${change.startsWith("+") ? "text-green-500" : "text-red-400"}`}>
                    {change} this month
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Line Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-800">Student Performance Trend</h2>
                  <p className="text-xs text-slate-400">Average score across all classes</p>
                </div>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Aug – Mar</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={perfData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[60, 100]} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", fontSize: 12 }} />
                  <Line type="monotone" dataKey="avg" stroke="#6366f1" strokeWidth={3} dot={{ fill: "#6366f1", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="mb-4">
                <h2 className="text-sm font-bold text-slate-800">Subject Distribution</h2>
                <p className="text-xs text-slate-400">Students per subject</p>
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={subjectData} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="value">
                    {subjectData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 space-y-1.5">
                {subjectData.map(s => (
                  <div key={s.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="text-slate-600">{s.name}</span>
                    </div>
                    <span className="font-semibold text-slate-800">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bar Chart + Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-800">Weekly Attendance Overview</h2>
                  <p className="text-xs text-slate-400">Present vs Absent this week</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={attendanceData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="present" fill="#6366f1" radius={[6, 6, 0, 0]} name="Present" />
                  <Bar dataKey="absent" fill="#e0e7ff" radius={[6, 6, 0, 0]} name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h2 className="text-sm font-bold text-slate-800 mb-4">Class Activity Feed</h2>
              <div className="space-y-3">
                {activityFeed.map(({ icon: Icon, color, text, time }, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className={`w-8 h-8 rounded-xl ${color} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon size={14} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-700 font-medium leading-tight">{text}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submissions + Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Submissions Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-800">Recent Student Submissions</h2>
                <button className="text-xs text-indigo-600 font-semibold hover:underline">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left text-slate-400 font-medium pb-2 pr-4">Student</th>
                      <th className="text-left text-slate-400 font-medium pb-2 pr-4">Subject</th>
                      <th className="text-left text-slate-400 font-medium pb-2 pr-4">Task</th>
                      <th className="text-left text-slate-400 font-medium pb-2 pr-4">Time</th>
                      <th className="text-left text-slate-400 font-medium pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((s, i) => (
                      <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                              {s.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <span className="font-medium text-slate-700">{s.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 pr-4 text-slate-500">{s.subject}</td>
                        <td className="py-2.5 pr-4 text-slate-600">{s.task}</td>
                        <td className="py-2.5 pr-4 text-slate-400">{s.time}</td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                            ${s.status === "submitted" ? "bg-blue-50 text-blue-600" :
                              s.status === "graded" ? "bg-green-50 text-green-600" :
                              "bg-red-50 text-red-500"}`}>
                            {s.status}
                            {s.score !== null ? ` · ${s.score}%` : ""}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-800">Today's Schedule</h2>
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Mar 12</span>
              </div>
              <div className="space-y-3">
                {schedule.map((s, i) => (
                  <div key={i} className="flex gap-3 items-start group">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${s.color} mt-1 shrink-0`} />
                      {i < schedule.length - 1 && <div className="w-px h-8 bg-slate-100 mt-1" />}
                    </div>
                    <div className="flex-1 pb-1">
                      <p className="text-xs text-slate-400 font-medium">{s.time}</p>
                      <p className="text-sm font-semibold text-slate-800 leading-tight">{s.class}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-slate-400">{s.room}</span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-400">{s.students} students</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}