import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue';

@Component({
  selector: 'app-venue-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements OnInit {
  venues: Venue[] = [];
  loading = false;
  error = '';

  constructor(
    private venueService: VenueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVenues();
  }

  loadVenues(): void {
    this.loading = true;
    this.venueService.getAllVenues().subscribe({
      next: (data) => {
        this.venues = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load venues';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onVenueClick(event: Event, venueId: number): void {
    // Navigate to venue detail page
    this.router.navigate(['/venue/detail', venueId]);
  }

  deleteVenue(id: number): void {
    if (confirm('Are you sure you want to delete this venue?')) {
      this.venueService.deleteVenue(id).subscribe({
        next: () => {
          this.loadVenues(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting venue:', error);
        }
      });
    }
  }
}
