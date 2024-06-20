import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  theUser: User
  constructor(private theSecurityService: SecurityService, private router: Router) {
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
    this.theSecurityService.login(this.theUser).subscribe({
      next:(data)=>{
        const newUser: User = data;
        console.log(newUser);
        this.router.navigate(["2fa/"+newUser._id])
      },
      error:(error)=>{
        Swal.fire("Autenticación Invalida", "Usuario o contraseña inválida", "error")
      }
    })
  }

  reset(){
    this.theSecurityService.resetPassword(this.theUser.email).subscribe({
     next:(data)=>
       Swal.fire("Revise su nueva contraseña", "Mire su correo", "success")
    })
  }

  register(){
    this.router.navigate(['register'])
  }

}
