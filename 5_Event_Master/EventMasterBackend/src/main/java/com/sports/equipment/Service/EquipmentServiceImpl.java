package com.sports.equipment.Service;

import org.springframework.stereotype.Service;

import com.sports.equipment.Entity.Equipment;
import com.sports.equipment.Repository.EquipmentRepository;
import com.sports.equipment.exception.EquipmentNotFoundException;

import java.util.List;

@Service
public class EquipmentServiceImpl implements EquipmentService {

  private final EquipmentRepository equipmentRepository;

  public EquipmentServiceImpl(EquipmentRepository equipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }

  @Override
  public List<Equipment> getAllEquipment() {
    return equipmentRepository.findAll();
  }

  @Override
  public Equipment getEquipmentById(Long id) {
    return equipmentRepository.findById(id)
        .orElseThrow(() -> new EquipmentNotFoundException("Equipment not found with id: " + id));
  }

  @Override
  public Equipment createEquipment(Equipment equipment) {
    if (equipment.getName() == null || equipment.getName().isEmpty()) {
      throw new IllegalArgumentException("Equipment name cannot be null or empty");
    }
    return equipmentRepository.save(equipment);
  }

  @Override
  public Equipment updateEquipment(Long id, Equipment equipment) {
    Equipment existingEquipment = getEquipmentById(id);

    // Update fields
    existingEquipment.setName(equipment.getName());
    existingEquipment.setEventName(equipment.getEventName());
    existingEquipment.setDescription(equipment.getDescription());
    existingEquipment.setCategory(equipment.getCategory());
    existingEquipment.setQuantity(equipment.getQuantity());
    existingEquipment.setCondition(equipment.getCondition());
    existingEquipment.setCostPerUnit(equipment.getCostPerUnit());
    existingEquipment.setLocation(equipment.getLocation());
    existingEquipment.setStatus(equipment.getStatus());
    existingEquipment.setLastMaintenance(equipment.getLastMaintenance());
    existingEquipment.setNextMaintenance(equipment.getNextMaintenance());

    return equipmentRepository.save(existingEquipment);
  }

  // 🔍 Search by Name
  @Override
  public List<Equipment> searchEquipmentByName(String name) {
    return equipmentRepository.findByNameContainingIgnoreCase(name);
  }

  // 🔍 Search by Event Name
  @Override
  public List<Equipment> searchEquipmentByEventName(String eventName) {
    return equipmentRepository.findByEventNameContainingIgnoreCase(eventName);
  }

  @Override
  public void deleteEquipment(Long id) {
    Equipment equipment = getEquipmentById(id);
    equipmentRepository.delete(equipment);
  }
}
