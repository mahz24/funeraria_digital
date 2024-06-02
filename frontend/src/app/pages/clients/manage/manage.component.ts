import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';

import  Swal from "sweetalert2";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1-> view, 2-> Create, 3-> Update
  client: Client;
  theFormGroup: FormGroup;
  trySend: boolean
  constructor(private activateRoute: ActivatedRoute,
              private serviceClient:ClientService
  ){
    this.mode=1
    this.client = {
      id: 0, 
      gender: "", 
      direction: "", 
      user_id:"", 
      is_alive:false, 
      user:{
        "Full_name": "", 
        "Birthday": "", 
        "Number_phone": "", 
        "Email": ""
      },
      holder:{},
      benefactor:{}
    }
  }
  getClient(id:number){
      this.serviceClient.view(id).subscribe(data =>{
        
        this.client = data
        console.log(this.client);
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
    if(this.activateRoute.snapshot.params.id){
      this.client.id=this.activateRoute.snapshot.params.id
      this.getClient(this.client.id)
    }
  }
  
  // constructor(private activateRoute: ActivatedRoute,
  //   private theFormBuilder: FormBuilder,
  //   private service: ClientService,
  //   private router: Router) {
  //   this.trySend = false
  //   this.mode = 1;
  //   this.client = {
  //     id: 0, 
  //     gender: "", 
  //     direction: "", 
  //     user_id:"", 
  //     is_alive:false, 
  //     user:{
  //       "Full_name": "", 
  //       "Birthday": "", 
  //       "number_phone": "", 
  //       "email": ""
  //     }
  //   }
  //   this.configFormGroup()
  // }

  // configFormGroup() {
  //   this.theFormGroup = this.theFormBuilder.group({ 
  //     gender: [0, [Validators.required]],
  //     location: ['', [Validators.required, Validators.minLength(2)]]
  //   })
  // }

  // get getTheFormGroup() {
  //   return this.theFormGroup.controls
  // }

  // //getTheaterData(){
  // //  this.theater.capacity = this.getTheFormGroup.capacity.value;
  // //  this.theater.location = this.getTheFormGroup.location.value;
  // //}

  // ngOnInit(): void {
  //   const currentUrl = this.activateRoute.snapshot.url.join('/');

  //   if (currentUrl.includes('view')) {
  //     this.mode = 1;
  //   } else if (currentUrl.includes('create')) {
  //     this.mode = 2;
  //   } else if (currentUrl.includes('update')) {
  //     this.mode = 3;
  //   }

  //   if (this.activateRoute.snapshot.params.id) {
  //     this.client.id = this.activateRoute.snapshot.params.id;
  //     this.getClient(this.client.id);
  //   }
  // }


  // getClient(id: number) {
  //   this.service.view(id).subscribe(data => {
  //     this.client = data
  //     console.log("cliente" + JSON.stringify(this.client));
  //   })
  // }

  // create() {
  //   if (this.theFormGroup.invalid) {
  //     this.trySend = true
  //     Swal.fire("Formulario Incompleto", "Ingrese correctamente los datos solicitados", "error")
  //     return
  //   }
  //   //this.service.create(this.client).subscribe(data => {
  //   //  Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success")
  //   //  this.router.navigate(["clients/list"])
  //   //})
  // }
  // update() {
  //   if (this.theFormGroup.invalid) {
  //     this.trySend = true
  //     Swal.fire("Formulario Incompleto", "Ingrese correctamente los datos solicitados", "error")
  //     return
  //   }
  //   //this.service.update(this.client).subscribe(data => {
  //   //  Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success")
  //   //  this.router.navigate(["clients/list"])
  //   //})
  // }

}
