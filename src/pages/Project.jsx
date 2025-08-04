import React, { useEffect } from "react";
import NavbarProject from "../layouts/NavbarProject.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { projects } from "../assets/img/assets.js";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const Project = () => {
  const { id } = useParams();
  const project = projects.find((project) => project.id.toString() === id);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavbarProject />
      <section id="projects" className="relative min-h-[100vh] bg-[#fdfaf6] dark:bg-slate-900 duration-500 lg:pt-[100px] pt-[115px] pb-10 lg:px-28 px-3 ">
        <div className=" flex flex-col items-center lg:mb-9 mb-4">
          <h1 className="text-xl font-bold text-slate-700 dark:text-slate-200" data-aos="fade-up">
            {project.title}
          </h1>
        </div>
        <div onClick={() => navigate("/")} className="flex items-center justify-center absolute left-2 top-[70px] text-slate-50 bg-zinc-600 cursor-pointer px-3 rounded-l-full hover:brightness-125 shadow-btn">
          <MdKeyboardDoubleArrowLeft className="text-3xl" /> <p className="font-semibold lg:block hidden">Back</p>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          <div data-aos="zoom-in">
            <img src={project.image} alt={project.title} className="rounded-lg shadow-ku " />
          </div>
          <div data-aos="fade-right">
            <div className="flex gap-4 mb-4">
              {project.liveDemo ? (
                <a href={project.liveDemo} target="_blank" className="a bg-[#ac6b34] dark:bg-cyan-600 text-white py-1 px-3 rounded shadow-btn hover:brightness-125">
                  Live Demo
                </a>
              ) : (
                ""
              )}

              {project.githubLink ? (
                <a href={project.githubLink} target="_blank" className=" bg-slate-700 dark:bg-slate-800 text-white py-1 px-3 rounded shadow-btn hover:brightness-125">
                  Link Github
                </a>
              ) : (
                ""
              )}
            </div>
            <div className=" text-slate-700 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: project.desc }} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Project;
