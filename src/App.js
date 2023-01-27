import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/home/Home'
import Navbar from './components/Navbar'
import './App.css';

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="route-container">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
       </BrowserRouter>
    </div>
  );
}

export default App;
