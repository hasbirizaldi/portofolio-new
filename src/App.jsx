import Navbar from "./layouts/Navbar";
import Main from "./pages/Main";

import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import Project from "./pages/Project";

const App = () => {
  useEffect(() => {
    Aos.init({
      duration: 900, // durasi animasi (ms)
      once: true, // animasi hanya saat pertama scroll
    });
  }, []);
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
