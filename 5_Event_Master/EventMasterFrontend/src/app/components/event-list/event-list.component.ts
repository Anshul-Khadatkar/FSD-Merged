import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  loading = false;
  error = '';

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        console.log('Loaded events:', events);
        this.events = events;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.error = 'Failed to load events';
        this.loading = false;
      }
    });
  }

  // ✅ Fix: Use proper event parameter
  onEventClick(event: MouseEvent, eventId: number): void {
    event.stopPropagation();
    if (eventId) {
      console.log('Navigating to event ID:', eventId);
      this.router.navigate(['/event/detail', eventId]);
    } else {
      console.error('Event ID is undefined');
    }
  }

  deleteEvent(eventId: number): void {
    if (!eventId) {
      console.error('Cannot delete event: ID is undefined');
      return;
    }

    const event = this.events.find(e => this.getEventId(e) === eventId);
    if (!event) return;

    if (confirm(`Are you sure you want to delete "${event.eventName}"?`)) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          console.log('Event deleted successfully');
          this.loadEvents();
        },
        error: (error) => {
          console.error('Error deleting event:', error);
        }
      });
    }
  }

  getEventId(event: Event): number | undefined {
    return event.id || event.eventId;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}
