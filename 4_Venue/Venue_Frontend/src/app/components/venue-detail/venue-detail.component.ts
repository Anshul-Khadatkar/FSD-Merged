import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue';

@Component({
  selector: 'app-venue-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit {
  venue: Venue | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private venueService: VenueService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadVenue(+id);
    }
  }

  loadVenue(id: number): void {
    this.loading = true;
    this.venueService.getVenueById(id).subscribe({
      next: (venue) => {
        this.venue = venue;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load venue details';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  deleteVenue(id: number): void {
    if (confirm('Are you sure you want to delete this venue?')) {
      this.venueService.deleteVenue(id).subscribe({
        next: () => {
          this.router.navigate(['/venues']);
        },
        error: (error) => {
          console.error('Error deleting venue:', error);
        }
      });
    }
  }
}
