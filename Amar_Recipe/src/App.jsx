import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'

//Components
import Header from './Components/Header'
import Body from './Components/Body';
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
          <Route path="/" element={<Body />} />
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

