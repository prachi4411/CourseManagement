package com.ts.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ts.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findByCourseId(String courseId);
    boolean existsByCourseId(String courseId);
    List<Course> findByPrerequisitesContaining(Course course);
}
