package com.sports.equipment.Service;

import java.util.List;

import com.sports.equipment.Entity.Equipment;

public interface EquipmentService {
  List<Equipment> getAllEquipment();

  Equipment getEquipmentById(Long id);

  Equipment createEquipment(Equipment equipment);

  Equipment updateEquipment(Long id, Equipment equipment);

  void deleteEquipment(Long id);

  // 🔍 New Method for Search
  List<Equipment> searchEquipmentByName(String name);

  // 🔍 New Method for Search by Event Name
  List<Equipment> searchEquipmentByEventName(String eventName);
}
