import React, { useState } from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { assetsImg } from "../../assets/img/assets";
import { GrProjects } from "react-icons/gr";
import { SiMusicbrainz } from "react-icons/si";
import { MdOutlineWorkHistory } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import api from "../../api/axios";
import { alertConfirm, alertError, alertSuccess } from "../../utils/alert";

const Admin = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = async () => {
    const confirmed = await alertConfirm("Are you sure you want to logout?");
    if (!confirmed) return;
    const token = localStorage.getItem("token");
    try {
      if (token) {
        await api.post(
          "/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      // hapus token dari localStorage
      localStorage.removeItem("token");
      alertSuccess("Logged out successfully");
      navigate("/login"); // redirect ke login
    } catch (err) {
      console.error(err);
      alertError("Failed to logout");
    }
  };
  return (
    <div className="relative">
      <div className="">
        <div className="fixed left-0 rotate-180 z-10 top-[50%] bg-[#352109] dark:bg-cyan-600 rounded-l-full cursor-pointer  hover:scale-105 p-1  lg:block" onClick={toggleSidebar}>
          <MdKeyboardDoubleArrowLeft className={`text-4xl text-slate-50 transition-transform duration-300 `} />
        </div>
      </div>

      <div className="font-alan min-h-screen relative">
        {/* Overlay khusus mobile */}
        <div
          className={`fixed inset-0 bg-black/40 z-20 lg:hidden transition-opacity duration-300
        ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={toggleSidebar}
        ></div>

        {/* Sidebar */}
        <div
          className={`fixed left-0 top-0 h-screen bg-[#724017] dark:bg-slate-950 shadow-nav z-30
        transform transition-all duration-300 w-60
        ${sidebarOpen ? "translate-x-0 " : "-translate-x-full hidden "} 
        lg:translate-x-0`}
        >
          {/* Tombol collapse desktop */}
          <div className="absolute right-0 top-[50%] bg-[#352109] dark:bg-cyan-600 rounded-l-full  hover:scale-105 p-1 cursor-pointer lg:block" onClick={toggleSidebar}>
            <MdKeyboardDoubleArrowLeft className={`text-4xl text-slate-50 transition-transform duration-300 `} />
          </div>

          {/* Logo */}
          <Link to="/" className="flex p-4">
            <img src={assetsImg.img_logo1} alt="logo" className={`w-[100px] transition-all duration-300 `} />
          </Link>

          {/* Menu */}
          <div className="flex flex-col gap-3 font-semibold mt-5 text-slate-100 px-3 pr-14 ">
            <NavLink to="/hasbi" className="flex items-center gap-2 text-[18px] p-2 rounded dark:hover:bg-slate-900 hover:bg-[#94592a]">
              <GrProjects className="text-[20px]" />
              Projects
            </NavLink>
            <NavLink to="skills" className="flex items-center gap-2 text-[18px] p-2 rounded dark:hover:bg-slate-900 hover:bg-[#94592a]">
              <SiMusicbrainz className="text-[20px]" />
              Skills
            </NavLink>
            <NavLink to="experiences" className="flex items-center gap-2 text-[18px] p-2 rounded dark:hover:bg-slate-900 hover:bg-[#94592a]">
              <MdOutlineWorkHistory className="text-[20px]" />
              Experiences
            </NavLink>
            {theme === "dark" ? (
              <button onClick={toggleTheme} className="flex items-center gap-2 p-2 rounded dark:hover:bg-slate-900 hover:bg-[#94592a]">
                <BsMoonStarsFill className="text-[20px] text-yellow-400" />
                Dark
              </button>
            ) : (
              <button onClick={toggleTheme} className="flex items-center gap-2 p-2 rounded dark:hover:bg-slate-900 hover:bg-[#94592a]">
                <FaSun className="text-[20px] text-yellow-400" />
                Light
              </button>
            )}
            <button onClick={handleLogout} className="flex items-center gap-2 text-[18px] p-2 rounded dark:hover:bg-slate-900 hover:bg-[#94592a]">
              <BiLogOutCircle className="text-[20px]" />
              Logout
            </button>
          </div>
        </div>

        {/* Konten utama */}
        <div className={`flex flex-col `}>
          <main className={`min-h-screen flex-1 overflow-y-auto lg:px-4 px-3 lg:py-1 py-6 bg-[#faf1e6] dark:bg-slate-900  text-slate-950 dark:text-slate-50 transition-all duration-300 ${sidebarOpen ? "lg:pl-64 sm:pl-40" : "lg:pl-5"}`}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
