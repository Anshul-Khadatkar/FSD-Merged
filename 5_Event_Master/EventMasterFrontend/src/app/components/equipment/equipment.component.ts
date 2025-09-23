import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EquipmentService } from '../../services/equipment.service';
import { Equipment } from '../../models/equipment.model';

import { Router } from '@angular/router';
@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css'],
})
export class EquipmentComponent implements OnInit {
  equipmentList: Equipment[] = [];
  equipmentNames: string[] = [
    'Football',
    'Basketball',
    'Cricket Bat',
    'Cricket Ball',
    'Volleyball',
    'Badminton Racket',
    'Shuttlecock',
    'Table Tennis Paddle',
    'Table Tennis Ball',
    'Swimming Goggles',
    'Diving Board',
    'Track Shoes',
    'Hurdles',
    'Javelin',
    'Shot Put',
    'Discus',
    'High Jump Bar',
    'Pole Vault Pole',
    'Gym Weights',
    'Yoga Mat',
    'First Aid Kit',
  ];
  departments: string[] = [
    'Outdoor Sports',
    'Indoor Sports',
    'Fitness Equipment',
    'Adventure Sports',
    'Water Sports',
    'Track & Field',
    'Team Sports',
    'Racket Sports',
    'Combat Sports',
  ];

  selectedEquipment: any = this.getEmptyEquipment();
  isEditing = false;
  showForm = false;
  searchText = '';
  searchOption = 'eventName'; // Default search option

  // Form validation and UI states
  formSubmitted = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private equipmentService: EquipmentService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadEquipment();
  }

  getEmptyEquipment(): any {
    const now = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    return {
      id: null,
      eventName: '',
      name: '',
      description: '',
      category: '',
      quantity: 1,
      condition: '',
      costPerUnit: 0,
      location: '',
      status: 'OPERATIONAL',
      lastMaintenance: now,
      nextMaintenance: nextMonth,
      lastMaintenanceString: this.formatDateInput(now),
      nextMaintenanceString: this.formatDateInput(nextMonth),
    };
  }

  // Format date for datetime-local input
  formatDateInput(date: Date): string {
    const d = new Date(date);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  parseDateString(dateStr: string): Date {
    if (!dateStr) {
      throw new Error('Date string is required');
    }
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    return date;
  }

  loadEquipment(): void {
    this.equipmentService.getAllEquipment().subscribe({
      next: (data: any) => {
        this.equipmentList = data.map((e: any) => ({
          ...e,
          lastMaintenanceString: this.formatDateInput(
            new Date(e.lastMaintenance)
          ),
          nextMaintenanceString: this.formatDateInput(
            new Date(e.nextMaintenance)
          ),
        }));
      },
      error: (error: any) => {
        console.error('Error loading equipment:', error);
        this.showError('Failed to load equipment list');
      },
    });
  }

  onAddNew(): void {
    this.selectedEquipment = this.getEmptyEquipment();
    this.isEditing = false;
    this.showForm = true;
    this.formSubmitted = false;
    this.clearMessages();
  }

  onEdit(equipment: Equipment): void {
    this.selectedEquipment = {
      ...equipment,
      // Ensure proper type conversion for numbers
      quantity: Number(equipment.quantity),
      costPerUnit: Number(equipment.costPerUnit),
    };
    this.selectedEquipment.lastMaintenanceString = this.formatDateInput(
      new Date(equipment.lastMaintenance)
    );
    this.selectedEquipment.nextMaintenanceString = this.formatDateInput(
      new Date(equipment.nextMaintenance)
    );
    this.isEditing = true;
    this.showForm = true;
    this.formSubmitted = false;
    this.clearMessages();
    console.log('Editing equipment:', this.selectedEquipment);
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this equipment?')) {
      this.equipmentService.deleteEquipment(id).subscribe({
        next: () => {
          this.loadEquipment();
          this.showSuccess('Equipment deleted successfully');
        },
        error: (error: any) => {
          console.error('Error deleting equipment:', error);
          this.showError('Failed to delete equipment');
        },
      });
    }
  }

  onSave(form: NgForm): void {
    this.formSubmitted = true;
    this.clearMessages();

    console.log('Form valid:', form.valid);
    console.log('Form value:', form.value);
    console.log('Selected equipment:', this.selectedEquipment);

    // Check if form is valid
    if (!form.valid) {
      this.showError('Please fill in all required fields correctly');
      return;
    }

    // Additional validation
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    // Prepare equipment data - remove string properties that are only for form binding
    const equipmentData = {
      id: this.selectedEquipment.id,
      eventName: this.selectedEquipment.eventName,
      name: this.selectedEquipment.name,
      description: this.selectedEquipment.description,
      category: this.selectedEquipment.category,
      quantity: Number(this.selectedEquipment.quantity),
      condition: this.selectedEquipment.condition,
      costPerUnit: Number(this.selectedEquipment.costPerUnit),
      location: this.selectedEquipment.location,
      status: this.selectedEquipment.status,
      lastMaintenance: this.parseDateString(
        this.selectedEquipment.lastMaintenanceString
      ),
      nextMaintenance: this.parseDateString(
        this.selectedEquipment.nextMaintenanceString
      ),
    };

    console.log('Sending equipment data:', equipmentData);

    if (this.isEditing && equipmentData.id && equipmentData.id > 0) {
      this.equipmentService
        .updateEquipment(equipmentData.id, equipmentData)
        .subscribe({
          next: (response: any) => {
            console.log('Update response:', response);
            this.loadEquipment();
            this.showForm = false;
            this.formSubmitted = false;
            this.isLoading = false;
            this.showSuccess('Equipment updated successfully');
          },
          error: (error: any) => {
            console.error('Error updating equipment:', error);
            this.showError(
              'Failed to update equipment: ' +
                (error.error?.message || error.message || 'Unknown error')
            );
            this.isLoading = false;
          },
        });
    } else {
      // Remove id for creation
      const { id, ...createData } = equipmentData;
      this.equipmentService.createEquipment(createData).subscribe({
        next: (response: any) => {
          console.log('Create response:', response);
          this.loadEquipment();
          this.showForm = false;
          this.formSubmitted = false;
          this.isLoading = false;
          this.showSuccess('Equipment created successfully');
        },
        error: (error: any) => {
          console.error('Error creating equipment:', error);
          this.showError(
            'Failed to create equipment: ' +
              (error.error?.message || error.message || 'Unknown error')
          );
          this.isLoading = false;
        },
      });
    }
  }

  validateForm(): boolean {
    const eq = this.selectedEquipment;

    // Check required fields
    if (!eq.eventName?.trim()) {
      this.showError('Event Name is required');
      return false;
    }

    if (!eq.name?.trim()) {
      this.showError('Equipment Name is required');
      return false;
    }

    if (!eq.description?.trim()) {
      this.showError('Description is required');
      return false;
    }

    if (!eq.category?.trim()) {
      this.showError('Category is required');
      return false;
    }

    if (!eq.condition?.trim()) {
      this.showError('Condition is required');
      return false;
    }

    if (!eq.location?.trim()) {
      this.showError('Location is required');
      return false;
    }

    // Validate numbers
    if (!eq.quantity || eq.quantity < 1) {
      this.showError('Quantity must be at least 1');
      return false;
    }

    if (
      eq.costPerUnit === null ||
      eq.costPerUnit === undefined ||
      eq.costPerUnit < 0
    ) {
      this.showError('Cost Per Unit cannot be negative');
      return false;
    }

    // Validate dates
    if (!eq.lastMaintenanceString) {
      this.showError('Last Maintenance date is required');
      return false;
    }

    if (!eq.nextMaintenanceString) {
      this.showError('Next Maintenance date is required');
      return false;
    }

    try {
      const lastMaintenance = new Date(eq.lastMaintenanceString);
      const nextMaintenance = new Date(eq.nextMaintenanceString);

      if (isNaN(lastMaintenance.getTime())) {
        this.showError('Invalid Last Maintenance date');
        return false;
      }

      if (isNaN(nextMaintenance.getTime())) {
        this.showError('Invalid Next Maintenance date');
        return false;
      }

      if (nextMaintenance <= lastMaintenance) {
        this.showError(
          'Next Maintenance date must be after Last Maintenance date'
        );
        return false;
      }
    } catch (error) {
      this.showError('Invalid date format');
      return false;
    }

    return true;
  }

  onCancel(): void {
    this.showForm = false;
    this.formSubmitted = false;
    this.clearMessages();
  }

  // Enhanced search function with both Equipment and Event Name options
  onSearch(): void {
    if (!this.searchText.trim()) {
      this.loadEquipment();
      return;
    }

    if (this.searchOption === 'equipment') {
      // Search by equipment name
      this.equipmentService
        .searchEquipmentByName(this.searchText.trim())
        .subscribe({
          next: (data: any) => {
            this.equipmentList = data.map((e: any) => ({
              ...e,
              lastMaintenanceString: this.formatDateInput(
                new Date(e.lastMaintenance)
              ),
              nextMaintenanceString: this.formatDateInput(
                new Date(e.nextMaintenance)
              ),
            }));
          },
          error: (error: any) => {
            console.error('Error searching equipment:', error);
            this.showError('Failed to search equipment');
            // If search fails, reload all equipment
            this.loadEquipment();
          },
        });
    } else {
      // Search by event name (default)
      this.equipmentService
        .searchEquipmentByEventName(this.searchText.trim())
        .subscribe({
          next: (data: any) => {
            this.equipmentList = data.map((e: any) => ({
              ...e,
              lastMaintenanceString: this.formatDateInput(
                new Date(e.lastMaintenance)
              ),
              nextMaintenanceString: this.formatDateInput(
                new Date(e.nextMaintenance)
              ),
            }));
          },
          error: (error: any) => {
            console.error('Error searching equipment:', error);
            this.showError('Failed to search equipment');
            // If search fails, reload all equipment
            this.loadEquipment();
          },
        });
    }
  }

  // Utility methods for showing messages
  showSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = '';
    console.log('Success:', message);
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);
  }

  showError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
    console.error('Error:', message);
    setTimeout(() => {
      this.errorMessage = '';
    }, 8000); // Longer timeout for errors
  }

  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
