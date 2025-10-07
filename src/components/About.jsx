import { IoIosSchool } from "react-icons/io";
import { MdWorkHistory } from "react-icons/md";
import { assetsImg, education } from "../assets/img/assets";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { formatMonthYear } from "../utils/helper";

const About = () => {
  const [slide, setSlide] = useState(true);
  const [exps, setExps] = useState([]);

  const fetchExperiences = async () => {
    try {
      const response = await api.get("/experiences");

      setExps(response.data.experiences || response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleEducation = () => {
    setSlide(true);
  };

  const handleExperience = () => {
    setSlide(false);
  };
  useEffect(() => {
    fetchExperiences();
  }, []);
  return (
    <section id="about" className="min-h-[120vh] lg:min-h-[100vh] bg-[#fdfaf6] dark:bg-slate-900 duration-500 flex flex-row pt-20 ">
      <div className="w-[40%] lg:flex hidden justify-end" data-aos="zoom-in">
        <img src={assetsImg.img_profile2} alt="profile image" className="w-[450px] h-[490px] object-cover object-bottom  rounded-full shadow-ku dark:shadow-dark mt-6" />
      </div>
      <div className="lg:w-[60%] w-[100%] lg:px-20 px-4" data-aos="fade-right">
        <h1 className="text-3xl font-bold text-slate-600 dark:text-slate-200 mb-2 lg:text-left text-center ">About Me</h1>
        <p className="text-[#ac6b34] dark:text-cyan-300 font-semibold mb-1 lg:text-left text-center">I am a Web Developer</p>
        <hr className="text-blue-200 dark:text-cyan-500 mb-1" />
        <p className="text-slate-500 dark:text-gray-200 mb-4 lg:text-left text-center">
          I am a web developer with 3+ years of experience in building modern, scalable web applications using Laravel, Express.js, Next.js, React.js, and Vue.js.
        </p>
        <div className="flex lg:gap-10 gap-4 lg:justify-start justify-evenly mb-4">
          <div
            onClick={handleEducation}
            className={`flex gap-1 px-3 py-1.5 rounded-lg justify-center items-center font-semibold cursor-pointer ${slide ? "bg-[#ac6b34] dark:bg-cyan-600 text-white shadow-btn" : "text-white  bg-slate-500 dark:bg-slate-600"}`}
          >
            <IoIosSchool className="text-2xl hidden lg:block" />
            <span>Education</span>
          </div>
          <div
            onClick={handleExperience}
            className={`flex gap-1 py-1.5 px-3 rounded-lg justify-center items-center font-semibold cursor-pointer ${!slide ? "bg-[#ac6b34] dark:bg-cyan-600 text-white shadow-btn" : "text-white  bg-slate-500 dark:bg-slate-600"}`}
          >
            <MdWorkHistory className="text-2xl hidden lg:block" />
            <span>Work Experience</span>
          </div>
        </div>
        <div className={`lg:w-[80%] w-[100%] lg:mt-0 mt-8 border border-blue-200 rounded-xl lg:px-6 px-4 py-4 shadow-ku ${slide ? "block" : "hidden"} animate-flip`}>
          {education.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">
                <span className="text-slate-500 dark:text-slate-300">{item.id} . </span>
                <span className="text-[#ac6b34] dark:text-cyan-300 ">{item.year}</span>
              </p>
              <p className="ml-5 text-slate-500 dark:text-slate-300">{item.degree}</p>
              <p className="ml-5 text-slate-500 font-semibold dark:text-slate-100">{item.institution}</p>
            </div>
          ))}
        </div>
        <div className={`lg:w-[70%] w-[100%] lg:mt-0 mt-8  border-2 border-blue-200 rounded-xl lg:px-6 px-4 py-4 shadow-ku ${!slide ? "block" : "hidden"} animate-flip`}>
          {exps.map((exps, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">
                <span className="text-slate-500 dark:text-slate-300">{index + 1} . </span>
                <span className="text-[#ac6b34] dark:text-cyan-300">
                  {formatMonthYear(exps.start_date)} - {exps.end_date === null ? "Present" : formatMonthYear(exps.end_date)}
                </span>
              </p>
              <p className="ml-5 text-slate-500 font-semibold dark:text-slate-100">{exps.company}</p>
              <p className="ml-5 text-slate-600 dark:text-slate-100">{exps.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
