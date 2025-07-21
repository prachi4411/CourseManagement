import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../config/apiConfig';

const CourseInstances = () => {
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(" ");
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [availableCourses, setAvailableCourses] = useState([]);

  const fetchInstances = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.COURSE_INSTANCES}`);
      setInstances(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch course instances');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableCourses = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.COURSES}`);
      setAvailableCourses(response.data);
    } catch (err) {
      setError('Failed to fetch available courses');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.COURSE_INSTANCES}`, {
        courseId: selectedCourse,
        year: parseInt(year),
        semester: parseInt(semester)
      });
      setShowForm(false);
      fetchInstances();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course instance');
    }
  };

  const deleteInstance = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.BASE_URL}${API_CONFIG.COURSE_INSTANCES}/${id}`);
      fetchInstances();
    } catch (err) {
      setError('Failed to delete course instance');
    }
  };

  useEffect(() => {
    fetchInstances();
    fetchAvailableCourses();
  }, []);

  return (
    <div className="courses-section">
      <h2>Course Instances</h2>
      <div className="instance-actions">
        <button 
          onClick={() => setShowForm(true)}
          className="add-instance-btn"
        >
          Add Instance
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {showForm && (
        <div className="instance-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Course:</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                required
              >
                <option value="">Select a course</option>
                {availableCourses.map((course) => (
                  <option key={course.id} value={course.courseId}>
                    {course.title} ({course.courseId})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                placeholder="e.g., 2024"
              />
            </div>
            <div className="form-group">
              <label>Semester:</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                required
              >
                <option value="">Select semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div className="form-buttons">
              <button type="submit" className="submit-btn">Create Instance</button>
              <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <table className="course-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Year</th>
              <th>Semester</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {instances.map((instance) => (
              <tr key={instance.id}>
                <td>
                  {instance.course.title} ({instance.course.courseId})
                </td>
                <td>{instance.year}</td>
                <td>{instance.semester}</td>
                <td>
                  <button
                    onClick={() => deleteInstance(instance.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourseInstances;
