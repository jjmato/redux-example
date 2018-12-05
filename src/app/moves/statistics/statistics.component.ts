import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Move } from './../moves.model';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: []
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private _destroyed = new Subject<void>();

  totalIn = 0;
  totalOut = 0;
  quantityIn = 0;
  quantityOut = 0;
  // Doughnut
  doughnutChartLabels: string[] = ['In', 'Out'];
  doughnutChartData: number[] = [];
  doughnutChartType = 'doughnut';

  constructor(private _appStore: Store<AppState>) {}

  ngOnInit() {
    this._appStore
      .select('moves')
      .pipe(
        map(state => state.moves),
        filter(Boolean)
      )
      .subscribe(moves => {
        this.setTotal(moves);
        this.setQuantity(moves);
        this.doughnutChartData = [this.quantityIn, this.quantityOut];
      });
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  setTotal(moves: Move[]): void {
    this.totalIn = moves.filter(move => move.type === 'in').length;
    this.totalOut = moves.filter(move => move.type === 'out').length;
  }

  setQuantity(moves: Move[]): void {
    if (moves.length <= 0) {
      return;
    }
    const qIn = moves.filter(move => move.type === 'in').map(m => m.quantity);
    this.quantityIn = qIn.length > 0 ? qIn.reduce((mq0, mq1) => mq0 + mq1) : 0;
    const qOut = moves.filter(move => move.type === 'out').map(m => m.quantity);
    this.quantityOut =
      qOut.length > 0 ? qOut.reduce((mq0, mq1) => mq0 + mq1) : 0;
  }
}
