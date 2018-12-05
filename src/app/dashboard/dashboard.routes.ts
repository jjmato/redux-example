import { Routes } from '@angular/router';
import { DetailComponent } from '../moves/detail/detail.component';
import { MovesComponent } from './../moves/moves.component';
import { StatisticsComponent } from './../moves/statistics/statistics.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'items', component: MovesComponent },
  { path: 'detail', component: DetailComponent }
];
