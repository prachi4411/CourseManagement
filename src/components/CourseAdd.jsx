import React, { useState } from 'react';
import { API_CONFIG } from '../config/apiConfig';
import CourseForm from './CourseForm';
import './CourseAdd.css';

const CourseAdd = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddCourse = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="courses-section">
      <button 
        className="add-course-btn" 
        onClick={handleAddCourse}
      >
        Add New Course
      </button>

      {showForm && (
        <div className="course-form-modal">
          <div className="course-form-container">
            <CourseForm onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAdd;
