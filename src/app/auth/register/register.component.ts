import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  constructor(
    private _authSrv: AuthService
  ) {}

  ngOnInit() {}

  onSubmit(data) {
    console.log(data);
    this._authSrv.createUser(data.name, data.email, data.password);
  }
}
