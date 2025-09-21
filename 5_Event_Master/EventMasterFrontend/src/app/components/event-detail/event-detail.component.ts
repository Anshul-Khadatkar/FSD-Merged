import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadEvent(+id);
    }
  }

  loadEvent(id: number): void {
    this.loading = true;
    this.eventService.getEventById(id).subscribe({
      next: (event) => {
        console.log('Loaded event:', event); // 🔍 Debug
        this.event = event;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load event details';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  // ✅ Fix: Remove parameter and get ID from the event object
  deleteEvent(): void {
    if (!this.event) return;

    const eventId = this.getEventId(this.event);
    if (!eventId) {
      console.error('Cannot delete event: ID is undefined');
      return;
    }

    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          this.router.navigate(['/events']);
        },
        error: (error) => {
          console.error('Error deleting event:', error);
        }
      });
    }
  }

  editEvent(): void {
    if (!this.event) return;

    const eventId = this.getEventId(this.event);
    if (eventId) {
      this.router.navigate(['/event/edit', eventId]);
    }
  }

  // ✅ Helper method to get event ID safely
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
