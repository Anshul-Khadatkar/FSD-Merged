import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  userData: any = {
    message: 'Welcome to Viewer Dashboard',
    username: 'testuser',
    name: 'Anshul',
    role: 'USER',
  };

  // All users can access all features
  isEventManager: boolean = true;
  isParticipant: boolean = true;

  availableEvents: any[] = [
    // Add available events here (your existing data)
    {
      name: 'Swimming Competition',
      type: 'sport',
      date: '2025-04-14',
      head: 'Anshul',
      location: 'Main Pool Stadium',
      participants: '24/30',
    },
    {
      name: 'Basketball Championship',
      type: 'team sport',
      date: '2025-05-20',
      head: 'Anushka',
      location: 'Sports Complex A',
      participants: '18/20',
    },
    {
      name: 'Cricket Tournament',
      type: 'team sport',
      date: '2025-06-12',
      head: 'Krishna',
      location: 'Cricket Ground',
      participants: '22/22',
    },
    {
      name: 'football league',
      type: 'team sport',
      date: '2025-07-05',
      head: 'Sanjog',
      location: 'City Stadium',
      participants: '20/22',
    },
    {
      name: 'volleyball tournament',
      type: 'team sport',
      date: '2025-06-25',
      head: 'Rajesh',
      location: 'Indoor Arena B',
      participants: '12/14',
    },
    {
      name: 'Table Tennis Competition',
      type: 'individual sport',
      date: '2025-05-12',
      head: 'Khadatkar',
      location: 'Sports Hall 3',
      participants: '16/32',
    },
    {
      name: 'Tennis Championship',
      type: 'individual sport',
      date: '2025-05-12',
      head: 'Mahajan',
      location: 'Sports Hall 1',
      participants: '20/32',
    },
    {
      name: 'Athletics Meet',
      type: 'track & field',
      date: '2025-08-10',
      head: 'Virat',
      location: 'Athletic Stadium',
      participants: '45/50',
    },
    {
      name: 'chess tournament',
      type: 'indoor game',
      date: '2025-04-30',
      head: 'Rohit',
      location: 'Convention Center',
      participants: '28/64',
    },
    {
      name: 'Sprint',
      type: 'individual sport',
      date: '2025-05-10',
      head: 'Anshul Khadatkar',
      location: 'Track 1',
      participants: '22/30',
    },
    {
      name: 'Relay Race',
      type: 'team sport',
      date: '2025-06-05',
      head: 'Anushk Mahajan',
      location: 'Relay Stadium',
      participants: '24/30',
    },
    {
      name: 'kabaddi',
      type: 'team sport',
      date: '2025-07-10',
      head: 'Krishnachandra',
      location: 'Kabaddi Arena',
      participants: '23/30',
    },
    {
      name: 'Badminton Tournament',
      type: 'individual sport',
      date: '2025-06-15',
      head: 'Sanjog',
      location: 'Indoor Stadium B',
      participants: '21/30',
    },
    {
      name: 'tech talk',
      type: 'indoor event',
      date: '2025-04-10',
      head: 'Rajan Jha',
      location: 'Conference Room A',
      participants: '22/30',
    },
  ];

  participatedEvents: any[] = []; // Initialize as empty

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit() {
    console.log('Dashboard component initialized');
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log('Is logged in:', isLoggedIn);
    
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    // Fetch user data from localStorage
    const userEmail = localStorage.getItem('username');
    console.log('User email from localStorage:', userEmail);
    
    if (userEmail) {
      this.userData.username = userEmail;
    }

    // Check user role and set permissions
    this.checkUserRole();
    console.log('User role check - isEventManager:', this.isEventManager, 'isParticipant:', this.isParticipant);

    // Fetch participated events based on the user
    this.loadParticipatedEvents(this.userData.username);
  }

  checkUserRole() {
    // All users have access to all features - no role restrictions
    this.isEventManager = true;
    this.isParticipant = true;
    this.userData.role = 'USER';
  }

  loadParticipatedEvents(username: string) {
    this.authService.getParticipatedEvents(username).subscribe({
      next: (eventNames: string[]) => {
        const normalizedEventNames = eventNames.map(name => name.toLowerCase());
  
        // 👇 Debug logs
        console.log('Available events:', this.availableEvents.map(e => e.name));
        console.log('Participated event names (from backend):', eventNames);
        console.log('Normalized event names:', normalizedEventNames);
  
        // ✅ Filtering participated events
        this.participatedEvents = this.availableEvents.filter(event =>
          normalizedEventNames.includes(event.name.toLowerCase())
        );
  
        console.log('Filtered participated events:', this.participatedEvents); // 👈 Final debug
      },
      error: (error) => {
        console.error('Error loading participated events:', error);
        this.participatedEvents = []; // Ensure no events if error occurs
      }
    });
  }
  
  
  logout() {
    // Clear all user data
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  participate() {
    // Navigate to the form component
    this.router.navigate(['/form']);
  }

  registerForEvent() {
    // Implement registration logic
    alert('Event registration will be available soon!');
  }

  goToResults() {
    console.log('goToResults called');
    
    // Navigate to the result page in same tab
    const url = 'http://localhost:4202';
    console.log('Navigating to URL:', url);
    window.location.href = url;
  }

  viewAllParticipants() {
    // Navigate to a participants view (you can implement this later)
    alert('View All Participants feature will be available soon!');
  }
}
