import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { Profile } from 'src/app/model/profile.model';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  client: Client;
  profile: Profile
  theFormGroup: FormGroup;
  trySend: boolean
  constructor(private activateRoute: ActivatedRoute,
              private serviceClient:ClientService,
              private theFormBuilder: FormBuilder,
              private userService: UserService,
              private router: Router
  ){
    this.client = {id: 0, direction:"", gender:"", is_alive: true}
    this.profile = {name: "", last_name: "", birthday: "", number_phone:""}
    this.configFormGroup()
  }

  ngOnInit(): void{
    if(this.activateRoute.snapshot.params.id){
      this.client.user_id = this.activateRoute.snapshot.params.id
    }
  }

  ngOnDestroy() {
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({ 
      name:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      last_name:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      birthday:['',[Validators.required]],
      number_phone:['',[Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
      direction:['',[Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      gender:['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      is_alive:[null,[Validators.required]]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  create(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.serviceClient.create(this.client).subscribe(data=>{
        this.userService.createProfile(this.client.user_id, this.profile).subscribe(data =>{
          Swal.fire(
            "Completado", 'Se ha creado correctamente', 'success'
          )
          this.router.navigate(["login"])
        })
      })
    }
  }
}
