import { assetsImg } from "../assets/img/assets";
import { MdWbSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { RiMenu2Fill } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };
  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <div className={`bg-[#faf1e6]  dark:bg-slate-950 text-black duration-500 dark:text-white h-14 w-[100vw] fixed top-0 z-50 ${visible ? "dark:shadow-dark shadow-b" : ""} `}>
      <div className="flex justify-between">
        {/* logo */}
        <div className="bg-black w-[20%] flex justify-center">
          <img src={assetsImg.img_logo} alt="logo" className="w-16" />
        </div>
        {/* menu */}
        <div className="w-[80%] items-center flex justify-center">
          <ul className="lg:flex gap-12 font-semibold hidden">
            {["home", "about", "projects", "contact"].map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="text-[#00a5a3] dark:text-cyan-200 hover:text-[#ac6b34] dark:hover:text-slate-50 capitalize">
                  {id}
                </a>
              </li>
            ))}
          </ul>
          {/* Theme toggle */}
          <div onClick={toggleTheme} className="cursor-pointer absolute right-24 lg:hidden block">
            {theme === "dark" ? <BsMoonStarsFill className="text-amber-400 text-xl" /> : <MdWbSunny className="text-amber-400 text-3xl" />}
          </div>
          {/* Mobile humbarger nenu */}
          <div className="lg:hidden absolute right-4" onClick={toggleMenu}>
            <RiMenu2Fill className="text-4xl" />
          </div>
          {/* Mobile menu */}
          <div
            className={`lg:hidden fixed top-0 left-0 w-full h-[70vh] bg-slate-950 border-b-2 border-blue-200 p-4 z-50 transition-all duration-500 ease-out
    ${openMenu ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"}`}
          >
            <IoIosCloseCircle className="absolute text-4xl  right-3 dark:text-cyan-100 text-slate-300" onClick={toggleMenu} />
            <nav className="border-2 border-blue-200 mt-14 rounded-lg py-20">
              <ul className="flex flex-col justify-center items-center gap-12">
                {["home", "about", "projects", "contact"].map((id) => (
                  <li key={id}>
                    <a href={`#${id}`} onClick={toggleMenu} className="text-[#00a5a3] dark:text-cyan-200 hover:text-[#ac6b34]  capitalize text-xl font-semibold">
                      {id}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
