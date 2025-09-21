package com.sportsevent.venue.repository;

import com.sportsevent.venue.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {

   // Find venues by type
   List<Venue> findByVenueType(String venueType);

   // Find venues by incharge
   List<Venue> findByVenueIncharge(String venueIncharge);

   // Find venues by facility (case-insensitive)
   List<Venue> findByVenueFacilityContainingIgnoreCase(String venueFacility);

   // Find venues by seating area
   List<Venue> findBySeatingArea(String seatingArea);

   // Check if venue with specific incharge exists
   boolean existsByVenueIncharge(String venueIncharge);

   // Find venues by type and facility
   List<Venue> findByVenueTypeAndVenueFacilityContaining(String venueType, String venueFacility);
}
