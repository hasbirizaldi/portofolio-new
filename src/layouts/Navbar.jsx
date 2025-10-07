import { assetsImg } from "../assets/img/assets";
import { MdWbSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // bagian 60% dari section terlihat di viewport baru aktif
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div
      className={`bg-[#faf1e6] h-14 flex justify-between items-center  dark:bg-slate-900 text-black duration-500 dark:text-white w-[100vw] fixed top-0 z-50 shadow-gray-300 dark:shadow-slate-800 ${visible ? "shadow-sm " : "shadow-none"} `}
    >
      <div className="w-full flex justify-between">
        {/* logo */}
        <Link to="/" className=" lg:ml-16 ml-2 flex justify-center cursor-pointer">
          <img src={theme === "dark" ? assetsImg.img_logo1 : assetsImg.img_logo2} alt="logo" className="lg:w-[70px] w-[45px] lg:dark:h-[50px] dark:h-[40px] lg:dark:w-[75px] lg:h-11 h-[35px]" />
        </Link>
        {/* menu */}
        <div className="w-[80%] items-center flex justify-center">
          <ul className="hidden lg:flex gap-12 font-semibold">
            {["home", "about", "projects", "contact"].map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={`capitalize transition-colors duration-300 ${activeSection === id ? "text-[#ac6b34] dark:text-cyan-300 " : "text-[#00a5a3] dark:text-slate-50 hover:text-[#ac6b34]"}`}>
                  {id}
                </a>
              </li>
            ))}
          </ul>
          {/* Theme toggle */}
          <div onClick={toggleTheme} className="cursor-pointer absolute right-24 ">
            {theme === "dark" ? <BsMoonStarsFill className="text-amber-400 text-xl" /> : <MdWbSunny className="text-amber-400 text-3xl" />}
          </div>
          {/* Mobile humbarger nenu */}
          <div className="lg:hidden absolute right-2" onClick={toggleMenu}>
            <HiMenuAlt3 className="text-5xl text-[#309997] dark:text-cyan-300" />
          </div>
          {/* Mobile menu */}
          <div
            className={`lg:hidden fixed top-0 left-0 w-full min-h-[75vh] bg-[#faf1e6] dark:bg-slate-950 shadow-md shadow-slate-400 p-4 z-50 transition-all duration-500 ease-out
    ${openMenu ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"}`}
          >
            <IoIosCloseCircle className="absolute text-4xl  right-3 dark:text-cyan-100 text-[#00a5a3]" onClick={toggleMenu} />
            <nav className="border-2 border-blue-200 mt-14 rounded-lg py-20">
              <ul className="flex flex-col justify-center items-center gap-12">
                {["home", "about", "projects", "contact"].map((id) => (
                  <li key={id}>
                    <a href={`#${id}`} onClick={toggleMenu} className={`capitalize text-xl font-semibold ${activeSection === id ? "text-[#ac6b34] dark:text-cyan-300 " : "text-[#00a5a3] dark:text-slate-50 hover:text-[#ac6b34]"}`}>
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
