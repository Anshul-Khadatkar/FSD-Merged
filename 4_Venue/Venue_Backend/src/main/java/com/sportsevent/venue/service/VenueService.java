package com.sportsevent.venue.service;

import com.sportsevent.venue.model.Venue;
import com.sportsevent.venue.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class VenueService {

   private static final Logger logger = LoggerFactory.getLogger(VenueService.class);

   @Autowired
   private VenueRepository venueRepository;

   // Get all venues
   public List<Venue> getAllVenues() {
      logger.info("Fetching all venues");
      List<Venue> venues = venueRepository.findAll();
      logger.info("Found {} venues", venues.size());
      return venues;
   }

   // Get venue by ID
   public Optional<Venue> getVenueById(Long id) {
      logger.info("Fetching venue with ID: {}", id);
      Optional<Venue> venue = venueRepository.findById(id);
      if (venue.isPresent()) {
         logger.info("Found venue: {}", venue.get().toString());
      } else {
         logger.warn("No venue found with ID: {}", id);
      }
      return venue;
   }

   // Add new venue
   public Venue addVenue(Venue venue) {
      logger.info("Adding new venue: {}", venue.toString());

      // Validation
      if (venue.getVenueType() == null || venue.getVenueType().trim().isEmpty()) {
         throw new IllegalArgumentException("Venue type is required");
      }
      if (venue.getVenueIncharge() == null || venue.getVenueIncharge().trim().isEmpty()) {
         throw new IllegalArgumentException("Venue incharge is required");
      }
      if (venue.getVenueFacility() == null || venue.getVenueFacility().trim().isEmpty()) {
         throw new IllegalArgumentException("Venue facility is required");
      }
      if (venue.getSeatingArea() == null || venue.getSeatingArea().trim().isEmpty()) {
         throw new IllegalArgumentException("Seating area is required");
      }

      Venue savedVenue = venueRepository.save(venue);
      logger.info("Venue added successfully with ID: {}", savedVenue.getId());
      return savedVenue;
   }

   // Update venue
   public Venue updateVenue(Long id, Venue venueDetails) {
      logger.info("Updating venue with ID: {}", id);

      return venueRepository.findById(id)
            .map(venue -> {
               venue.setVenueType(venueDetails.getVenueType());
               venue.setVenueIncharge(venueDetails.getVenueIncharge());
               venue.setVenueFacility(venueDetails.getVenueFacility());
               venue.setSeatingArea(venueDetails.getSeatingArea());

               Venue updatedVenue = venueRepository.save(venue);
               logger.info("Venue updated successfully: {}", updatedVenue.toString());
               return updatedVenue;
            })
            .orElseThrow(() -> {
               logger.error("Venue not found with ID: {}", id);
               return new RuntimeException("Venue not found with ID: " + id);
            });
   }

   // Delete venue
   public void deleteVenue(Long id) {
      logger.info("Deleting venue with ID: {}", id);

      if (!venueRepository.existsById(id)) {
         logger.error("Venue not found with ID: {}", id);
         throw new RuntimeException("Venue not found with ID: " + id);
      }

      venueRepository.deleteById(id);
      logger.info("Venue deleted successfully with ID: {}", id);
   }

   // Get venues by type
   public List<Venue> getVenuesByType(String venueType) {
      logger.info("Fetching venues by type: {}", venueType);
      return venueRepository.findByVenueType(venueType);
   }

   // Get venues by incharge
   public List<Venue> getVenuesByIncharge(String venueIncharge) {
      logger.info("Fetching venues by incharge: {}", venueIncharge);
      return venueRepository.findByVenueIncharge(venueIncharge);
   }

   // Search venues by facility
   public List<Venue> searchVenuesByFacility(String facility) {
      logger.info("Searching venues by facility: {}", facility);
      return venueRepository.findByVenueFacilityContainingIgnoreCase(facility);
   }

   // Get venues by seating area
   public List<Venue> getVenuesBySeatingArea(String seatingArea) {
      logger.info("Fetching venues by seating area: {}", seatingArea);
      return venueRepository.findBySeatingArea(seatingArea);
   }
}
