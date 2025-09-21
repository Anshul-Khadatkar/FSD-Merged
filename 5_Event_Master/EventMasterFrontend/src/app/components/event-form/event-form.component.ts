import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  isEditMode = false;
  eventId: number | null = null;
  loading = false;
  message = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      eventType: ['', Validators.required],
      eventHead: [null, [Validators.required, Validators.min(1)]],
      eventDay: ['', Validators.required] // Changed from eventDate to eventDay
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.eventId = +params['id'];
        this.loadEvent();
      }
    });
  }

  loadEvent(): void {
    if (this.eventId) {
      this.eventService.getEventById(this.eventId).subscribe({
        next: (event) => {
          this.eventForm.patchValue({
            eventName: event.eventName,
            eventType: event.eventType,
            eventHead: event.eventHead,
            eventDay: event.eventDay // Changed from eventDate to eventDay
          });
        },
        error: (error) => {
          console.error('Error loading event:', error);
          this.errorMessage = 'Failed to load event details';
        }
      });
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.loading = true;
      this.message = '';
      this.errorMessage = '';
      
      // Create event object that matches backend exactly
      const event: Event = {
        eventName: this.eventForm.value.eventName?.trim(),
        eventType: this.eventForm.value.eventType?.trim(),
        eventHead: Number(this.eventForm.value.eventHead),
        eventDay: this.eventForm.value.eventDay // Send as YYYY-MM-DD string
      };

      // Log the event object that matches backend
      console.log('Sending event data (matching backend):', JSON.stringify(event, null, 2));

      const operation = this.isEditMode && this.eventId
        ? this.eventService.updateEvent(this.eventId, event)
        : this.eventService.addEvent(event);

      operation.subscribe({
        next: (response) => {
          this.loading = false;
          this.message = this.isEditMode ? 'Event updated successfully!' : 'Event created successfully!';
          console.log('Backend response:', response);
          
          // Navigate after showing success message
          setTimeout(() => {
            this.router.navigate(['/events']);
          }, 1500);
        },
        error: (error) => {
          this.loading = false;
          console.error('Full error object:', error);
          
          // Better error handling
          let errorMsg = 'Failed to save event';
          if (error.error?.message) {
            errorMsg = error.error.message;
          } else if (error.error?.error) {
            errorMsg = error.error.error;
          }
          
          this.errorMessage = errorMsg;
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly';
      this.markFormGroupTouched(this.eventForm);
    }
  }

  onCancel(): void {
    this.router.navigate(['/events']);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
}
