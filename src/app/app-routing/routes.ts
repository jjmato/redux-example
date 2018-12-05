import { AuthGuardService } from './../auth/auth-guard.service';
import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    loadChildren: './../moves/moves.module#MovesModule',
    canLoad: [AuthGuardService]
  },
  { path: '**', redirectTo: '' }
];
