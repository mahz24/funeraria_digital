import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  theUser: User;
  theFormGroup: FormGroup;
  trySend: boolean
  emailError: boolean
  newUser: User
  errorMessage: String

  constructor(private userService: UserService,
    private router: Router,
    private theFormBuilder: FormBuilder) {
    this.emailError = false
    this.theUser = {
      email: "",
      password: ""
    }
    this.errorMessage = ""
    this.configFormGroup()
  }

  configFormGroup() {
    const StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
    this.theFormGroup = this.theFormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(StrongPasswordRegx)]],
    })
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  ngOnInit(): void {
  }

  create() {
    this.trySend = true
    console.log(this.theUser);
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.userService.create(this.theUser).subscribe(data => {
        this.newUser = data
        if(this.newUser == null){
          this.emailError = true
        }else{
          this.userService.matchRole(this.newUser._id).subscribe()
        Swal.fire(
          "Usuario creado", 'Ahora introduce tus datos.', 'success'
         )
         this.router.navigate(["profile/" + this.newUser._id])
        }})
    }
  }
}
