import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent {
  searchForm: FormGroup;
  searchResults: Event[] = [];
  loading = false;
  searchPerformed = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService
  ) {
    this.searchForm = this.fb.group({
      searchType: ['name'],
      searchValue: ['']
    });
  }

  onSearch(): void {
    const formValue = this.searchForm.value;
    if (!formValue.searchValue.trim()) return;

    this.loading = true;
    this.searchPerformed = true;

    let searchObservable;

    switch (formValue.searchType) {
      case 'name':
        searchObservable = this.eventService.searchEventsByName(formValue.searchValue);
        break;
      case 'type':
        searchObservable = this.eventService.getEventsByType(formValue.searchValue);
        break;
      case 'head':
        searchObservable = this.eventService.getEventsByHead(+formValue.searchValue);
        break;
      case 'date':
        searchObservable = this.eventService.getEventsByDate(formValue.searchValue);
        break;
      default:
        searchObservable = this.eventService.getAllEvents();
    }

    searchObservable.subscribe({
      next: (events) => {
        this.searchResults = events;
        this.loading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.loading = false;
      }
    });
  }

  clearSearch(): void {
    this.searchForm.reset({ searchType: 'name', searchValue: '' });
    this.searchResults = [];
    this.searchPerformed = false;
  }

  getPlaceholder(): string {
    const searchType = this.searchForm.get('searchType')?.value;
    switch (searchType) {
      case 'name': return 'Enter event name...';
      case 'type': return 'Enter event type...';
      case 'head': return 'Enter head ID...';
      default: return 'Enter search term...';
    }
  }

  // Add this method to EventSearchComponent
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
