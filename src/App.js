import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/home/Home'
import Navbar from './components/Navbar'
import Instructions from './pages/instructions/Instructions';

import './App.css';


function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="route-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/instructions" element={<Instructions />} />
          </Routes>
        </div>
       </BrowserRouter>
    </div>
  );
}

export default App;
