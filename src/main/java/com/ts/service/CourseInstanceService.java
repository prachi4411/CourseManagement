package com.ts.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ts.entity.Course;
import com.ts.entity.CourseInstance;
import com.ts.exception.BadRequestException;
import com.ts.repository.CourseInstanceRepository;
import com.ts.repository.CourseRepository;

@Service
public class CourseInstanceService implements ICourseInstanceService {

    @Autowired
    private CourseInstanceRepository instanceRepo;

    @Autowired
    private CourseRepository courseRepo;

    @Override
    public CourseInstance createInstance(String courseId, int year, int semester) {
        Course course = courseRepo.findByCourseId(courseId)
            .orElseThrow(() -> new BadRequestException("Course not found: " + courseId));

        CourseInstance instance = new CourseInstance();
        return instanceRepo.save(instance);
    }

    @Override
    public List<CourseInstance> getAllInstances(int year, int semester) {
        return instanceRepo.findByYearAndSemester(year, semester);
    }

    @Override
    public CourseInstance getInstance(int year, int semester, String courseId) {
        return instanceRepo.findByYearAndSemesterAndCourse_CourseId(year, semester, courseId)
            .orElseThrow(() -> new BadRequestException("Instance not found"));
    }

    @Override
    public void deleteInstance(int year, int semester, String courseId) {
        instanceRepo.deleteByYearAndSemesterAndCourse_CourseId(year, semester, courseId);
    }
}
