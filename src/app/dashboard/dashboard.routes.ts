import { Routes } from '@angular/router';
import { DetailComponent } from '../items/detail/detail.component';
import { ItemsComponent } from './../items/items.component';
import { StatisticsComponent } from './../items/statistics/statistics.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'detail', component: DetailComponent }
];
