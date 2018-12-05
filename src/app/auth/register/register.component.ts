import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  constructor(private _authSrv: AuthService, private _router: Router) {}

  ngOnInit() {}

  onSubmit(data) {
    console.log(data);
    this._authSrv
      .createUser(data.name, data.email, data.password)
      .then(response => this._router.navigateByUrl('/'));
  }
}
