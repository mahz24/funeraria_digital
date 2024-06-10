import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { Profile } from 'src/app/model/profile.model';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';

import  Swal from "sweetalert2";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1-> view, 2-> Create, 3-> Update
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
    this.mode=1
    this.client = {id: 0, direction:"", gender:"", is_alive: true}
    this.profile = {name: "", last_name: "", birthday: "", number_phone:""}
    this.configFormGroup()
  }
  getClient(id:number){
      this.serviceClient.view(id).subscribe(data =>{
        this.client = data
        this.userService.getProfile(this.client.user_id).subscribe(data => {
          this.profile = data
        })
      })
    }

  ngOnInit(): void{
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if(this.activateRoute.snapshot.params.id && this.mode != 2){
      this.client.id=this.activateRoute.snapshot.params.id
      this.getClient(this.client.id)
    }else if(this.activateRoute.snapshot.params.id && this.mode == 2){
      this.client.user_id = this.activateRoute.snapshot.params.id
    }
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
          this.router.navigate(["clients/list"])
        })
      })
    }
  }

  update(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.serviceClient.update(this.client).subscribe(data=>{
        this.userService.updateProfile(this.client.user_id, this.profile).subscribe(data =>{
          Swal.fire(
            "Completado", 'Se ha actualizado correctamente', 'success'
          )
          this.router.navigate(["clients/list"])
        })
      })
    }
  }

}
