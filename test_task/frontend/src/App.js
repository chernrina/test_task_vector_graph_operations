import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './HomePage.js';
import PersonalPage from './PersonalPage.js';
import Editor from './Editor.js';


function App() {
  return (
    <div>
        <Router>
            <Routes>
              <Route exact path="/" element={<HomePage />}/>
              <Route path="/lk/:username" element={<PersonalPage />} />} />
              <Route path="/edit/:username/:projectname" element={<Editor />} />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
