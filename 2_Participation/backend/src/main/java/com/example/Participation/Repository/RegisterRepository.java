package com.example.participation.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.participation.Entity.Register;

import java.util.Optional;

public interface RegisterRepository extends JpaRepository<Register, Long> {
    // Custom query methods can be added here if needed
    Optional<Register> findByUsername(String username); // For login check
}
