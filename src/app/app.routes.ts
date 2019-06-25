import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { AuthGuardService } from './guards/auth-guard.service';

export const APP_ROUTES: Routes = [
  { path: '', component: ViewerComponent, canActivate: [AuthGuardService] },
  { path: 'auth', component: AuthComponent }
];
