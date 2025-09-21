import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue';

@Component({
  selector: 'app-venue-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './venue-form.component.html',
  styleUrls: ['./venue-form.component.css']
})
export class VenueFormComponent implements OnInit {
  venueForm: FormGroup;
  isEditMode = false;
  venueId: number | null = null;
  loading = false;
  message = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private venueService: VenueService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.venueForm = this.fb.group({
      venueType: ['', Validators.required],
      venueIncharge: ['', Validators.required],
      venueFacility: ['', Validators.required],
      seatingArea: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.venueId = +params['id'];
        this.loadVenue();
      }
    });
  }

  loadVenue(): void {
    if (this.venueId) {
      this.venueService.getVenueById(this.venueId).subscribe({
        next: (venue) => {
          this.venueForm.patchValue(venue);
        },
        error: (error) => {
          console.error('Error loading venue:', error);
          this.errorMessage = 'Failed to load venue details';
        }
      });
    }
  }

  onSubmit(): void {
    if (this.venueForm.valid) {
      this.loading = true;
      this.message = '';
      this.errorMessage = '';
      
      const venue: Venue = this.venueForm.value;

      const operation = this.isEditMode && this.venueId
        ? this.venueService.updateVenue(this.venueId, venue)
        : this.venueService.addVenue(venue);

      operation.subscribe({
        next: (response) => {
          this.loading = false;
          this.message = this.isEditMode ? 'Venue updated successfully!' : 'Venue created successfully!';
          
          // Navigate after showing success message
          setTimeout(() => {
            this.router.navigate(['/venues']);
          }, 1500);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error saving venue:', error);
          this.errorMessage = this.isEditMode ? 'Failed to update venue' : 'Failed to create venue';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly';
    }
  }

  onCancel(): void {
    this.router.navigate(['/venues']);
  }
}
