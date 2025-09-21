package com.sports.event_master.repository;

import com.sports.event_master.entity.VenueBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VenueBookingRepository extends JpaRepository<VenueBooking, Long> {

   List<VenueBooking> findByVenueName(String venueName);

   List<VenueBooking> findByBookingStatus(String bookingStatus);

   List<VenueBooking> findByBookingDateBetween(LocalDateTime startDate, LocalDateTime endDate);

   List<VenueBooking> findByVenueNameAndBookingStatus(String venueName, String bookingStatus);
}
