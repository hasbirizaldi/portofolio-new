import Main from "./pages/Main";

import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import Project from "./pages/Project";
import Admin from "./pages/hasbi/Admin";
import ExperiencesAdmin from "./pages/hasbi/ExperiencesAdmin";
import SkillsAdmin from "./pages/hasbi/SkillsAdmin";
import ProjectsAdmin from "./pages/hasbi/ProjectsAdmin";
import Login from "./pages/hasbi/Login";
import DetailProjectAdmin from "./pages/hasbi/DetailProjectAdmin";
import ProtectedRoute from "./components/admin/ProtectedRoute";

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
          <Route path="/login" element={<Login />} />
          <Route path="/project/:id" element={<Project />} />

          <Route
            path="/hasbi"
            element={
              <ProtectedRoute requiredRole="admin">
                <Admin />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProjectsAdmin />} />
            <Route path=":id" element={<DetailProjectAdmin />} />
            <Route path="skills" element={<SkillsAdmin />} />
            <Route path="experiences" element={<ExperiencesAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
