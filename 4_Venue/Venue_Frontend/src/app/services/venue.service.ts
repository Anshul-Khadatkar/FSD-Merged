import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venue } from '../models/venue';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  private apiUrl = 'http://localhost:8084/api/venues';

  constructor(private http: HttpClient) { }

  // Get all venues
  getAllVenues(): Observable<Venue[]> {
    return this.http.get<Venue[]>(this.apiUrl);
  }

  // Get venue by ID
  getVenueById(id: number): Observable<Venue> {
    return this.http.get<Venue>(`${this.apiUrl}/${id}`);
  }

  // Add new venue
  addVenue(venue: Venue): Observable<Venue> {
    return this.http.post<Venue>(this.apiUrl, venue);
  }

  // Update venue
  updateVenue(id: number, venue: Venue): Observable<Venue> {
    return this.http.put<Venue>(`${this.apiUrl}/${id}`, venue);
  }

  // Delete venue
  deleteVenue(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Get venues by type
  getVenuesByType(venueType: string): Observable<Venue[]> {
    return this.http.get<Venue[]>(`${this.apiUrl}/type/${venueType}`);
  }

  // Get venues by incharge
  getVenuesByIncharge(venueIncharge: string): Observable<Venue[]> {
    return this.http.get<Venue[]>(`${this.apiUrl}/incharge/${venueIncharge}`);
  }

  // Search venues by facility
  searchVenuesByFacility(facility: string): Observable<Venue[]> {
    return this.http.get<Venue[]>(`${this.apiUrl}/search?facility=${facility}`);
  }

  // Get venues by seating area
  getVenuesBySeatingArea(seatingArea: string): Observable<Venue[]> {
    return this.http.get<Venue[]>(`${this.apiUrl}/seating/${seatingArea}`);
  }
}
