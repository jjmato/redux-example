import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ActiveLoadingAction } from '../shared/ui.actions';
import { DeactiveLoadingAction } from './../shared/ui.actions';
import { createMove } from './moves.model';
import { AppState } from './moves.reducer';
import { MovesService } from './moves.service';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styles: []
})
export class MovesComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loading: boolean;
  type: 'in' | 'out' = 'in';

  private _destroyed = new Subject<void>();

  constructor(
    private _movesSrv: MovesService,
    private _appStore: Store<AppState>
  ) {}

  ngOnInit() {
    this._appStore
      .select('ui')
      .pipe(
        takeUntil(this._destroyed),
        map(ui => ui.isLoading)
      )
      .subscribe(loading => (this.loading = loading));
    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      quantity: new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  onSubmit() {
    this._appStore.dispatch(new ActiveLoadingAction());
    const move = createMove({ ...this.form.value, type: this.type });
    console.log(move);
    this._movesSrv
      .createMove(move)
      .then(moveResp => Swal('Move Created', move.description, 'success'))
      .then(swalResp => this._appStore.dispatch(new DeactiveLoadingAction()))
      .catch(err => {
        Swal('Move Error', move.description, 'error');
        this._appStore.dispatch(new DeactiveLoadingAction());
      });
    this.form.reset({ quantity: 0 });
  }

  toggleType() {
    this.type = this.type === 'in' ? 'out' : 'in';
  }
}
