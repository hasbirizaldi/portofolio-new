import { projects } from "../assets/img/assets";
import { truncateText } from "../utils/helper";

const Projects = () => {
  return (
    <section id="projects" className="min-h-[90vh] bg-[#faf1e6] dark:bg-slate-900 duration-500 pt-20 pb-10 ">
      <div className=" flex flex-col items-center">
        <h1 className="text-3xl font-bold text-slate-600 dark:text-slate-200">My Projects</h1>
        <p className="text-slate-500 dark:text-slate-200 mb-2 border-b-2 lg:w-[60%] w-[90%] text-center border-blue-200 pb-2 pt-4">The following are several projects that I have successfully completed.</p>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 lg:px-32 px-2 gap-6 mt-2">
        {projects.map((project, index) => (
          <div key={index} className="bg-[#fdfaf6] dark:bg-slate-950 border-2 border-blue-300 dark:border-slate-500 p-2  shadow-ku rounded-lg cursor-pointer pb-3 hover:scale-[1.01] transition-all ease-in-out">
            <img src={project.image} alt={project.title} className="rounded w-[420px] h-[250px] object-cover mx-auto " />
            <h1 className="text-center text-lg text-slate-800 dark:text-slate-100 mt-3 mb-1 truncate">{project.title}</h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-14 ">{truncateText(project.desc, 100)}</p>
            <div className="mt-3 relative">
              {project.liveDemo ? (
                <a href={project.liveDemo} target="_blank" className="absolute left-0 bottom-0 bg-[#ac6b34] dark:bg-cyan-600 text-white py-1 px-3 rounded shadow-btn hover:brightness-125">
                  Live Demo
                </a>
              ) : (
                ""
              )}

              {project.githubLink ? (
                <a href={project.githubLink} target="_blank" className="absolute right-0 bottom-0 bg-slate-700 dark:bg-slate-800 text-white py-1 px-3 rounded shadow-btn hover:brightness-125">
                  Link Github
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
