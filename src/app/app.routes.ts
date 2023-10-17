import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loggedInGuard } from './logged-in.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    loadChildren: () => import('./users/users.routes').then(m => m.usersRoutes)
  },
  {
    path: 'races',
    canActivate: [loggedInGuard],
    loadChildren: () => import('./races/races.routes').then(m => m.raceRoutes)
  }
];
