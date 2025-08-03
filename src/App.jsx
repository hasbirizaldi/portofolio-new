import Navbar from "./layouts/Navbar";
import Main from "./pages/Main";
import Footer from "./layouts/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <Main />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
