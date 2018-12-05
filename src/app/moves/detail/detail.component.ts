import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../moves.reducer';
import { Move } from './../moves.model';
import { MovesService } from './../moves.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {
  private _destroyed = new Subject<void>();

  moves: Move[];

  constructor(
    private _appStore: Store<AppState>,
    private _moveSrv: MovesService
  ) {}

  ngOnInit() {
    this._appStore
      .select('moves')
      .pipe(takeUntil(this._destroyed))
      .subscribe(state => (this.moves = state.moves));
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  delete(move: Move) {
    console.log('DetailComponent.delete: ', move);
    this._moveSrv.deleteMove(move.uid);
  }
}
