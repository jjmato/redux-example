import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'redux-example';

  constructor(private _authSrv: AuthService) {}

  ngOnInit() {
    this._authSrv.initAuthListener();
  }
}
