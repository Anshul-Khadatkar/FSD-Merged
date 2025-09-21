import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Result } from '../../models/result.model';
import { ResultService } from '../../services/result.service';
import { 
  FormBuilder, 
  FormGroup, 
  FormControl,
  ReactiveFormsModule, 
  Validators, 
  FormsModule 
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="container mx-auto p-4">
      <!-- Breadcrumb Navigation -->
      <div class="mb-4">
        <nav class="flex items-center space-x-2 text-sm text-gray-600">
          <a href="http://localhost:4201" class="hover:text-blue-600">🏠 Home</a>
          <span>></span>
          <a href="http://localhost:4201/dashboard" class="hover:text-blue-600">Dashboard</a>
          <span>></span>
          <span class="text-gray-800 font-medium">Results</span>
        </nav>
      </div>
      
      <div class="bg-white shadow-lg rounded-lg">
        <div class="p-6">
          <!-- Header -->
          <div class="flex justify-between items-center mb-6">
            <div class="flex items-center gap-4">
              <button 
                (click)="goBack()"
                class="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                ← Back
              </button>
              <button 
                (click)="goHome()"
                class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                🏠 Home
              </button>
            </div>
            <div class="flex items-center gap-4">
               <h1 class="text-3xl font-bold text-gray-800">
                 Results Management
               </h1>
               <div class="flex justify-end">
                <button 
                  (click)="toggleForm()"
                  class="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span *ngIf="!showForm">+ Add Result</span>
                  <span *ngIf="showForm">× Close Form</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Error Message -->
          <div *ngIf="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {{ errorMessage }}
            <button (click)="errorMessage = null" class="float-right">&times;</button>
          </div>
          
          <!-- Success Message -->
          <div *ngIf="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {{ successMessage }}
            <button (click)="successMessage = null" class="float-right">&times;</button>
          </div>
          
          <!-- Loading State -->
          <div *ngIf="loading" class="flex justify-center my-4">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>

           <!-- Add/Edit Result Form -->
           <div *ngIf="showForm" class="mb-6 p-4 border rounded-lg bg-gray-50">
            <h2 class="text-xl font-semibold mb-4">{{editingResult ? 'Edit' : 'Add New'}} Result</h2>
            <form [formGroup]="resultForm" (ngSubmit)="onSubmit()" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input 
                  type="text" 
                  formControlName="name"
                  class="mt-1 p-2 w-full border rounded-lg" 
                  [class.border-red-500]="isInvalid('name')"
                >
                <div *ngIf="isInvalid('name')" class="text-red-500 text-sm mt-1">
                  Name is required
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Position</label>
                <input 
                  type="text" 
                  formControlName="position"
                  class="mt-1 p-2 w-full border rounded-lg"
                  [class.border-red-500]="isInvalid('position')"
                >
                <div *ngIf="isInvalid('position')" class="text-red-500 text-sm mt-1">
                  Position is required
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Winning Amount</label>
                <input 
                  type="number" 
                  formControlName="winningAmount"
                  class="mt-1 p-2 w-full border rounded-lg"
                  [class.border-red-500]="isInvalid('winningAmount')"
                >
                <div *ngIf="isInvalid('winningAmount')" class="text-red-500 text-sm mt-1">
                  Winning amount must be greater than 0
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Event ID</label>
                <input 
                  type="text" 
                  formControlName="eventId"
                  class="mt-1 p-2 w-full border rounded-lg"
                  [class.border-red-500]="isInvalid('eventId')"
                >
                <div *ngIf="isInvalid('eventId')" class="text-red-500 text-sm mt-1">
                  Event ID is required
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Player ID</label>
                <input 
                  type="text" 
                  formControlName="pId"
                  class="mt-1 p-2 w-full border rounded-lg"
                  [class.border-red-500]="isInvalid('pId')"
                >
                <div *ngIf="isInvalid('pId')" class="text-red-500 text-sm mt-1">
                  Player ID is required
                </div>
              </div>
              <div class="md:col-span-2">
                <button 
                  type="submit"
                  [disabled]="resultForm.invalid || loading"
                  class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {{editingResult ? 'Update' : 'Add'}} Result
                </button>
              </div>
            </form>
          </div>

          <!-- Search and Filter -->
          <div class="mb-6 flex justify-between items-center">
            <input 
              type="text" 
              [formControl]="searchControl"
              (input)="filterResults()"
              placeholder="Search by name..." 
              class="p-2 border rounded-lg w-64"
            >
          </div>

          <!-- Results Table -->
          <div *ngIf="!loading" class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-300">
              <thead>
                <tr class="bg-gray-100">
                  <th class="py-3 px-4 border-b text-left">Name</th>
                  <th class="py-3 px-4 border-b text-left">Position</th>
                  <th class="py-3 px-4 border-b text-left">Winning Amount</th>
                  <th class="py-3 px-4 border-b text-left">Event ID</th>
                  <th class="py-3 px-4 border-b text-left">Player ID</th>
                   <th class="py-3 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let result of filteredResults" class="hover:bg-gray-50">
                  <td class="py-3 px-4 border-b">{{result.name}}</td>
                  <td class="py-3 px-4 border-b">{{result.position}}</td>
                  <td class="py-3 px-4 border-b">₹{{result.winningAmount}}</td>
                  <td class="py-3 px-4 border-b">{{result.eventId}}</td>
                  <td class="py-3 px-4 border-b">{{result.pId}}</td>
                   <td class="py-3 px-4 border-b">
                    <div class="flex gap-2">
                      <button 
                        (click)="editResult(result)"
                        class="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button 
                        (click)="confirmDelete(result)"
                        class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition-colors duration-200 shadow-sm hover:shadow-md border border-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- No Results Message -->
          <div *ngIf="!loading && filteredResults.length === 0" class="text-center py-4 text-gray-600">
            No results found.
          </div>
        </div>
      </div>
    </div>

     <!-- Confirmation Modal -->
     <div *ngIf="showDeleteConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 class="text-xl font-semibold mb-4">Confirm Delete</h3>
        <p class="mb-6">Are you sure you want to delete the result for "{{ resultToDelete?.name }}"?</p>
        <div class="flex justify-end space-x-3">
          <button 
            (click)="cancelDelete()"
            class="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button 
            (click)="deleteResult()"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Action Buttons -->
    <div class="floating-buttons">
      <button 
        (click)="goBack()"
        class="floating-btn"
        title="Go Back"
        style="background-color: #6B7280;"
      >
        ←
      </button>
      <button 
        (click)="goHome()"
        class="floating-btn"
        title="Go Home"
        style="background-color: #10B981;"
      >
        🏠
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #f3f4f6;
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      padding: 12px 15px;
      border: 1px solid #e5e7eb;
      text-align: left;
    }

    th {
      background-color: #f9fafb;
      font-weight: 600;
      color: #374151;
    }

    tr:nth-child(even) {
      background-color: #f3f4f6;
    }

    tr:hover {
      background-color: #e2e8f0;
    }

    input {
      border-color: #e5e7eb;
      outline: none;
    }

    input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }

    button:disabled {
      cursor: not-allowed;
    }

    .floating-buttons {
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 1000;
    }

    .floating-btn {
      background-color: #4F46E5;
      color: white;
      border: none;
      border-radius: 50%;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 20px;
    }

    .floating-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    .breadcrumb {
      background-color: #f8f9fa;
      padding: 8px 16px;
      border-radius: 6px;
      margin-bottom: 16px;
    }

    .breadcrumb a {
      color: #6B7280;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .breadcrumb a:hover {
      color: #3B82F6;
    }
  `]
})
export class ResultComponent implements OnInit, OnDestroy {
  results: Result[] = [];
  filteredResults: Result[] = [];
  searchTerm: string = '';
  showForm: boolean = false;
  editingResult: boolean = false;
  loading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  resultForm: FormGroup;
  searchControl: FormControl;
  
  // All users can manage results
  isEventManager: boolean = true;
  isParticipant: boolean = false;
  userRole: string = 'USER';
  
  // For delete confirmation modal
  showDeleteConfirmation: boolean = false;
  resultToDelete: Result | null = null;
  private searchSubscription?: Subscription;

  constructor(
    private resultService: ResultService, 
    private fb: FormBuilder
  ) {
    // Initialize form controls in constructor
    this.searchControl = new FormControl('');
    this.resultForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
      winningAmount: [0, [Validators.required, Validators.min(1)]],
      eventId: ['', [Validators.required]],
      pId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.checkUserRole();
    this.loadResults();
    
    // Subscribe to search control changes
    this.searchSubscription = this.searchControl.valueChanges.subscribe(value => {
      this.searchTerm = value || '';
      this.filterResults();
    });
  }

  checkUserRole() {
    // All users can manage results - no role restrictions
    this.isEventManager = true;
    this.isParticipant = false;
    this.userRole = 'USER';
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  goBack() {
    // Go back to the previous page
    window.history.back();
  }

  goHome() {
    // Navigate to the participation service home page
    window.location.href = 'http://localhost:4201';
  }

  isInvalid(controlName: string): boolean {
    const control = this.resultForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.editingResult = false;
    this.resultForm.reset({
      id: null,
      name: '',
      position: '',
      winningAmount: 0,
      eventId: '',
      pId: ''
    });
  }

  editResult(result: Result): void {
    this.editingResult = true;
    this.resultForm.setValue({
      id: result.id,
      name: result.name,
      position: result.position,
      winningAmount: result.winningAmount,
      eventId: result.eventId,
      pId: result.pId
    });
    this.showForm = true;
  }

  confirmDelete(result: Result): void {
    this.resultToDelete = result;
    this.showDeleteConfirmation = true;
  }

  cancelDelete(): void {
    this.resultToDelete = null;
    this.showDeleteConfirmation = false;
  }

  deleteResult(): void {
    if (!this.resultToDelete || !this.resultToDelete.id) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    
    this.resultService.deleteResult(this.resultToDelete.id.toString()).subscribe({
      next: () => {
        this.results = this.results.filter(r => r.id !== this.resultToDelete?.id);
        this.filterResults();
        this.successMessage = 'Result deleted successfully';
        this.loading = false;
        this.showDeleteConfirmation = false;
        this.resultToDelete = null;
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete result. Please try again.';
        console.error('Error deleting result:', error);
        this.loading = false;
        this.showDeleteConfirmation = false;
      }
    });
  }

  loadResults(): void {
    this.loading = true;
    this.errorMessage = null;
    
    this.resultService.getResults().subscribe({
      next: (data) => {
        this.results = data;
        this.filteredResults = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load results. Please try again later.';
        console.error('Error loading results:', error);
        this.loading = false;
        this.results = [];
        this.filteredResults = [];
      }
    });
  }

  filterResults(): void {
    if (!this.searchTerm) {
      this.filteredResults = this.results;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredResults = this.results.filter(result =>
      result.name.toLowerCase().includes(searchTermLower)
    );
  }

  onSubmit(): void {
    if (this.resultForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.resultForm.controls).forEach(key => {
        const control = this.resultForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    
    const resultData: Result = this.resultForm.value;

    if (this.editingResult && resultData.id) {
      // Update existing result
      this.resultService.updateResult(resultData.id.toString(), resultData).subscribe({
        next: (result) => {
          const index = this.results.findIndex(r => r.id === result.id);
          if (index !== -1) {
            this.results[index] = result;
          }
          this.filterResults();
          this.resetForm();
          this.showForm = false;
          this.successMessage = 'Result updated successfully';
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to update result. Please try again.';
          console.error('Error updating result:', error);
          this.loading = false;
        }
      });
    } else {
      // Create new result
      this.resultService.createResult(resultData).subscribe({
        next: (result) => {
          this.results.push(result);
          this.filterResults();
          this.resetForm();
          this.showForm = false;
          this.successMessage = 'Result added successfully';
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to add result. Please try again.';
          console.error('Error adding result:', error);
          this.loading = false;
        }
      });
    }
  }
}