package com.ts.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ts.dto.CourseDto;
import com.ts.entity.Course;
import com.ts.exception.BadRequestException;
import com.ts.exception.ConflictException;
import com.ts.repository.CourseRepository;

@Service
public class CourseService implements ICourseService {

    @Autowired
    private CourseRepository courseRepo; // ✅ Non-final, injected using @Autowired

    @Override
    public Course createCourse(CourseDto dto) {
        List<Course> prerequisites = new ArrayList<>();

        for (String prereqId : dto.getPrerequisiteIds()) {
            Course prereq = courseRepo.findByCourseId(prereqId)
                .orElseThrow(() -> new BadRequestException("Invalid prerequisite ID: " + prereqId));
            prerequisites.add(prereq);
        }

        Course course = new Course();
        return courseRepo.save(course);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    @Override
    public Course getCourseByCourseId(String courseId) {
        return courseRepo.findByCourseId(courseId)
            .orElseThrow(() -> new BadRequestException("Course not found: " + courseId));
    }

    @Override
    public void deleteCourse(String courseId) {
        Course course = courseRepo.findByCourseId(courseId)
            .orElseThrow(() -> new BadRequestException("Course not found: " + courseId));

        List<Course> dependentCourses = courseRepo.findByPrerequisitesContaining(course);
        if (!dependentCourses.isEmpty()) {
            throw new ConflictException("Cannot delete. Course is a prerequisite for other courses.");
        }

        courseRepo.delete(course);
    }
}
