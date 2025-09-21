package com.sports.event_master.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "sponsorships")
public class Sponsorships {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "sponsor_id")
   private Long id;

   @Column(name = "sponsor_name", nullable = false)
   private String sponsorName;

   @Column(name = "sponsor_type")
   private String sponsorType; // TITLE, PRESENTING, OFFICIAL, ASSOCIATE

   @Column(name = "sponsor_amount")
   private Double sponsorAmount;

   @Column(name = "sponsor_contact")
   private String sponsorContact;

   @Column(name = "sponsor_email")
   private String sponsorEmail;

   @Column(name = "sponsor_logo_url")
   private String sponsorLogoUrl;

   @Column(name = "sponsor_description")
   private String sponsorDescription;

   @ManyToOne
   @JoinColumn(name = "event_id")
   @JsonBackReference
   private Event event;

   // Default constructor
   public Sponsorships() {
   }

   // Constructor
   public Sponsorships(String sponsorName, String sponsorType, Double sponsorAmount,
         String sponsorContact, String sponsorEmail, String sponsorLogoUrl, String sponsorDescription) {
      this.sponsorName = sponsorName;
      this.sponsorType = sponsorType;
      this.sponsorAmount = sponsorAmount;
      this.sponsorContact = sponsorContact;
      this.sponsorEmail = sponsorEmail;
      this.sponsorLogoUrl = sponsorLogoUrl;
      this.sponsorDescription = sponsorDescription;
   }

   // Getters and Setters
   public Long getId() {
      return id;
   }

   public void setId(Long id) {
      this.id = id;
   }

   public String getSponsorName() {
      return sponsorName;
   }

   public void setSponsorName(String sponsorName) {
      this.sponsorName = sponsorName;
   }

   public String getSponsorType() {
      return sponsorType;
   }

   public void setSponsorType(String sponsorType) {
      this.sponsorType = sponsorType;
   }

   public Double getSponsorAmount() {
      return sponsorAmount;
   }

   public void setSponsorAmount(Double sponsorAmount) {
      this.sponsorAmount = sponsorAmount;
   }

   public String getSponsorContact() {
      return sponsorContact;
   }

   public void setSponsorContact(String sponsorContact) {
      this.sponsorContact = sponsorContact;
   }

   public String getSponsorEmail() {
      return sponsorEmail;
   }

   public void setSponsorEmail(String sponsorEmail) {
      this.sponsorEmail = sponsorEmail;
   }

   public String getSponsorLogoUrl() {
      return sponsorLogoUrl;
   }

   public void setSponsorLogoUrl(String sponsorLogoUrl) {
      this.sponsorLogoUrl = sponsorLogoUrl;
   }

   public String getSponsorDescription() {
      return sponsorDescription;
   }

   public void setSponsorDescription(String sponsorDescription) {
      this.sponsorDescription = sponsorDescription;
   }

   public Event getEvent() {
      return event;
   }

   public void setEvent(Event event) {
      this.event = event;
   }
}
