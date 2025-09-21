import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventSearchComponent } from './components/event-search/event-search.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'events', component: EventListComponent },
  { path: 'event/add', component: EventFormComponent },
  { path: 'event/edit/:id', component: EventFormComponent },
  { path: 'event/detail/:id', component: EventDetailComponent },
  { path: 'search', component: EventSearchComponent }
];
