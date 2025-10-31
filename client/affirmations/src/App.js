
import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReciteAffifirmations from './pages/ReciteAffifirmations';
import AddAffirmations from "./pages/AddAffirmations";
function App() {
    

   
    return (
      <Router>
      

      <div className="p-6">
        <Routes>
          <Route path="/" element={<AddAffirmations />} />
          <Route path="/ReciteAffifirmations" element={<ReciteAffifirmations />} />
        </Routes>
      </div>
    </Router>

        
    
    );
}

export default App;