package com.ts.service;

import com.ts.dto.CourseDto;
import com.ts.entity.Course;

import java.util.List;

public interface ICourseService {

    Course createCourse(CourseDto dto);

    List<Course> getAllCourses();

    Course getCourseByCourseId(String courseId);

    void deleteCourse(String courseId);
}
