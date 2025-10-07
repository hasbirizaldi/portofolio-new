import { assetsImg } from "../assets/img/assets";
import { MdWbSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const NavbarProject = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`bg-[#faf1e6] flex items-center dark:bg-slate-900 text-black duration-500 dark:text-white h-14 w-[100vw] fixed top-0 z-50 shadow-gray-300 dark:shadow-slate-800 shadow-sm`}>
      <div className="flex justify-between lg:mx-4 mx-1 ">
        {/* logo */}
        <div onClick={() => navigate("/")} className="flex justify-center cursor-pointer">
          <img src={theme === "dark" ? assetsImg.img_logo1 : assetsImg.img_logo2} alt="logo" className="lg:w-[90px] w-[90px] lg:h-[36px] lg:dark:w-[100px] dark:w-[90px] lg:dark:h-[40px]" />
        </div>
        <div className="w-[80%] items-center flex justify-center">
          {/* Theme toggle */}
          <div onClick={toggleTheme} className="cursor-pointer absolute lg:right-24 right-7 ">
            {theme === "dark" ? <BsMoonStarsFill className="text-amber-400 text-xl" /> : <MdWbSunny className="text-amber-400 text-3xl" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarProject;
