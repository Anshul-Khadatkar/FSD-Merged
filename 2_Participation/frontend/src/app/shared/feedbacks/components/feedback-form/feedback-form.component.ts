import { Component,EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],  // Corrected to styleUrls
})


export class FeedbackFormComponent {
  feedbackForm: FormGroup;
  categories = ['Health & Safety', 'Food & Beverages', 'Event Organization', 'Facilities'];
  showFeedback = false;
  @Output() close = new EventEmitter<void>(); // new output for closing modal

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.feedbackForm = this.fb.group({
      category: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      rating: [0, [Validators.required, Validators.min(1)]],
    });
  }

  get rating(): number {
    return this.feedbackForm.get('rating')?.value || 0;
  }

  setRating(star: number) {
    this.feedbackForm.patchValue({ rating: star });
  }

showSuccessMessage = false; // add this property to your component

submitFeedback() {
  // Get token from localStorage
  const token = localStorage.getItem('authToken') || '';

  // Extract userId from token safely
  const tokenParts = token.split('-');
  let userId = Number(tokenParts[tokenParts.length - 1]);

  if (!userId || isNaN(userId)) {
    console.warn('Invalid token, using fallback userId = 1');
    userId = 1;
  }

  // Build feedback object
  const formData = {
    category: (this.feedbackForm.value.category || 'General').trim(),
    feedbackDescription: (this.feedbackForm.value.message || 'No description').trim(),
    rating: this.rating || 0,
    userId: userId
  };

  console.log('Submitting feedback with userId:', userId);

  // Post to backend
  this.http.post('http://localhost:8081/submit', formData).subscribe({
    next: (response) => {
      console.log('Feedback submitted successfully', response);
      this.feedbackForm.reset();
      this.showFeedback = false; // close modal

      // Show success message for 5 seconds
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 5000);
    },
    error: (error) => {
      console.error('Error submitting feedback:', error);
    }
  });
}

closeFeedback() {
    this.close.emit();
  }


}