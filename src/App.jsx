import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Header  from './components/Header';
import HomePage from './pages/HomePage';
import MusicPage  from './pages/MusicPage';
// import ProjectPage from './pages/ProjectPage';
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/music" element={<MusicPage />} />
        {/* <Route path="/projects" element=!{<ProjectPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
