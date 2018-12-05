import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { MovesComponent } from './moves.component';
import { moveReducer } from './moves.reducer';
import { SortMovesPipe } from './sort-moves.pipe';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('moves', moveReducer )
  ],
  declarations: [
    DashboardComponent,
    DetailComponent,
    MovesComponent,
    SortMovesPipe,
    StatisticsComponent
  ]
})
export class MovesModule {}
