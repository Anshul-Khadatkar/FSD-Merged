package com.example.participation.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.participation.Entity.Participation;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {
    List<Participation> findByUsername(String username);
}