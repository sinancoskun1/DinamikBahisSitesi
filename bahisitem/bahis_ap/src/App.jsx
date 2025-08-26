import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar.jsx';
import Menu from './components/Menu.jsx';
import Bultenpage from './components/Bultenpage.jsx';
import Maclar from './components/Maclar.jsx'

function App() {
  return (
    <div className="app">
      <AppNavbar /> {/* Navbar her sayfada gösterilir */}
      <Menu />
      <Routes>
        <Route path="/" element={
          <>
          
            <Maclar /> {/* Sadece anasayfada gösterilir */}
          </>
        } />
        <Route path="/Bultenpage" element={<Bultenpage />} />
        
      </Routes>
    </div>
  );
}


export default App;
