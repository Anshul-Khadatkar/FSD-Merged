package com.fsd1.group_project.Service;

import com.fsd1.group_project.Entity.Result;
import com.fsd1.group_project.Repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    public List<Result> findAll() {
        return resultRepository.findAll();
    }

    public Optional<Result> findById(Long id) {
        return resultRepository.findById(id);
    }

    public Result save(Result result) {
        return resultRepository.save(result);
    }

    public void deleteById(Long id) {
        resultRepository.deleteById(id);
    }
} 