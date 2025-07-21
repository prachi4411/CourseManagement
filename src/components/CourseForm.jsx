import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../config/apiConfig';

const CourseForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [description, setDescription] = useState('');
  const [prerequisites, setPrerequisites] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAvailableCourses();
  }, []);

  const fetchAvailableCourses = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.COURSES}`);
      const courses = response.data.filter(course => course.courseId !== courseId);
      setAvailableCourses(courses);
    } catch (err) {
      setError('Failed to fetch available courses');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log("Submitting course:", {
        title,
        courseId,
        description,
        prerequisites
      });
  
      await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.COURSES}`, {
        title,
        courseId,
        description,
        prerequisites
      });
  
      setSuccessMessage("✅ Course created successfully!");
      setTitle('');
      setCourseId('');
      setDescription('');
      setPrerequisites([]);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || '❌ Failed to create course');
    }
  };

  return (
    <div className="course-form">
      <h2>Create Course</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., Introduction to Computer Programming"
          />
        </div>
        <div className="form-group">
          <label>Course ID:</label>
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
            placeholder="e.g., CS209"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            placeholder="e.g., This course provides a basic introduction to the Computer Programming"
          />
        </div>
        <div className="form-group">
          <label>Prerequisites:</label>
          <select
  multiple
  value={prerequisites}
  onChange={(e) =>
    setPrerequisites(Array.from(e.target.selectedOptions, (option) => option.value))
  }
>
  {availableCourses.map((course) => (
    <option key={course.courseId} value={course.courseId}>
      {course.title} ({course.courseId})
    </option>
  ))}
</select>


          <small>Select multiple prerequisites by holding Ctrl/Cmd</small>
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-btn">Create Course</button>
          <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
