import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import axiosInstance from "../lib/axios";

export default function AdminTeacher() {

  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Teachers
  const fetchTeachers = async () => {
    try {

      setLoading(true);

      const res = await axiosInstance.get("teachers", {
        params: {
          page,
          limit,
          search
        }
      });

      setTeachers(res.data.data);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      console.error("Error fetching teachers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [page, search]);

  return (
    <div>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Teachers Management
          </h1>

          <p className="text-sm text-gray-500">
            Manage teachers records
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/dashboard/add-teacher")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow"
        >
          + Add Teacher
        </button>

      </div>


      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Search */}
        <div className="p-4 border-b border-gray-100">

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

        </div>


        {/* Table */}
        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">

            <thead className="bg-gray-50 text-gray-600 text-left">

              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    Loading...
                  </td>
                </tr>

              ) : teachers?.length === 0 ? (

                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400">
                    No Teachers Found
                  </td>
                </tr>

              ) : (

                teachers?.map((teacher) => (

                  <tr key={teacher._id} className="hover:bg-gray-50">

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {teacher.fullName}
                    </td>

                    <td className="px-6 py-4">
                      {teacher.email}
                    </td>

                    <td className="px-6 py-4">
                      {teacher.department}
                    </td>

                    <td className="px-6 py-4">
                      {new Date(teacher.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 flex justify-center">

                      <button
                        onClick={() =>
                          navigate(`/admin/teacher/${teacher._id}`)
                        }
                        className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg"
                      >
                        <Eye size={18} className="text-gray-600" />
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