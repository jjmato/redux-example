import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  constructor(private _authSrv: AuthService, private _router: Router) {}

  ngOnInit() {}

  onSubmit(data) {
    console.log(data);
    this._authSrv
      .login(data.email, data.password)
      .then(response => this._router.navigateByUrl('/'));
  }
}
