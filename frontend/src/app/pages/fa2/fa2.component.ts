import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'src/app/model/session.model';
import { User } from 'src/app/model/user.model';
import { SecurityService } from 'src/app/services/security.service';
import { UserService } from 'src/app/services/user.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fa2',
  templateUrl: './fa2.component.html',
  styleUrls: ['./fa2.component.scss']
})
export class Fa2Component implements OnInit {
  user: User;
  session: Session;
  constructor(private service: SecurityService, private activateRoute: ActivatedRoute,
              private userService: UserService, private router: Router,
              private formModule:FormsModule
  ) {
    this.user={
      _id: "",
      email: "",
      password: ""
    }
    this.session ={
      token2FA:0
    } 
  }

  ngOnInit(): void {
    this.user._id = this.activateRoute.snapshot.params.id
    this.userService.view(this.user._id).subscribe(data =>{
      this.user = data
    })
  }

  authentication2f() {
    console.log("cojo el 2fa"+this.session.token2FA+" usuario "+this.user._id );
    this.service.authentication2fa(this.user._id, this.session).subscribe({
      next:(data)=>{
        this.service.saveSession(data)
        this.router.navigate(['dashboard'])
      },
      error:(error)=>{
        Swal.fire("Autenticación Invalida", "Código de verificación incorrecta.", "error")
      }
    })

  }

}
