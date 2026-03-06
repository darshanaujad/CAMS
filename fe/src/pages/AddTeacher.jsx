import { useState } from "react";

const subjects = [
  "Mathematics", "Physics", "Chemistry", "Biology",
  "English", "History", "Geography", "Computer Science",
  "Economics", "Physical Education", "Art", "Music"
];

const departments = [
  "Science", "Mathematics", "Humanities", "Languages",
  "Computer Science", "Commerce", "Arts", "Physical Education"
];

export default function AddTeacher() {
  const [formData, setFormData] = useState({
    fullName: "", email: "", gender: "", department: "",
    qualification: "", phone: "", experience: "",
  });
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleSubject = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const handleReset = () => {
    setFormData({ fullName: "", email: "", gender: "", department: "", qualification: "", phone: "", experience: "" });
    setSelectedSubjects([]);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const labelClass = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col py-6 px-4 shadow-sm hidden md:flex">
        <div className="flex items-center gap-2.5 mb-8 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">EduManage</p>
            <p className="text-xs text-gray-400">Admin Portal</p>
          </div>
        </div>
        {["Dashboard", "Students", "Teachers", "Courses", "Notes", "Assignments", "Attendance", "Marks", "Profile"].map((item) => (
          <button key={item} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors ${item === "Teachers" ? "bg-blue-50 text-blue-600 font-semibold border-r-4 border-blue-600 rounded-r-none" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}>
            {item}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Add New Teacher</h1>
            <p className="text-sm text-gray-400 mt-0.5">Fill in the details to register a new teacher</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">JA</div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">John Anderson</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        {submitted && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl px-5 py-3.5 flex items-center gap-3 animate-pulse">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-medium text-green-700">Teacher added successfully!</p>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-800">Teacher Information</h2>
              <p className="text-xs text-gray-400">All fields marked are required</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Full Name */}
              <div>
                <label className={labelClass}>Full Name <span className="text-red-400">*</span></label>
                <input name="fullName" type="text" value={formData.fullName} onChange={handleChange}
                  placeholder="e.g. Dr. Sarah Johnson" required className={inputClass} />
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Email Address <span className="text-red-400">*</span></label>
                <input name="email" type="email" value={formData.email} onChange={handleChange}
                  placeholder="e.g. sarah@school.edu" required className={inputClass} />
              </div>

              {/* Gender */}
              <div>
                <label className={labelClass}>Gender <span className="text-red-400">*</span></label>
                <select name="gender" value={formData.gender} onChange={handleChange} required className={inputClass}>
                  <option value="" disabled>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label className={labelClass}>Department <span className="text-red-400">*</span></label>
                <select name="department" value={formData.department} onChange={handleChange} required className={inputClass}>
                  <option value="" disabled>Select department</option>
                  {departments.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>

              {/* Qualification */}
              <div>
                <label className={labelClass}>Qualification <span className="text-red-400">*</span></label>
                <input name="qualification" type="text" value={formData.qualification} onChange={handleChange}
                  placeholder="e.g. M.Sc., Ph.D." required className={inputClass} />
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Phone Number <span className="text-red-400">*</span></label>
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange}
                  placeholder="e.g. +91 9876543210" required className={inputClass} />
              </div>

              {/* Experience */}
              <div>
                <label className={labelClass}>Experience (Years) <span className="text-red-400">*</span></label>
                <input name="experience" type="number" min="0" max="50" value={formData.experience} onChange={handleChange}
                  placeholder="e.g. 5" required className={inputClass} />
              </div>

              {/* Subjects Multi-Select */}
              <div className="relative">
                <label className={labelClass}>Subjects <span className="text-red-400">*</span></label>
                <button type="button" onClick={() => setSubjectDropdownOpen(!subjectDropdownOpen)}
                  className={`${inputClass} text-left flex items-center justify-between`}>
                  <span className={selectedSubjects.length === 0 ? "text-gray-400" : "text-gray-800"}>
                    {selectedSubjects.length === 0 ? "Select subjects" : `${selectedSubjects.length} selected`}
                  </span>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${subjectDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {subjectDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                    <div className="max-h-48 overflow-y-auto p-2">
                      {subjects.map((subject) => (
                        <label key={subject} className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="checkbox" checked={selectedSubjects.includes(subject)} onChange={() => toggleSubject(subject)}
                            className="w-4 h-4 accent-blue-600 rounded" />
                          <span className="text-sm text-gray-700">{subject}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSubjects.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedSubjects.map((s) => (
                      <span key={s} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        {s}
                        <button type="button" onClick={() => toggleSubject(s)} className="hover:text-blue-900 ml-0.5">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mt-6 pt-5 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button type="button" onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                Clear Form
              </button>
              <button type="submit"
                className="w-full sm:w-auto px-8 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-sm shadow-blue-200 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Teacher
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}