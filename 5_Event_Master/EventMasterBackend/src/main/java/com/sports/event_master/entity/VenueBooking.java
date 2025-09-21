package com.sports.event_master.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "venue_booking")
public class VenueBooking {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "booking_id")
   private Long id;

   @Column(name = "venue_name", nullable = false)
   private String venueName;

   @Column(name = "venue_location")
   private String venueLocation;

   @Column(name = "booking_date")
   private LocalDateTime bookingDate;

   @Column(name = "booking_duration")
   private Integer bookingDurationHours;

   @Column(name = "venue_capacity")
   private Integer venueCapacity;

   @Column(name = "booking_cost")
   private Double bookingCost;

   @Column(name = "booking_status")
   private String bookingStatus; // PENDING, CONFIRMED, CANCELLED

   @OneToOne
   @JoinColumn(name = "event_id")
   @JsonBackReference
   private Event event;

   // Default constructor
   public VenueBooking() {
   }

   // Constructors, Getters and Setters
   public VenueBooking(String venueName, String venueLocation, LocalDateTime bookingDate,
         Integer bookingDurationHours, Integer venueCapacity, Double bookingCost, String bookingStatus) {
      this.venueName = venueName;
      this.venueLocation = venueLocation;
      this.bookingDate = bookingDate;
      this.bookingDurationHours = bookingDurationHours;
      this.venueCapacity = venueCapacity;
      this.bookingCost = bookingCost;
      this.bookingStatus = bookingStatus;
   }

   // Getters and Setters
   public Long getId() {
      return id;
   }

   public void setId(Long id) {
      this.id = id;
   }

   public String getVenueName() {
      return venueName;
   }

   public void setVenueName(String venueName) {
      this.venueName = venueName;
   }

   public String getVenueLocation() {
      return venueLocation;
   }

   public void setVenueLocation(String venueLocation) {
      this.venueLocation = venueLocation;
   }

   public LocalDateTime getBookingDate() {
      return bookingDate;
   }

   public void setBookingDate(LocalDateTime bookingDate) {
      this.bookingDate = bookingDate;
   }

   public Integer getBookingDurationHours() {
      return bookingDurationHours;
   }

   public void setBookingDurationHours(Integer bookingDurationHours) {
      this.bookingDurationHours = bookingDurationHours;
   }

   public Integer getVenueCapacity() {
      return venueCapacity;
   }

   public void setVenueCapacity(Integer venueCapacity) {
      this.venueCapacity = venueCapacity;
   }

   public Double getBookingCost() {
      return bookingCost;
   }

   public void setBookingCost(Double bookingCost) {
      this.bookingCost = bookingCost;
   }

   public String getBookingStatus() {
      return bookingStatus;
   }

   public void setBookingStatus(String bookingStatus) {
      this.bookingStatus = bookingStatus;
   }

   public Event getEvent() {
      return event;
   }

   public void setEvent(Event event) {
      this.event = event;
   }
}
