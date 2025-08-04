import { assetsImg } from "../assets/img/assets";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Home = () => {
  return (
    <section id="home" className="min-h-[90vh] bg-[#faf1e6] dark:bg-slate-900 flex flex-col justify-between duration-500 ">
      <div className="grid lg:grid-cols-2 grid-cols-1 pt-20">
        <div className="flex justify-center" data-aos="fade-up">
          <div className=" lg:w-[70%] w-[100%]  flex flex-col justify-center gap-6 ">
            <h1 className="text-[#ac6b34] dark:text-cyan-300 font-semibold text-xl lg:text-left text-center">Hey, I'm Hasbi Rizaldi</h1>
            <h2 className="lg:text-6xl text-4xl art font-bold text-slate-900 dark:text-white lg:text-left text-center">I Build & Design Web Interfices.</h2>
            <p className="text-lg text-slate-700 dark:text-gray-300 lg:text-left text-center lg:p-0 p-6">I design and develop websites and apps with a focus on usability, intuitive interfaces, and effortless user experiences.</p>
            <div className="bg-[#ac6b34] dark:bg-cyan-700 mx-auto lg:mx-0 w-32 h-12 rounded-lg flex justify-center items-center dark:text-slate-100 text-white mt-9 hover:brightness-125 shadow-btn cursor-pointer">
              <a href="#contact" className="font-semibold">
                Contact Me
              </a>
            </div>
          </div>
        </div>
        <div className="lg:flex hidden justify-center items-center" data-aos="zoom-in">
          <img src={assetsImg.img_profile} alt="profile image" className="w-[400px] rounded-full shadow-ku" />
        </div>
      </div>
      <div className="bg-blue-100 dark:bg-slate-950 h-24 flex gap-16 duration-500">
        <div className="flex justify-end items-center lg:w-[50%]">
          <h1 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 lg:block hidden">Follow me on social media</h1>
        </div>
        <div className="flex justify-start items-center lg:gap-9 gap-5 text-4xl lg:w-[50%] w-[100%]">
          <a rel="noopener noreferrer" href="https://www.linkedin.com/in/hasbi-rizaldi-a9393a260" target="_blank">
            <FaLinkedin className="hover:scale-105 transition-all ease-in-out text-blue-900 dark:text-blue-500" />
          </a>
          <a rel="noopener noreferrer" href="https://github.com/hasbirizaldi" target="_blank">
            <FaGithub className="hover:scale-105 transition-all ease-in-out text-slate-800 dark:text-slate-200" />
          </a>
          <a rel="noopener noreferrer" href="https://api.whatsapp.com/send?phone=6285640402997&hover:scale-105 transition-all ease-in-out text=Assalamualaikum" target="_blank">
            <FaWhatsapp className="hover:scale-105 transition-all ease-in-out text-green-700 dark:text-green-500" />
          </a>
          <a rel="noopener noreferrer" href="https://facebook.com/hasbi.riz" target="_blank">
            <FaFacebook className="hover:scale-105 transition-all ease-in-out text-blue-700 dark:text-blue-600" />
          </a>
          <a rel="noopener noreferrer" href="https://instagram.com/hasbi.rizaldi" target="_blank">
            <FaInstagram className="hover:scale-105 transition-all ease-in-out text-pink-600" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
