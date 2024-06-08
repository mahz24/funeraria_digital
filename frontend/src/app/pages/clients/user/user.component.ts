import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User;
  theFormGroup: FormGroup;
  trySend: boolean

  constructor(private userService: UserService,
              private router: Router, 
              private theFormBuilder: FormBuilder) 
  {
    this.user= {
      email: "",
      password:""
    }
    this.configFormGroup()
  }

  configFormGroup() {
    const StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
    this.theFormGroup = this.theFormBuilder.group({ 
      email:['', [Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.pattern(StrongPasswordRegx)]],
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  ngOnInit(): void {
  }

  create(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.userService.create(this.user).subscribe(data=>{
        const newUser: User = data
        Swal.fire(
          "Usuario creado", 'Ahora introduce tus datos.', 'success'
        )
        this.router.navigate(["clients/create/"+ newUser._id])
      })
    }
  }

}
