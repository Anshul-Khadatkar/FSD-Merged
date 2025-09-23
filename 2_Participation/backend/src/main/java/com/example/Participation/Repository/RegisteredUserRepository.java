package com.example.Participation.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Participation.Entity.RegisteredUser;

import java.util.Optional;

@Repository
public interface RegisteredUserRepository extends JpaRepository<RegisteredUser, Long> {

    Optional<RegisteredUser> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<RegisteredUser> findByUserId(Long userId);
}
