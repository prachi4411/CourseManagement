package com.ts.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ts.entity.CourseInstance;
import com.ts.service.CourseInstanceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/instances")
@RequiredArgsConstructor
public class InstanceController {
	@Autowired
    private final CourseInstanceService service;

    @PostMapping
    public ResponseEntity<CourseInstance> createInstance(
            @RequestParam String courseId,
            @RequestParam int year,
            @RequestParam int semester) {
        return ResponseEntity.ok(service.createInstance(courseId, year, semester));
    }

    @GetMapping("/{year}/{semester}")
    public ResponseEntity<List<CourseInstance>> getInstances(
            @PathVariable int year,
            @PathVariable int semester) {
        return ResponseEntity.ok(service.getAllInstances(year, semester));
    }

    @GetMapping("/{year}/{semester}/{courseId}")
    public ResponseEntity<CourseInstance> getInstanceDetails(
            @PathVariable int year,
            @PathVariable int semester,
            @PathVariable String courseId) {
        return ResponseEntity.ok(service.getInstance(year, semester, courseId));
    }

    @DeleteMapping("/{year}/{semester}/{courseId}")
    public ResponseEntity<Void> deleteInstance(
            @PathVariable int year,
            @PathVariable int semester,
            @PathVariable String courseId) {
        service.deleteInstance(year, semester, courseId);
        return ResponseEntity.noContent().build();
    }
}
