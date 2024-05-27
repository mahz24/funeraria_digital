import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  theUser: User
  constructor(private theSecurityService: SecurityService) {
    this.theUser = {
      email: "",
      password: ""
    }
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  login() {
    console.log("datos de usuario" + JSON.stringify(this.theUser));
    this.theSecurityService.login(this.theUser).subscribe(data => {
      console.log("datos de respuesta de ms-seguridad" + JSON.stringify(data));

    })

  }

}
