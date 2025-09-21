package com.sportsevent.venue.controller;

import com.sportsevent.venue.model.Venue;
import com.sportsevent.venue.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/venues")
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:3000" })
public class VenueController {

   private static final Logger logger = LoggerFactory.getLogger(VenueController.class);

   @Autowired
   private VenueService venueService;

   // Get all venues
   @GetMapping
   public ResponseEntity<List<Venue>> getAllVenues() {
      try {
         logger.info("GET request received for all venues");
         List<Venue> venues = venueService.getAllVenues();
         return ResponseEntity.ok(venues);
      } catch (Exception e) {
         logger.error("Error fetching all venues: {}", e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
      }
   }

   // Get venue by ID
   @GetMapping("/{id}")
   public ResponseEntity<Venue> getVenueById(@PathVariable Long id) {
      try {
         logger.info("GET request received for venue ID: {}", id);
         return venueService.getVenueById(id)
               .map(venue -> ResponseEntity.ok(venue))
               .orElse(ResponseEntity.notFound().build());
      } catch (Exception e) {
         logger.error("Error fetching venue by ID {}: {}", id, e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
      }
   }

   // Add new venue
   @PostMapping
   public ResponseEntity<?> addVenue(@RequestBody Venue venue) {
      try {
         logger.info("POST request received to add venue: {}", venue.toString());
         Venue savedVenue = venueService.addVenue(venue);
         return ResponseEntity.status(HttpStatus.CREATED).body(savedVenue);
      } catch (IllegalArgumentException e) {
         logger.error("Validation error adding venue: {}", e.getMessage());
         return ResponseEntity.badRequest()
               .body(Map.of("error", e.getMessage()));
      } catch (Exception e) {
         logger.error("Unexpected error adding venue: {}", e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
               .body(Map.of("error", "Failed to add venue"));
      }
   }

   // Update venue
   @PutMapping("/{id}")
   public ResponseEntity<?> updateVenue(@PathVariable Long id, @RequestBody Venue venueDetails) {
      try {
         logger.info("PUT request received to update venue ID: {}", id);
         Venue updatedVenue = venueService.updateVenue(id, venueDetails);
         return ResponseEntity.ok(updatedVenue);
      } catch (RuntimeException e) {
         logger.error("Error updating venue: {}", e.getMessage());
         return ResponseEntity.notFound().build();
      } catch (Exception e) {
         logger.error("Unexpected error updating venue: {}", e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
               .body(Map.of("error", "Failed to update venue"));
      }
   }

   // Delete venue
   @DeleteMapping("/{id}")
   public ResponseEntity<?> deleteVenue(@PathVariable Long id) {
      try {
         logger.info("DELETE request received for venue ID: {}", id);
         venueService.deleteVenue(id);
         return ResponseEntity.ok(Map.of("message", "Venue deleted successfully"));
      } catch (RuntimeException e) {
         logger.error("Error deleting venue: {}", e.getMessage());
         return ResponseEntity.notFound().build();
      } catch (Exception e) {
         logger.error("Unexpected error deleting venue: {}", e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
               .body(Map.of("error", "Failed to delete venue"));
      }
   }

   // Get venues by type
   @GetMapping("/type/{venueType}")
   public ResponseEntity<List<Venue>> getVenuesByType(@PathVariable String venueType) {
      try {
         logger.info("GET request received for venues by type: {}", venueType);
         List<Venue> venues = venueService.getVenuesByType(venueType);
         return ResponseEntity.ok(venues);
      } catch (Exception e) {
         logger.error("Error fetching venues by type: {}", e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
      }
   }

   // Get venues by incharge
   @GetMapping("/incharge/{venueIncharge}")
   public ResponseEntity<List<Venue>> getVenuesByIncharge(@PathVariable String venueIncharge) {
      try {
         logger.info("GET request received for venues by incharge: {}", venueIncharge);
         List<Venue> venues = venueService.getVenuesByIncharge(venueIncharge);
         return ResponseEntity.ok(venues);
      } catch (Exception e) {
         logger.error("Error fetching venues by incharge: {}", e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
      }
   }

   // Search venues by facility
   @GetMapping("/search")
   public ResponseEntity<List<Venue>> searchVenuesByFacility(@RequestParam String facility) {
      try {
         logger.info("GET request received to search venues by facility: {}", facility);
         List<Venue> venues = venueService.searchVenuesByFacility(facility);
         return ResponseEntity.ok(venues);
      } catch (Exception e) {
         logger.error("Error searching venues by facility: {}", e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
      }
   }

   // Get venues by seating area
   @GetMapping("/seating/{seatingArea}")
   public ResponseEntity<List<Venue>> getVenuesBySeatingArea(@PathVariable String seatingArea) {
      try {
         logger.info("GET request received for venues by seating area: {}", seatingArea);
         List<Venue> venues = venueService.getVenuesBySeatingArea(seatingArea);
         return ResponseEntity.ok(venues);
      } catch (Exception e) {
         logger.error("Error fetching venues by seating area: {}", e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
      }
   }
}
