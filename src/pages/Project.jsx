import React, { useEffect, useState } from "react";
import NavbarProject from "../layouts/NavbarProject.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import api from "../api/axios.js";
import { FaDisplay, FaGithub } from "react-icons/fa6";
import { formatFullDate } from "../utils/helper.js";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [toggleShowImg, setToggleShowImg] = useState(false);

  // Fetch projects mantyap
  const fetchProjects = async () => {
    try {
      const response = await api.get(`/project/${id}`);
      setProject(response.data.project || response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <>
        <NavbarProject />
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#fdfaf6] dark:bg-slate-900">
          <div className="custom-loader"></div>
        </div>
      </>
    );
  }
  return (
    <>
      <NavbarProject />
      <section id="projects" className="relative min-h-[100vh] bg-[#fdfaf6] dark:bg-slate-900 duration-500 lg:pt-[100px] pt-[115px] pb-10 lg:px-28 px-3 ">
        <div className=" flex flex-col items-center lg:mb-9">
          <h1 className="text-xl font-bold text-slate-700 dark:text-slate-200" data-aos="fade-up">
            {project.title}
          </h1>
          <div className="w-[50%] h-0.5 mt-1 dark:bg-slate-50 bg-slate-500" data-aos="fade-up"></div>
        </div>
        <div
          onClick={() => navigate("/")}
          className="flex items-center justify-center absolute left-2 top-[70px] text-slate-50 dark:text-slate-900 bg-zinc-600 dark:bg-slate-300 cursor-pointer px-3 rounded-l-full hover:brightness-125 shadow-btn"
        >
          <MdKeyboardDoubleArrowLeft className="text-3xl" /> <p className="font-semibold lg:block hidden">Back</p>
        </div>
        <div>
          <h5 className="text-slate-900 dark:text-slate-300"> {formatFullDate(project.created_at)}</h5>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div data-aos="fade-right">
            <div className="flex justify-end gap-4 mb-5">
              {project.demo_url ? (
                <a href={project.demo_url} target="_blank" className="flex gap-1 justify-center items-center bg-[#ac6b34] font-semibold dark:bg-cyan-600 text-white py-1 px-3 rounded shadow-btn hover:brightness-125">
                  <FaDisplay /> Demo
                </a>
              ) : (
                ""
              )}

              {project.github_url ? (
                <a href={project.github_url} target="_blank" className="flex gap-1 justify-center items-center bg-slate-700 font-semibold dark:bg-slate-300 text-white dark:text-slate-950 py-1 px-3 rounded shadow-btn hover:brightness-125">
                  <FaGithub /> Github
                </a>
              ) : (
                ""
              )}
            </div>
            <div className=" text-slate-700 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: project.desc }} />
          </div>
          <div className="grid lg:grid-cols-8 grid-cols-5 items-end space-y-6">
            {project.skills?.map((skill, index) => (
              <div key={index} className="flex flex-col w-[200px] justify-start items-start">
                <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${skill.image}`} alt={skill.name} className="lg:w-16 w-12 " />
                <span className="text-slate-900 lg:block hidden dark:text-slate-50 mt-1 text-base">{skill.name}</span>
              </div>
            ))}
          </div>

          <div data-aos="zoom-in " className="grid lg:grid-cols-2 gap-4">
            {toggleShowImg
              ? project.images.map((img, index) => (
                  <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="overflow-hidden rounded-lg shadow-ku">
                    <img src={img} alt={`${project.title} image ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
                  </div>
                ))
              : project.images.slice(0, 2).map((img, index) => (
                  <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="overflow-hidden rounded-lg shadow-ku">
                    <img src={img} alt={`${project.title} preview ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
                  </div>
                ))}
          </div>
          <button
            onClick={() => setToggleShowImg(!toggleShowImg)}
            className={`${project.images.length > 2 ? "block" : "hidden"} w-[180px] flex gap-1 justify-center items-center bg-[#ac6b34] font-semibold dark:bg-cyan-600 text-white py-1 px-3 rounded shadow-btn hover:brightness-125 mb-3`}
          >
            {!toggleShowImg ? "Show More Images" : "Hide More Images"}
          </button>
        </div>
      </section>
    </>
  );
};

export default Project;
