import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8085/api/events';

  constructor(private http: HttpClient) { }

  // Get all events
  getAllEvents(): Observable<Event[]> {
    this.http.get<Event[]>(this.apiUrl).subscribe(data => {
      console.log('Events from API:', data);
    });
    return this.http.get<Event[]>(this.apiUrl);
  }

  // Get event by ID
  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  // Add new event
  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  // Update event
  updateEvent(id: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  // Delete event
  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Get events by type
  getEventsByType(eventType: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/type/${eventType}`);
  }

  // Get events by head
  getEventsByHead(eventHead: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/head/${eventHead}`);
  }

  // Get events by date
  // Get events by date (the endpoint uses 'date' but field is 'eventDay')
  getEventsByDate(date: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/date/${date}`);
  }


  // Search events by name
  searchEventsByName(name: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/search?name=${name}`);
  }
}
