import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../lib/axios";

export default function AdminStudent() {

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  // Fetch Students
  const fetchStudents = async () => {
    try {

      setLoading(true);

      const res = await axiosInstance.get("students", {
        params: {
          page,
          limit,
          search,
          status
        }
      });

      setStudents(res.data.data);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      console.error("Error fetching students", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, search, status]);

  // Approve student
  const approveStudent = async (id) => {
    try {

      await axios.patch(`/api/students/${id}/approve`);

      fetchStudents();

    } catch (err) {
      console.error(err);
    }
  };

  // Reject student
  const rejectStudent = async (id) => {
    try {

      await axios.patch(`/api/students/${id}/reject`);

      fetchStudents();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Students Management
          </h1>

          <p className="text-sm text-gray-500">
            Manage student approvals and records
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/add-student")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow"
        >
          + Add Student
        </button>

      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3">

          <input
            type="text"
            placeholder="Search by name or email"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">

            <thead className="bg-gray-50 text-gray-600 text-left">

              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-10">
                    Loading...
                  </td>
                </tr>
              ) : students?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    No Students Found
                  </td>
                </tr>
              ) : (
                students?.map((student) => (

                  <tr key={student._id} className="hover:bg-gray-50">

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {student.fullName}
                    </td>

                    <td className="px-6 py-4">
                      {student.email}
                    </td>

                    <td className="px-6 py-4">
                      {student.department}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold
                        ${
                          student.status === "APPROVED"
                            ? "bg-green-100 text-green-600"
                            : student.status === "REJECTED"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {student.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">
                      {new Date(student.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 flex justify-center gap-2">

                      <button
                        onClick={() => approveStudent(student._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectStudent(student._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold"
                      >
                        Reject
                      </button>

                    </td>

                  </tr>

                ))
              )}

            </tbody>

          </table>

        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 border-t border-gray-100">

          <p className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded text-sm disabled:opacity-40"
            >
              Prev
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded text-sm disabled:opacity-40"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}