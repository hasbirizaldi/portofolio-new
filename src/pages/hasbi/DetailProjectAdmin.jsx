import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axios";
import { alertError } from "../../utils/alert";
import DOMPurify from "dompurify";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaDisplay } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const DetailProjectAdmin = () => {
  const [project, setProject] = useState("");
  const { id } = useParams();

  const getProject = async () => {
    try {
      const response = await api.get(`/portfolio-projects/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProject(response.data.project || response.data);
    } catch (err) {
      console.error(err);
      alertError.error("Gagal memuat data projects!", { theme: "colored" });
    }
  };
  useEffect(() => {
    getProject();
  }, []);
  return (
    <div className="lg:my-10 lg:mx-10">
      <h1 className="text-2xl font-bold mb-3">Detail Project</h1>
      <div className="bg-[#ffffff] dark:bg-slate-950 rounded-lg lg:px-7 px-2 py-5 relative">
        <Link to="/hasbi" className="absolute lg:left-7 left-2 flex justify-center items-center gap-1 bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold px-3 py-1 rounded">
          <FaAngleDoubleLeft className="text-lg" />
          Go Back
        </Link>
        <div className="flex lg:gap-6 gap-6   justify-end">
          <Link to={project.demo_url} target="_blank" className="bg-cyan-400 dark:bg-cyan-600 text-slate-50 h-8 lg:w-[120px] w-10 rounded-md flex justify-center items-center text-sm gap-1 font-semibold">
            <FaDisplay />
            <span className="lg:block hidden">Live Demo</span>
          </Link>
          <Link to={project.github_url} target="_blank" className="bg-amber-400 dark:bg-amber-700 text-slate-50 h-8 lg:w-[120px] w-10 rounded-md flex justify-center items-center text-sm gap-1 font-semibold">
            <FaGithub />
            <span className="lg:block hidden">Github Url</span>
          </Link>
        </div>
        <div className="">
          <h3 className="text-xl font-semibold mt-8 underline">{project.title}</h3>
        </div>
        <div className="mt-4">
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.desc) }} className="my-5" />
          <div className="grid lg:grid-cols-8 lg:gap-10 gap-2 grid-cols-4 lg:space-y-0  my-4">
            {project.skills?.map((skill, index) => (
              <div key={index}>
                <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${skill.image}`} alt={skill.name} className=" lg:h-16 h-12" />
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            {project.images?.map((image, index) => (
              <div key={index} className="mb-4">
                <img src={image} alt={project.title} className="w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProjectAdmin;
