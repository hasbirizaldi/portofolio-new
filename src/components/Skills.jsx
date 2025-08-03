import { assetsImg } from "../assets/img/assets";

const Skills = () => {
  return (
    <section className="bg-blue-100 dark:bg-slate-950 lg:h-28 h-52 flex items-center justify-center lg:gap-20 gap-0 duration-500">
      <div className="lg:block hidden">
        <h1 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">My Skills</h1>
      </div>
      <div className="flex flex-wrap justify-center items-center  lg:gap-10 gap-4">
        <img src={assetsImg.img_react} className="w-14 h-14 " alt="React JS" />
        <img src={assetsImg.img_vue} className="w-14 h-12 " alt="Vue JS" />
        <img src={assetsImg.img_nextJS} className="w-14 h-14 dark:bg-white rounded-full " alt="Next JS" />
        <img src={assetsImg.img_tailwind} className="w-14 h-14 " alt="Tailwind CSS" />
        <img src={assetsImg.img_laravel} className="w-14 h-14 " alt="Laravel" />
        <img src={assetsImg.img_expressJS} className="w-20 h-16 " alt="Express JS" />
        <img src={assetsImg.img_mysql} className="w-20 h-14 " alt="MySql" />
        <img src={assetsImg.img_mongoDB} className="w-28 h-10 " alt="MongoDB" />
      </div>
    </section>
  );
};

export default Skills;
