import React, { useEffect, useState } from "react";
import Home from "../components/Home";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { FaArrowCircleUp } from "react-icons/fa";
const Main = () => {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <div className="mt-14 relative">
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
      {visible && (
        <div onClick={scrollToTop} className="fixed right-4 lg:bottom-14 bottom-5 cursor-pointer hover:brightness-125 transition-all duration-500 ease-in-out z-50">
          <FaArrowCircleUp className="lg:text-[40px] text-[36px] text-[#ac6b34] dark:text-cyan-500" />
        </div>
      )}
    </div>
  );
};

export default Main;
