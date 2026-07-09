import React from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Projects from './components/Projects';
import Experience from './components/Experience';

function App() {
  return (
    <div className="bg-baltic-bg text-baltic-ink min-h-screen">
      <Navbar />
      <Landing />
      <Projects />
      <Experience />
    </div>
  );
}

export default App;
