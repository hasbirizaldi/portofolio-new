import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { alertConfirm, alertError, alertSuccess } from "../../utils/alert";
import { RiDeleteBin5Fill } from "react-icons/ri";

const SkillsAdmin = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", image: null });

  // Fetch skills
  const fetchSkills = async () => {
    try {
      const response = await api.get("/portfolio-skills", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSkills(response.data.skills || response.data);
    } catch (err) {
      console.error(err);
      alertError.error("Gagal memuat data skills!", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Delete skill
  const deleteSkill = async (id) => {
    const confirmed = await alertConfirm("Are you sure you want to delete this skill?");
    if (!confirmed) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/portfolio-skills/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setSkills((prev) => prev.filter((s) => s.id !== id));
      await alertSuccess("Skill deleted successfully");
    } catch (err) {
      console.error(err);
      alertError("Something went wrong");
    }
  };

  // Submit add/edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("name", form.name || "");
      if (form.image && form.image instanceof File) {
        formData.append("image", form.image);
      }

      if (isEditing) {
        const response = await api.put(`/portfolio-skills/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });

        const updatedSkill = response.data.skill;
        setSkills((prev) => prev.map((s) => (s.id === editId ? updatedSkill : s)));

        // Update modal preview langsung
        setForm((prev) => ({
          ...prev,
          image: null,
          image_url: updatedSkill.image_url || "",
        }));

        alertSuccess("Skill updated successfully");
      } else {
        const response = await api.post("/portfolio-skills", formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });

        const newSkill = response.data.skill;
        setSkills((prev) => [...prev, newSkill]);
        alertSuccess("Skill added successfully");
      }

      setForm({ name: "", image: null, image_url: "" });
      setShowModal(false);
      setIsEditing(false);
      setEditId(null);
    } catch (err) {
      console.error(err);
      alertError("Something went wrong");
    }
  };
  return (
    <div className="lg:my-10 lg:mx-9">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">Skills</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            setForm({ name: "", image: null });
          }}
          className="bg-amber-800 text-white dark:bg-cyan-500 px-3 py-1.5 font-semibold rounded hover:scale-105 transition-transform"
        >
          Add Skill
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md border border-[#cba47a]/50 dark:border-slate-700 bg-[#fff9f3] dark:bg-slate-800 transition-colors duration-300">
        <table className="w-full text-left text-sm text-slate-700 dark:text-slate-100">
          <thead>
            <tr className="bg-[#e6c7a1] dark:bg-cyan-900 text-slate-800 dark:text-slate-100 uppercase text-xs tracking-wider">
              <th className="px-5 py-3 border-b">#</th>
              <th className="px-5 py-3 border-b">Name</th>
              <th className="px-5 py-3 border-b">Image</th>
              <th className="px-5 py-3 border-b">Option</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-5 text-slate-500 dark:text-slate-400">
                  Loading data...
                </td>
              </tr>
            ) : skills.length > 0 ? (
              skills.map((skill, index) => (
                <tr key={skill.id} className="h-20 hover:bg-[#f5e8d4] dark:hover:bg-slate-700 transition-colors duration-200">
                  <td className="px-5 py-3 border-b">{index + 1}</td>
                  <td className="px-5 py-3 border-b">{skill.name || "-"}</td>
                  <td className="px-5 py-3 border-b">{skill.image_url ? <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${skill.image}`} alt={skill.name} className=" h-10 object-cover rounded bg-white" /> : "-"}</td>
                  <td className="h-20 flex gap-4 px-5 py-3 border-b">
                    <button onClick={() => deleteSkill(skill.id)} className="w-10 h-10 bg-red-700 text-white hover:bg-red-600 flex justify-center items-center rounded text-xl">
                      <RiDeleteBin5Fill />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-5 text-slate-500 dark:text-slate-400">
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
            <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">{isEditing ? "Edit Skill" : "Add Skill"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="dark:text-slate-300 text-slate-800">Skill Name</label>
                <input type="text" name="name" placeholder="Skill Name" value={form.name || ""} onChange={handleChange} className="p-2 rounded border bg-white dark:bg-slate-700 dark:text-slate-100" required />
              </div>
              <div className="flex flex-col">
                <label className="dark:text-slate-300 text-slate-800">Image</label>
                <input type="file" name="image" onChange={handleChange} className="p-2 rounded border bg-white dark:bg-slate-700 dark:text-slate-100 cursor-pointer" {...(!isEditing && { required: true })} />
                {form.image_url && !form.image && <img src={`http://127.0.0.1:8000${form.image_url}`} alt="Preview" className="w-20 h-20 object-cover rounded mb-2" />}
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setIsEditing(false);
                    setEditId(null);
                    setForm({ name: "", image: null });
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

export default SkillsAdmin;
