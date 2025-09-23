package com.sports.equipment.exception;

public class EquipmentNotFoundException extends RuntimeException {
  public EquipmentNotFoundException(String message) {
    super(message);
  }
}
