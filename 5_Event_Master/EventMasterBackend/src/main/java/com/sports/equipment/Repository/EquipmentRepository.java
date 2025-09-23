package com.sports.equipment.Repository;

import org.springframework.stereotype.Repository;

import com.sports.equipment.Entity.Equipment;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
  // Search by equipment name (case-insensitive, partial match)
  List<Equipment> findByNameContainingIgnoreCase(String name);

  // Search by event name (case-insensitive, partial match)
  List<Equipment> findByEventNameContainingIgnoreCase(String eventName);

}
