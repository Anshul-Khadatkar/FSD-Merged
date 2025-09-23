import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'event-management-app';
  username = '';
  isAuthenticated = false;
  ngOnInit(): void {
    // Check authentication status
    const storedUsername = localStorage.getItem('username');
    const storedToken = localStorage.getItem('authToken');

    if (storedUsername && storedToken) {
      this.username = storedUsername;
      this.isAuthenticated = true;
    }
  }
  constructor(private router: Router) {}
  Main() {
    this.router.navigate(['/']); // or any route you want
  }
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');

    // Redirect to registration service
    window.location.href = 'http://localhost:4200';
  }
}
