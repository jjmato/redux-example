import { MovesService } from './../moves/moves.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  constructor(private _movesSrc: MovesService) {}

  ngOnInit() {
    this._movesSrc.initMovesListener();
  }
}
