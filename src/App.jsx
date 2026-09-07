import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Header  from './components/Header';
import HomePage from './pages/CertPage';
import MusicPage  from './pages/MusicPage';
import Personal from './pages/PersonalPage';
import Footer from './components/footer';
import { MusicProvider } from './context/MusicContext';
import './App.css'

export default function App() {

    const C = {
      bg:     "#322a27",
      card:   "#1c1410",
      card2:  "#241a15",
      pink:   "#ff6eb4",
      teal:   "#00ffcc",
      amber:  "#ffaa40",
      purple: "#c084fc",
      red:    "#ff4455",
      text:   "#ffe8c8",
      muted:  "#7a5f50",
      dim:    "#4a3a30",
    };
  
    const F = {
      pixel:   "'VT323', monospace",
      display: "'Fraunces', Georgia, serif",
      mono:    "'DM Mono', monospace",
      body:    "'DM Sans', system-ui, sans-serif",
    };

  return (
    <BrowserRouter>
      <Header C = {C} F = {F}/>

      <MusicProvider>
        <Routes>
            <Route path="/" element={<Personal />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/certs" element={<HomePage/>}/>
          {/* <Route path="/projects" element=!{<ProjectPage />} /> */}
        </Routes>
      </MusicProvider>
      <Footer C= {C} F = {F}/>
    </BrowserRouter>
  )
}
