package com.sports.event_master.controller;

import com.sports.event_master.entity.Event;
import com.sports.event_master.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class EventController {
    
    private static final Logger logger = LoggerFactory.getLogger(EventController.class);
    
    @Autowired
    private EventService eventService;
    
    // Get all events
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        try {
            logger.info("GET request received for all events");
            List<Event> events = eventService.getAllEvents();
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            logger.error("Error fetching all events: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get event by ID
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        try {
            logger.info("GET request received for event ID: {}", id);
            return eventService.getEventById(id)
                    .map(event -> ResponseEntity.ok(event))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Error fetching event by ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Add new event
    @PostMapping
    public ResponseEntity<?> addEvent(@RequestBody Event event) {
        try {
            logger.info("POST request received to add event: {}", event.getEventName());
            Event savedEvent = eventService.addEvent(event);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent);
        } catch (IllegalArgumentException e) {
            logger.error("Validation error adding event: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (RuntimeException e) {
            logger.error("Runtime error adding event: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error adding event: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to add event"));
        }
    }
    
    // Update event
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Event eventDetails) {
        try {
            logger.info("PUT request received to update event ID: {}", id);
            Event updatedEvent = eventService.updateEvent(id, eventDetails);
            return ResponseEntity.ok(updatedEvent);
        } catch (RuntimeException e) {
            logger.error("Error updating event: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Unexpected error updating event: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to update event"));
        }
    }
    
    // Delete event
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        try {
            logger.info("DELETE request received for event ID: {}", id);
            eventService.deleteEvent(id);
            return ResponseEntity.ok(Map.of("message", "Event deleted successfully"));
        } catch (RuntimeException e) {
            logger.error("Error deleting event: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Unexpected error deleting event: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to delete event"));
        }
    }
    
    // Get events by type
    @GetMapping("/type/{eventType}")
    public ResponseEntity<List<Event>> getEventsByType(@PathVariable String eventType) {
        try {
            logger.info("GET request received for events by type: {}", eventType);
            List<Event> events = eventService.getEventsByType(eventType);
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            logger.error("Error fetching events by type: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get events by head
    @GetMapping("/head/{eventHead}")
    public ResponseEntity<List<Event>> getEventsByHead(@PathVariable Long eventHead) {
        try {
            logger.info("GET request received for events by head: {}", eventHead);
            List<Event> events = eventService.getEventsByHead(eventHead);
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            logger.error("Error fetching events by head: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get events by date
    @GetMapping("/date/{date}")
    public ResponseEntity<List<Event>> getEventsByDate(@PathVariable String date) {
        try {
            LocalDate eventDate = LocalDate.parse(date);
            logger.info("GET request received for events by date: {}", eventDate);
            List<Event> events = eventService.getEventsByDate(eventDate);
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            logger.error("Error fetching events by date: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Search events by name
    @GetMapping("/search")
    public ResponseEntity<List<Event>> searchEvents(@RequestParam String name) {
        try {
            logger.info("GET request received to search events by name: {}", name);
            List<Event> events = eventService.searchEventsByName(name);
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            logger.error("Error searching events: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
