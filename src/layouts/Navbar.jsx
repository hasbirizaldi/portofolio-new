import { assetsImg } from "../assets/img/assets";
import { MdWbSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
          <div onClick={toggleTheme} className="cursor-pointer ml-36">
            {theme === "dark" ? <BsMoonStarsFill className="text-amber-400 text-xl" /> : <MdWbSunny className="text-amber-400 text-3xl" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
