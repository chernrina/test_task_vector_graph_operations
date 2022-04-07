import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './HomePage.js';
import PersonalPage from './PersonalPage.js';


function App() {
  return (
    <div>
        <Router>
            <Routes>
              <Route exact path="/" element={<HomePage />}/>
              <Route path="/lk/:username" element={<PersonalPage />} />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
