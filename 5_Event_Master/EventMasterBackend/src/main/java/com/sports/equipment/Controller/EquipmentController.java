package com.sports.equipment.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sports.equipment.Entity.Equipment;
import com.sports.equipment.Service.EquipmentService;
import com.sports.equipment.Utils.EquipmentDTO;
import com.sports.equipment.Utils.EquipmentMapper;

import java.util.List;

@RestController
@RequestMapping("/api/equipment")
@CrossOrigin(origins = { "http://localhost:4204", "http://localhost:4200" })
public class EquipmentController {

  private final EquipmentService equipmentService;
  private final EquipmentMapper equipmentMapper;

  public EquipmentController(EquipmentService equipmentService, EquipmentMapper equipmentMapper) {
    this.equipmentService = equipmentService;
    this.equipmentMapper = equipmentMapper;
  }

  @GetMapping
  public ResponseEntity<List<EquipmentDTO>> getAllEquipment() {
    List<Equipment> equipmentList = equipmentService.getAllEquipment();
    List<EquipmentDTO> dtoList = equipmentMapper.toDTOList(equipmentList);
    return new ResponseEntity<>(dtoList, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<EquipmentDTO> getEquipmentById(@PathVariable Long id) {
    Equipment equipment = equipmentService.getEquipmentById(id);
    EquipmentDTO dto = equipmentMapper.toDTO(equipment);
    return new ResponseEntity<>(dto, HttpStatus.OK);
  }

  // 🔍 Search endpoint
  @GetMapping("/search")
  public ResponseEntity<List<EquipmentDTO>> searchEquipment(@RequestParam String name) {
    List<Equipment> equipmentList = equipmentService.searchEquipmentByName(name);
    List<EquipmentDTO> dtoList = equipmentMapper.toDTOList(equipmentList);
    return new ResponseEntity<>(dtoList, HttpStatus.OK);
  }

  // 🔍 Search by Event Name endpoint
  @GetMapping("/search/event")
  public ResponseEntity<List<EquipmentDTO>> searchEquipmentByEventName(@RequestParam String eventName) {
    List<Equipment> equipmentList = equipmentService.searchEquipmentByEventName(eventName);
    List<EquipmentDTO> dtoList = equipmentMapper.toDTOList(equipmentList);
    return new ResponseEntity<>(dtoList, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<EquipmentDTO> createEquipment(@RequestBody EquipmentDTO equipmentDTO) {
    Equipment equipment = equipmentMapper.toEntity(equipmentDTO);
    Equipment createdEquipment = equipmentService.createEquipment(equipment);
    EquipmentDTO createdDTO = equipmentMapper.toDTO(createdEquipment);
    return new ResponseEntity<>(createdDTO, HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<EquipmentDTO> updateEquipment(@PathVariable Long id, @RequestBody EquipmentDTO equipmentDTO) {
    Equipment equipment = equipmentMapper.toEntity(equipmentDTO);
    Equipment updatedEquipment = equipmentService.updateEquipment(id, equipment);
    EquipmentDTO updatedDTO = equipmentMapper.toDTO(updatedEquipment);
    return new ResponseEntity<>(updatedDTO, HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
    equipmentService.deleteEquipment(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
