import './App.css';
import { useState } from "react";
import Metamask from './Components/Metamask';
import Homepage from './Components/Homepage';
import { Routes, Route, Link } from "react-router-dom";
import College from './Components/College';
import Events from './Components/Event';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="signin" element={<Metamask/>} />
        <Route path="college" element={<College />} />
        <Route path="event" element={<Events />} />
      </Routes>
    </div>
  )
}

export default App
