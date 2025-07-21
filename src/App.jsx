import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import CourseList from './components/CourseList';
import CourseAdd from './components/CourseAdd';
import CourseInstances from './components/CourseInstances';

function App() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="main-nav">
          <h1>Courses Management System</h1>
          <div className="nav-buttons">
            <Link to="/" className="nav-btn active">Courses</Link>
            <Link to="/instances" className="nav-btn">Instances</Link>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="courses-section">
                <CourseAdd />
                <CourseList />
              </div>
            } />
            <Route path="/instances" element={<CourseInstances />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
