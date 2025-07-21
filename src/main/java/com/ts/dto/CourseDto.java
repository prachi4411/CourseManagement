package com.ts.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDto {
    private String title;
    private String courseId;
    private String description;
    private List<String> prerequisiteIds;
}
