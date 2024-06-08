import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { Holder } from 'src/app/model/holder.model';
import { ClientService } from 'src/app/services/client.service';
import { HolderService } from 'src/app/services/holder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1-> view, 2-> Create, 3-> Update
  holder: Holder
  theFormGroup: FormGroup;
  trySend: boolean
  clients: Client[]
  constructor(private activateRoute: ActivatedRoute,
              private holderService: HolderService,
              private router: Router,
              private theFormBuilder: FormBuilder,
              private clientService: ClientService
  ){
    this.mode=1
    this.trySend=false
    this.holder={
      id: 0,
      client:{
        id: null,
        user:{
          email:""
        }
      }
    }
    this.configFormGroup()
  }
  getHolder(id:number){
      this.holderService.view(id).subscribe(data =>{
        this.holder = data
      })
    }
  
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({ 
      idClient:[null, Validators.required]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  clientsList(){
    this.clientService.listNon().subscribe(data=>{
      this.clients = data
      console.log(JSON.stringify(this.clients));
      
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
      this.holder.id=this.activateRoute.snapshot.params.id
      this.getHolder(this.holder.id)
    }
    this.clientsList()
  }

  create(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.holderService.create(this.holder).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        this.router.navigate(["holders/list"])
      })
    }
  }

  update(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.holderService.update(this.holder).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["holders/list"])
      })
    }
  }

  btnClient(){
    this.router.navigate(["/clients/view/"+this.holder.client.id])
  }

}
