package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectDto;

public interface ProjectService {

	ProjectDto editProject(Long projectId, ProjectDto projectDto);

}
