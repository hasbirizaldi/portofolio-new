import { useNavigate } from "react-router-dom";
import { truncateText } from "../utils/helper";
import api from "../api/axios";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { assetsImg } from "../assets/img/assets";
import { FaDisplay, FaGithub } from "react-icons/fa6";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const topRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  // Fetch projects
  // Fetch projects
  const fetchProjects = async (page = 1) => {
    try {
      const response = await api.get(`/projects?page=${page}`);

      const data = response.data.projects;
      setProjects(data.data);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.last_page) return;
    fetchProjects(newPage);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section ref={topRef} id="projects" className="min-h-[90vh] bg-[#faf1e6] dark:bg-slate-900 duration-500 pt-20 pb-10 ">
      <div className=" flex flex-col items-center" data-aos="fade-up">
        <h1 className="text-3xl font-bold text-slate-600 dark:text-slate-200">My Projects</h1>
        <p className="text-slate-500 dark:text-slate-200 mb-2 border-b-2 lg:w-[60%] w-[90%] text-center border-blue-200 pb-2 pt-4">The following are several projects that I have successfully completed.</p>
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center mt-10">
            <div className="custom-loader"></div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 grid-cols-1 lg:px-32 px-2 gap-6 mt-2">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => navigate(`/project/${project.id}`)}
                className="bg-[#fdfaf6] dark:bg-slate-950 border-2 border-blue-300 dark:border-slate-400 p-2  shadow-ku rounded-lg cursor-pointer pb-3 hover:scale-[1.01] transition-all ease-in-out relative"
                data-aos="fade-up"
              >
                <img src={project.images < 1 ? assetsImg.noImg : `${import.meta.env.VITE_IMAGE_BASE_URL}/${project.images[0]}`} alt={project.title} className="rounded w-[420px] h-[250px] object-cover mx-auto " />
                <h1 className="text-center text-lg text-slate-800 dark:text-slate-100 mt-3 mb-1 truncate">{project.title}</h1>
                <div className="text-slate-600 dark:text-slate-300 text-sm mb-14 " dangerouslySetInnerHTML={{ __html: truncateText(project.desc, 190) }} />

                <div className="absolute bottom-2 right-2 mt-3 flex gap-5 justify-end">
                  {project.demo_url ? (
                    <a
                      href={project.demo_url}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      className="flex gap-1 justify-center items-center font-semibold  bg-[#ac6b34] dark:bg-cyan-600 text-white py-1 px-3 rounded shadow-btn hover:brightness-125"
                    >
                      <FaDisplay /> Demo
                    </a>
                  ) : (
                    ""
                  )}

                  {project.github_url ? (
                    <a
                      href={project.github_url}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      className="flex gap-1 justify-center items-center font-semibold bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-950 py-1 px-3 rounded shadow-btn hover:brightness-125"
                    >
                      <FaGithub /> Github
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4 mt-14">
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className={`px-2 py-0.5 rounded-l-full font-semibold ${pagination.current_page === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-[#ac6b34] dark:bg-blue-500 text-white hover:brightness-110"}`}
          >
            <MdKeyboardDoubleArrowLeft className="text-3xl" />
          </button>

          <span className="text-slate-700 dark:text-slate-200 font-medium">
            Page {pagination.current_page} of {pagination.last_page}
          </span>

          <button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.last_page}
            className={`px-2 py-0.5 rounded-r-full font-semibold ${pagination.current_page === pagination.last_page ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-[#ac6b34] dark:bg-blue-500 text-white hover:brightness-110"}`}
          >
            <MdKeyboardDoubleArrowRight className="text-3xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
