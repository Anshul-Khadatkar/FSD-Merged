package com.sports.event_master.repository;

import com.sports.event_master.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    // Find events by type
    List<Event> findByEventType(String eventType);
    
    // Find events by name (case-insensitive)
    List<Event> findByEventNameContainingIgnoreCase(String eventName);
    
    // Find events by event head
    List<Event> findByEventHead(Long eventHead);
    
    // Find events by date
    List<Event> findByEventDay(LocalDate eventDay);
    
    // Find events between two dates
    List<Event> findByEventDayBetween(LocalDate startDate, LocalDate endDate);
    
    // Check if event name exists
    boolean existsByEventName(String eventName);
    
    // Find by event name (exact match)
    Optional<Event> findByEventName(String eventName);
    
    // Find events by date range and type
    List<Event> findByEventDayBetweenAndEventType(LocalDate startDate, LocalDate endDate, String eventType);
}
