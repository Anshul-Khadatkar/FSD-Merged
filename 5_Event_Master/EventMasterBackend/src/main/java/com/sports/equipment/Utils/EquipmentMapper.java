package com.sports.equipment.Utils;

import org.springframework.stereotype.Component;
import com.sports.equipment.Entity.Equipment;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class EquipmentMapper {

  public EquipmentDTO toDTO(Equipment equipment) {
    if (equipment == null) {
      return null;
    }

    EquipmentDTO dto = new EquipmentDTO();
    dto.setId(equipment.getId());
    dto.setName(equipment.getName());
    dto.setEventName(equipment.getEventName());
    dto.setDescription(equipment.getDescription());
    dto.setCategory(equipment.getCategory());
    dto.setQuantity(equipment.getQuantity());
    dto.setCondition(equipment.getCondition());
    dto.setCostPerUnit(equipment.getCostPerUnit());
    dto.setLocation(equipment.getLocation());
    dto.setStatus(equipment.getStatus());
    dto.setLastMaintenance(equipment.getLastMaintenance());
    dto.setNextMaintenance(equipment.getNextMaintenance());

    return dto;
  }

  public Equipment toEntity(EquipmentDTO dto) {
    if (dto == null) {
      return null;
    }

    Equipment equipment = new Equipment();
    equipment.setId(dto.getId());
    equipment.setName(dto.getName());
    equipment.setEventName(dto.getEventName());
    equipment.setDescription(dto.getDescription());
    equipment.setCategory(dto.getCategory());
    equipment.setQuantity(dto.getQuantity());
    equipment.setCondition(dto.getCondition());
    equipment.setCostPerUnit(dto.getCostPerUnit());
    equipment.setLocation(dto.getLocation());
    equipment.setStatus(dto.getStatus());
    equipment.setLastMaintenance(dto.getLastMaintenance());
    equipment.setNextMaintenance(dto.getNextMaintenance());

    return equipment;
  }

  public List<EquipmentDTO> toDTOList(List<Equipment> equipmentList) {
    return equipmentList.stream()
        .map(this::toDTO)
        .collect(Collectors.toList());
  }

  public List<Equipment> toEntityList(List<EquipmentDTO> dtoList) {
    return dtoList.stream()
        .map(this::toEntity)
        .collect(Collectors.toList());
  }
}
