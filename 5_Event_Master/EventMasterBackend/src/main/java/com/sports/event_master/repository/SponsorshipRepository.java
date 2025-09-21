package com.sports.event_master.repository;

import com.sports.event_master.entity.Sponsorships;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SponsorshipRepository extends JpaRepository<Sponsorships, Long> {
    
    List<Sponsorships> findBySponsorType(String sponsorType);
    List<Sponsorships> findBySponsorName(String sponsorName);
    List<Sponsorships> findByEventId(Long eventId);
}
