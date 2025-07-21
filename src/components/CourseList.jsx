import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../config/apiConfig';
import './CourseList.css';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedCourse, setExpandedCourse] = useState(" ");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.COURSES}`);
      setCourses(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(`Error fetching courses: ${err.message}\nStatus: ${err.response?.status || 'Unknown'}\nURL: ${err.config?.url || 'Unknown URL'}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`${API_CONFIG.BASE_URL}${API_CONFIG.COURSES}/${courseId}`);
      fetchCourses();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div className="error-message">
      <h3>Failed to fetch courses</h3>
      <p>{error}</p>
      <p>API URL: {`${API_CONFIG.BASE_URL}${API_CONFIG.COURSES}`}</p>
      <p>Please check:</p>
      <ul>
        <li>Backend server is running</li>
        <li>Network connection</li>
        <li>Browser console for more details</li>
      </ul>
    </div>
  );

  return (
    <div className="courses-container">
      <h2>Courses</h2>
      <table className="course-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Prerequisites</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <React.Fragment key={course.courseId}>
              <tr 
                className="course-row" 
                onClick={() => setExpandedCourse(course.courseId === expandedCourse ? null : course.courseId)}
              >
                <td>{course.courseId}</td>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>
                  <div className="prereq-container">
                    {course.prerequisites?.length > 0 ? (
                      course.prerequisites.map((prereq) => (
                        <span key={prereq.courseId} className="prereq-badge">
                          {prereq.courseId}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">None</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="course-actions">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCourse(course.courseId);
                      }}
                      disabled={course.isPrerequisite}
                      className={`delete-btn ${course.isPrerequisite ? 'disabled' : ''}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              {expandedCourse === course.courseId && (
                <tr className="expanded-row">
                  <td colSpan="5">
                    <div className="expanded-content">
                      <h3>Course Details</h3>
                      <div className="details-grid">
                        <div className="detail-item">
                          <strong>Course ID:</strong> {course.courseId}
                        </div>
                        <div className="detail-item">
                          <strong>Title:</strong> {course.title}
                        </div>
                        <div className="detail-item">
                          <strong>Description:</strong> {course.description}
                        </div>
                        <div className="detail-item">
                          <strong>Prerequisites:</strong>
                          <div className="prereq-list">
                            {course.prerequisites?.map((prereq) => (
                              <span key={prereq.courseId} className="prereq-badge">
                                {prereq.courseId}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
