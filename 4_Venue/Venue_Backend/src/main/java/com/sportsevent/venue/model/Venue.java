package com.sportsevent.venue.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "venues")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Venue {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @Column(name = "venue_type", nullable = false)
   private String venueType;

   @Column(name = "venue_incharge", nullable = false)
   private String venueIncharge;

   @Column(name = "venue_facility", nullable = false)
   private String venueFacility;

   @Column(name = "seating_area", nullable = false)
   private String seatingArea;

   // Custom toString method for better logging
   @Override
   public String toString() {
      return "Venue{" +
            "id=" + id +
            ", venueType='" + venueType + '\'' +
            ", venueIncharge='" + venueIncharge + '\'' +
            ", venueFacility='" + venueFacility + '\'' +
            ", seatingArea='" + seatingArea + '\'' +
            '}';
   }
}
