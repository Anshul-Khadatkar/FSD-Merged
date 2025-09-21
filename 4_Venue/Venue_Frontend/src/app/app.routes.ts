import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VenueListComponent } from './components/venue-list/venue-list.component';
import { VenueFormComponent } from './components/venue-form/venue-form.component';
import { VenueDetailComponent } from './components/venue-detail/venue-detail.component';

export const routes: Routes = [
   { path: '', component: DashboardComponent },
   { path: 'venues', component: VenueListComponent },
   { path: 'venue/add', component: VenueFormComponent },
   { path: 'venue/edit/:id', component: VenueFormComponent },
   { path: 'venue/detail/:id', component: VenueDetailComponent }
];
