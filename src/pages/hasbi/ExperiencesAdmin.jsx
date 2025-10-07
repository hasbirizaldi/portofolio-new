import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { formatDate, formatDateForInput } from "../../utils/helper";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import { alertConfirm, alertError, alertSuccess } from "../../utils/alert";

const ExperiencesAdmin = () => {
  const [exps, setExps] = useState([]);

  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    company: "",
    title: "",
    location: "",
    is_current: false,
    start_date: "",
    end_date: "",
  });

  const fetchExps = async () => {
    try {
      const response = await api.get("/portfolio-experiences", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setExps(response.data.experiences || response.data);
    } catch (err) {
      console.error("Gagal memuat data pengalaman:", err);
      alertError.error("Gagal memuat data pengalaman!", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: checked,
        end_date: checked ? "" : prev.end_date,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const deleteExp = async (expId) => {
    const result = await alertConfirm("Are you sure want to delete this experience");
    if (!result) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/portfolio-experiences/${expId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Hapus dari state tanpa fetch ulang
      setExps((prev) => prev.filter((exp) => exp.id !== expId));
      await alertSuccess("Experience deleted successfully");
    } catch (err) {
      console.error("Something went wrong", err);
      alertError("Something went wrong");
    }
  };

  // Open edit modal
  const handleEditClick = (exp) => {
    setIsEditing(true);
    setEditId(exp.id);
    setForm({
      company: exp.company || "",
      title: exp.title || "",
      location: exp.location || "",
      is_current: exp.is_current,
      start_date: formatDateForInput(exp.start_date),
      end_date: exp.is_current ? "" : formatDateForInput(exp.end_date),
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (isEditing) {
        await api.put(`/portfolio-experiences/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alertSuccess("Experience updated successfully");
      } else {
        await api.post("/portfolio-experiences", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alertSuccess("Experience added successfully");
      }

      // reset
      setShowModal(false);
      setForm({
        company: "",
        title: "",
        location: "",
        is_current: false,
        start_date: "",
        end_date: "",
      });
      setIsEditing(false);
      setEditId(null);
      fetchExps();
    } catch (err) {
      console.error("Error saving experience:", err);
      alertError(isEditing ? "Failed to update experience!" : "Failed to add experience!");
    }
  };

  useEffect(() => {
    fetchExps();
  }, []);

  return (
    <div className="my-10 mx-14">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">Experiences</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            setForm({
              company: "",
              title: "",
              location: "",
              is_current: false,
              start_date: "",
              end_date: "",
            });
          }}
          className="bg-amber-800 text-white dark:bg-cyan-500 px-3 py-1.5 font-semibold rounded hover:scale-105 transition-transform"
        >
          Add Experience
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md border border-[#cba47a]/50 dark:border-slate-700 bg-[#fff9f3] dark:bg-slate-800 transition-colors duration-300">
        <table className="w-full text-left text-sm text-slate-700 dark:text-slate-100">
          <thead>
            <tr className="bg-[#e6c7a1] dark:bg-cyan-900 text-slate-800 dark:text-slate-100 uppercase text-xs tracking-wider">
              <th className="px-5 py-3 border-b">#</th>
              <th className="px-5 py-3 border-b">Company</th>
              <th className="px-5 py-3 border-b">Position</th>
              <th className="px-5 py-3 border-b">Duration</th>
              <th className="px-5 py-3 border-b">Option</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-5 text-slate-500 dark:text-slate-400">
                  Loading data...
                </td>
              </tr>
            ) : exps.length > 0 ? (
              exps.map((exp, index) => (
                <tr key={exp.id || index} className="hover:bg-[#f5e8d4] dark:hover:bg-slate-700 transition-colors duration-200">
                  <td className="px-5 py-3 border-b">{index + 1}</td>
                  <td className="px-5 py-3 border-b">{exp.company || "-"}</td>
                  <td className="px-5 py-3 border-b">{exp.title || "-"}</td>
                  <td className="px-5 py-3 border-b">
                    {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </td>
                  <td className="flex gap-4 px-5 py-3 border-b">
                    <button onClick={() => handleEditClick(exp)} className="bg-green-700 text-white hover:bg-green-600 px-2 py-1 rounded text-lg">
                      <AiFillEdit />
                    </button>
                    <button onClick={() => deleteExp(exp.id)} className="bg-red-700 text-white hover:bg-red-600 px-2 py-1 rounded text-lg">
                      <RiDeleteBin5Fill />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-slate-500 dark:text-slate-400">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[#fff9f3] dark:bg-slate-800 rounded-xl shadow-lg w-[90%] sm:w-[500px] p-6 border border-[#cba47a]/50 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">{isEditing ? "Edit Experience" : "Add Experience"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="dark:text-slate-300 text-slate-800">Company Name</label>
                <input type="text" name="company" placeholder="Company Name" value={form.company} onChange={handleChange} className="p-2 rounded border bg-white dark:bg-slate-700 dark:text-slate-100" required />
              </div>
              <div className="flex flex-col">
                <label className="dark:text-slate-300 text-slate-800">Position/Title</label>
                <input type="text" name="title" placeholder="Position / Title" value={form.title} onChange={handleChange} className="p-2 rounded border bg-white dark:bg-slate-700 dark:text-slate-100" required />
              </div>
              <div className="flex flex-col">
                <label className="dark:text-slate-300 text-slate-800">Location</label>
                <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} className="p-2 rounded border bg-white dark:bg-slate-700 dark:text-slate-100" required />
              </div>
              <div className="flex flex-row gap-10 items-center">
                <label className="dark:text-slate-300 text-slate-800">Is Current</label>
                <input type="checkbox" name="is_current" checked={form.is_current} onChange={handleChange} className="w-5 h-5 accent-amber-700 dark:accent-cyan-500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label className="dark:text-slate-300 text-slate-800">Start Date</label>
                  <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="p-2 w-full rounded border bg-white dark:bg-slate-700 dark:text-slate-100" />
                </div>
                {!form.is_current && (
                  <div className="flex flex-col">
                    <label className="dark:text-slate-300 text-slate-800">End Date</label>
                    <input type="date" name="end_date" value={form.end_date} onChange={handleChange} className="p-2 w-full rounded border bg-white dark:bg-slate-700 dark:text-slate-100" />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setIsEditing(false);
                    setEditId(null);
                    setForm({
                      company: "",
                      title: "",
                      location: "",
                      is_current: false,
                      start_date: "",
                      end_date: "",
                    });
                  }}
                  className="px-4 py-2 rounded bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:opacity-80"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded bg-amber-800 dark:bg-cyan-600 text-white hover:scale-105 transition-transform">
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperiencesAdmin;
