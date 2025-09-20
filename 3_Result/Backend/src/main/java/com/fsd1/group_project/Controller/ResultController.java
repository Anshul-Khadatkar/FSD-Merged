package com.fsd1.group_project.Controller;

import com.fsd1.group_project.Entity.Result;
import com.fsd1.group_project.Service.ResultService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/results")
public class ResultController {
    private static final Logger logger = LoggerFactory.getLogger(ResultController.class);

    @Autowired
    private ResultService resultService;

    @GetMapping
    public ResponseEntity<List<Result>> getAllResults() {
        logger.info("Fetching all results");
        try {
            List<Result> results = resultService.findAll();
            logger.info("Found {} results", results.size());
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            logger.error("Error fetching results: {}", e.getMessage(), e);
            throw e;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getResultById(@PathVariable Long id) {
        logger.info("Fetching result with id: {}", id);
        try {
            Optional<Result> result = resultService.findById(id);
            if (result.isPresent()) {
                logger.info("Found result with id: {}", id);
                return ResponseEntity.ok(result.get());
            } else {
                logger.warn("Result not found with id: {}", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error fetching result with id {}: {}", id, e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping
    public ResponseEntity<?> createResult(@RequestBody Result result) {
        logger.info("Creating new result: {}", result);
        try {
            Result savedResult = resultService.save(result);
            logger.info("Created result with id: {}", savedResult.getId());
            return ResponseEntity.ok(savedResult);
        } catch (Exception e) {
            logger.error("Error creating result: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateResult(@PathVariable Long id, @RequestBody Result result) {
        logger.info("Updating result with id: {}", id);
        try {
            Optional<Result> existingResult = resultService.findById(id);
            if (existingResult.isPresent()) {
                result.setId(id);
                Result updatedResult = resultService.save(result);
                logger.info("Updated result with id: {}", id);
                return ResponseEntity.ok(updatedResult);
            } else {
                logger.warn("Result not found with id: {}", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error updating result with id {}: {}", id, e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResult(@PathVariable Long id) {
        logger.info("Deleting result with id: {}", id);
        try {
            Optional<Result> existingResult = resultService.findById(id);
            if (existingResult.isPresent()) {
                resultService.deleteById(id);
                logger.info("Deleted result with id: {}", id);
                return ResponseEntity.ok().body(Map.of("message", "Result deleted successfully"));
            } else {
                logger.warn("Result not found with id: {}", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error deleting result with id {}: {}", id, e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        logger.info("Testing results API");
        return ResponseEntity.ok(Map.of(
                "message", "Results API is working correctly",
                "timestamp", System.currentTimeMillis()
        ));
    }
} 