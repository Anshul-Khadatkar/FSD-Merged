package com.sports.event_master.service;

import com.sports.event_master.entity.Event;
import com.sports.event_master.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    
    private static final Logger logger = LoggerFactory.getLogger(EventService.class);
    
    @Autowired
    private EventRepository eventRepository;
    
    // Get all events
    public List<Event> getAllEvents() {
        logger.info("Fetching all events");
        List<Event> events = eventRepository.findAll();
        logger.info("Found {} events", events.size());
        return events;
    }
    
    // Get event by ID
    public Optional<Event> getEventById(Long id) {
        logger.info("Fetching event with ID: {}", id);
        Optional<Event> event = eventRepository.findById(id);
        if (event.isPresent()) {
            logger.info("Found event: {}", event.get().getEventName());
        } else {
            logger.warn("No event found with ID: {}", id);
        }
        return event;
    }
    
    // Add new event
    public Event addEvent(Event event) {
        logger.info("Adding new event: {}", event.getEventName());
        
        // Validation
        if (event.getEventType() == null || event.getEventType().trim().isEmpty()) {
            throw new IllegalArgumentException("Event type is required");
        }
        if (event.getEventName() == null || event.getEventName().trim().isEmpty()) {
            throw new IllegalArgumentException("Event name is required");
        }
        if (event.getEventHead() == null) {
            throw new IllegalArgumentException("Event head is required");
        }
        if (event.getEventDay() == null) {
            throw new IllegalArgumentException("Event day is required");
        }
        
        // Check if event name already exists
        if (eventRepository.existsByEventName(event.getEventName())) {
            throw new RuntimeException("Event with name '" + event.getEventName() + "' already exists");
        }
        
        Event savedEvent = eventRepository.save(event);
        logger.info("Event added successfully with ID: {}", savedEvent.getEventId());
        return savedEvent;
    }
    
    // Update event
    public Event updateEvent(Long id, Event eventDetails) {
        logger.info("Updating event with ID: {}", id);
        
        return eventRepository.findById(id)
                .map(event -> {
                    event.setEventType(eventDetails.getEventType());
                    event.setEventName(eventDetails.getEventName());
                    event.setEventHead(eventDetails.getEventHead());
                    event.setEventDay(eventDetails.getEventDay());
                    
                    Event updatedEvent = eventRepository.save(event);
                    logger.info("Event updated successfully: {}", updatedEvent.getEventName());
                    return updatedEvent;
                })
                .orElseThrow(() -> {
                    logger.error("Event not found with ID: {}", id);
                    return new RuntimeException("Event not found with ID: " + id);
                });
    }
    
    // Delete event
    public void deleteEvent(Long id) {
        logger.info("Deleting event with ID: {}", id);
        
        if (!eventRepository.existsById(id)) {
            logger.error("Event not found with ID: {}", id);
            throw new RuntimeException("Event not found with ID: " + id);
        }
        
        eventRepository.deleteById(id);
        logger.info("Event deleted successfully with ID: {}", id);
    }
    
    // Get events by type
    public List<Event> getEventsByType(String eventType) {
        logger.info("Fetching events by type: {}", eventType);
        return eventRepository.findByEventType(eventType);
    }
    
    // Get events by head
    public List<Event> getEventsByHead(Long eventHead) {
        logger.info("Fetching events by head: {}", eventHead);
        return eventRepository.findByEventHead(eventHead);
    }
    
    // Get events by date
    public List<Event> getEventsByDate(LocalDate eventDay) {
        logger.info("Fetching events by date: {}", eventDay);
        return eventRepository.findByEventDay(eventDay);
    }
    
    // Search events by name
    public List<Event> searchEventsByName(String eventName) {
        logger.info("Searching events by name: {}", eventName);
        return eventRepository.findByEventNameContainingIgnoreCase(eventName);
    }
    
    // Get events between dates
    public List<Event> getEventsBetweenDates(LocalDate startDate, LocalDate endDate) {
        logger.info("Fetching events between {} and {}", startDate, endDate);
        return eventRepository.findByEventDayBetween(startDate, endDate);
    }
}
