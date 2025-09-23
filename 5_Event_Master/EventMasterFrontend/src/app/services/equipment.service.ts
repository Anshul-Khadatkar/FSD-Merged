import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment } from '../models/equipment.model';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private apiUrl = 'http://localhost:8085/api/equipment';

  constructor(private http: HttpClient) {}

  // Get all equipment
  getAllEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.apiUrl);
  }

  // Get equipment by ID
  getEquipmentById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.apiUrl}/${id}`);
  }

  // Add new equipment
  createEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(this.apiUrl, equipment);
  }

  // Update equipment
  updateEquipment(id: number, equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.apiUrl}/${id}`, equipment);
  }

  // Delete equipment
  deleteEquipment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Search equipment by name
  searchEquipmentByName(name: string): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.apiUrl}/search?name=${name}`);
  }

  // Search equipment by event name
  searchEquipmentByEventName(eventName: string): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(
      `${this.apiUrl}/search/event?eventName=${eventName}`
    );
  }
}
