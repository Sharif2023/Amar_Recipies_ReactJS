import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Header from './Components/Header'
import Body from './Components/Body';

//pages
import SubmitRecipe from "./Pages/SubmitRecipe";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/submit" element={<SubmitRecipe />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

//npm install react-router-dom

