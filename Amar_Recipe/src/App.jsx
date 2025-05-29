import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "./Components/Header";
import BrowseRecipe from "./Components/BrowseRecipe";
import Footer from "./Components/Footer";

// Pages
import SubmitRecipe from "./Pages/SubmitRecipe";
import About from "./Pages/About";

// Admin Panel
import AdminPanel from "./Admin/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <BrowseRecipe />
              <Footer />
            </>
          }
        />
        <Route
          path="/submit"
          element={
            <>
              <Header />
              <SubmitRecipe />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <About />
              <Footer />
            </>
          }
        />
        <Route path="/adminpanel" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


//npm install react-router-dom

