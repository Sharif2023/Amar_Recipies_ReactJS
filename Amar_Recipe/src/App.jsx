import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'

//Components
import Header from './Components/Header'
import BrowseRecipe from './Components/BrowseRecipe';
import Footer from "./Components/Footer";

//Pages
import SubmitRecipe from "./Pages/SubmitRecipe";
import About from "./Pages/About";



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BrowseRecipe />} />
          <Route path="/submit" element={<SubmitRecipe />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App

//npm install react-router-dom

