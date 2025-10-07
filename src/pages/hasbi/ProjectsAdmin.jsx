import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { alertConfirm, alertError, alertSuccess } from "../../utils/alert";
import { RiDeleteBin5Fill } from "react-icons/ri";
// import { MdEditSquare } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import TextEditor from "../../components/admin/TextEditor";
import { MdEditDocument } from "react-icons/md";

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    demo_url: "",
    github_url: "",
    preferred: false,
    skill_ids: [],
    images: [],
    oldImages: [],
  });

  // Fetch skills
  const fetchProjects = async () => {
    try {
      const response = await api.get("/portfolio-projects", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProjects(response.data.projects || response.data);
    } catch (err) {
      console.error(err);
      alertError.error("Gagal memuat data projects!", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  const fetchSkills = async () => {
    try {
      const res = await api.get("/portfolio-skills", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSkills(res.data.skills || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const selectedFiles = Array.from(files);
      setForm({ ...form, images: selectedFiles });

      // ✅ buat URL blob untuk preview
      const previews = selectedFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSkillSelect = (id) => {
    setForm((prev) => {
      const selected = prev.skill_ids.includes(id) ? prev.skill_ids.filter((s) => s !== id) : [...prev.skill_ids, id];
      return { ...prev, skill_ids: selected };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("desc", form.desc);
    formData.append("demo_url", form.demo_url);
    formData.append("github_url", form.github_url);
    formData.append("preferred", form.preferred ? 1 : 0);
    form.skill_ids.forEach((id) => formData.append("skill_ids[]", id));
    form.images.forEach((file) => formData.append("images[]", file));

    try {
      if (isEditing) {
        // UPDATE
        await api.post(`/portfolio-projects/${editId}?_method=PUT`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alertSuccess("Project updated successfully!");
      } else {
        // CREATE
        await api.post("/portfolio-projects", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alertSuccess("Project created successfully!");
      }

      setShowModal(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alertError(isEditing ? "Failed to update project!" : "Failed to create project!");
    }
  };

  const deleteProject = async (projectId) => {
    const confirmed = await alertConfirm("Are you sure you want to delete this skill?");
    if (!confirmed) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/portfolio-projects/${projectId}`, { headers: { Authorization: `Bearer ${token}` } });
      setProjects((prev) => prev.filter((s) => s.id !== projectId));
      await alertSuccess("Project deleted successfully");
    } catch (err) {
      console.error(err);
      alertError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, []);

  return (
    <div className="lg:my-10 lg:mx-10 mx-0 my-0">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            setForm({
              title: "",
              desc: "",
              demo_url: "",
              github_url: "",
              preferred: false,
              skill_ids: [],
              images: [],
            });
            setImagePreviews([]); // ✅ reset preview
          }}
          className="bg-amber-800 text-white dark:bg-cyan-500 px-3 py-1.5 font-semibold rounded hover:scale-105 transition-transform"
        >
          Add Project
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md shadow-md border border-[#cba47a]/50 dark:border-slate-700 bg-[#fff9f3] dark:bg-slate-800">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[#e6c7a1] dark:bg-cyan-900 text-slate-800 dark:text-slate-100 uppercase text-xs tracking-wider">
              <th className="px-5 py-3 border-b">#</th>
              <th className="px-5 py-3 border-b">Project Title</th>
              <th className="px-5 py-3 border-b">Image</th>
              <th className="px-5 py-3 border-b">Preferred</th>
              <th className="px-5 py-3 border-b">Option</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  Loading...
                </td>
              </tr>
            ) : projects.length > 0 ? (
              projects.map((project, i) => (
                <tr key={project.id} className="h-30 hover:bg-[#f5e8d4] dark:hover:bg-slate-700">
                  <td className="px-5 py-3 border-b">{i + 1}</td>
                  <td className="px-5 py-3 border-b">{project.title}</td>
                  <td className="px-5 py-3 border-b">{project.images && project.images.length > 0 ? <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${project.images[0]}`} className="h-20 rounded object-cover" alt="" /> : "-"}</td>
                  <td className="px-5 py-3 border-b">{project.preferred ? <FaCheckCircle className="text-green-500 text-xl" /> : <IoMdCloseCircle className="text-red-600 text-xl" />}</td>
                  <td className="flex gap-3 px-5 py-10 border-b">
                    <Link to={`/hasbi/${project.id}`} className="bg-blue-600 text-white w-9 h-9 flex justify-center items-center rounded">
                      <FaEye />
                    </Link>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setIsEditing(true);
                        setEditId(project.id);
                        setForm({
                          title: project.title,
                          desc: project.desc,
                          demo_url: project.demo_url,
                          github_url: project.github_url,
                          preferred: project.preferred,
                          skill_ids: project.skills.map((s) => s.id),
                          oldImages: project.images, // 🟢 simpan gambar lama di field terpisah
                          images: [], // kosongkan input file
                        });
                        setImagePreviews([]);
                      }}
                      className="bg-green-600 text-white w-9 h-9 flex justify-center items-center rounded"
                    >
                      <MdEditDocument />
                    </button>
                    <button onClick={() => deleteProject(project.id)} className="bg-red-600 text-white w-9 h-9 flex justify-center items-center rounded">
                      <RiDeleteBin5Fill />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  No data available!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start z-50 overflow-y-auto py-10">
          <div className="bg-[#fff9f3] dark:bg-slate-800 p-6 rounded-lg w-[95%] md:w-[70%] max-h-[90vh] overflow-y-auto shadow-lg">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Project" : "Add Project"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="p-1 bg-white  dark:bg-slate-900 border rounded" required />

              <TextEditor key={isEditing ? editId : "new"} value={form.desc} onChange={(html) => setForm({ ...form, desc: html })} />

              <input name="demo_url" value={form.demo_url} onChange={handleChange} placeholder="Demo URL" className="p-1 bg-white  dark:bg-slate-900 border rounded" />
              <input name="github_url" value={form.github_url} onChange={handleChange} placeholder="Github URL" className="p-1 bg-white  dark:bg-slate-900 border rounded" />

              <div className="flex items-center gap-2">
                <input type="checkbox" name="preferred" checked={form.preferred} onChange={handleChange} />
                <label>Preferred project</label>
              </div>

              <div>
                <p className="font-semibold mb-2">Select Skills</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {skills.map((s) => (
                    <label key={s.id} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.skill_ids.includes(s.id)} onChange={() => handleSkillSelect(s.id)} className="cursor-pointer" />
                      {s.name}
                    </label>
                  ))}
                </div>
              </div>

              <input type="file" name="images" multiple onChange={handleChange} className="p-2 border rounded cursor-pointer" />
              {/* Preview Gambar */}
              <div className="mt-2 flex gap-2 flex-wrap">
                {imagePreviews.length > 0 ? (
                  // 🟢 Jika user baru memilih gambar
                  imagePreviews.map((src, index) => <img key={index} src={src} className="h-20 w-20 object-cover rounded border" alt="preview" />)
                ) : form.oldImages && form.oldImages.length > 0 ? (
                  // 🟡 Jika belum ada gambar baru, tampilkan gambar lama
                  form.oldImages.map((img, index) => <img key={index} src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${img}`} className="h-20 w-20 object-cover rounded border" alt="old" />)
                ) : (
                  <p className="text-gray-400 text-sm">No image</p>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-400 rounded text-white">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-amber-700 text-white rounded hover:scale-105 transition-transform">
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

export default ProjectsAdmin;
