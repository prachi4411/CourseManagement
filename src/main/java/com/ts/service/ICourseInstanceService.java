package com.ts.service;

import com.ts.entity.CourseInstance;

import java.util.List;

public interface ICourseInstanceService {

    CourseInstance createInstance(String courseId, int year, int semester);

    List<CourseInstance> getAllInstances(int year, int semester);

    CourseInstance getInstance(int year, int semester, String courseId);

    void deleteInstance(int year, int semester, String courseId);
}
