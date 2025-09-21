import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue';

@Component({
  selector: 'app-venue-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './venue-search.component.html',
  styleUrls: ['./venue-search.component.css']
})
export class VenueSearchComponent {
  searchForm: FormGroup;
  searchResults: Venue[] = [];
  loading = false;
  searchPerformed = false;

  constructor(
    private fb: FormBuilder,
    private venueService: VenueService
  ) {
    this.searchForm = this.fb.group({
      searchType: ['type'],
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
      case 'type':
        searchObservable = this.venueService.getVenuesByType(formValue.searchValue);
        break;
      case 'incharge':
        searchObservable = this.venueService.getVenuesByIncharge(formValue.searchValue);
        break;
      case 'facility':
        searchObservable = this.venueService.searchVenuesByFacility(formValue.searchValue);
        break;
      case 'seating':
        searchObservable = this.venueService.getVenuesBySeatingArea(formValue.searchValue);
        break;
      default:
        searchObservable = this.venueService.getAllVenues();
    }

    searchObservable.subscribe({
      next: (venues) => {
        this.searchResults = venues;
        this.loading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.loading = false;
      }
    });
  }

  clearSearch(): void {
    this.searchForm.reset({ searchType: 'type', searchValue: '' });
    this.searchResults = [];
    this.searchPerformed = false;
  }
}
